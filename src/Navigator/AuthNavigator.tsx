import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/Login/Login';
import RegistrationScreen from '../Screens/Registration/Registration';
import {AuthRootStackParamList} from './types';

const AuthStack = createStackNavigator<AuthRootStackParamList>();

const StackScreens = () => (
    <AuthStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="SignUp" component={RegistrationScreen} />
    </AuthStack.Navigator>
);

export default () => {
    return (
        <NavigationContainer>
            <StackScreens />
        </NavigationContainer>
    );
};
