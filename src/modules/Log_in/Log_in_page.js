import {ReactNativeFirebase} from '@react-native-firebase/app';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth'; // admin@google.com --> admin1234
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';

import {CustomButton} from '../../components/Buttons/Button_component';
import {CustomInput} from '../../components/inputs/input_component';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();   // --> This is later used in the onPress event 

// Authentication code: check if user is already loged on, if so navigate to Home screen -------------------------------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('HomeScreen');
      }
    });
    return unsubscribe;
  }, []);

// Authentication code: Login ------------------------------------------------------------------------------------------------------------------------------------------------
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        // console.warn('Logged in with: ', user.email);

//  When logging on change the status to 'online' -----------------------------------------------------------------------------------------------------------------------------
        fetch('http://10.0.2.2:5001/awesomeproject-99390/us-central1/readUser?email='+email.toLowerCase()+'&status=online')
          .then(res => res.text())
          .then(data => console.warn(data))

// Cloud Firestore code: when signing in, change status to "online" -----------------------------------------------------------------------------------------------------------
        // firestore()
        //   .collection('User')
        //   .where('email', '==', user.email)
        //   .get()
        //   .then(querySnapshot => {
        //     querySnapshot.forEach(documentSnapshot => {
        //       // console.warn('Logging with ID:', documentSnapshot.id);
        //       firestore().collection('User').doc(documentSnapshot.id).update({
        //         status: 'online',
        //       });
        //     });
        //   });
      });
  };

  //  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //  [ UI ]
  //  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.c1}></View>

      <View style={styles.c2}>
        <Text style={styles.title}> Login </Text>
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
          class="lastInput"
        />
        <Text style={{color: '#ff8c3b', marginLeft: 'auto'}}>
          {' '}
          Ai uitat parola?{' '}
        </Text>
      </View>

      <View style={styles.c3}>
        <CustomButton
          text="Intră în cont"
          class="b1"
          textColor="white"
          onPress={handleLogin}>
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
          Nu ai cont?{' '}
          <Text
            style={{color: '#ff8c3b'}}
            onPress={() => navigation.navigate('Register')}>
            {' '}
            Crează un cont{' '}
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
