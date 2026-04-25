import {
Avatar,
    Button,
    DarkThemeToggle,
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

export function Header() {
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
    <div className="flex md:order-2">
        <DarkThemeToggle className="mr-2" />
        <Dropdown
            arrowIcon={false}
            inline
            label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
        >
        <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
    </div>
    <NavbarCollapse>
        <NavbarLink href="/" active>
            Home
        </NavbarLink>
        <NavbarLink href="/about">About</NavbarLink>
        <NavbarLink href="/signin">Sign in</NavbarLink>
    </NavbarCollapse>
    </Navbar>
    );
}


export default Header