import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import dog from './assets/dog_background.jpg';
// import UploadImage from './UploadImage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

const Stack = createNativeStackNavigator();

function Identification() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images
      });
      if (pickerResult.cancelled === true) {
          return;
      }

      setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
      return (
      <View style={styles.container}>
          <Image source={{ uri: selectedImage.localUri }} />
      </View>
      );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
          onPress={openImagePickerAsync}
          style={styles.button}>
          <Text style={{ fontSize: 30, color: 'white' }}>Choose a photo</Text>
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
          style={styles.button}>
          <Text style={{ fontSize: 30, color: 'white' }}>Identify</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />

      </ImageBackground>
    </View>
  )
}

function App() {
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
    ///marginHorizontal: 30,
  },
  button: {
    backgroundColor: 'orange', 
    alignItems: 'center',
    marginHorizontal: 50,
    opacity: 0.9,
    borderRadius: 10,
    padding: 10
  }
});
export default App;