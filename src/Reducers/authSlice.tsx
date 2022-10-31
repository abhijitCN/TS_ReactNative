import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../Constant/Firebase';
import storage from '@react-native-firebase/storage';
import {useState} from 'react';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

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
                    return user?.user?._user?.email;
                }
            } catch (error) {
                console.log('error', error);
                Alert.alert('Enter Valid Credential');
            }
        }
    },
);

export const googleSignInUser: any = createAsyncThunk(
    'GoogleSignInUser',
    async (body: any) => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(
                'Google Login User Info email ===> ',
                userInfo.user.email,
            );
            const userEmail = userInfo.user.email;
            return userEmail;
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('operation (e.g. sign in) is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated');
            } else {
                console.log('some other error happened');
            }
        }
    },
);

export const googleSignUpUserAuth: any = createAsyncThunk(
    'GoogleSignUpUserAuth',
    async (body: any, thunkAPI) => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //console.log('User info', userInfo);
            return thunkAPI.dispatch(googleSignUpUserData({}));
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('user cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('operation (e.g. sign in) is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('play services not available or outdated');
            } else {
                console.log('some other error happened');
            }
        }
    },
);

export const googleSignUpUserData: any = createAsyncThunk(
    'GoogleSignUpUserData',
    async (body: any) => {
        try {
            const uploadTask = storage()
                .ref()
                .child(`/userprofile/${Date.now()}`)
                .putFile(body.userInfo.user.photo);
            uploadTask.on(
                'state_changed',
                snapshot => {
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (progress == 100)
                        console.log(
                            'Image Uploaded Successfully for Google sine-up',
                        );
                },
                error => {
                    console.log('error uploading image for Google sine-up');
                },
                () => {
                    uploadTask.snapshot?.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                            firestore()
                                .collection('People')
                                .doc(body.userInfo.user.email)
                                .set({
                                    name: body.userInfo.user.name,
                                    email: body.userInfo.user.email,
                                    ImageUrl: downloadURL,
                                });
                        });
                },
            );
        } catch (error: any) {
            console.log('google Sign Up User Data error happened');
        }
    },
);

export const signUpUser: any = createAsyncThunk(
    'SignUpUser',
    async (body: any) => {
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
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            body.email,
                            body.password,
                        )
                        .then(() => {
                            firestore()
                                .collection('People')
                                .doc(body.phoneNo)
                                .set({
                                    name: body.name,
                                    email: body.email,
                                    phoneNo: body.phoneNo,
                                    ImageUrl: downloadURL,
                                    docId: body.phoneNo,
                                })
                                .then(() => {
                                    // Alert.alert(
                                    //     'Register Successfully Please Login',
                                    // );
                                });
                        });
                });
            },
        );
        // if (
        //     body.password &&
        //     body.email &&
        //     body.name &&
        //     body.phoneNo &&
        //     body.imageUrl
        // ) {
        //     try {
        //         const {user} = await firebase
        //             .auth()
        //             .createUserWithEmailAndPassword(body.email, body.password);
        //         console.log('DATA', user.uid);
        //         if (user?.uid) {
        //             firestore()
        //                 .collection('People')
        //                 .doc(body.phoneNo)
        //                 .set({
        //                     name: body.name,
        //                     email: body.email,
        //                     phoneNo: body.phoneNo,
        //                     ImageUrl: body.imageUrl,
        //                     docId: body.phoneNo,
        //                 })
        //                 .then(() => {
        //                     Alert.alert('Register Successfully Please Login');
        //                 });
        //         }
        //     } catch (error) {
        //         console.log('error', error);
        //     }
        // } else {
        // }
    },
);

export const signOut: any = createAsyncThunk('SignOut', body => {
    try {
        //await AsyncStorage.removeItem('userToken');
        console.log('Logout');
        Alert.alert('Logout Successfully');
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
            ///state.isLoading = false;
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
        [signInUser.rejected]: (state, action) => {
            //state.isLoading = false;
            state.globalLoading = false;
        },
        //GoogleSignIn
        [googleSignInUser.pending]: (state, action) => {
            state.globalLoading = true;
        },
        [googleSignInUser.fulfilled]: (state, action) => {
            state.globalLoading = false;
            state.email = action.payload;
            AsyncStorage.setItem(
                'Token',
                JSON.stringify((state.isLoading = true)),
            );
        },
        [googleSignInUser.rejected]: (state, action) => {
            state.globalLoading = false;
        },
        // GoogleSignUp
        [googleSignUpUserAuth.pending]: (state, action) => {
            state.globalLoading = true;
        },
        [googleSignUpUserAuth.fulfilled]: (state, action) => {
            state.globalLoading = false;
        },
        [googleSignUpUserAuth.rejected]: (state, action) => {
            state.globalLoading = false;
        },
        //signUp
        [signUpUser.pending]: (state, action) => {
            state.globalLoading = true;
        },
        [signUpUser.fulfilled]: (state, action) => {
            state.globalLoading = false;
        },
        [signUpUser.rejected]: (state, action) => {
            state.globalLoading = false;
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
