import {Card} from 'flowbite-react';
import {LuTrendingUp, LuCreditCard, LuWallet} from 'react-icons/lu';

function DashDashboardContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center md:justify-items-stretch">
      <Card className="w-full max-w-sm">
        {/* icon for income */}
        <div className="flex items-center justify-center p-4">
          <LuTrendingUp className="w-12 h-12 text-green-500" />
        </div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Total Income
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
          $10,000.00
        </p>
      </Card>
      <Card className="w-full max-w-sm">
        <div className="flex items-center justify-center p-4">
          <LuCreditCard className="w-12 h-12 text-red-500" />
        </div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Total Expenses
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
          $5,000.00
        </p>
      </Card>
      <Card className="w-full max-w-sm">
        <div className="flex items-center justify-center p-4">
          <LuWallet className="w-12 h-12 text-green-500" />
        </div>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Balance
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
          $5,000.00
        </p>
      </Card>
    </div>
  )
}

export default DashDashboardContent