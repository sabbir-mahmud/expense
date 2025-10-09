import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type AuthState = {
    token: string;
};

const token = Cookies.get("token") || "";

const initialState: AuthState | null = {
    token,
};

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            Cookies.set("token", action.payload, { expires: 30 });
            state.token = action.payload;
        },
        userLogout: (state) => {
            Cookies.remove("token");
            state.token = "";
        },
    },
});

export const { userLogin, userLogout } = tokenSlice.actions;
export default tokenSlice.reducer;
