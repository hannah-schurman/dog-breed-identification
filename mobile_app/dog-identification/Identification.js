import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import * as tf from '@tensorflow/tfjs'
import * as ImagePicker from 'expo-image-picker';
import * as jpeg from 'jpeg-js'
import {fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';


// UNCOMMENT OUT TO USE PRE-TRAINED MOBILENET
/*import * as mobilenet from '@tensorflow-models/mobilenet'
const akc_breeds = require('./akc_breeds.json');*/

const breedData = require('./breeds.json');

class Identification extends React.Component {
  state = {
    modelLoaded: false,
    predictions: null,
    image: null,
    camera: false,
    library: false,
  }
  
  // load model
  async componentDidMount() {
    // UNCOMMENT BLOCK TO USE PRE-TRAINED MOBILENET
    /*await tf.ready()
    this.model = await mobilenet.load()
    this.setState({ modelLoaded: true })*/

    // COMMENT OUT THIS BLOCK IF USING PRE-TRAINED MOBILENET
    console.log("Application Started")
    const tfready = await tf.ready();

    console.log("Loading custom breed detection model")
    const modelJson = await require('./assets/mobilenet/model.json');
    const modelWeight = await require('./assets/mobilenet/group1-shard1of1.bin');
    this.model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeight));

    console.log("Loaded Model")
    this.setState({ modelLoaded: true })
    //END HERE

  }

  // convert image into tensor
  imageToTensor(rawImageData) {
    const TO_UINT8ARRAY = true
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    const buffer = new Uint8Array(width * height * 3)
    let offset = 0
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset]
      buffer[i + 1] = data[offset + 1]
      buffer[i + 2] = data[offset + 2]
      offset += 4
    }

    return tf.tensor3d(buffer, [height, width, 3])
  }

  // run model on input image
  predictImage = async () => {
    try {
      const imageAssetPath = Image.resolveAssetSource(this.state.image)
      const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
      const rawImageData = await response.arrayBuffer()
      const imageTensor = this.imageToTensor(rawImageData).resizeBilinear([224,224]).reshape([1,224,224,3])
      
      // COMMENT OUT IF USING PRE-TRAINED MOBILENET
      const preds = await this.model.predict(imageTensor).data()
      const prediction = preds.indexOf(Math.max(...preds)).toString()
      console.log(prediction)
      this.setState({ predictions: prediction })
      console.log(breedData['Breed'][prediction])
      // END HERE

      // UNCOMMENT BLOCK IF USING PRE-TRAINED MOBILENET
      /*const preds = await this.model.classify(imageTensor)
      const prediction = preds[0]
      this.setState({ predictions: prediction.className })
      console.log(prediction.className)*/

    } catch (error) {
      console.log(error)
    }
  }

  // get image from library
  getLibraryImage = async() => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        const img = { uri: result.uri }
        this.setState({ image: img })
        this.setState({ library: true })
        this.predictImage()
      }
    }
    catch(error){
      console.log(error)
    }
  };

  // get image from camera
  getCameraImage = async() => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
          alert('Permission to access camera is required!');
          return;
      }
  
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        const img = { uri: result.uri }
        this.setState({ image: img })
        this.setState({ camera: true })
        this.predictImage()
      }
    }
    catch(error){
      console.log(error)
    }
  };

  // take prediction and match to breeds.json to output personality traits
  renderPrediction(pred){
    // UNCOMMENT CODE BLOCK TO USE PRE-TRAINED MOBILENET
    /*const breed = pred.split(',');
    let name = ''

    if (breed.length > 1) { 
        name = breed[1].toLowerCase().substring(1, breed[1].length);
    }
    else {
        name = breed[0].toLowerCase();
    }
    console.log('name:', name)
    const temperament = akc_breeds.temperament[name];
    const group = akc_breeds.group[name];
    const height = Math.round((akc_breeds.min_height[name]+akc_breeds.max_height[name])/2);
    const weight = Math.round((akc_breeds.min_weight[name]+akc_breeds.max_weight[name])/2);
    const energy = akc_breeds.energy_level_value[name]*10;*/

    // COMMENT OUT TO USE PRE-TRAINED MOBILENET MODEL
    const breed = breedData['Breed'][pred];
    const temperament = breedData['temperament'][pred];
    const group = breedData['group'][pred];
    const height = Math.round((breedData['min_height'][pred]+breedData['max_height'][pred])/2);
    const weight = Math.round((breedData['min_weight'][pred].pred+breedData['max_weight'][pred])/2);
    const energy = breedData['energy_level_value'][pred]*10;
    // END HERE

    return (
        <View>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>Dog Breed: {breed}</Text>
            <Text style={styles.text}>Temperament: {temperament}</Text>
            <Text style={styles.text}>Group: {group}</Text>
            <Text style={styles.text}>Average Height: {height} inches</Text>
            <Text style={styles.text}>Average Weight: {weight} lbs</Text>
            <Text style={styles.text}>Energy Level: {energy}/10</Text>
        </View>
    )
  }

  render() {
    const { 
        modelLoaded, predictions, image, library, camera 
    } = this.state

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <View style={styles.text1}> 
                    {!image && (<Text style={styles.text1}>Welcome to Paw Print. Select an image of your furry friend and we will predict their breed!</Text>)}
                </View>
                <View style={styles.text}>
                    {modelLoaded ? (<Text style={styles.text}></Text>) : (<ActivityIndicator size='small'/>)}
                </View>
            </View>
    
            <TouchableOpacity
                onPress={modelLoaded ? this.getLibraryImage : undefined}
                style={(modelLoaded && (!library && !camera)) ? styles.button: undefined}>
                {modelLoaded && !image && (<Text style={styles.buttonText}>Upload Image</Text>)}
            </TouchableOpacity>


            <TouchableOpacity
                onPress={modelLoaded ? this.getCameraImage : undefined}
                style={(modelLoaded && (!library && !camera)) ? styles.button: undefined}>
                {modelLoaded && !image && (<Text style={styles.buttonText}>Take Photo</Text>)}
            </TouchableOpacity> 

            <View>
                {image && <Image source={image} style={styles.image}/>}
            </View>
            
            <View>
                {modelLoaded && image && (<Text style={styles.predictionText}>{predictions ? '' : 'Predicting...'}</Text>)}
                {modelLoaded && predictions && this.renderPrediction(predictions)}
            </View>

        </View>
      )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    text1: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10
    },
    welcome: {
      marginTop: 50,
      justifyContent: 'center'
    },
    text: {
      marginTop: 10,
      textAlign: 'center',
      fontSize: 16
    },
    predictionText: {
      fontSize: 20,
      alignItems: 'center'
    },
    buttonText: {
      color: 'white',
      fontSize: 20,
    },
    button: {
        backgroundColor: 'orange', 
        alignItems: 'center',
        marginHorizontal: 50,
        opacity: 0.9,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
    },
    image: {
        width: 375,
        height: 300,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    }
  })
  export default Identification;