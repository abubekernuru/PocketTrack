import { Card } from "flowbite-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

import { useMemo } from "react";

function DashboardOverviewChart({ summary }) {

    const data = useMemo(() => [
    {
        name: "income",
        amount: summary.totalIncome || 0,
    },
    {
        name: "expense",
        amount: summary.totalExpense || 0,
    },
    {
        name: "balance",
        amount: summary.balance || 0,
    },
    ], [summary]);

    const colors = [
    "#22c55e",
    "#ef4444",
    summary.balance >= 0 ? "#22c55e" : "#ef4444",
    ];

    return (
    <Card className="mt-6">

        <div className="mb-4">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">
            Overview
        </h5>

        <p className="text-sm text-gray-500 dark:text-gray-400">
            Income vs Expense vs Balance
        </p>
        </div>

        <div className="w-full h-[300px] mt-10">

        <ResponsiveContainer width="100%" height="100%">

            <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis dataKey="name" tick={{ fontSize: 12 }} />

            <YAxis />

            <Tooltip
                formatter={(value) => [
                `ETB ${value.toLocaleString()}`,
                "",
                ]}
            />

            <Bar
                dataKey="amount"
                radius={[6, 6, 0, 0]}
                isAnimationActive={false}
            >
                {data.map((entry, index) => (
                <Cell key={index} fill={colors[index]} />
                ))}
            </Bar>

            </BarChart>

        </ResponsiveContainer>

        </div>

    </Card>
    );
}

export default DashboardOverviewChart;