import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import HomeScreen from './src/screens/HomeScreen';
import LogInScreen from './src/screens/LogInScreen'

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>  
        <Stack.Screen name="Login" component={LogInScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

/***************************************************************************************************************************************
  <Stack.Navigator>: screenOptions={{ headerShown: false }}* --> remove header for WHOLE stack 
  <Stack.Screen>:    options={{headerShown: false}* --> remove header for THIS page 

  */
