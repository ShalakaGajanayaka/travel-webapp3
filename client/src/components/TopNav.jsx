import React from "react";
'use client'
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
    MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'

const TopNav = () => {
    return (
        <div className="sticky top-0 z-10 flex h-16 bg-white border-b border-gray-200 shrink-0 lg:hidden">
            <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            >
                <span className="sr-only">Open sidebar</span>
                <Bars3CenterLeftIcon aria-hidden="true" className="size-6" />
            </button>
            <div className="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
                <form action="#" method="GET" className="grid flex-1 w-full grid-cols-1">
                    <input
                        name="search"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        className="block col-start-1 row-start-1 py-2 pl-8 pr-3 text-base text-gray-900 bg-white rounded-md outline-none size-full placeholder:text-gray-400 sm:text-sm/6"
                    />
                    <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="self-center col-start-1 row-start-1 text-gray-400 pointer-events-none size-5"
                    />
                </form>
                <div className="flex items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                        <div>
                            <MenuButton className="relative flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                        View profile
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                        Notifications
                                    </a>
                                </MenuItem>
                            </div>
                            <div className="py-1">
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                        Get desktop app
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                        Support
                                    </a>
                                </MenuItem>
                            </div>
                            <div className="py-1">
                                <MenuItem>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                        Logout
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
