import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';

import {CustomButton} from '../../components/Buttons/Button_component';
import {CustomInput} from '../../components/inputs/input_component';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();    // --> This is later used in the onPress event 

// Authentication code: check if user is already loged on, if so navigate to Home screen  --------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('HomeScreen');
      }
    });
    return unsubscribe;
  }, []);

// Authentication code: Create an account --------------------------------------------------------------------------------------------------------------------------------------------------------------
  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        // console.warn('Registered as: ', user.email);

//  Query call using fetch: [GET] -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//    - Into: android/src/main/AndroidManifest.xml --> add inside <application --> android:usesCleartextTraffic="true"
//    - Change localhost into --> 10.0.2.2  (It works with your IPv4 Address as well --> run ipconfig)
//    - Here fetch() takes as input the URL, the default method used is GET
        // fetch('http://10.0.2.2:5001/awesomeproject-99390/us-central1/writeUser?name='+name+'&email='+email.toLowerCase())
        //   .then(res => res.text())            // --> If the API uses res.write() grab it with res.text()  (res.json() for res.json())
        //   .then(data => console.warn(data));  // --> Grab the response with a .then() then print the data 

//  Body call using fetch: [POST] -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//    - After the URl, the optional field must be filled --> fetch(resource, options)
//    - The options field is an object containing custom settings that you want to apply to the request
//    - method: *GET, POT, DELETE, PUT     
//    - headers: 'Content-Type: application/json' --> MUST be set in order to pass JSON in the body
//    - body: JSON.stringify(data)  --> send w/e data you need      
          fetch('http://10.0.2.2:5001/awesomeproject-99390/us-central1/bodyWriteUser',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              email: email.toLowerCase()
            })
          }).then(res => res.text())
          .then(data => console.warn(data))

// Cloud Firestore code: when user is created, add their name, email & status to the database -----------------------------------------------------------------------------------------------------------
        // firestore().collection('User').add({
        //   name: name,
        //   email: email.toLowerCase(), // Email is case-insensitive, Firebase converts email to lowercase, so convert it here to obtain true when using == comparison
        //   status: 'online',
        // });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.warn('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.warn('That email address is invalid!');
        }
        console.error(error);
      });
  };

  //  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  [ UI ]
  //  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.c1}></View>

      <View style={styles.c2}>
        <Text style={styles.title}> Să incepem </Text>
        <CustomInput
          text="Nume Prenume"
          placeholder="George Popescu"
          value={name}
          onChangeText={text => setName(text)}
        />
        <CustomInput
          text="Adresa de email"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="george.popescu@google.com"
          keyboardType="email-address"
        />
        <CustomInput
          text="Parola"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          icon="eye"
        />
      </View>

      <View style={styles.c3}>
        <CustomButton
          text="Continuă"
          class="b1"
          textColor="white"
          onPress={handleSignUp}>
          {' '}
        </CustomButton>
        <Text style={styles.c3Center}> Sau </Text>
        <CustomButton
          text="Continuă cu Facebook"
          class="b2"
          img="facebook"
          textColor="black">
          {' '}
        </CustomButton>
        <CustomButton
          text="Continuă cu Google"
          class="b2"
          img="google"
          textColor="black">
          {' '}
        </CustomButton>
        <Text style={[styles.c3Center, {marginTop: 30}]}>
          {' '}
          Ai cont deja?{' '}
          <Text
            style={{color: '#ff8c3b'}}
            onPress={() => navigation.navigate('LogIn')}>
            {' '}
            Intră în cont{' '}
          </Text>{' '}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  c1: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
  },
  c2: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 32,
    color: 'black',
    marginBottom: 16,
    marginLeft: -6,
  },
  c3: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  c3Center: {
    color: 'black',
    textAlign: 'center',
  },
});
