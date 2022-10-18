import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AuthNavigator, MainStackNavigation} from './src/Navigator/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootState} from './src/Reducers/store';

const App = () => {
    const verify: any = useSelector((state: rootState) => state.user);
    console.log('inside verify', verify);
    const [isUser, setIsUser] = useState(null);
    useEffect(() => {
        displayData();
    }, [isUser]);

    const displayData = async () => {
        try {
            let user: any = await AsyncStorage.getItem('Token');
            let parsed = JSON.parse(user);
            console.log('parsed token ******** ', parsed);
            setIsUser(parsed);
            console.log('**** set Parsed value in setState ****', isUser);
        } catch (error) {
            Alert.alert('Enter Valid Credential');
        }
    };

    const isAuthenticate = verify.isLoading && verify.email;
    //console.log('isAuthenticate ??', isAuthenticate);

    return <>{isAuthenticate ? <MainStackNavigation /> : <AuthNavigator />}</>;
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
