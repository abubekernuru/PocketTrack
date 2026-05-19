import {
Avatar,
Button,
Dropdown,
DropdownDivider,
DropdownHeader,
DropdownItem,
Navbar,
NavbarBrand,
NavbarCollapse,
NavbarLink,
NavbarToggle,
TextInput,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutFailure, logoutSuccess } from "../redux/user/user.slice";
import { useNavigate } from "react-router-dom";
import { HiChartPie } from "react-icons/hi";

export function Header() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const {currentUser} = useSelector((state)=>state.user);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    }, [theme]);

    const handleLogout = async ()=> {
        try {
            const res = await fetch(`${apiUrl}/api/user/logout`,{
                method:'POST',
                credentials: 'include'
            })
            const data = await res.json();
            if(!res.ok){
                dispatch(logoutFailure(data.message));
                return
            }
            dispatch(logoutSuccess());
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }
return (
    <Navbar fluid rounded className="border-b border-gray-200 dark:border-gray-700 px-4 py-2.5">
        <NavbarBrand href="/">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500 mr-2.5">
                <HiChartPie className="text-white text-lg" />
            </div>
            <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Clar<span className="text-blue-500">ity</span>
            </span>
        </NavbarBrand>
        <form className="hidden lg:block">
            <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            sizing="sm"
            />
        </form>
    <div className="flex items-center gap-2 md:order-2">
        <Button className="lg:hidden p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" color='gray' pill >
            <AiOutlineSearch className="text-lg" />
        </Button>
        <div
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full cursor-pointer text-gray-500 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
            {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
        </div>
        { currentUser && 
        <Dropdown
            arrowIcon={false}
            inline
            label={
            <Avatar className="cursor-pointer" alt="User settings" img={currentUser.profilePicture} rounded />
            }
        >            
        <DropdownHeader>
            {/* to do change username into first and lastname */}         
            <span className="block text-sm font-medium">{currentUser.username}</span>
            <span className="block truncate text-sm text-gray-500">{currentUser.email}</span>
            </DropdownHeader>
            <Link to={'/dashboard?tab=dashboard'}>
                <DropdownItem>Dashboard</DropdownItem>
            </Link>
            <Link to={'/dashboard?tab=profile'}>
                <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout}>Sign out</DropdownItem>
        </Dropdown>
        }
        <NavbarToggle />
    </div>
    <NavbarCollapse>
        <NavbarLink href="/" active>
            Home
        </NavbarLink>
        <NavbarLink href="/about">About</NavbarLink>
        {!currentUser && 
        <NavbarLink href="/login">Sign in</NavbarLink>
        }
    </NavbarCollapse>
    </Navbar>
    );
}


export default Header


