import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState: {
        status: "checking", // "authenticated", "not-authenticated",
        user: {},
        errorMessage: null,

    },
    reducers: {
        onChecking: (state) => {
            state.status  = "checking";
            state.user = {};
            state.errorMessage = null; 
        },
        onLogin: (state, { payload }) => {
            state.status = "authenticated";
            state.user = payload;
            state.errorMessage = null;
        },
        onLogout: (state, { payload = null }) => {
            state.status = "not-authenticated";
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        }
    }
});


//Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions