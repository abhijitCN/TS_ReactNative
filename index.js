/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import store from "./src/Reducers/store";
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidStyle } from '@notifee/react-native';

//import persistStore from 'redux-persist/es/persistStore';
//import { PersistGate } from 'redux-persist/integration/react'
//let persistor = persistStore()
// const initialState = {
//     name: 'Abhijit',
// };

// const store = configureStore({
//     preloadedState: initialState,
//     reducer: (state) => {
//         return state;
//     },
// });
const ReduxAppWrapper = () => {


    // Register background handler (notification)
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background !', remoteMessage);
        localDisplayNotification(remoteMessage);

    });
    // Register Kill mode handler (notification)
    messaging().getInitialNotification(async remoteMessage => {
        console.log('Message handled in the Kill !', remoteMessage);
        localDisplayNotification(remoteMessage);

    });
    return (
        <Provider store={store}>
            {/* <PersistGate persistor={persistor}> */}
            <App />
            {/* </PersistGate> */}
        </Provider>
    );
};

// Local notification 8274882861

async function localDisplayNotification(data) {
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

AppRegistry.registerComponent(appName, () => ReduxAppWrapper);
