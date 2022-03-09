# Paw Print
This mobile app alows the user to input an image of a dog from their device, either from the library or from the camera, and uses a pre-trained Tensorflow MobileNet CNN model to identify the dogs breed. In addition to the classification, the app will also output breed traits, such as breed group, temperament, height, weight, and energy levels. 

* The intension was to use the save custom tuned MobileNet Hub model from the jupyter notebook in this repository. 
* Unfortunately I was unable to find a way to use saved tensorflow hub models in React Native due to the 'Keras Layer' being unknown in React Native.
* Therefore I had to use my non-hub custom model with the next highest accuracy. This sacrificed a lot of accuracy which I would like to improve in next steps. 
* The other option is to use the pre-trained non-custom MobileNet model which is significantly more accurate. The Identification.js file contains the code for both options (code for using pre-trained mobilenet model commented out with instructions on how to uncomment) 


# Getting Started
This mobile application has not been deployed. Follow these steps to set the app up locally:
1. Create an account on expo and follow their installation instructions: https://docs.expo.dev/get-started/installation/
2. Clone this repository 
3. Run `expo start` or `npm start`
4. Follow the instructions to open the project on your device


# App Examples
The screenshots below give examples of how the app is used:<br>
<img src='Images/splash_screen.PNG' width=300/>
<img src='Images/welcome.PNG' width=300/>
<img scr='Images/input.PNG' width=300/>
<img src='Images/processing.PNG' width=300/>
<img src='Images/prediction.PNG' width=300/>

# Built with
React Native
Tensorflow.js
Expo

# Repository
```
├── App.js                     # app class that contains navigation container
├── Homescreen.js              # class that returns the home screen containers
├── Identification.js          # class that inputs image and returns prediction and corresponding traits
├── assets                     # contains splash screen, icon, and other images used in the app
│   ├── mobilenet              # folder containing the JSON and .bin files for the custom trained mobilenet model
├── akc_breeds.json            # json file containing breed names and personality traits to be used for non-custom mobilenet model
└── breeds.json                # json file containing breed names and personality traits to be used for custom mobilenet model
```

# Sources
In addition to [Expo](https://docs.expo.dev/) and [Tensorflow](https://blog.tensorflow.org/2020/02/tensorflowjs-for-react-native-is-here.html) Documentations , I used [this tutorial](https://www.youtube.com/watch?v=pC7mCEHiYQw) to assist in mobile app constuction and the use of Tensorflow.js
