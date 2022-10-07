import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {verify} from './verificationSlice';
import firestore from '@react-native-firebase/firestore';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../Constant/Firebase';
import Toast from 'react-native-toast-message';
import {rootState} from './store';
import {toggleSpinner} from './toggleSpinnerSlice';

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

export const signInUser: any = createAsyncThunk('SignInUser', async body => {
    // const SPINNER: any = useSelector<any>(
    //     (state: rootState) => state.toggleSpinner,
    // );
    // console.log(' <SPINNER> ', SPINNER);
    //const dispatch = useDispatch();

    console.log(' ?? ', body.email, body.password);
    try {
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(body.email, body.password);
        if (user) {
            //dispatch(toggleSpinner(false));
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

export const signOut: any = createAsyncThunk('SignOut', async body => {
    try {
        await AsyncStorage.removeItem('userToken');
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
    reducers: {
        // signUpUser: (state, action) => {
        //     console.log('STATE', state.email);
        //     state.email = action.payload.email;
        //     state.isLoading = action.payload.isLoading;
        //     return state;
        // },
    },
    extraReducers: {
        //SignIn
        [signInUser.pending]: (state, action) => {
            //state.isLoading = true;
            state.globalLoading = true;
            // <ActivityIndicator color="red" size="large" />;
        },
        [signInUser.fulfilled]: (state, action) => {
            //state.globalLoading = true;
            state.email = action.payload;
            AsyncStorage.setItem(
                'userToken',
                JSON.stringify((state.isLoading = true)),
            );
            state.globalLoading = false;
        },
        [signInUser.rejected]: (state, action) => {
            state.globalLoading = false;
        },
        //SignOut
        [signOut.pending]: (state, action) => {
            state.isLoading = true;
        },
        [signOut.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [signOut.rejected]: (state, action) => {
            state.isLoading = true;
        },
    },
    // },
});
//export const {signUpUser} = authSlice.actions;

export default authSlice.reducer;
