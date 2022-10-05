import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {verify} from './verificationSlice';
import firestore from '@react-native-firebase/firestore';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../Constant/Firebase';
import Toast from 'react-native-toast-message';

interface Initial {
    Email: string;
    IsLoading: boolean;
}

const initialState: Initial = {
    Email: '',
    IsLoading: false,
};

const reauthenticate: any = createAsyncThunk('ReAuthenticate', async body => {
    console.log('ReAuthenticate', body);
    var user: any = firebase.auth().currentUser;
    console.log('reauthenticate function call', user?.email);
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email,
        body.currentPassword,
    );
    console.log('cred ?? ', cred);
    return user.reauthenticateWithCredential(cred);
});

export const passwordChange: any = createAsyncThunk(
    'PasswordChange',
    async body => {
        console.log('PasswordChange', body);
        reauthenticate()
            .then(() => {
                var user: any = firebase.auth().currentUser;
                user.updatePassword(body.newPassword)
                    .then(() => {
                        Alert.alert('Password was changed');
                        //navigation.navigate('Home');
                    })
                    .catch((error: any) => {
                        console.log(error.message);
                    });
            })
            .catch((error: any) => {
                console.log(error.message);
            });
    },
);

const profileSlice = createSlice({
    name: 'userAuth',
    initialState: initialState,
    reducers: {},
    extraReducers: {},
});

export default profileSlice.reducer;
