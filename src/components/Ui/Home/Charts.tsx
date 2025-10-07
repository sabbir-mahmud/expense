"use client";

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
    // Dummy monthly data
    const lineData = [
        { month: "Jan", expense: 1200, earn: 2500, saving: 1300 },
        { month: "Feb", expense: 1500, earn: 2700, saving: 1200 },
        { month: "Mar", expense: 900, earn: 2400, saving: 1500 },
        { month: "Apr", expense: 1700, earn: 2800, saving: 1100 },
        { month: "May", expense: 1400, earn: 2600, saving: 1200 },
        { month: "Jun", expense: 1800, earn: 3000, saving: 1200 },
        { month: "Jul", expense: 1300, earn: 2600, saving: 1300 },
        { month: "Aug", expense: 1900, earn: 3100, saving: 1200 },
        { month: "Sep", expense: 1600, earn: 2900, saving: 1300 },
        { month: "Oct", expense: 1500, earn: 2800, saving: 1300 },
    ];

    // Dummy pie chart data for top 10 categories
    const allPieData = [
        { name: "Food", value: 400 },
        { name: "Transport", value: 300 },
        { name: "Shopping", value: 250 },
        { name: "Bills", value: 200 },
        { name: "Health", value: 180 },
        { name: "Education", value: 160 },
        { name: "Entertainment", value: 150 },
        { name: "Travel", value: 130 },
        { name: "Gadgets", value: 120 },
        { name: "Others", value: 100 },
    ];

    const pieData = allPieData.slice(0, 5);

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
                                    data={pieData}
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
