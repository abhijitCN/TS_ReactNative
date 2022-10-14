import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../Constant/Firebase';
import Toast from 'react-native-toast-message';
import storage from '@react-native-firebase/storage';
import {useState} from 'react';

interface Initial {
    email: string;
    isLoading: boolean;
    globalLoading: boolean;
}

const initialState: Initial = {
    email: '',
    isLoading: false,
    globalLoading: false,
};

export const signInUser: any = createAsyncThunk(
    'SignInUser',
    async (body: any) => {
        console.log(' ?? ', body.email, body.password);
        if (body.email === '' && body.password === '') {
            Alert.alert('Fill All Fields');
        } else if (body.email === '' || body.password === '') {
            Alert.alert('Fill All Fields');
        } else {
            try {
                const user: any = await firebase
                    .auth()
                    .signInWithEmailAndPassword(body.email, body.password);
                if (user?.user) {
                    Toast.show({
                        type: 'success',
                        text1: 'Logout Successfully',
                        position: 'top',
                    });
                    return user?.user?._user?.email;
                }
            } catch (error) {
                console.log('error', error);
                Alert.alert('Enter Valid Credential');
            }
        }
    },
);

export const signUpUser: any = createAsyncThunk(
    'SignUpUser',
    async (body: any) => {
        //const [image, setImage] = useState('');
        const myDoc = doc(db, 'User', 'UserData');
        console.log('BODY >> ', body);
        const uploadTask = storage()
            .ref()
            .child(`/userprofile/${Date.now()}`)
            .putFile(body.imageUrl);
        uploadTask.on(
            'state_changed',
            snapshot => {
                var progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress == 100) console.log('Image Uploaded Successfully');
            },
            error => {
                console.log('error uploading image');
            },
            () => {
                uploadTask.snapshot?.ref.getDownloadURL().then(downloadURL => {
                    //console.log('DOWNLOADED IMAGE  ?? ', downloadURL);
                    console.log('downloadURL in REG >> ', downloadURL);
                    //const DUrl = downloadURL
                    //setImage(downloadURL);
                });
            },
        );
        if (
            body.password &&
            body.email &&
            body.name &&
            body.phoneNo &&
            body.imageUrl
        ) {
            try {
                const {user} = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(body.email, body.password);
                console.log('DATA', user.uid);
                if (user?.uid) {
                    firestore()
                        .collection('People')
                        .doc(body.phoneNo)
                        .set({
                            name: body.name,
                            email: body.email,
                            phoneNo: body.phoneNo,
                            ImageUrl: body.imageUrl,
                        })
                        .then(() => {
                            //navigation.navigate('Profile');
                            Alert.alert('Register Successfully Please Login');
                        });
                }
            } catch (error) {
                console.log('error', error);
            }
        } else {
        }
    },
);

export const signOut: any = createAsyncThunk('SignOut', body => {
    try {
        //await AsyncStorage.removeItem('userToken');
        Toast.show({
            type: 'success',
            text1: 'Logout Successfully',
            position: 'top',
        });
        console.log('Logout');
    } catch (error) {
        console.log('Logout error');
    }
});

const authSlice = createSlice({
    name: 'userAuth',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        //SignIn
        [signInUser.pending]: (state, action) => {
            state.isLoading = false;
            state.globalLoading = true;
        },
        [signInUser.fulfilled]: (state, action) => {
            state.globalLoading = false;
            state.email = action.payload;
            //state.isLoading = true;
            //return state;
            AsyncStorage.setItem(
                'Token',
                JSON.stringify((state.isLoading = true)),
            );
        },
        //signUp
        [signUpUser.pending]: (state, action) => {
            state.globalLoading = true;
        },
        [signUpUser.fulfilled]: (state, action) => {
            state.globalLoading = false;
        },
        [signUpUser.rejected]: (state, action) => {
            state.isLoading = false;
        },
        //SignOut
        [signOut.pending]: (state, action) => {
            state.globalLoading = true;
        },
        [signOut.fulfilled]: (state, action) => {
            state.globalLoading = false;
            state.isLoading = false;
            AsyncStorage.removeItem('Token');
        },
        [signOut.rejected]: (state, action) => {
            state.globalLoading = false;
        },
    },
});

export default authSlice.reducer;
