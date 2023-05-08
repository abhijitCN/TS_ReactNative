import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AuthNavigator, MainStackNavigation} from './src/Navigator/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootState} from './src/Reducers/store';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidStyle} from '@notifee/react-native';

const App = () => {
    const verify: any = useSelector((state: rootState) => state.user);
    //console.log('inside verify', verify);
    const [isUser, setIsUser] = useState(null);
    useEffect(() => {
        displayData();
    }, [isUser]);
    //Get Device Token
    const gerDeviceToken = async () => {
        let token = await messaging().getToken();
        console.log('gerDeviceToken', token);
    };
    useEffect(() => {
        gerDeviceToken();
    }, []);
    // Firebase notification
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // Alert.alert(
            //     'notification received in foreground mode',
            //     JSON.stringify(remoteMessage),
            // );
            localDisplayNotification(remoteMessage);
        });

        return unsubscribe;
    }, []);

    // Local notification

    async function localDisplayNotification(data: any) {
        // Request permissions (required for iOS)
        await notifee.requestPermission();

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: data.notification.title,
            body: data.notification.body,
            android: {
                channelId,
                //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
                style: {
                    type: AndroidStyle.BIGPICTURE,
                    picture:
                        'https://techrushi.com/wp-content/uploads/2022/12/iPhone-14-Pro-Max-wallpaper-4K.webp',
                },
            },
        });
    }
    const displayData = async () => {
        try {
            let user: any = await AsyncStorage.getItem('Token');
            let parsed = JSON.parse(user);
            //console.log('parsed token ******** ', parsed);
            setIsUser(parsed);
            //console.log('**** set Parsed value in setState ****', isUser);
        } catch (error) {
            Alert.alert('Enter Valid Credential');
        }
    };

    const isAuthenticate = verify.isLoading && verify.email;
    //console.log('verify.isLoading ?*?', verify.isLoading);
    //console.log('isAuthenticate ?*?', isAuthenticate);
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
