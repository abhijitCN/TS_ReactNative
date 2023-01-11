import {createSlice} from '@reduxjs/toolkit';

interface CartValue {
    arr: {
        ImageUrl: string;
        category: string;
        docId: string;
        name: string;
        price: string;
        quantity: any;
    }[];
}

const initialState: CartValue = {
    arr: [],
};

const myCartSlice = createSlice({
    name: 'addProduct',
    initialState: initialState,
    reducers: {
        addCartProduct(state, action) {
            // let myIndex: any = -1;
            // state.map((item: any, index: any) => {
            //     if (item.docId == action.payload.docId) {
            //         myIndex = index;
            //     }
            // });
            // if (myIndex == -1) {
            //     state.arr.push({
            //         ImageUrl: action.payload.ImageUrl,
            //         category: action.payload.category,
            //         docId: action.payload.docId,
            //         name: action.payload.name,
            //         price: action.payload.price,
            //         quantity: action.payload.quantity + 1,
            //     });
            // } else {
            //     state[myIndex].quantity = state[myIndex].quantity + 1;
            // }
            state.arr.push(action.payload);
        },
    },
});

export const {addCartProduct} = myCartSlice.actions;
export default myCartSlice.reducer;
