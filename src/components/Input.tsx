import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import React, { FC, useState } from 'react'

interface InputProps {
    text: string;
    class: "inputsDefault" | "lastInput" | "none";
    placeholder?: string;
    keyboardType?: "email-address" | "default";
    secureTextEntry?: boolean;
    icon: "eye" | "eyeClosed" | "none";       // Can't be set as optional --> requiered bcs it's used as index bellow
}

// FC --> Function component type, with FC<myInterface> you don't need to write ( props: myInterface )
//      - It also provides autocomplete/intelisense inside the modules where you want to use this component
const Input: FC<InputProps> = (props) => {
    const [disPass, setDisPass] = useState(props.secureTextEntry);
    const [icon, setIcon] = useState(props.icon);

    const clickEvent = () => {
        if(disPass == true){
            setDisPass(false);
            setIcon('eyeClosed');
        }   
        else{
            setDisPass(true);
            setIcon('eye');
        }
    }

    return (
        <View>
            <Text style={styles.inputTitle}>{props.text}</Text>
            <View>
                <TextInput 
                    style={[
                        styles.inputs['inputsDefault'],
                        styles.inputs[props.class]
                    ]}
                    placeholder={props.placeholder}
                    keyboardType={props.keyboardType}
                    secureTextEntry={disPass}
                />
                <TouchableOpacity style={styles.imgPlace} onPress={clickEvent}>
                    <Image source={styles.img[icon]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

// Without this interface, it will raise errors when grabbing inputs[props.class]
//      - Solution: give any type for that property
interface Styles {
    inputTitle: object;
    inputs: any;
    imgPlace: object;
    img: any;
}


const styles = StyleSheet.create<Styles>({
    inputTitle: {
        marginBottom: 5,
        marginLeft: 4,
    },
    inputs: {
        inputsDefault: {
            backgroundColor: '#e0e0e0',
            marginBottom: 16,
            borderRadius: 5,
            paddingLeft: 16,
            paddingTop: 5,
            paddingBottom: 5,
        },
        lastInput: {
            marginBottom: 10,
        },
    },
    imgPlace: {
        position: 'absolute',
        right: 15,
        top: 4,
    },
    img: {
        eye: require('../components/eye.png'),
        eyeClosed: require('../components/eye-blocked.png'),
    },
})

export default Input;