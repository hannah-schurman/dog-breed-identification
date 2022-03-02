import React from 'react'
import { StyleSheet, Text, View, StatusBar, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import * as tf from '@tensorflow/tfjs'
import { fetch } from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as ImagePicker from 'expo-image-picker';
import * as jpeg from 'jpeg-js'

class Identification extends React.Component {
  state = {
    isTfReady: false,
    isModelReady: false,
    predictions: null,
    image: null
  }

//   // convert image into tensor
//   imageToTensor(rawImageData) {
//     const TO_UINT8ARRAY = true
//     const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
//     // Drop the alpha channel info for mobilenet
//     const buffer = new Uint8Array(width * height * 3)
//     let offset = 0 // offset into original data
//     for (let i = 0; i < buffer.length; i += 3) {
//       buffer[i] = data[offset]
//       buffer[i + 1] = data[offset + 1]
//       buffer[i + 2] = data[offset + 2]

//       offset += 4
//     }

//     return tf.tensor3d(buffer, [height, width, 3])
//   }

//   classifyImage = async () => {
//     try {
//       const imageAssetPath = Image.resolveAssetSource(this.state.image)
//       const response = await fetch(imageAssetPath.uri, {}, { isBinary: true })
//       const rawImageData = await response.arrayBuffer()
//       const imageTensor = this.imageToTensor(rawImageData)
//       const predictions = await this.model.classify(imageTensor)
//       this.setState({ predictions })
//       console.log(predictions)
//     } catch (error) {
//       console.log(error)
//     }
//   }

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
        // const source = { uri: result.uri }
        // this.setState({ image: source })
        // this.classifyImage()
        
      }
    }
    catch(error){
      console.log(error)
    }
  };

  getCameraImage = async() => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
          alert('Permission to access camera is required!');
          return;
      }
  
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        // const source = { uri: result.uri }
        // this.setState({ image: source })
        // this.classifyImage()
      }
    }
    catch(error){
      console.log(error)
    }
  };

//   async componentDidMount() {
//     await tf.ready()
//     this.setState({
//       isTfReady: true
//     })
//     this.model = await mobilenet.load()
//     this.setState({ isModelReady: true })

//     // add this
//     this.getPermissionAsync()
//   }

//   renderPrediction = prediction => {
//     return (
//       <Text key={prediction.className} style={styles.text}>
//         {prediction.className}
//       </Text>
//     )
//   }

  render() {
    const { isTfReady, isModelReady, predictions, image } = this.state

    return (
        <View style={styles.container}>
  
          <View style={{flex: 0, marginBottom: 30, marginHorizontal: 50, }}> 
            <Text style={styles.text1}>Welcome to Paw Print. Select an image of your furry friend and we will predict their breed!</Text>
          </View>
  
          <TouchableOpacity
              onPress={this.getLibraryImage}
              style={styles.button}>
              <Text style={{ fontSize: 30, color: 'white' }}>Choose a photo</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
              onPress={this.getCameraImage}
              style={styles.button}>
              <Text style={{ fontSize: 30, color: 'white' }}>Take a photo</Text>
          </TouchableOpacity>
  
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
    },
    loadingContainer: {
      marginTop: 80,
      justifyContent: 'center'
    },
    text: {
      color: '#ffffff',
      fontSize: 16
    },
    loadingModelContainer: {
      flexDirection: 'row',
      marginTop: 10
    },
    imageWrapper: {
      width: 280,
      height: 280,
      padding: 10,
      borderColor: '#cf667f',
      borderWidth: 5,
      borderStyle: 'dashed',
      marginTop: 40,
      marginBottom: 10,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageContainer: {
      width: 250,
      height: 250,
      position: 'absolute',
      top: 10,
      left: 10,
      bottom: 10,
      right: 10
    },
    predictionWrapper: {
      height: 100,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center'
    },
    transparentText: {
      color: '#ffffff',
      opacity: 0.7
    },
    footer: {
      marginTop: 40
    },
    poweredBy: {
      fontSize: 20,
      color: '#e69e34',
      marginBottom: 6
    },
    tfLogo: {
      width: 125,
      height: 70
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
  })
  export default Identification;