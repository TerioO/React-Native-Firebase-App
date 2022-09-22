import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';

const HomeScreen = () => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        auth()
        .signOut()
        .then(() => {
            navigation.replace("Login");
        })
        .catch(error => alert(error.message))
    }

  return (
    <View style={styles.container}>
      <Text>Email: {auth().currentUser?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}>
        <Text style={styles.buttonText}> Sign Out </Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#6352ff",
        width: "60%",
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
})