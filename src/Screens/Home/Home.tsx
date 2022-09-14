import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {UserContext} from '../../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import Toast from 'react-native-toast-message';

function Home() {
  const {user, signOut} = useContext<any>(UserContext);
  const [animate, setAnimate] = useState<boolean>(true);
  const onPress = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      Toast.show({
        type: 'success',
        text1: 'Logout Successfully',
        position: 'top',
      });
      console.log('Logout');
    } catch (error) {
      console.log('Logout error');
    }
  };
  // const onPress = () => {
  //   signOut();
  // };
  useEffect(() => {
    setTimeout(() => {
      setAnimate(false);
    }, 2000);
  });
  return (
    <View style={style.main}>
      {animate === true ? (
        <>
          <View>
            <ActivityIndicator animating={animate} color="red" size="large" />
          </View>
        </>
      ) : (
        <>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Hello, {user.email}
          </Text>
          <View style={style.buttonContainer}>
            <TouchableOpacity style={style.button} onPress={onPress}>
              <Text style={style.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Toast />
          </View>
        </>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#95d6f0',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    width: 100,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0a3749',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
export default Home;
