import { useEffect, useState } from 'react';
import DashSidebar from '../components/DashSidebar'
import { useLocation } from 'react-router-dom'
import DashDashboardContent from '../components/DashDashboardContent';
import DashUsers from '../components/DashUsers';
import DashProfile from '../components/DashProfile';
import DashAddTransaction from '../components/DashAddTransaction';
import DashGetTransactions from '../components/DashGetTransactions';
import DashAnalytics from '../components/DashAnalytics';

function Dashboard() {
  const [tab, setTab] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='flex flex-col md:flex-row dark:bg-gray-900 min-h-screen'>
      {/* Sidebar - Fixed width on medium+ screens */}
      <div className="md:w-64 border-r dark:border-gray-700">
        <DashSidebar />
      </div>

      {/* Content Area - flex-1 makes it fill the rest of the screen */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {tab === "dashboard" && <DashDashboardContent />}
          {tab === "users" && <DashUsers />}
          {tab === "allTransactions" && <DashGetTransactions />}
          {tab === "addTransaction" && <DashAddTransaction />}
          {tab === "analytics" && <DashAnalytics />}
          {tab === "profile" && <DashProfile />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard