import {StyleSheet} from 'react-native';

export const cb_styles = StyleSheet.create({
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
    },
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
});

export const images = {
  img: {
    facebook: require('../images/facebook.png'),
    google: require('../images/google.png'),
  },
};
