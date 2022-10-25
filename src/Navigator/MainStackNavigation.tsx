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
import Product from 'react-native-vector-icons/FontAwesome5';

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

const homeDrawerStack = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="AddProduct"
                component={AddProductScreen}
                options={{headerShown: false}}
            />
        </MainStack.Navigator>
    );
};

const addProductDrawerStack = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="AddProduct"
                component={AddProductScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
        </MainStack.Navigator>
    );
};

const profileDrawerStack = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="AddAddress"
                component={AddAddressScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="Map"
                component={MapScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
        </MainStack.Navigator>
    );
};

const MainStackScreens = () => (
    // <MainStack.Navigator
    //     screenOptions={{headerShown: false}}
    //     initialRouteName="Home">
    //     <MainStack.Screen name="Home" component={HomeScreen} />
    //     <MainStack.Screen name="Profile" component={ProfileScreen} />
    //     <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
    //     <MainStack.Screen name="AddAddress" component={AddAddressScreen} />
    //     <MainStack.Screen name="Map" component={MapScreen} />
    //     <MainStack.Screen name="AddProduct" component={AddProductScreen} />
    //     <MainStack.Screen
    //         name="ChangePassword"
    //         component={ChangePasswordScreen}
    //     />
    // </MainStack.Navigator>
    <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#0a3749',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: {
                marginLeft: -25,
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
            },
        }}>
        <Drawer.Screen
            name="Home"
            component={homeDrawerStack}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home" size={22} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="Add Products"
            component={addProductDrawerStack}
            options={{
                drawerIcon: ({color}) => (
                    <Product name="product-hunt" size={22} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="Profile"
            component={profileDrawerStack}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="person-outline" size={22} color={color} />
                ),
            }}
        />
    </Drawer.Navigator>
);

export default () => {
    return (
        <NavigationContainer>
            <MainStackScreens />
        </NavigationContainer>
    );
};
