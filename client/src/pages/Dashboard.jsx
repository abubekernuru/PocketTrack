import { useEffect, useState } from 'react';
import DashSidebar from '../components/DashSidebar'
import { useLocation } from 'react-router-dom'
import DashDashboardContent from '../components/DashDashboardContent';
import DashUsers from '../components/DashUsers';
import DashProfile from '../components/DashProfile';
import DashPocketTracker from '../components/DashPocketTracker';

function Dashboard() {
  const [tab, setTab] = useState("dashboard");
  const location = useLocation();
  useEffect(() => {

      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
  },[location.search])
  return (
    <div className='flex md:flex-row flex-col dark:bg-gray-900 text-white min-h-screen'>
      <div className="md:w-56">
      <DashSidebar />
      </div>
      <div>
        {/* Content for the selected tab */}

        {tab === "dashboard" && <DashDashboardContent />}
        {tab === "users" && <DashUsers />}
        {tab === "pocketTracker" && <DashPocketTracker />}
        {tab === "profile" && <DashProfile />}

      </div>
    </div>
  )
}

export default Dashboard