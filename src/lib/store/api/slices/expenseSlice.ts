import { ExpenseResponse } from "@/types/expense";
import { OverviewResponse } from "@/types/overview";
import { apiSlice } from "../apiSlice";

const expenseSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOverview: builder.query<OverviewResponse, void>({
            query: () => ({
                url: "api/v1/expense/overview",
                method: "GET",
            }),
            providesTags: ["expense"],
        }),
        getExpenses: builder.query<ExpenseResponse, { page: number }>({
            query: ({ page }) => ({
                url: `api/v1/expense?page=${page}`,
                method: "GET",
            }),
            providesTags: ["expense"],
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `api/v1/expense/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["expense"],
        }),
    }),
});

export const {
    useGetOverviewQuery,
    useGetExpensesQuery,
    useDeleteExpenseMutation,
} = expenseSlice;
