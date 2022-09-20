import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    logUser: false,
};

const verificationSlice = createSlice({
    name: 'verification',
    initialState: initialState,
    reducers: {
        verify: (state, action) => {
            state.logUser = action.payload;
            return state;
        },
    },
});
export const {verify} = verificationSlice.actions;

export default verificationSlice.reducer;
