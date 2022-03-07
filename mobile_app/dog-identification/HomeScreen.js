import React from 'react';
import {TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';
import dog from './assets/dog_background.jpg';
import { StatusBar } from 'expo-status-bar';

// code for the home screen
class HomeScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <ImageBackground source={dog} resizeMode="cover" style={styles.image}>
            <Text style={styles.header}>Paw Print</Text>
  
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Identify')}
            style={styles.button}>
            <Text style={{ fontSize: 30, color: 'black' }}>Click to begin</Text>
            </TouchableOpacity>
  
            <StatusBar style="auto" />
  
          </ImageBackground>
        </View>
    );
  }
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
      backgroundColor: 'white', 
      alignItems: 'center',
      marginHorizontal: 50,
      opacity: 0.5,
      borderRadius: 10,
      padding: 10,
    },
  })
export default HomeScreen;