import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';

interface Initial {
    email: string;
}

const initialState: Initial = {
    // name: null,
    // phoneNo: null,
    email: '',
    // password: null,
};

const authSlice = createSlice({
    name: 'userAuth',
    initialState: initialState,
    reducers: {
        signUpUser: (state, action) => {
            // state.name = action.payload.name;
            // state.phoneNo = action.payload.phoneNo;
            state.email = action.payload.email;
            // state.password = action.payload.password;
            return state;
        },
    },
});
export const {signUpUser} = authSlice.actions;

export default authSlice.reducer;
