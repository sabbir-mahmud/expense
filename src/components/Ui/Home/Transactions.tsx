import { useGetExpensesQuery } from "@/lib/store/api/slices/expenseSlice";
import { Expense, ExpenseResponse } from "@/types/expense";
import { useEffect, useState } from "react";
import Transaction from "./Transaction";

export interface Message {
    type: string;
    message: string;
}

const Transactions = () => {
    const [page, setPage] = useState<number>(1);
    const [message, setMessage] = useState<Message>({ type: "", message: "" });
    const { data, isLoading, isError } = useGetExpensesQuery({ page }) as {
        data: ExpenseResponse;
        isLoading: boolean;
        isError: boolean;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage({ type: "", message: "" });
        }, 3000);

        return () => clearTimeout(timer);
    }, [message]);

    const expenses = data?.data?.expenses || [];
    const pagination = data?.data?.pagination || {};
    const totalPages = pagination?.totalPages || 1;

    return (
        <div className="p-6 bg-white rounded-md mt-3 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                    Transactions
                </h2>
                <button
                    onClick={() => alert("Add Transaction")}
                    className="py-2 px-4 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
                >
                    +
                </button>
            </div>

            <div>
                {message.type === "success" && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3">
                        <span className="block sm:inline">
                            {message.message}
                        </span>
                    </div>
                )}
                {message.type === "error" && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
                        <span className="block sm:inline">
                            {message.message}
                        </span>
                    </div>
                )}
            </div>

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
                                <th className="py-3 px-4 text-left w-32">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {expenses.map((tx: Expense) => (
                                <Transaction
                                    key={tx._id}
                                    tx={tx}
                                    setMessage={setMessage}
                                />
                            ))}
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
