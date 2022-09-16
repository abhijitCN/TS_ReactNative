import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {};

export const fetchProfile = createAsyncThunk('fetchprofile', async () => {
    //const result =  await fetch3('/gettodos',"get")
    return;
    //result
});
export const updateProfile = createAsyncThunk('updateprofile', async () => {
    //const result =  await fetch3('/gettodos',"get")
    return;
    //result
});

const UserProfileReducer = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: {
        [updateProfile.fulfilled]: (state, {payload: {message}}) => {
            if (message) state.push(message);
        },
        [fetchProfile.fulfilled]: (state, {payload: {message, error}}) => {
            console.log(message, error);
            return message;
        },
    },
});

export default UserProfileReducer.reducer;
