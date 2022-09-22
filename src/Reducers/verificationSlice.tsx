import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Initial {
    logUser: boolean;
}

const initialState: Initial = {
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
