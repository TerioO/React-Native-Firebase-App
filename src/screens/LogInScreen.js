import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/core';

const LogInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if(user){
                navigation.navigate("HomeScreen");
            }
        })
        return unsubscribe
    }, []);

    const handleSignUp = () => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.warn('Registered as: ', user.email);
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
        
            console.error(error);
        });
    }

    const handleLogin = () => {
        auth()
        .singInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.warn('Logged in with: ', user.email);
        })
    }

    return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding">
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput 
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}> Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}> Register </Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LogInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        marginTop: 5,
        padding: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        width: "60%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#6352ff",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#6352ff",
        borderWidth: 2,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "#6352ff",
        fontWeight: "700",
        fontSize: 16,
    }
})


/***************************************************************************************************************************************
  <KeyboardAvoidView>:  when using inputs the keyboard won't appear over it

  */