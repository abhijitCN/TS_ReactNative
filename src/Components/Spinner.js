import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';

export default function Spinner() {
  let showSpinner = useSelector(state => state.toggleSpinner?.show);

  return  /* isFetching || */ showSpinner ? (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'default'}
        animated={true}
      />
      <View style={styles.spinnerContainer}>
        <LottieView
          source={require('../assets/animations/Spinner.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  ) : null;
}

const styles = ({ responsiveHeight, responsiveWidth }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    spinnerContainer: {
      height: 80,
      width: 80,
    },
    splashContainer: {
      width: responsiveWidth(100),
      height: responsiveHeight(50),
    },
    splashMainContainer: {
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
