"use client";

import { useGetAnalyticsQuery } from "@/lib/store/api/slices/expenseSlice";
import { AnalyticsResponse, GraphData, PieData } from "@/types/expense";
import { useEffect, useState } from "react";
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const Charts = () => {
    const [lineData, setLineData] = useState<GraphData[]>([]);
    const [pieData, setPieData] = useState<PieData[]>([]);
    const { data: analytics } = useGetAnalyticsQuery() as {
        data: AnalyticsResponse;
        isLoading: boolean;
        isFetching: boolean;
    };

    useEffect(() => {
        if (analytics?.data?.graph) {
            setLineData(analytics?.data?.graph);
        }
    }, [analytics]);

    useEffect(() => {
        if (analytics?.data?.pie) {
            setPieData(analytics?.data?.pie);
        }
    }, [analytics]);

    const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

    return (
        <div className="bg-gray-50 text-gray-900 rounded-md py-5 px-3 mt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full h-72 bg-white rounded-xl p-4 shadow-md">
                <h2 className="text-lg font-semibold mb-3">Monthly Overview</h2>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#ffff",
                                border: "none",
                            }}
                            labelStyle={{ color: "#fff" }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="earn"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="saving"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="w-full h-72 bg-white rounded-xl p-4 shadow-md flex flex-col">
                <h2 className="text-lg font-semibold mb-3">
                    October 2025 — Top 5 Expense Categories
                </h2>

                <div className="flex flex-1 items-center justify-between gap-4">
                    <div className="w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={
                                        pieData as unknown as {
                                            [key: string]: number;
                                        }[]
                                    }
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={80}
                                    innerRadius={40}
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        border: "none",
                                    }}
                                    labelStyle={{ color: "#fff" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category List */}
                    <div className="w-1/2 h-full flex flex-col justify-center space-y-2 hover:cursor-pointer">
                        {pieData.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-1.5"
                            >
                                <span className="flex items-center gap-2 text-sm">
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor:
                                                COLORS[index % COLORS.length],
                                        }}
                                    ></span>
                                    {item.name}
                                </span>
                                <span className="text-sm font-medium">
                                    ${item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
