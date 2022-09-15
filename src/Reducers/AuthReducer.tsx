import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const initialState = {
    token: null,
    loading: false,
    error: '',
};
interface ISignIn {
    email: string;
    password: string;
}

export const signinUser = createAsyncThunk(
    'signupuser',
    async (data: ISignIn) => {
        //const result =  await fetch2('/signup',body)...
        try {
            const user = await firebase
                .auth()
                .signInWithEmailAndPassword(data.email, data.password);
            if (user) {
                console.log('>>>>>', JSON.stringify(user));
            }
        } catch (error) {
            console.log('error', error);
        }
        return;
        //result
    },
);

export const signupUser = createAsyncThunk('signinuser', async body => {
    const result = await fetch2('/signin', body);
    return result;
});
export const addToken = createAsyncThunk('addtoken', async () => {
    const result = await AsyncStorage.getItem('token');
    return result;
});

const AuthReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.token = null;
            AsyncStorage.removeItem('token');
        },
    },
    extraReducers: {
        [signupUser.fulfilled]: (state, {payload: {error, message}}) => {
            state.loading = false;
            if (error) {
                state.error = error;
                Alert.alert(error);
            } else {
                state.error = message;
                Alert.alert(message);
            }
        },
        [addToken.fulfilled]: (state, action) => {
            state.token = action.payload;
        },
        [signupUser.pending]: (state, action) => {
            state.loading = true;
        },
        [signinUser.pending]: (state, action) => {
            state.loading = true;
        },
        [signinUser.fulfilled]: (state, {payload: {error, token}}) => {
            state.loading = false;
            if (error) {
                state.error = error;
                alert(error);
            } else {
                state.token = token;
                AsyncStorage.setItem('token', token);
            }
        },
    },
});

export const {logout} = AuthReducer.actions;
export default AuthReducer.reducer;
