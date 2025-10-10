import { apiSlice } from "../apiSlice";

const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "api/v1/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "api/v1/auth/register",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authSlice;
