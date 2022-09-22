;
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Reducers/authSlice'
import verificationSlice from './verificationSlice';


const store = configureStore({
    reducer: {
      user: authReducer,
      verification:verificationSlice
    }
  })

  export type rootState=ReturnType<typeof store.getState>

  export default store;
