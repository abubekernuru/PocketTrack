import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
    HiArrowSmLeft,
    HiChartPie,
    HiOutlineUserGroup,
    HiPlusCircle,
    HiUser,
    HiOutlineCollection
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function DashSidebar() {
    const { currentUser } = useSelector((state) => state.user);

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
    <Sidebar aria-label="Sidebar" className='w-full md:w-63.9'>
        <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
            <Link to="/dashboard?tab=dashboard">
                <SidebarItem icon={HiChartPie} as={"div"} active={tab === "dashboard"}>
                Dashboard
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=addTransaction'}>
                <SidebarItem icon={HiPlusCircle} as={"div"} active={tab === "addTransaction"}>
                    Add Transaction
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=allTransactions'}>
                <SidebarItem icon={HiOutlineCollection} as={"div"} active={tab === "allTransactions"}>
                    All Transactions
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=profile'}>
                <SidebarItem icon={HiUser} as={"div"} label={currentUser && currentUser.isAdmin ? "Admin" : "User"} labelColor="dark" active={tab === "profile"}>
                    Profile
                </SidebarItem>
            </Link>
            {currentUser && currentUser.isAdmin && (
            <Link to={'/dashboard?tab=users'}>
                <SidebarItem icon={HiOutlineUserGroup} as={"div"} active={tab === "users"}>
                Users
                </SidebarItem>
            </Link>
            )}
        </SidebarItemGroup>
        <SidebarItemGroup className="border-t border-gray-200 dark:border-gray-700">
            <Link to={'/sign-out'}>
                <SidebarItem icon={HiArrowSmLeft} as={"div"}>
                    Sign Out
                </SidebarItem>
            </Link>
        </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
    );
}

export default DashSidebar;