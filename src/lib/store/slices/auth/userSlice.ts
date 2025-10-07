import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type UserState = {
    user: string;
};

const user = Cookies.get("user") || "";

const initialState: UserState | null = {
    user,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state) => {
            state.user = "";
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
