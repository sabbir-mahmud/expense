import Loading from "@/components/Shared/Loading/Loading";
import { useGetOverviewQuery } from "@/lib/store/api/slices/expenseSlice";
import {
    BanknoteArrowDown,
    BanknoteArrowUp,
    WalletMinimal,
} from "lucide-react";
import Card from "./Card";

const Overview = () => {
    const { data: overview, isLoading } = useGetOverviewQuery();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col md:flex-row gap-0 md:gap-3 mt-1 justify-between items-center hover:cursor-pointer">
            <Card
                Icon={WalletMinimal}
                title={"Balance"}
                value={overview?.data?.balance}
            />
            <Card
                Icon={BanknoteArrowUp}
                title={"Savings"}
                value={overview?.data?.saving}
            />
            <Card
                Icon={BanknoteArrowDown}
                title={"Expense"}
                value={overview?.data?.thisMonthExpense}
            />
        </div>
    );
};

export default Overview;
