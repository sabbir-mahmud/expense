import { apiSlice } from "../apiSlice";

const expenseSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOverview: builder.query({
            query: () => ({
                url: "api/v1/expense/overview",
                method: "GET",
            }),
            providesTags: ["expense"],
        }),
    }),
});

export const { useGetOverviewQuery } = expenseSlice;
