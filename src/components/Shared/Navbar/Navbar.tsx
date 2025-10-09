"use client";

import { useAppDispatch } from "@/lib/store/hooks";
import { userLogout } from "@/lib/store/slices/auth/tokenSlice";
import { LogOut } from "lucide-react";

const Navbar = () => {
    const dispatch = useAppDispatch();
    return (
        <div className="bg-gray-900 text-white p-3 mt-0.5 md:rounded-md flex items-center justify-between">
            <div className="text-lg font-semibold tracking-wide">
                Sabbir Mahmud
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => dispatch(userLogout())}
                    className="bg-gray-800 hover:bg-gray-700 hover:cursor-pointer transition-colors p-2 rounded-md"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
