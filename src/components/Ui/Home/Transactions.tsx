import { useGetExpensesQuery } from "@/lib/store/api/slices/expenseSlice";
import { Expense, ExpenseResponse } from "@/types/expense";
import {
    ArrowDownCircle,
    ArrowUpCircle,
    Calendar,
    Tag,
    Wallet,
} from "lucide-react";
import { useState } from "react";

const Transactions = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError } = useGetExpensesQuery({ page }) as {
        data: ExpenseResponse;
        isLoading: boolean;
        isError: boolean;
    };

    const expenses = data?.data?.expenses || [];
    const pagination = data?.data?.pagination || {};
    const totalPages = pagination?.totalPages || 1;

    return (
        <div className="p-6 bg-white rounded-md mt-3 shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                    Recent Transactions
                </h2>
                <button
                    onClick={() => alert("Add Transaction")}
                    className="py-2 px-4 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
                >
                    +
                </button>
            </div>

            {/* States */}
            {isLoading ? (
                <div className="text-center text-gray-500 py-10">
                    Loading...
                </div>
            ) : isError ? (
                <div className="text-center text-red-500 py-10">
                    Failed to load transactions.
                </div>
            ) : expenses.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No transactions found.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="min-w-full table-auto text-sm text-gray-700">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs border-b border-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left w-28">
                                    Date
                                </th>
                                <th className="py-3 px-4 text-left w-48">
                                    Details
                                </th>
                                <th className="py-3 px-4 text-left w-24">
                                    Amount
                                </th>
                                <th className="py-3 px-4 text-left w-32">
                                    Type
                                </th>
                                <th className="py-3 px-4 text-left w-32">
                                    From
                                </th>
                                <th className="py-3 px-4 text-left w-32">
                                    Category
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {expenses.map((tx: Expense) => {
                                const isExpense = tx.type === "expense";
                                const category =
                                    tx.category?.name || "Uncategorized";
                                const date = tx.createdAt
                                    ? new Date(
                                          tx.createdAt
                                      ).toLocaleDateString()
                                    : "-";

                                return (
                                    <tr
                                        key={tx._id}
                                        className="hover:bg-gray-50 transition duration-150"
                                    >
                                        {/* Date */}
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {date}
                                            </span>
                                        </td>

                                        {/* Details */}
                                        <td className="py-3 px-4 truncate max-w-[180px]">
                                            {tx.details || "No details"}
                                        </td>

                                        {/* Amount */}
                                        <td
                                            className={`py-3 px-4 font-semibold whitespace-nowrap ${
                                                isExpense
                                                    ? "text-red-500"
                                                    : "text-green-600"
                                            }`}
                                        >
                                            {isExpense ? "-" : "+"}${tx.amount}
                                        </td>

                                        {/* Type */}
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="flex items-center gap-2 capitalize">
                                                {isExpense ? (
                                                    <ArrowDownCircle className="w-4 h-4 text-red-500" />
                                                ) : (
                                                    <ArrowUpCircle className="w-4 h-4 text-green-500" />
                                                )}
                                                {tx.type}
                                            </span>
                                        </td>

                                        {/* From */}
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="flex items-center gap-2">
                                                <Wallet className="w-4 h-4 text-gray-400" />
                                                {tx.from || "N/A"}
                                            </span>
                                        </td>

                                        {/* Category */}
                                        <td className="py-3 px-4 whitespace-nowrap">
                                            <span className="flex items-center gap-2">
                                                <Tag className="w-4 h-4 text-gray-400" />
                                                {category}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {expenses.length > 0 && (
                <div className="flex justify-end mt-6 space-x-2">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="px-3 py-1 text-sm text-gray-600">
                        Page {pagination?.currentPage ?? page} of {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={page === totalPages}
                        className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Transactions;
