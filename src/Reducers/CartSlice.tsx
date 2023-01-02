import {createSlice} from '@reduxjs/toolkit';

interface Initial {
    arr: {
        name: string;
        price: string;
        category: string;
    }[];
}

const initialState: Initial = {
    arr: [
        {
            name: '',
            price: '',
            category: '',
        },
    ],
};

const myCartSlice = createSlice({
    name: 'addProduct',
    initialState: initialState,
    reducers: {
        addCartProduct(state, action) {
            state.arr.push(action.payload);
        },
    },
});

export const {addCartProduct} = myCartSlice.actions;
export default myCartSlice.reducer;
