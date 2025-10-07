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
    }),
});

export const { useLoginMutation } = authSlice;
