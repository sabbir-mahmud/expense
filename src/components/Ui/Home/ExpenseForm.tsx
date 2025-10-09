"use client";

import BaseModal from "@/components/Modals/BaseModal";
import {
    useCreateExpenseMutation,
    useGetCategoriesQuery,
} from "@/lib/store/api/slices/expenseSlice";
import { Category } from "@/types/expense";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Message } from "./Transactions";

interface ExpenseFormProps {
    open: boolean;
    onClose: () => void;
    setMessage: React.Dispatch<React.SetStateAction<Message>>;
}

interface ExpenseFormData {
    type: "expense" | "earn" | "saving";
    amount: string;
    category?: string;
    from: string;
    details: string;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
    open,
    onClose,
    setMessage,
}) => {
    const { data: categories, isLoading: categoriesLoading } =
        useGetCategoriesQuery();
    const [initData, setInitData] = useState<ExpenseFormData>({
        type: "expense",
        amount: "",
        category: "",
        from: "balance",
        details: "",
    });

    const [create, { isLoading: isCreating }] = useCreateExpenseMutation();

    const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const handleChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setInitData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (type: "expense" | "earn" | "saving") => {
        setInitData((prev) => ({ ...prev, type }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (initData.type !== "expense") {
            delete initData.category;
        }
        await create(initData);
        setMessage({
            type: "success",
            message: "Transaction added successfully",
        });
        onClose();
    };

    return (
        <BaseModal isOpen={open} onClose={onClose}>
            <div className="p-6 bg-white rounded-md border border-gray-200 shadow-lg w-full md:w-[680px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Add Transaction
                    </h2>
                    <span className="text-xs text-gray-400">
                        Draft saved – {time}
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Type
                            </label>
                            <div className="flex mt-1 bg-gray-100 rounded-lg p-1">
                                {["expense", "earn", "saving"].map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() =>
                                            handleTypeChange(
                                                option as
                                                    | "expense"
                                                    | "earn"
                                                    | "saving"
                                            )
                                        }
                                        className={`flex-1 text-sm py-2 rounded-md transition ${
                                            initData.type === option
                                                ? "bg-white shadow text-gray-900"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {option.charAt(0).toUpperCase() +
                                            option.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <div className="mt-1 relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">
                                    $
                                </span>
                                <input
                                    type="number"
                                    name="amount"
                                    value={initData.amount}
                                    onChange={handleChange}
                                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none text-gray-900"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <select
                                name="category"
                                value={initData.category}
                                onChange={handleChange}
                                disabled={initData.type !== "expense"}
                                className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-gray-500 focus:outline-none text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                                required
                            >
                                <option value="">Select a category</option>
                                {!categoriesLoading &&
                                    categories?.data.categories?.map(
                                        (category: Category) => (
                                            <option
                                                key={category._id}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </option>
                                        )
                                    )}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Payment Via
                            </label>
                            <select
                                name="from"
                                value={initData.from}
                                onChange={handleChange}
                                disabled={initData.type !== "expense"}
                                className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-gray-500 focus:outline-none text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                                required
                            >
                                {["balance", "saving"].map((type, i) => (
                                    <option key={i} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Transactions details
                        </label>
                        <textarea
                            name="details"
                            value={initData.details}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-gray-800 focus:outline-none text-gray-900"
                            rows={2}
                            placeholder="Add details..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={isCreating}
                            type="submit"
                            className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition hover:cursor-pointer"
                        >
                            {isCreating ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </BaseModal>
    );
};

export default ExpenseForm;
