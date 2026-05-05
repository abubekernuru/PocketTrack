import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
    HiArrowSmLeft,
    HiChartPie,
    HiOutlineUserGroup,
    HiPlusCircle,
    HiUser,
    HiOutlineCollection
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DashSidebar() {
    const { currentUser } = useSelector((state) => state.user);
    return (
    <Sidebar aria-label="Sidebar" className='w-full md:w-56'>
        <SidebarItems>
        <SidebarItemGroup>
            <Link to="/dashboard?tab=dashboard">
                <SidebarItem icon={HiChartPie} as={"div"}>
                Dashboard
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=addTransaction'}>
                <SidebarItem icon={HiPlusCircle} as={"div"}>
                    Add Transaction
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=allTransactions'}>
                <SidebarItem icon={HiOutlineCollection} as={"div"}>
                    All Transactions
                </SidebarItem>
            </Link>
            <Link to={'/dashboard?tab=profile'}>
                <SidebarItem icon={HiUser} as={"div"} label={currentUser && currentUser.isAdmin ? "Admin" : "User"} labelColor="dark">
                    Profile
                </SidebarItem>
            </Link>
            {currentUser && currentUser.isAdmin && (
            <Link to={'/dashboard?tab=users'}>
                <SidebarItem icon={HiOutlineUserGroup} as={"div"}>
                Users
                </SidebarItem>
            </Link>
            )}
            <Link to={'/dashboard?tab=signOut'}>
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