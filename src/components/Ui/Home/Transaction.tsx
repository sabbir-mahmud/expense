import ConfirmModal from "@/components/Modals/ConfirmModal";
import { useDeleteExpenseMutation } from "@/lib/store/api/slices/expenseSlice";
import { Expense } from "@/types/expense";
import {
    ArrowDownCircle,
    ArrowUpCircle,
    Calendar,
    FileSliders,
    Tag,
    Trash,
    Wallet,
} from "lucide-react";
import React, { useState } from "react";
import { Message } from "./Transactions";

const Transaction: React.FC<{
    tx: Expense;
    setMessage: React.Dispatch<React.SetStateAction<Message>>;
}> = ({ tx, setMessage }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteExpense, { isLoading: isDeleting }] =
        useDeleteExpenseMutation();
    const isExpense = tx.type === "expense";
    const category = tx.category?.name || "Uncategorized";
    const date = tx.createdAt
        ? new Date(tx.createdAt).toLocaleDateString()
        : "-";

    const handleDelete = async () => {
        await deleteExpense(tx._id);
        setDeleteModal(false);
        setMessage({
            type: "success",
            message: "Transaction deleted successfully",
        });
    };
    return (
        <>
            <tr
                key={tx._id}
                className="hover:bg-gray-50 transition duration-150"
            >
                <td className="py-3 px-4 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {date}
                    </span>
                </td>

                <td className="py-3 px-4 truncate max-w-[180px]">
                    {tx.details || "No details"}
                </td>

                <td
                    className={`py-3 px-4 font-semibold whitespace-nowrap ${
                        isExpense ? "text-red-500" : "text-green-600"
                    }`}
                >
                    {isExpense ? "-" : "+"}${tx.amount}
                </td>

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

                <td className="py-3 px-4 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-gray-400" />
                        {tx.from || "N/A"}
                    </span>
                </td>

                <td className="py-3 px-4 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        {category}
                    </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                    <span className="flex items-center gap-2">
                        <button
                            onClick={() => alert("Add Transaction")}
                            className="py-2 px-4 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
                        >
                            <FileSliders className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setDeleteModal(true)}
                            className="py-2 px-4 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out flex items-center gap-2 hover:cursor-pointer"
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </span>
                </td>
            </tr>

            {deleteModal && (
                <ConfirmModal
                    open={deleteModal}
                    onCancel={() => setDeleteModal(false)}
                    onConfirm={handleDelete}
                    message={`Are you sure you want to delete this ${
                        isExpense ? "expense" : "income"
                    }?`}
                    isLoading={isDeleting}
                />
            )}
        </>
    );
};

export default Transaction;
