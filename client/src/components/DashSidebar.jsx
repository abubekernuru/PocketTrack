import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import {
    HiArrowSmLeft,
    HiChartPie,
    HiCurrencyDollar,
    HiOutlineUserGroup,
    HiUser,
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
            <Link to={'/dashboard?tab=pocketTracker'}>
                <SidebarItem icon={HiCurrencyDollar} as={"div"}>
                    Track Money
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