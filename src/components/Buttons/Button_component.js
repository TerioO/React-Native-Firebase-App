import React from 'react';
import {Text, Pressable, Image, TouchableOpacity} from 'react-native';
import {cb_styles, images} from './Button_style';

// Must start with capital letter --> use it as a tag in the App.js file
export function CustomButton(props) {
  return (
    <TouchableOpacity style={cb_styles.buttons[props.class]} onPress={props.onPress}>
      <Image style={cb_styles.img[props.img]} source={images.img[props.img]} />
      <Text style={{color: props.textColor}}> {props.text} </Text>
    </TouchableOpacity>
  );
}
