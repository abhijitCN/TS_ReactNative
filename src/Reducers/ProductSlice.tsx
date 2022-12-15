import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../Constant/Firebase';
import storage from '@react-native-firebase/storage';
import {useState} from 'react';
import {getDatabase, ref, set} from 'firebase/database';

interface Initial {
    isLoading: boolean;
}

const initialState: Initial = {
    isLoading: false,
};

export const addProductImage: any = createAsyncThunk(
    'ProductImage',
    async (body: any, thunkAPI) => {
        console.log('BODY addProductImage>> ', body);
        try {
            let url = '';
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
                    if (progress == 100)
                        console.log('Image Uploaded Successfully');
                },
                error => {
                    console.log('error uploading image', error);
                },
                () => {
                    uploadTask.snapshot?.ref
                        .getDownloadURL()
                        .then(downloadURL => {
                            console.log(
                                'Product downloadURL in RES >> ',
                                downloadURL,
                            );
                            url = 'downloadURL';
                            //const ProdDownUrl = downloadURL;
                            // return downloadURL;
                        });
                },
            );
            return thunkAPI.dispatch(addProduct(url));
        } catch (error) {
            throw Error('error on addProductImage');
        }
    },
);

export const addProduct: any = createAsyncThunk(
    'AddProduct',
    async (body: any, url) => {
        // //const [image, setImage] = useState('');
        console.log('BODY addProduct>> ', body);
        console.log('BODY categoryName>> ', body.categoryName);
        console.log(' ProdDownUrl >> ', url);
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
                    firestore()
                        .collection('AllProducts')
                        .add({EMAIL: downloadURL})
                        .then(doc => {
                            firestore()
                                .collection('AllProducts')
                                .doc(doc.id)
                                .set({
                                    name: body.name,
                                    price: body.price,
                                    quantity: body.quantity,
                                    ImageUrl: downloadURL,
                                    category: body.categoryName,
                                    docId: doc.id,
                                });
                        })
                        .catch(error => {
                            console.log('error', error);
                        });
                });
            },
        );
        // if (
        //     //data.category &&
        //     body.price &&
        //     body.name &&
        //     body.quantity &&
        //     body.imageUrl
        // ) {
        // try {
        //     console.log('call storage');
        //     firestore().collection('AllProducts').doc(body.name).set({
        //         name: body.name,
        //         price: body.price,
        //         quantity: body.quantity,
        //         ImageUrl: body.imageUrl,
        //         category: body.categoryName,
        //         docId: body.name,
        //     });
        // } catch (error) {
        //     console.log('error', error);
        // }
        // } else {
        // }
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
