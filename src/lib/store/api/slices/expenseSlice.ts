import {
    AnalyticsResponse,
    CategoryResponse,
    ExpenseResponse,
} from "@/types/expense";
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
        getCategories: builder.query<CategoryResponse, void>({
            query: () => ({
                url: "api/v1/expense/categories",
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
        createExpense: builder.mutation({
            query: (data) => ({
                url: "api/v1/expense",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["expense"],
        }),
        updateExpense: builder.mutation({
            query: ({ id, data }) => ({
                url: `api/v1/expense/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["expense"],
        }),
        deleteExpense: builder.mutation({
            query: (id) => ({
                url: `api/v1/expense/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["expense"],
        }),
        getAnalytics: builder.query<AnalyticsResponse, void>({
            query: () => ({
                url: "api/v1/analytics/graphs",
                method: "GET",
            }),
            providesTags: ["expense"],
        }),
    }),
});

export const {
    useGetOverviewQuery,
    useGetCategoriesQuery,
    useGetExpensesQuery,
    useCreateExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
    useGetAnalyticsQuery,
} = expenseSlice;
