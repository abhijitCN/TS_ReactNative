;
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Reducers/authSlice'
import profileSlice from './profileSlice';
import verificationSlice from './verificationSlice';
import toggleSpinnerSlice from './toggleSpinnerSlice';

const store = configureStore({
    reducer: {
      user: authReducer,
      verification:verificationSlice,
      profile:profileSlice,
      toggleSpinner : toggleSpinnerSlice,

    }
  })

  export type rootState=ReturnType<typeof store.getState>
  export default store;
