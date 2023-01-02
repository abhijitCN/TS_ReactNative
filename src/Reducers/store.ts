;
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Reducers/authSlice'
import profileSlice from './profileSlice';
import verificationSlice from './verificationSlice';
import toggleSpinnerSlice from './toggleSpinnerSlice';
import ProductSlice from './ProductSlice';
import CartReducer from './CartSlice';

const createDebugger = require('redux-flipper').default; // <-- ADD THIS

const store = configureStore({
    reducer: {
      user: authReducer,
      verification:verificationSlice,
      profile:profileSlice,
      toggleSpinner : toggleSpinnerSlice,
      product:ProductSlice,
      cart:CartReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(createDebugger()), // <-- ADD THIS
  })

  export type rootState=ReturnType<typeof store.getState>
  export default store;
