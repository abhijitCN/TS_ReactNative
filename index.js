/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import store from "./src/Reducers/store";
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
    return (
        <Provider store={store}>
            {/* <PersistGate persistor={persistor}> */}
            <App />
            {/* </PersistGate> */}
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => ReduxAppWrapper);
