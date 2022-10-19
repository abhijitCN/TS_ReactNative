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
    isLoading: boolean;
}

const initialState: Initial = {
    isLoading: false,
};

export const addProduct: any = createAsyncThunk(
    'AddProduct',
    async (body: any) => {
        // //const [image, setImage] = useState('');
        console.log('BODY >> ', body);
        console.log('BODY 2>> ', body.categoryName);
        const uploadTask = storage()
            .ref()
            .child(`/ProductImage/${Date.now()}`)
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
            //data.category &&
            body.price &&
            body.name &&
            body.quantity &&
            body.imageUrl
        ) {
            try {
                console.log('call storage');
                //const docId = firestore().doc('AllProducts').id;
                //console.log('**Doc Id is- **', docId);
                firestore()
                    .collection('AllProducts')
                    .doc(body.name)
                    .set({
                        name: body.name,
                        price: body.price,
                        quantity: body.quantity,
                        ImageUrl: body.imageUrl,
                        category: body.categoryName,
                        docId: body.name,
                    })
                    .then(() => {
                        //navigation.navigate('Profile');
                        Alert.alert('Product Added Successfully');
                    });
            } catch (error) {
                console.log('error', error);
            }
        } else {
        }
    },
);

const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        //Add Product
        [addProduct.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addProduct.fulfilled]: (state, action) => {
            state.isLoading = false;
        },
        [addProduct.rejected]: (state, action) => {
            //state.isLoading = false;
        },
    },
});

export default productSlice.reducer;
