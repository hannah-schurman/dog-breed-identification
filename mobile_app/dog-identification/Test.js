import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
// import * as jpeg from 'jpeg-js';
import ReactNative, { NativeModules, Image, ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import {fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import dog from './assets/dog_background.jpg';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import testDog from "./assets/IMG_3351.jpeg";


ReactNative.LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();
const breedData = require('./breeds.json');

export default function Test() {
  // define breed related variables that will be set with model evaluation
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [breedDetector, setBreedDetector] = useState("");
  const [breed, setBreed] = useState("");
  const [breedName, setBreedName] = useState("");
  const [breedGroup, setBreedGroup] = useState("");
  const [breedTemperament, setBreedTemperament] = useState("");
  const [breedHeight, setBreedHeight] = useState("");
  const [breedWeight, setBreedWeight] = useState("");
  const [breedEnergy, setBreedEnergy] = useState("");

  // function will load model 
  useEffect(() => {
    async function loadModel() {
      console.log("[+] Application Started")
      const tfready = await tf.ready();

      console.log("[+] Loading custom breed detection model")
      const modelJson = await require('./assets/model.json');
      const modelWeight = await require('./assets/group1-shard1of1.bin');
      const breedDetector = tf.loadGraphModel(bundleResourceIO(modelJson, modelWeight));

      console.log("[+] Loaded Model")
      setBreedDetector(breedDetector)
    }
    loadModel()
  }, []);


  // converts an image to a tensor that can be used in model
  // function imageToTensor(base64) {
  //   const rawImageData = tf.util.encodeString(base64, 'base64');

  //   console.log("Converting Image to tensor");
  //   const TO_UINT8ARRAY = true;
  //   const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
  //   console.log("Converted Image");

  //   //console.log(`width of the image -> ${width} and ${height}`);

  //   const buffer = new Uint8Array(width * height * 3);
  //   let offset = 0;
  //   for (let i = 0; i < buffer.length; i += 3) {
  //       buffer[i] = data[offset];
  //       buffer[i + 1] = data[offset + 1];
  //       buffer[i + 2] = data[offset + 2];

  //       offset += 4;
  //   }

  //   const normed = [];
  //   for (let i = 0; i < buffer.length; i++) normed[i] = buffer[i] / 255.0; // Normalize

  //   return tf.tensor3d(normed, [height, width, 3]).expandDims();
  // };


  // function to predict breed based on image
  function predictBreed(){
    const convertImage = async() => {
      try{
        console.log(selectedImage)
        const dogImage = require('./assets/IMG_3351.jpeg')

        const imageAssetPath = Image.resolveAssetSource(dogImage);
        console.log("[+] asset path")
        console.log(imageAssetPath)


        const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
        console.log("[+] Response")
        console.log(response)


        const imageData = await response.arrayBuffer();
        console.log("[+] Retrieved image data")
        console.log(imageData)


        //const imageTensor = decodeJpeg(imageData, 3);
        console.log("[+] Decode image to tensor")

        setBreed('16')
        // console.log("[+] Prediction Completed")
      }catch{
        console.log("[-] Unable to load image")
      }
    }
    return (
      convertImage()
    );
  }

  // function that returns breed information for identification page
  function BreedInfo() {
    // setBreed(predictBreed());
    setBreedName(breedData.Breed[breed]);
    setBreedTemperament(breedData.temperament[breed]);
    setBreedGroup(breedData.group[breed]);
    setBreedHeight(Math.round((breedData.min_height[breed]+breedData.max_height[breed])/2));
    setBreedWeight (Math.round((breedData.min_weight[breed]+breedData.max_weight[breed])/2));
    setBreedEnergy(breedData.energy_level_value[breed]*10);

    return (
      <View style={{ marginTop: 20, flex: 1 }}>
          <View style={{ marginBottom: 100, flex: 1 }}>
            <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
          
            <Text style={breedStyles.titleText}>Dog Breed: {breedName}</Text>
            <Text style={breedStyles.infoText}>Temperament: {breedTemperament}</Text>
            <Text style={breedStyles.infoText}>Group: {breedGroup}</Text>
            <Text style={breedStyles.infoText}>Average Height: {breedHeight}</Text>
            <Text style={breedStyles.infoText}>Average Weight: {breedWeight}</Text>
            <Text style={breedStyles.infoText}>Energy Level: {breedEnergy}/10</Text>
         
            <TouchableOpacity
              onPress={() => NativeModules.DevSettings.reload()}
              style={breedStyles.button}>
              <Text style={{fontSize: 30, color: 'black' }}>Reset Classifier</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }

  // identification page that allows input from camera and image library
  function Identification() {

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        if (result.cancelled === true) {
            return;
        }

        setSelectedImage(result.uri);
        // predictBreed(result)
      };

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
        }

        const result = await ImagePicker.launchCameraAsync();

        if (result.cancelled === true) {
          return ;
        }
        //predictBreed(result)
        setSelectedImage(result.uri);
    }

    //gets breed info after getting image
    if (selectedImage !== null) {
        predictBreed()

        return (
          BreedInfo()
        );
    }

    return (
      <View style={styles.container}>

        <View style={{flex: 0, marginBottom: 30, marginHorizontal: 50, }}> 
          <Text style={styles.text1}>Welcome to Paw Print. Select an image of your furry friend and we will predict their breed!</Text>
        </View>

        <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.button}>
            <Text style={{ fontSize: 30, color: 'white' }}>Choose a photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={openCamera}
            style={styles.button}>
            <Text style={{ fontSize: 30, color: 'white' }}>Take a photo</Text>
        </TouchableOpacity>

      </View>
    )
  }

  // home page
  function HomeScreen( {navigation}) {
  
    return (
      <View style={styles.container}>
        <ImageBackground source={dog} resizeMode="cover" style={styles.image}>
          <Text style={styles.header}>Paw Print</Text>

          <TouchableOpacity
          onPress={() => navigation.navigate('Identify')}
          style={styles.button1}>
          <Text style={{ fontSize: 30, color: 'black' }}>Click to begin</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />

        </ImageBackground>
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Identify"
          component={Identification}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// style sheets
const breedStyles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    paddingBottom: 10,
    marginTop: 50,
    textAlign: 'center'
  },
  infoText: {
    fontSize: 20,
    paddingBottom: 5,
    textAlign: 'center'
  },
  button: {
    marginTop: 50,
    backgroundColor: 'orange', 
    alignItems: 'center',
    marginHorizontal: 50,
    opacity: 0.9,
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.6
  },
  header: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: "white",
    opacity: 0.5,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 500,
    marginHorizontal: 30,
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
  button1: {
    backgroundColor: 'white', 
    alignItems: 'center',
    marginHorizontal: 50,
    opacity: 0.5,
    borderRadius: 10,
    padding: 10,
  },
  thumbnail: {
    width: 375,
    height: 300,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
  },
  text1: {
    textAlign: 'center',
    fontSize: 20,
  },
})

export default Test