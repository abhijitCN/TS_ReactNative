import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {verify} from './verificationSlice';
interface Initial {
    email: string;
    isLoading: boolean;
}

const initialState: Initial = {
    email: '',
    isLoading: false,
};

export const signInUser: any = createAsyncThunk('SignInUser', async body => {
    //const dispatch = useDispatch();
    console.log(' ?? ', body.email, body.password);
    try {
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(body.email, body.password);
        if (user?.user) {
            //dispatch(signUpUser({email: user.user.providerData[0].email}));
            console.log('LOG USER EMAIL', user.user?._user?.email);
            console.log('Login Successfully');
            return user?.user?._user?.email;
            //dispatch(verify(true));
        }
    } catch (error) {
        console.log('error', error);
        //dispatch(verify(false));
    }
});

const authSlice = createSlice({
    name: 'userAuth',
    initialState: initialState,
    reducers: {
        // signUpUser: (state, action) => {
        //     console.log('STATE', state.email);
        //     state.email = action.payload.email;
        //     state.isLoading = action.payload.isLoading;
        //     return state;
        // },
    },
    extraReducers: {
        [signInUser.pending]: (state, action) => {
            state.isLoading = true;
        },
        [signInUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.email = action.payload.email;
            //console.log('STATE', state.email);
            return state;
        },
        [signInUser.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
    // },
});
//export const {signUpUser} = authSlice.actions;

export default authSlice.reducer;
