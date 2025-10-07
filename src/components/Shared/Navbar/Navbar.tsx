"use client";

import { ChevronDown, Plus } from "lucide-react";

const Navbar = () => {
    return (
        <div className="bg-gray-900 text-white p-3 mt-0.5 md:rounded-md flex items-center justify-between">
            <div className="text-lg font-semibold tracking-wide">
                Sabbir Mahmud
            </div>

            <div className="flex items-center gap-3">
                <div className="relative">
                    <select
                        className="appearance-none bg-gray-800 text-white text-sm px-3 py-1.5 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 cursor-pointer"
                        defaultValue="October 2025"
                    >
                        <option>January 2025</option>
                        <option>February 2025</option>
                        <option>March 2025</option>
                        <option>April 2025</option>
                        <option>May 2025</option>
                        <option>June 2025</option>
                        <option>July 2025</option>
                        <option>August 2025</option>
                        <option>September 2025</option>
                        <option>October 2025</option>
                        <option>November 2025</option>
                        <option>December 2025</option>
                    </select>

                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <button className="bg-gray-800 hover:bg-gray-700 transition-colors p-2 rounded-full">
                    <Plus className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;
