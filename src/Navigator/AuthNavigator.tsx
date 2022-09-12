import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/Login/Login';
import RegistrationScreen from '../Screens/Registration/Registration';
const AuthStack = createStackNavigator();
const StackScreens = () => (
  <AuthStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="SignUp">
    <AuthStack.Screen name="SignUp" component={LoginScreen} />
    <AuthStack.Screen name="Login" component={RegistrationScreen} />
  </AuthStack.Navigator>
);
export default () => {
  return (
    <NavigationContainer>
      <StackScreens />
    </NavigationContainer>
  );
};
