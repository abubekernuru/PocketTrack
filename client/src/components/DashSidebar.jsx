import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
    HiArrowSmLeft,
    HiOutlineUserGroup,
    HiPlusCircle,
    HiUser,
    HiOutlineCollection,
    HiChartBar,
    HiOutlineChartPie
} from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {logoutFailure, logoutSuccess} from "../redux/user/user.slice.js"

const apiUrl = import.meta.env.VITE_API_URL;

function DashSidebar({ mobileOnly = false }) {
    const { currentUser } = useSelector((state) => state.user);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get('tab') || 'dashboard';

    const handleLogout = async ()=> {
        try {
            const res = await fetch(`${apiUrl}/api/user/logout`,{
                method:'POST',
                credentials: 'include'
            })
            const data = await res.json();
            if(res.ok){
                navigate('/login');
                dispatch(logoutSuccess());
            }else{
                dispatch(logoutFailure(data.message))
            }
        } catch (error) {
            dispatch(logoutFailure(error.message))
        }
    }
    
    /* Navigation items Dry better way edited */

    const navItems = [
    {
        tab: "dashboard",
        label: "Dashboard",
        path: "/dashboard?tab=dashboard",
        showInMobile: true,
        showInDesktop: true,
        icon: HiChartBar
    },
    {
        tab: "allTransactions",
        label: "Transactions",
        path: "/dashboard?tab=allTransactions",
        showInMobile: true,
        showInDesktop: true,
        icon: HiOutlineCollection
    },
    {
        tab: "addTransaction",
        label: "Add",
        path: "/dashboard?tab=addTransaction",
        showInMobile: true,
        showInDesktop: true,
        icon: HiPlusCircle
    },
    {
        tab: "analytics",
        label: "Analytics",
        path: "/dashboard?tab=analytics",
        showInMobile: true,
        showInDesktop: true,
        icon: HiOutlineChartPie
    },
    {
        tab: "profile",
        label: "Profile",
        path: "/dashboard?tab=profile",
        showInMobile: true,
        showInDesktop: true,
        icon: HiUser
    },
    {
        tab: "users",
        label: "Users",
        path: "/dashboard?tab=users",
        showInMobile: false,
        showInDesktop: true,
        icon: HiOutlineUserGroup
    },
    // Admin-only — filtered below
    ...(currentUser?.isAdmin
        ? [{ tab: "users", label: "Users", path: "/dashboard?tab=users",roles: ["admin"], showInMobile: false,
        showInDesktop: true, icon: HiOutlineUserGroup }]
        : []),
]
    
    if (mobileOnly) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-pb">
        <div className="flex items-center justify-around h-16">
            {navItems
                .filter(item => item.showInMobile)
                .filter(item =>
                    !item.roles ||
                    item.roles.includes(currentUser.role)
                )
                .map(({ tab: t, label, icon: Icon, path }) => {
            const isActive = tab === t;
            return (
                <Link
                key={t}
                to={path}
                className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 group relative"
                aria-label={label}
                >
                <Icon
                    className={`text-xl transition-colors duration-150 ${
                    isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    }`}
                />
                <span
                    className={`text-[10px] font-medium leading-none transition-colors duration-150 ${
                    isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    }`}
                >
                    {label}
                </span>
                {/* CHANGE: Active indicator dot above the icon */}
                {isActive && (
                    <span className="absolute top-0 h-0.5 w-8 rounded-full bg-blue-600 dark:bg-blue-400 -translate-y-0" />
                )}
                </Link>
            );
            })}
        </div>
        </nav>
    );
    }

    return (
    <Sidebar aria-label="Sidebar" className='w-full md:w-63.9'>
        <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
            {/* <Link to="/dashboard?tab=dashboard">
                <SidebarItem icon={HiChartBar} as={"div"} active={tab === "dashboard"}>
                Dashboard
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=allTransactions'}>
                <SidebarItem icon={HiOutlineCollection} as={"div"} active={tab === "allTransactions"}>
                    All Transactions
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=addTransaction'}>
                <SidebarItem icon={HiPlusCircle} as={"div"} active={tab === "addTransaction"}>
                    Add Transaction
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=analytics'}>
                <SidebarItem icon={HiOutlineChartPie} as={"div"} active={tab === "analytics"}>
                    Analytics
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=profile'}>
                <SidebarItem icon={HiUser} as={"div"} label={currentUser && currentUser.isAdmin ? "Admin" : "User"} labelColor="dark" active={tab === "profile"}>
                    Profile
                </SidebarItem>
            </Link> */}
            {navItems
                .filter(item => item.showInDesktop)
                .filter(item =>
                    !item.roles ||
                    item.roles.includes(currentUser.role)
                )
                .map(({ tab: t, label, icon, path }) => (
                <Link key={t} to={path}>
                    <SidebarItem icon={icon} as={"div"} active={tab === t} 
                    // Admin badge on Profile item
                    {...(t === "profile" && {
                        label: currentUser?.isAdmin ? "Admin" : "User",
                        labelColor: "dark",
                    })}
                    >
                        {label}
                    </SidebarItem>
                </Link>
            ))}

        </SidebarItemGroup>
        <SidebarItemGroup className="border-t border-gray-200 dark:border-gray-700">
                <SidebarItem icon={HiArrowSmLeft} as={"div"} onClick={handleLogout} className="cursor-pointer">
                    Sign Out
                </SidebarItem>
        </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
    );
}

