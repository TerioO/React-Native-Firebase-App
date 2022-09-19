import React, {useState} from 'react';
import {View, Text, TextInput, Image, Pressable} from 'react-native';
import {cI_styles} from './input_style';

export function CustomInput(props) {
  const [disPass, setDisPass] = useState(props.secureTextEntry);
  const [icon, setIcon] = useState(props.icon);

  const clickEvent = () => {
    if (disPass == true) {
      setDisPass(false);
      setIcon('eyeClosed');
    } else {
      setDisPass(true);
      setIcon('eye');
    }
  };

  return (
    <View>
      <Text style={cI_styles.inputTitle}> {props.text} </Text>
      <View>
        <TextInput
          style={[
            cI_styles.inputs['inputsDefault'],
            cI_styles.inputs[props.class],
          ]}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType}
          secureTextEntry={disPass}
          value={props.value}
          onChangeText={props.onChangeText}
        />
        <Pressable style={cI_styles.imgPlace} onPress={clickEvent}>
          <Image source={cI_styles.img[icon]} />
        </Pressable>
      </View>
    </View>
  );
}
