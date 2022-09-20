import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const initialState = {
    // isLoggedIn: false,
    // name: null,
    // phoneNo: null,
    email: null,
    // password: null,
};

interface ISignIn {
    email: any;
    password: any;
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState: initialState,
    reducers: {
        signUpUser: (state, action) => {
            // state.name = action.payload.name;
            state.email = action.payload.email;
            //state.isLoggedIn = action.payload.isLoggedIn;
            // state.password = action.payload.password;
            // state.phoneNo = action.payload.phoneNo;
            return state;
        },
    },
});
export const {signUpUser} = authSlice.actions;

// export const selectIsLoggedIn = state => state.userAuth.isLoggedIn;
//export const selectEmail = state => state.userAuth.email;
// export const selectUserName = state => state.userAuth.name;
// export const selectUserPhoneNo = state => state.userAuth.phoneNo;
// export const selectUserPassword = state => state.userAuth.password;

export default authSlice.reducer;
