import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Register} from './src/modules/Register/Register_page';
import {LogIn} from './src/modules/Log_in/Log_in_page';
import Home from './src/modules/Home/Home';


const Stack = createNativeStackNavigator();

const App1 = () => {

  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeScreen" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App1;
