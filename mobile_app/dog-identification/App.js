import React from 'react';

import HomeScreen from './HomeScreen.js';
import Identification from './Identification.js';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// main App class. Contains Navigation/Screens
class App extends React.Component {
  render() {
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
    )
  }
}

export default App