import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/Login/Login';
import RegistrationScreen from '../Screens/Registration/Registration';
import HomeScreen from '../Screens/Home/Home';
import ProfileScreen from '../Screens/Profile/Profile';
import EditProfileScreen from '../Screens/EditProfile/EditProfile';

const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const StackScreens = () => (
    <AuthStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SignUp">
        <AuthStack.Screen name="SignUp" component={LoginScreen} />
        <AuthStack.Screen name="Login" component={RegistrationScreen} />
        <AuthStack.Screen name="Home" component={HomeScreen} />
    </AuthStack.Navigator>
);
const MainStackScreens = () => (
    <MainStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Profile" component={ProfileScreen} />
        <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
    </MainStack.Navigator>
);

export default () => {
    return (
        <NavigationContainer>
            {/* <StackScreens /> */}
            <MainStackScreens />
        </NavigationContainer>
    );
};
