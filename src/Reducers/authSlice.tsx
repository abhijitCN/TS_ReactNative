import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {verify} from './verificationSlice';
import firestore from '@react-native-firebase/firestore';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../Constant/Firebase';

interface Initial {
    email: string;
    isLoading: boolean;
}

const initialState: Initial = {
    email: '',
    isLoading: false,
};

export const signInUser: any = createAsyncThunk('SignInUser', async body => {
    console.log(' ?? ', body.email, body.password);
    try {
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(body.email, body.password);
        if (user) {
            // console.log('LOG USER EMAIL', user.user?._user?.email);
            // console.log('Login Successfully');
            return user?.user?._user?.email;
        }
    } catch (error) {
        console.log('error', error);
    }
});
export const signUpUser: any = createAsyncThunk('SignUpUser', async body => {
    const myDoc = doc(db, 'User', 'UserData');
    if (body.password && body.email && body.name && body.phoneNo) {
        console.log(
            '??',
            body.email,
            body.password,
            body.name,
            body.phoneNo,
            body.isLoading,
        );
        try {
            const {user} = await firebase
                .auth()
                .createUserWithEmailAndPassword(body.email, body.password);
            console.log('DATA', user.uid);
            if (user?.uid) {
                console.log('user.ID>>>>>', user?.uid);
                firestore()
                    .collection('People')
                    .doc(body.phoneNo)
                    .set({
                        name: body.name,
                        email: body.email,
                        phoneNo: body.phoneNo,
                    })
                    .then(() => {
                        Alert.alert('Register Successfully');
                    });
            }
        } catch (error) {
            console.log('error', error);
        }
    } else {
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
            state.email = action.payload;
            //console.log('STATE', action);
        },
        [signInUser.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
    // },
});
//export const {signUpUser} = authSlice.actions;

export default authSlice.reducer;
