import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/Login/Login';
import RegistrationScreen from '../Screens/Registration/Registration';
import {AuthRootStackParamList} from './types';
import SplashScreen from '../Screens/Splash/SplashScreen';

const AuthStack = createNativeStackNavigator<AuthRootStackParamList>();

const StackScreens = () => (
    <AuthStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Splash">
        <AuthStack.Screen name="Splash" component={SplashScreen} />
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
