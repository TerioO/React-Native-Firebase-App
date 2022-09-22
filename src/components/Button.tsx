import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import React, { FC } from 'react'

interface ButtonProps {
    text: string;
    class: "b1" | "b2" | "none";
    textColor: string;
    img?: "facebook" | "google" | "none";        // Can't be set as optional --> requiered bcs it's used as index bellow
}

// FC --> Function component type, with FC<myInterface> you don't need to write ( props: myInterface )
//      - It also provides autocomplete/intelisense inside the modules where you want to use this component
const Button: FC<ButtonProps> = (props) => {
    let img_type = props.img
    if(img_type != "facebook" && img_type!= "google"){
        img_type = "none";
    }
    return (
        <TouchableOpacity style={styles.buttons[props.class]}>
            <Image style={styles.img[img_type]} source={images.img[img_type]}/>
            <Text style={{color: props.textColor}}>{props.text}</Text>
        </TouchableOpacity>
    )
}

// Without this interface, it will raise errors when grabbing buttons[b1]
//      - Solution: give any type for that property
interface Styles {
    buttons: any; 
    img: any;
}

const styles = StyleSheet.create<Styles>({
    buttons: {
        b1: {
            backgroundColor: '#ff8c3b',
            borderRadius: 30,
            padding: 12,
            marginTop: 32,
            marginBottom: 15,
            display: 'flex',
            alignItems: 'center',
        },
        b2: {
            borderRadius: 30,
            backgroundColor: 'white',
            marginTop: 15,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2, // --> Adds shadow effect!!
        }
    },
    img: {
        facebook: {
            width: 20,
            height: 20,
            marginRight: 5,
        },
        google: {
             marginRight: 20,
        },
    },
})

const images: any = {
    img: {
      facebook: require('../components/facebook.png'),
      google: require('../components/google.png'),
    },
};

export default Button