import { lazy } from 'react';
import DashSidebar from '../components/DashSidebar';
import { useLocation } from 'react-router-dom';
import DashUsers from '../components/DashUsers';
import DashProfile from '../components/DashProfile';
import DashAddTransaction from '../components/DashAddTransaction';
import DashGetTransactions from '../components/DashGetTransactions';
// import DashAnalytics from '../components/DashAnalytics';
const DashAnalytics = lazy(() => import('../components/DashAnalytics'));

import DashMainOverview from '../components/DashMainOverview';

function Dashboard() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const tab = urlParams.get('tab') || 'dashboard';

  const dashboardPages = {
    dashboard: <DashMainOverview />,
    users: <DashUsers />,
    analytics: <DashAnalytics />,
    profile: <DashProfile />,
    allTransactions: <DashGetTransactions />,
    addTransaction: <DashAddTransaction />,
  };

  return (
    <div className='flex flex-col md:flex-row dark:bg-gray-900 min-h-screen pb-20 md:pb-0'>
      {/* Sidebar - Fixed width on medium+ screens */}
      <main className="md:w-64 border-r dark:border-gray-700">
        <DashSidebar />
      </main>

      {/* Content Area - flex-1 makes it fill the rest of the screen */}
      <aside className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* {tab === "dashboard" && <DashMainOverview />}
          {tab === "users" && <DashUsers />}
          {tab === "allTransactions" && <DashGetTransactions />}
          {tab === "addTransaction" && <DashAddTransaction />}
          {tab === "analytics" && <DashAnalytics />}
          {tab === "profile" && <DashProfile />} */}
          {dashboardPages[tab]}
        </div>
      </aside>
      
      <div className="md:hidden">
        <DashSidebar mobileOnly />
      </div>
    </div>
  );
}

export default Dashboard

// import { useEffect, useState } from 'react';
// import DashSidebar from '../components/DashSidebar';
// import { useLocation } from 'react-router-dom';
// import DashUsers from '../components/DashUsers';
// import DashProfile from '../components/DashProfile';
// import DashAddTransaction from '../components/DashAddTransaction';
// import DashGetTransactions from '../components/DashGetTransactions';
// import DashAnalytics from '../components/DashAnalytics';
// import DashMainOverview from '../components/DashMainOverview';

// function Dashboard() {
//   const [tab, setTab] = useState("dashboard");
//   const location = useLocation();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const tabFromUrl = urlParams.get('tab');
//     if (tabFromUrl) setTab(tabFromUrl);
//   }, [location.search]);

//   return (
//     // CHANGE: Added `pb-20 md:pb-0` so content isn't hidden behind the
//     // fixed bottom nav bar on mobile.
//     <div className="flex flex-col md:flex-row dark:bg-gray-900 min-h-screen pb-20 md:pb-0">

//       {/* Sidebar — visible only on md+ as a left rail */}
//       {/* CHANGE: `hidden md:block` hides the sidebar on mobile entirely.
//           The bottom nav (inside DashSidebar) takes over on small screens. */}
//       <div className="hidden md:block md:w-64 border-r dark:border-gray-700 shrink-0">
//         <DashSidebar />
//       </div>

//       {/* Content area */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="p-4 sm:p-6 lg:p-8">
//           {tab === "dashboard"       && <DashMainOverview />}
//           {tab === "users"           && <DashUsers />}
//           {tab === "allTransactions" && <DashGetTransactions />}
//           {tab === "addTransaction"  && <DashAddTransaction />}
//           {tab === "analytics"       && <DashAnalytics />}
//           {tab === "profile"         && <DashProfile />}
//         </div>
//       </div>

//       {/* Bottom nav — mobile only, rendered directly here so it sits
//           outside the scrollable content area and stays fixed.
//           CHANGE: DashSidebar already exports BottomNav; import and
//           render it here so the fixed bar is always at the root level. */}
//       <div className="md:hidden">
//         <DashSidebar mobileOnly />
//       </div>

//     </div>
//   );
// }

// export default Dashboard;