import {Card} from 'flowbite-react';
import { Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

function DashboardCategoryChart({categoryData}) {
    // pie chart colors
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

return (
    <Card className="mt-6">
    <div className="mb-4">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white">
        Spending by Category
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
        Expense breakdown
        </p>
    </div>
    <div className="w-full h-[300px] mt-10">
        <ResponsiveContainer width="100%" height={300}>
        <PieChart>
            <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            >
            {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip formatter={(value) => [`ETB ${value.toLocaleString()}`, ""]}/>
            <Legend />
        </PieChart>
        </ResponsiveContainer>
    </div>
</Card>
)
}

export default DashboardCategoryChart