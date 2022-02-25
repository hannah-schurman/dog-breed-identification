import React, { useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage() {

    let [selectedImage, setSelectedImage] = useState(null);

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
            <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={(openImagePickerAsync) => navigation.navigate('Identification')}
                style={styles.button}>
                <Text style={{ fontSize: 30, color: 'white' }}>Choose a photo</Text>
            </TouchableOpacity>
        </View>
    
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'orange', 
        alignItems: 'center',
        marginHorizontal: 50,
        opacity: 0.9,
        borderRadius: 10,
        padding: 20
    },
  });