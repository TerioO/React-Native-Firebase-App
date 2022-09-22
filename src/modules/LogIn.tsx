import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react';
import {useNavigation} from '@react-navigation/core';

import Button from '../components/Button';
import Input from '../components/Input';

// FC --> Function component type 
const LogIn = () => {

    // Without this, when calling onPress = () => navigation.navigate('Register'), it will raise an error (It works with the error thugh!)
    type Nav = {
        navigate: (value: string) => void;
    }

    const navigation = useNavigation<Nav>();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.c1}></View>

            <View style={styles.c2}>
                <Text style={styles.title}>Login</Text>
                <Input 
                    text="Adresă de email"
                    placeholder="george.popescu@google.com"
                    keyboardType="email-address"
                    class="none" icon="none"
                />
                <Input 
                    text="Parolă"
                    secureTextEntry={true}
                    class="lastInput" icon="eye"
                />
                <Text style={{color: '#ff8c3b', marginLeft: 'auto'}}>
                    Ai uitat parola
                </Text>
            </View>

            <View style={styles.c3}>
                <Button 
                    text="Intră in cont"
                    class="b1"
                    textColor="white"
                />
                <Text style={styles.c3Center}>Sau</Text>
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
                    Nu ai cont?
                    <Text style={{color: '#ff8c3b'}} onPress={() => navigation.navigate('Register')}>
                        {'  '}Crează un cont
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
        marginLeft: 2,
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
})

export default LogIn;