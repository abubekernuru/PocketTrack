import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
        reducers: {
        signInStart: (state) => {
            state.loading=true,
            state.error=false
        },
        signInSuccess: (state, action) => {
            state.loading=false,
            state.currentUser=action.payload,
            state.error=false
        },
        signInFailure: (state, action) => {
            state.loading=false,
            state.error=action.payload
        },
        updateUserStart: (state)=> {
            state.loading= true
        },
        updateSuccess: (state, action) => {
            state.loading=false,
            state.currentUser=action.payload,
            state.error=false
        },
        updateFailure: (state, action) => {
            state.loading= false,
            state.error= action.payload
        },
        logoutSuccess: (state, action)=>{
            state.currentUser= null,
            state.loading=false,
            state.error=false
        }
    },
});

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateSuccess, updateFailure, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;