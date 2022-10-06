import {createSlice} from '@reduxjs/toolkit';

export const toggleSpinnerSlice = createSlice({
    name: 'spinnerSlice',
    initialState: {
        show: false,
        //disableGlobal: false,
    },
    reducers: {
        toggleSpinner(state, action) {
            state.show = action.payload;
            return state;
        },
        // toggleGlobalSpinner(state) {
        //   state.disableGlobal = !state.disableGlobal;
        // },
    },
});

export const {toggleSpinner} = toggleSpinnerSlice.actions;

export default toggleSpinnerSlice.reducer;
