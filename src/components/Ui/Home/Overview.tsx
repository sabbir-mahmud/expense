import { useGetOverviewQuery } from "@/lib/store/api/slices/expenseSlice";
import {
    BanknoteArrowDown,
    BanknoteArrowUp,
    WalletMinimal,
} from "lucide-react";

const Overview = () => {
    const { data: overview, isLoading } = useGetOverviewQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex gap-3 mt-1 justify-between items-center hover:cursor-pointer">
            <div className="p-4 w-full bg-white border border-gray-200 rounded-md flex items-center">
                <WalletMinimal className="mr-2" />
                Balance: {overview?.data?.balance}
            </div>
            <div className="p-4 w-full bg-white border border-gray-200 rounded-md flex items-center">
                <BanknoteArrowUp className="mr-2" />
                Savings: {overview?.data?.saving}
            </div>
            <div className="p-4 w-full bg-white border border-gray-200 rounded-md flex items-center">
                <BanknoteArrowDown className="mr-2" />
                Expense: {overview?.data?.thisMonthExpense}
            </div>
        </div>
    );
};

export default Overview;
