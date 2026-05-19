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

export function Header() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const {error, loading, currentUser} = useSelector((state)=>state.user);
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
                dispatch(logoutFailure(data.message))
            }
            dispatch(logoutSuccess());
            navigate('/login');
        } catch (error) {
            console.log(error)
        }
    }
return (
    <Navbar fluid rounded className="border-b-2">
        <NavbarBrand href="/">
            <img src="https://res.cloudinary.com/dv8q3oyfj/image/upload/v1777146224/ucecxrro0w61uvzwflhi.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Pocket Tracker</span>
        </NavbarBrand>
        <form>
        <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
        />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill >
            <AiOutlineSearch />
        </Button>
    <div className="flex md:order-2 gap-2">
        <Button onClick={() => dispatch(toggleTheme())} color="gray" pill className="cursor-pointer">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </Button>
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
            <span className="block text-sm">{currentUser.username}</span>
            <span className="block truncate text-sm font-medium">{currentUser.email}</span>
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