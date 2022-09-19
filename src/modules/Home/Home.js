import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const navigation = useNavigation();

// Authentication code: Signing out -------------------------------------------------------------------------------------------------------------------------------------------
  const handleSignOut = () => {
    // Remember the currentUserEmail (placed before .signOut() method)
    let currentUserEmail = auth().currentUser.email;
    auth()
      .signOut()
      .then(() => {
        navigation.replace('LogIn');

// Call the API to change the status to 'offline' when logging out ------------------------------------------------------------------------------------------------------------
        fetch('http://10.0.2.2:5001/awesomeproject-99390/us-central1/readUser?email='+currentUserEmail.toLowerCase()+'&status=offline')
          .then(res => res.text())
          .then(data => console.warn(data))

// Cloud Firestore code: when signing out, change status to "offline" ---------------------------------------------------------------------------------------------------------
        // firestore()
        //   .collection('User')
        //   .where('email', '==', currentUserEmail)
        //   .get()
        //   .then(querySnapshot => {
        //     querySnapshot.forEach(documentSnapshot => {
        //       firestore().collection('User').doc(documentSnapshot.id).update({
        //         status: 'offline',
        //       });
        //     });
        //   });
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth().currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}> Sign Out </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6352ff',
    width: '60%',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Home;
