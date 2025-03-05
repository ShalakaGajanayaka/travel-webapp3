import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid'

export default function UserMenu() {
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
    <Menu as="div" className="relative inline-block px-3 text-left">
      <div>
        <MenuButton className="group w-full rounded-md bg-[#DBE2EF] px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3F72AF] focus:ring-offset-1 focus:ring-offset-gray-100">
          <span className="flex items-center justify-between w-full">
            <span className="flex items-center justify-between min-w-0 space-x-3">
              <img
                alt=""
                src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
                className="bg-gray-300 rounded-full size-10 shrink-0"
              />
              <span className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium text-gray-900 truncate">{user.userName}</span>
                <span className="text-sm text-gray-500 truncate">${user.totalEarnings}</span>
              </span>
            </span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="text-gray-400 size-5 shrink-0 group-hover:text-gray-500"
            />
          </span>
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute left-0 right-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
  );
}
