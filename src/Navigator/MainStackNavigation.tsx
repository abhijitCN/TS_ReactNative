import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/Home/Home';
import ProfileScreen from '../Screens/Profile/Profile';
import EditProfileScreen from '../Screens/EditProfile/EditProfile';
import {MainRootStackParamList} from './types';
import ChangePasswordScreen from '../Screens/ChangePassword/ChangePassword';

const MainStack = createStackNavigator<MainRootStackParamList>();

const MainStackScreens = () => (
    <MainStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Profile" component={ProfileScreen} />
        <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
        <MainStack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
        />
    </MainStack.Navigator>
);

export default () => {
    return (
        <NavigationContainer>
            <MainStackScreens />
        </NavigationContainer>
    );
};
