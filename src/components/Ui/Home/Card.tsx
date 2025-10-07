import { LucideIcon } from "lucide-react";

interface CardProps {
    Icon: LucideIcon;
    title: string;
    value: number | string | undefined;
}

const Card = ({ Icon, title, value }: CardProps) => (
    <div className="p-4 w-full bg-white border border-gray-200 md:rounded-md flex items-center justify-between">
        <span className="flex items-center gap-2">
            <Icon className="text-gray-700" />
            {title}:
        </span>
        <span className="font-semibold">{value}</span>
    </div>
);

export default Card;
