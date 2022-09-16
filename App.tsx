import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootNavigator} from './src/Navigator';
import AuthContext from './src/Context/AuthContext';
import {configureStore} from '@reduxjs/toolkit';
//import authReducer, {addToken} from './src/Reducers/Authreducer';
import profileReducer from './src/Reducers/UserProfileReducer';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {AuthNavigator, MainStackNavigation} from './src/Navigator/index';
//import './src/Constant/Firebase';

// const store = configureStore({
//     reducer: {
//         user: authReducer,
//         profile: profileReducer,
//     },
// });
const Section: React.FC<
    PropsWithChildren<{
        title: string;
    }>
> = ({children, title}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
};

const App = () => {
    // const token = useSelector(state => state.user.token)
    //   const dispatch = useDispatch()
    //   useEffect(()=>{
    //     dispatch(addToken())
    //   },[])

    return (
        <>
            <AuthContext>
                {/* <Provider store={store}> */}
                <RootNavigator />
                {/* {token ? <MainStackNavigation /> :<AuthNavigator />  } */}
                {/* </Provider> */}
            </AuthContext>
        </>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
