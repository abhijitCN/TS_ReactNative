import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import profileSlice from './profileSlice';
import verificationSlice from './verificationSlice';
import toggleSpinnerSlice from './toggleSpinnerSlice';
import ProductSlice from './ProductSlice';
import CartReducer from './CartSlice';
import { combineReducers } from '@reduxjs/toolkit';
//mport persistReducer from 'redux-persist/es/persistReducer';
//import storage from 'redux-persist/lib/storage';

const createDebugger = require('redux-flipper').default; // <-- ADD THIS

// let persistConfig = {
//   key: 'root',
//   storage,
// }
// let rootReducer = combineReducers({
//   user: authReducer,
//   verification: verificationSlice,
//   profile: profileSlice,
//   toggleSpinner: toggleSpinnerSlice,
//   product: ProductSlice,
//   cart: CartReducer
// })
// let persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  //reducer: persistedReducer,
  reducer:{
    user: authReducer,
  verification: verificationSlice,
  profile: profileSlice,
  toggleSpinner: toggleSpinnerSlice,
  product: ProductSlice,
  cart: CartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(createDebugger()), // <-- ADD THIS
})

export type rootState = ReturnType<typeof store.getState>
export default store;
