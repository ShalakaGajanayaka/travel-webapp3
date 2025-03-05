'use client'

import { useNavigate } from 'react-router-dom'
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { useAuth } from '../../../context/AuthContext';

export default function UserMenuMobile() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout(); // Call the logout function
        navigate("/login"); // Redirect to the login page
    };
    const handleSupport = async () => {
        navigate("/support"); // Redirect to the login page
    };
    const handleProfile = () => {
        navigate("/profile"); // Navigate to the profile page
    };
    return (
        <>
            <form action="#" method="GET" className="grid flex-1 w-full grid-cols-1">
            </form>

            <div className="flex items-center font-medium"
                onClick={() => { navigate('/earnings') }}>
                ${user.totalPoints}
            </div>
            <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                    <div>
                        <MenuButton className="relative flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff2828] focus:ring-offset-2">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                                alt=""
                                src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
                                className="rounded-full size-8"
                            />
                        </MenuButton>
                    </div>
                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    onClick={handleProfile}
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                >
                                    View profile
                                </a>
                            </MenuItem>
                        </div>
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    onClick={handleSupport}
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                >
                                    Support
                                </a>
                            </MenuItem>
                        </div>
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                >
                                    Logout
                                </a>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </div>
        </>
    )
}
