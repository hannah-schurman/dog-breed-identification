import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import * as jpeg from 'jpeg-js'
import ReactNative, { Image, ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import * as tf from '@tensorflow/tfjs';
import {fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import dog from './assets/dog_background.jpg';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

ReactNative.LogBox.ignoreAllLogs(true);

const Stack = createNativeStackNavigator();

export default function Test() {
  const [breedDetector, setBreedDetector] = useState("")

  useEffect(() => {
    async function loadModel() {
      console.log("[+] Application Started")
      const tfready = await tf.ready();

      console.log("[+] Loading custom breed detection model")
      const modelJson = await require('./assets/model.json');
      const modelWeight = await require('./assets/group1-shard1of1.bin');
      const breedDetector = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeight));

      setBreedDetector(breedDetector)
    }
    loadModel()
  }, []);

    function imageToTensor(rawImageData) {
    console.log("Converting Image to tensor");
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    console.log(`width of the image -> ${width} and ${height}`);

    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];

        offset += 4;
    }

    const normed = [];
    for (let i = 0; i < buffer.length; i++) normed[i] = buffer[i] / 255.0; // Normalize

    return tf.tensor3d(normed, [height, width, 3]).expandDims();
    };


// function Prediction() {
//   return (
//     <View style={styles.container}>
//       <ImageBackground source={dog} resizeMode="cover" style={styles.image}>
//         <Text style={styles.header}>Paw Print</Text>

//         <TouchableOpacity
//           onPress={() => navigation.navigate('Identify')}
//           style={styles.button1}>
//           <Text style={{ fontSize: 30, color: 'black' }}>Click to begin</Text>
//         </TouchableOpacity>

//         <StatusBar style="auto" />

//       </ImageBackground>
//     </View>
//   )

// }


    function Identification() {
    const [selectedImage, setSelectedImage] = React.useState(null);

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

        setSelectedImage({ localUri: result.uri });
    };

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
        }

        const result = await ImagePicker.launchCameraAsync();
        result = imageToTensor(result).resizeBilinear([224,224]).reshape([1,224,224,3])

        console.log(result);

        if (result.cancelled === true) {
        return ;
        }

        setSelectedImage({ localUri: result.uri });
    }



    if (selectedImage !== null) {
        return (
        <View style={{ marginTop: 20, flex: 1 }}>
            <View style={{ marginBottom: 100, flex: 1 }}>
            <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
            </View>

            <ScrollView style={styles.scrollView}>
            <Text style={styles.text}> Dog breed here</Text>
            <Text style={styles.text}> Dog info here</Text>
            </ScrollView>
        </View>
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
  scrollView: {
    backgroundColor: 'grey',
  },

});
export default Test;