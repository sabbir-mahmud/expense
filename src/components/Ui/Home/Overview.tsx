"use client";

import { useGetOverviewQuery } from "@/lib/store/api/slices/expenseSlice";
import {
    BanknoteArrowDown,
    BanknoteArrowUp,
    WalletMinimal,
} from "lucide-react";

const Overview = () => {
    const { data: overview, isLoading } = useGetOverviewQuery();

    if (isLoading) {
        return (
            <div className="flex gap-3 mt-2 animate-pulse">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="w-full h-16 bg-gray-200 rounded-md"
                    ></div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 mt-2 justify-between items-stretch cursor-pointer">
            {/* Balance */}
            <div className="flex items-center justify-between w-full bg-gray-900 text-white border border-gray-800 rounded-md p-4 hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2">
                    <WalletMinimal className="text-green-400" />
                    <span className="text-sm font-medium">Balance</span>
                </div>
                <span className="text-lg font-semibold">
                    ${overview?.data?.balance ?? 0}
                </span>
            </div>

            {/* Savings */}
            <div className="flex items-center justify-between w-full bg-gray-900 text-white border border-gray-800 rounded-md p-4 hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2">
                    <BanknoteArrowUp className="text-blue-400" />
                    <span className="text-sm font-medium">Savings</span>
                </div>
                <span className="text-lg font-semibold">
                    ${overview?.data?.saving ?? 0}
                </span>
            </div>

            {/* Expense */}
            <div className="flex items-center justify-between w-full bg-gray-900 text-white border border-gray-800 rounded-md p-4 hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-2">
                    <BanknoteArrowDown className="text-red-400" />
                    <span className="text-sm font-medium">Expense</span>
                </div>
                <span className="text-lg font-semibold">
                    ${overview?.data?.thisMonthExpense ?? 0}
                </span>
            </div>
        </div>
    );
};

export default Overview;
