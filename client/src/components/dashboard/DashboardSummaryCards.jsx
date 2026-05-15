import { Card } from "flowbite-react";
import { LuTrendingUp, LuCreditCard, LuWallet } from "react-icons/lu";

function DashboardSummaryCards({ summary }) {
    return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center md:justify-items-stretch">
        
        {/* Balance Card */}
        <Card className="w-full max-w-sm">
        <div className="flex items-center justify-center p-4">
            <LuWallet className="w-12 h-12 text-green-500" />
        </div>

        <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Balance
        </h5>

        <p className="text-center text-gray-700 dark:text-gray-400">
            ETB {summary.balance || 0}
        </p>
        </Card>
        
        {/* Expense Card */}
        <Card className="w-full max-w-sm">
        <div className="flex items-center justify-center p-4">
            <LuCreditCard className="w-12 h-12 text-red-500" />
        </div>

        <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Total Expenses
        </h5>

        <p className="text-center text-gray-700 dark:text-gray-400">
            ETB {summary.totalExpense || 0}
        </p>
        </Card>

        {/* Income Card */}
        <Card className="w-full max-w-sm">
        <div className="flex items-center justify-center p-4">
            <LuTrendingUp className="w-12 h-12 text-green-500" />
        </div>

        <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Total Income
        </h5>

        <p className="text-center text-gray-700 dark:text-gray-400">
            ETB {summary.totalIncome || 0}
        </p>
        </Card>
    </div>
    );
    }

export default DashboardSummaryCards;