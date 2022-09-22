import { StyleSheet, View, Text, ScrollView } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/core';

import Button from '../components/Button';
import Input from '../components/Input';

// FC --> Function component type 
const Register = () => {

    // Without this, when calling onPress = () => navigation.navigate('Register'), it will raise an error (It works with the error thugh!)
    type Nav = {
        navigate: (value: string) => void;
    }

    const navigation = useNavigation<Nav>();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.c1}></View>

            <View style={styles.c2}> 
                <Text style={styles.title}>Să începem</Text>
                <Input 
                    text="Nume Prenume" 
                    placeholder="George Popescu" 
                    class="none" icon="none"/>
                <Input 
                    text="Adresă de email" 
                    placeholder="george.popescu@google.com" 
                    keyboardType="email-address" class="none" 
                    icon="none" />
                <Input 
                    text="Parolă" 
                    secureTextEntry={true} 
                    icon="eye" 
                    class="none"/>
            </View>

            <View style={styles.c3}> 
                <Button 
                    text="Continuă" 
                    class="b1"
                    textColor="white" 
                />
                <Button 
                    text="Continuă cu Facebook" 
                    class="b2" 
                    textColor="black" 
                    img="facebook"
                />
                <Button 
                    text="Continuă cu Google" 
                    class="b2" 
                    textColor="black" 
                    img="google" 
                 />
                <Text style={[styles.c3Center, {marginTop: 30}]}>
                    Ai cont deja?
                    <Text style={{color: '#ff8c3b'}} onPress={() => navigation.navigate('LogIn')}>
                        {'  '}Intră în cont
                    </Text>
                </Text>
            </View>
        </ScrollView>
    )
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
        marginLeft: 3,
      },
      c3: {
        width: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 5,
      },
      c3Center: {
        color: 'black',
        textAlign: 'center',
      },
})

export default Register;