import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { userLogout } from "../slices/auth/tokenSlice";
import type { RootState } from "../store";

const URL = process.env.NEXT_PUBLIC_API_HOST as string;

const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.token?.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(userLogout());
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["auth", "users", "profile"],
    endpoints: () => ({}),
});
