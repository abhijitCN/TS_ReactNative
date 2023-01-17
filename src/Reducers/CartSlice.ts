import { createSlice } from '@reduxjs/toolkit';

interface CartValue {
        ImageUrl: string;
        category: string;
        docId: string;
        name: string;
        price: string;
        quantity: number;

}

const initialState: CartValue[] = []

const myCartSlice = createSlice({
    name: 'addProduct',
    initialState: initialState,
    reducers: {
        addCartProduct(state, action) {
            let myIndex:number = -1;
            state.map((item, index) => {
                if (item.docId == action.payload.docId) {
                    myIndex = index;
                }
            });
            if (myIndex == -1) {
                state.push({
                    ImageUrl: action.payload.ImageUrl,
                    category: action.payload.category,
                    docId: action.payload.docId,
                    name: action.payload.name,
                    price: action.payload.price,
                    quantity: action.payload.quantity + 1,
                });
            } else {
                state[myIndex].quantity = state[myIndex].quantity + 1;
            }
            //state.push(action.payload);
        },
        decrementQuantity(state,action){
            let myIndex :number = -1;
            state.map((item, index) => {
                if (item.docId == action.payload.docId) {
                    myIndex = index;
                }
            });
            if (myIndex == -1) {
            } else {
                state[myIndex].quantity = state[myIndex].quantity - 1;
            }
        },
        deleteMyCartItem(state,action){
           return (state = state.filter((item) => item.docId !== action.payload));
        },
        increaseQuantityInProductDetails(state,action){
            let myIndex :number = -1;
            state.map((item, index) => {
                if (item.docId == action.payload) {
                    myIndex = index;
                }
            });
            if (myIndex == -1) {
            } else {
                state[myIndex].quantity = state[myIndex].quantity +  1;
            } 
        }
    },
});

export const { addCartProduct,decrementQuantity,deleteMyCartItem,increaseQuantityInProductDetails } = myCartSlice.actions;
export default myCartSlice.reducer;
