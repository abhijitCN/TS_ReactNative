import {createSlice} from '@reduxjs/toolkit';

export const toggleSpinnerSlice = createSlice({
    name: 'spinnerSlice',
    initialState: {
        show: false,
    },
    reducers: {
        toggleSpinner(state, action) {
            state.show = action.payload;
            console.log('action.payload', action.payload);
            return state;
        },
    },
});

export const {toggleSpinner} = toggleSpinnerSlice.actions;

export default toggleSpinnerSlice.reducer;
