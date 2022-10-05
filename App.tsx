import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {AuthNavigator, MainStackNavigation} from './src/Navigator/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootState} from './src/Reducers/store';
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
    const verify: any = useSelector((state: rootState) => state.user);
    const [isUser, setIsUser] = useState('');
    useEffect(() => {
        console.log('Is Authenticate', verify.isLoading);
        displayData();
    }, []);

    const displayData = async () => {
        try {
            let user: any = await AsyncStorage.getItem('userToken');
            let parsed = JSON.parse(user);
            console.log('parsed ?? ', parsed);
            setIsUser(parsed);
            console.log('IS USER >> ', isUser);
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    const isAuthenticate = verify.isLoading && isUser;
    console.log('isAuthenticate', isAuthenticate);

    return (
        <>{verify.isLoading ? <MainStackNavigation /> : <AuthNavigator />}</>
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
