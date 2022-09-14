import React, {useState, useContext, useEffect} from 'react';
import {UserContext} from '../Context/AuthContext';
import {AuthNavigator, MainStackNavigation} from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
function RootNavigator() {
  const {user, setUser, signIn} = useContext(UserContext);
  console.log('USER????', user.email);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      console.log('#######', value);
      if (value != null) {
        setUser(JSON.parse(value));
        console.log('?????', value);
      }
      console.log('=====', value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getUser(), []);

  const isAuthenticate = !user.email;
  console.log('isAuthenticate', isAuthenticate);

  return <>{isAuthenticate ? <AuthNavigator /> : <MainStackNavigation />}</>;
}
export default RootNavigator;
