import { Loader2 } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-32">
            <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
        </div>
    );
};

export default Loading;
