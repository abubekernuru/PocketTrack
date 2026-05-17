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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {logoutSuccess} from "../redux/user/user.slice.js"

function DashSidebar() {
    const { currentUser } = useSelector((state) => state.user);

    const [tab, setTab] = useState("dashboard");
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
        setTab(tabFromUrl);
    }
    }, [location.search]);

    const handleLogout = async ()=> {
        try {
            const res = await fetch(`/api/user/logout`,{
                method:'POST'
            })
            const data = await res.json();
            if(res.ok){
                navigate('/login');
                dispatch(logoutSuccess);
                alert(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
    <Sidebar aria-label="Sidebar" className='w-full md:w-63.9'>
        <SidebarItems>
        <SidebarItemGroup className="flex flex-col gap-1">
            <Link to="/dashboard?tab=dashboard">
                <SidebarItem icon={HiChartBar} as={"div"} active={tab === "dashboard"}>
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
            <Link to={'/dashboard?tab=analytics'}>
                <SidebarItem icon={HiOutlineChartPie} as={"div"} active={tab === "analytics"}>
                    Analytics
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
                <SidebarItem icon={HiArrowSmLeft} as={"div"} onClick={handleLogout} className="cursor-pointer">
                    Sign Out
                </SidebarItem>
        </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
    );
}

export default DashSidebar;