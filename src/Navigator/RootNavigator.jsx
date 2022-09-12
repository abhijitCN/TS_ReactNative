import React, {useState, useContext, useEffect} from 'react';
import {UserContext} from '../Context/AuthContext';
import {AuthNavigator, MainStackNavigation} from './index';

function RootNavigator() {
  const {user, setUser, signIn} = useContext(UserContext);
  console.log('USER????', user.email);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('Auth');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (error) {}
  };

  useEffect(() => getUser(), []);

  const isAuthenticate = !user.email;
  console.log('isAuthenticate', isAuthenticate);

  return <>{isAuthenticate ? <AuthNavigator /> : <MainStackNavigation />}</>;
}
export default RootNavigator;
