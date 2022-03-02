import React from 'react';
import {TouchableOpacity, ImageBackground, StyleSheet, Text, View } from 'react-native';
import dog from './assets/dog_background.jpg';
import { StatusBar } from 'expo-status-bar';


class HomeScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <ImageBackground source={dog} resizeMode="cover" style={styles.image}>
            <Text style={styles.header}>Paw Print</Text>
  
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Identify')}
            style={styles.button1}>
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
export default HomeScreen;