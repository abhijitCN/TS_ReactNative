import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../Screens/Home/Home';
import ProfileScreen from '../Screens/Profile/Profile';
import EditProfileScreen from '../Screens/EditProfile/EditProfile';
import {MainRootStackParamList} from './types';
import ChangePasswordScreen from '../Screens/ChangePassword/ChangePassword';
import AddAddressScreen from '../Screens/AddAddress/AddAddress';
import MapScreen from '../Screens/Map/Map';
import AddProductScreen from '../Screens/AddProduct/AddProductScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './CustomDrawer';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    Alert,
    Button,
    TextInput,
    FlatList,
    ScrollView,
    SafeAreaView,
    StatusBar,
    RefreshControl,
} from 'react-native';

const MainStack = createNativeStackNavigator<MainRootStackParamList>();
const Drawer = createDrawerNavigator();

function HomeScreen2() {
    const navigation = useNavigation();
    return (
        <Drawer.Navigator screenOptions={{drawerPosition: 'left'}}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
        </Drawer.Navigator>
    );
}

const HomeDrawerStack = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({route}) => ({
                    title: route.params?.title,
                })}
            />
        </MainStack.Navigator>
    );
};

const MainStackScreens = () => (
    <MainStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Profile" component={ProfileScreen} />
        <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
        <MainStack.Screen name="AddAddress" component={AddAddressScreen} />
        <MainStack.Screen name="Map" component={MapScreen} />
        <MainStack.Screen name="AddProduct" component={AddProductScreen} />
        <MainStack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
        />
    </MainStack.Navigator>
    // <Drawer.Navigator
    //     drawerContent={props => <CustomDrawer {...props} />}
    //     initialRouteName="Home"
    //     screenOptions={{
    //         headerShown: false,
    //         drawerActiveBackgroundColor: '#aa18ea',
    //         drawerActiveTintColor: '#fff',
    //         drawerInactiveTintColor: '#333',
    //         drawerLabelStyle: {
    //             marginLeft: -25,
    //             fontFamily: 'Roboto-Medium',
    //             fontSize: 15,
    //         },
    //     }}>
    //     <Drawer.Screen name="Home" component={HomeDrawerStack} />
    //     <Drawer.Screen
    //         name="Profile"
    //         component={ChangePasswordScreen}
    //         options={{
    //             drawerIcon: ({color}) => (
    //                 <Ionicons name="person-outline" size={22} color={color} />
    //             ),
    //         }}
    //     />
    // </Drawer.Navigator>
);

export default () => {
    return (
        <NavigationContainer>
            <MainStackScreens />
        </NavigationContainer>
    );
};