export default DashSidebar;


// import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
// import {
//   HiArrowSmLeft,
//   HiOutlineUserGroup,
//   HiPlusCircle,
//   HiUser,
//   HiOutlineCollection,
//   HiChartBar,
//   HiOutlineChartPie,
// } from "react-icons/hi";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { logoutFailure, logoutSuccess } from "../redux/user/user.slice.js";

// const apiUrl = import.meta.env.VITE_API_URL;

// // CHANGE: Accepts `mobileOnly` prop so Dashboard can render this component
// // twice — once as the desktop sidebar (hidden on mobile), and once as the
// // bottom nav (hidden on desktop) — without duplicating nav logic.
// function DashSidebar({ mobileOnly = false }) {
//   const { currentUser } = useSelector((state) => state.user);
//   const [tab, setTab] = useState("dashboard");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const tabFromUrl = urlParams.get("tab");
//     if (tabFromUrl) setTab(tabFromUrl);
//   }, [location.search]);

//   const handleLogout = async () => {
//     try {
//       const res = await fetch(`${apiUrl}/api/user/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (res.ok) {
//         dispatch(logoutSuccess());
//         navigate("/login");
//       } else {
//         dispatch(logoutFailure(data.message));
//       }
//     } catch (error) {
//       dispatch(logoutFailure(error.message));
//     }
//   };

//   // Shared nav items so desktop sidebar and mobile bottom nav
//   // stay in sync from a single source of truth.
//   const navItems = [
//     { tab: "dashboard",       label: "Dashboard",       icon: HiChartBar           },
//     { tab: "allTransactions", label: "Transactions",    icon: HiOutlineCollection  },
//     { tab: "addTransaction",  label: "Add",             icon: HiPlusCircle         },
//     { tab: "analytics",       label: "Analytics",       icon: HiOutlineChartPie    },
//     { tab: "profile",         label: "Profile",         icon: HiUser               },
//     // Admin-only — filtered below
//     ...(currentUser?.isAdmin
//       ? [{ tab: "users", label: "Users", icon: HiOutlineUserGroup }]
//       : []),
//   ];

//   // ── MOBILE BOTTOM NAV ──────────────────────────────────────────────
//   // CHANGE: When `mobileOnly` is true, renders a fixed bottom bar instead
//   // of the sidebar. Matches the pattern used in apps like Monzo, Revolut.
//   if (mobileOnly) {
//     return (
//       <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-pb">
//         <div className="flex items-center justify-around h-16">
//           {navItems.map(({ tab: t, label, icon: Icon }) => {
//             const isActive = tab === t;
//             return (
//               <Link
//                 key={t}
//                 to={`/dashboard?tab=${t}`}
//                 className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 group"
//               >
//                 <Icon
//                   className={`text-xl transition-colors duration-150 ${
//                     isActive
//                       ? "text-blue-600 dark:text-blue-400"
//                       : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
//                   }`}
//                 />
//                 <span
//                   className={`text-[10px] font-medium leading-none transition-colors duration-150 ${
//                     isActive
//                       ? "text-blue-600 dark:text-blue-400"
//                       : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
//                   }`}
//                 >
//                   {label}
//                 </span>
//                 {/* CHANGE: Active indicator dot above the icon */}
//                 {isActive && (
//                   <span className="absolute top-0 h-0.5 w-8 rounded-full bg-blue-600 dark:bg-blue-400 -translate-y-0" />
//                 )}
//               </Link>
//             );
//           })}

//           {/* Sign out in bottom nav */}
//           <button
//             onClick={handleLogout}
//             className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 group"
//           >
//             <HiArrowSmLeft className="text-xl text-gray-400 dark:text-gray-500 group-hover:text-red-500 transition-colors duration-150" />
//             <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 group-hover:text-red-500 transition-colors duration-150">
//               Sign out
//             </span>
//           </button>
//         </div>
//       </nav>
//     );
//   }

//   // ── DESKTOP SIDEBAR ────────────────────────────────────────────────
//   return (
//     <Sidebar aria-label="Dashboard sidebar" className="w-full md:w-64 h-full">
//       <SidebarItems>
//         <SidebarItemGroup className="flex flex-col gap-1">
//           {navItems.map(({ tab: t, label, icon }) => (
//             <Link key={t} to={`/dashboard?tab=${t}`}>
//               <SidebarItem
//                 icon={icon}
//                 as="div"
//                 active={tab === t}
//                 // Admin badge on Profile item
//                 {...(t === "profile" && {
//                   label: currentUser?.isAdmin ? "Admin" : "User",
//                   labelColor: "dark",
//                 })}
//               >
//                 {label}
//               </SidebarItem>
//             </Link>
//           ))}
//         </SidebarItemGroup>

//         <SidebarItemGroup className="border-t border-gray-200 dark:border-gray-700">
//           <SidebarItem
//             icon={HiArrowSmLeft}
//             as="div"
//             onClick={handleLogout}
//             className="cursor-pointer"
//           >
//             Sign Out
//           </SidebarItem>
//         </SidebarItemGroup>
//       </SidebarItems>
//     </Sidebar>
//   );
// }

// export default DashSidebar;