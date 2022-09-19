import {StyleSheet} from 'react-native';

export const cI_styles = StyleSheet.create({
  inputTitle: {
    marginBottom: 5,
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
    eye: require('../inputs/eye.png'),
    eyeClosed: require('../inputs/eye-blocked.png'),
  },
});
