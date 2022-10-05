;
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Reducers/authSlice'
import profileSlice from './profileSlice';
import verificationSlice from './verificationSlice';


const store = configureStore({
    reducer: {
      user: authReducer,
      verification:verificationSlice,
      profile:profileSlice
    }
  })

  export type rootState=ReturnType<typeof store.getState>

  export default store;
