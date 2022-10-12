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
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

interface Initial {
    Email: string;
    //IsLoading: boolean;
    Image: string;
}

const initialState: Initial = {
    Email: '',
    //IsLoading: false,
    Image: '',
};

export const PickImageAndUpload: any = createAsyncThunk(
    'PickImageAndUpload',
    async () => {
        //const [image, setImage] = useState('');
        console.log('pick Image And Upload');
        launchImageLibrary({quality: 0.5}, (fileobj: any) => {
            const uploadTask = storage()
                .ref()
                .child(`/userprofile/${Date.now()}`)
                .putFile(fileobj.assets[0].uri);
            uploadTask.on(
                'state_changed',
                snapshot => {
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100)
                        console.log('Image Uploaded Successfully');
                },
                error => {
                    console.log('error uploading image');
                },
                () => {
                    uploadTask.snapshot?.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                            console.log('DOWNLOADED IMAGE  ?? ', downloadURL);
                            //setImage(downloadURL);
                            return downloadURL;
                        });
                },
            );
            //return image;
        });
    },
);

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
    reducers: {
        profileImage: (state, action) => {
            state.Image = action.payload;
            console.log('state.Image ?? ', state.Image);
            return state;
        },
    },
    extraReducers: {
        [PickImageAndUpload.pending]: (state, action) => {
            <ActivityIndicator color="red" size="large" />;
        },
        [PickImageAndUpload.fulfilled]: (state, action) => {
            state.Image = action.payload;
        },
        [PickImageAndUpload.rejected]: (state, action) => {
            <ActivityIndicator color="red" size="large" />;
        },
    },
});
export const {profileImage} = profileSlice.actions;
export default profileSlice.reducer;
