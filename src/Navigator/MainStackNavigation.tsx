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
import CustomerService from 'react-native-vector-icons/AntDesign';
import CustomDrawer from './CustomDrawer';
import ChatHome from '../Screens/ChatHome/ChatHome';
import VideoCall from '../Screens/Support/VideoCall';
import VoiceCall from '../Screens/Support/VoiceCall';
import MyProduct from '../Screens/Myproduct/MyProduct';
import Selection from '../Screens/Support/Selection';
import ProductDetailsScreen from '../Screens/ProductDetails/ProductDetails';
import Payment from '../Screens/Payment/PaymentScreen';
import AddToCart from '../Screens/AddToCart/AddToCartScreen';

const MainStack = createNativeStackNavigator<MainRootStackParamList>();
const Drawer = createDrawerNavigator();

const HomeDrawerStack = () => {
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
            <MainStack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="AddToCart"
                component={AddToCart}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="Payment"
                component={Payment}
                options={{headerShown: false}}
            />
        </MainStack.Navigator>
    );
};

const AddProductDrawerStack = () => {
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

const ProfileDrawerStack = () => {
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

const ChatHomeDrawerStack = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="ChatHome"
                component={ChatHome}
                options={{headerShown: false}}
            />
        </MainStack.Navigator>
    );
};

const SupportDrawerStack = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="Selection"
                component={Selection}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="SupportVideoCall"
                component={VideoCall}
                options={{headerShown: false}}
            />
            <MainStack.Screen
                name="SupportVoiceCall"
                component={VoiceCall}
                options={{headerShown: false}}
            />
        </MainStack.Navigator>
    );
};

const MyProductStack = () => {
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                name="MyProduct"
                component={MyProduct}
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
            component={HomeDrawerStack}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home" size={22} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="Add Products"
            component={AddProductDrawerStack}
            options={{
                drawerIcon: ({color}) => (
                    <CustomerService
                        name="pluscircleo"
                        size={22}
                        color={color}
                    />
                ),
            }}
        />
        <Drawer.Screen
            name="My Product"
            component={MyProductStack}
            options={{
                drawerIcon: ({color}) => (
                    <Product name="product-hunt" size={22} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="Profile"
            component={ProfileDrawerStack}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="person-outline" size={22} color={color} />
                ),
            }}
        />
        <Drawer.Screen
            name="Chat-Home"
            component={ChatHomeDrawerStack}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons
                        name="chatbox-ellipses-outline"
                        size={22}
                        color={color}
                    />
                ),
            }}
        />
        <Drawer.Screen
            name="Support"
            component={SupportDrawerStack}
            options={{
                drawerIcon: ({color}) => (
                    <CustomerService
                        name="customerservice"
                        size={22}
                        color={color}
                    />
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
