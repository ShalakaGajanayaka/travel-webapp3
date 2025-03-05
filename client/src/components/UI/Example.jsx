'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'My tasks', href: '#', icon: Bars4Icon, current: false },
  { name: 'Recent', href: '#', icon: ClockIcon, current: false },
]
const teams = [
  { name: 'Engineering', href: '#', bgColorClass: 'bg-indigo-500' },
  { name: 'Human Resources', href: '#', bgColorClass: 'bg-green-500' },
  { name: 'Customer Success', href: '#', bgColorClass: 'bg-yellow-500' },
]
const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-pink-600',
  },
  // More projects...
]
const pinnedProjects = projects.filter((project) => project.pinned)

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className="min-h-full">
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-600/75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs flex-1 transform flex-col bg-white pb-4 pt-5 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute right-0 top-0 -mr-12 pt-2 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="relative flex items-center justify-center ml-1 rounded-full size-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="text-white size-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex items-center px-4 shrink-0">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=purple&shade=500"
                  className="w-auto h-8"
                />
              </div>
              <div className="flex-1 h-0 mt-5 overflow-y-auto">
                <nav className="px-2">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center rounded-md px-2 py-2 text-base/5 font-medium',
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 size-6 shrink-0',
                          )}
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 id="mobile-teams-headline" className="px-3 text-sm font-medium text-gray-500">
                      Teams
                    </h3>
                    <div role="group" aria-labelledby="mobile-teams-headline" className="mt-1 space-y-1">
                      {teams.map((team) => (
                        <a
                          key={team.name}
                          href={team.href}
                          className="flex items-center px-3 py-2 font-medium text-gray-600 rounded-md group text-base/5 hover:bg-gray-50 hover:text-gray-900"
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(team.bgColorClass, 'mr-4 size-2.5 rounded-full')}
                          />
                          <span className="truncate">{team.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </DialogPanel>
            <div aria-hidden="true" className="w-14 shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pb-4 lg:pt-5">
          <div className="flex items-center px-6 shrink-0">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=purple&shade=500"
              className="w-auto h-8"
            />
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-1 h-0 pt-1 mt-5 overflow-y-auto">
            {/* User account dropdown */}
            <Menu as="div" className="relative inline-block px-3 text-left">
              <div>
                <MenuButton className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                  <span className="flex items-center justify-between w-full">
                    <span className="flex items-center justify-between min-w-0 space-x-3">
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        className="bg-gray-300 rounded-full size-10 shrink-0"
                      />
                      <span className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 truncate">Jessy Schwarz</span>
                        <span className="text-sm text-gray-500 truncate">@jessyschwarz</span>
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
            {/* Sidebar Search */}
            <div className="grid grid-cols-1 px-3 mt-6">
              <input
                name="search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="self-center col-start-1 row-start-1 ml-3 text-gray-400 pointer-events-none size-5"
              />
            </div>
            {/* Navigation */}
            <nav className="px-3 mt-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 size-6 shrink-0',
                      )}
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-8">
                {/* Secondary navigation */}
                <h3 id="desktop-teams-headline" className="px-3 text-sm font-medium text-gray-500">
                  Teams
                </h3>
                <div role="group" aria-labelledby="desktop-teams-headline" className="mt-1 space-y-1">
                  {teams.map((team) => (
                    <a
                      key={team.name}
                      href={team.href}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md group hover:bg-gray-50 hover:text-gray-900"
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(team.bgColorClass, 'mr-4 size-2.5 rounded-full')}
                      />
                      <span className="truncate">{team.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Main column */}
        <div className="flex flex-col lg:pl-64">
          {/* Search header */}
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
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="font-medium text-gray-900 text-lg/6 sm:truncate">Home</h1>
              </div>
              <div className="flex mt-4 sm:ml-4 sm:mt-0">
                <button
                  type="button"
                  className="order-1 ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:order-[0] sm:ml-0"
                >
                  Share
                </button>
                <button
                  type="button"
                  className="order-[0] inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 sm:order-1 sm:ml-3"
                >
                  Create
                </button>
              </div>
            </div>
            {/* Pinned projects */}
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-900">Pinned Projects</h2>
              <ul role="list" className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                {pinnedProjects.map((project) => (
                  <li key={project.id} className="relative flex col-span-1 rounded-md shadow-sm">
                    <div
                      className={classNames(
                        project.bgColorClass,
                        'flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white',
                      )}
                    >
                      {project.initials}
                    </div>
                    <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
                      <div className="flex-1 px-4 py-2 text-sm truncate">
                        <a href="#" className="font-medium text-gray-900 hover:text-gray-600">
                          {project.title}
                        </a>
                        <p className="text-gray-500">{project.totalMembers} Members</p>
                      </div>
                      <Menu as="div" className="pr-2 shrink-0">
                        <MenuButton className="inline-flex items-center justify-center text-gray-400 bg-white rounded-full size-8 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute right-10 top-3 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                              >
                                View
                              </a>
                            </MenuItem>
                          </div>
                          <div className="py-1">
                            <MenuItem>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                              >
                                Removed from pinned
                              </a>
                            </MenuItem>
                            <MenuItem>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                              >
                                Share
                              </a>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects list (only on smallest breakpoint) */}
            <div className="mt-10 sm:hidden">
              <div className="px-4 sm:px-6">
                <h2 className="text-sm font-medium text-gray-900">Projects</h2>
              </div>
              <ul role="list" className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
                {projects.map((project) => (
                  <li key={project.id}>
                    <a href="#" className="flex items-center justify-between px-4 py-4 group hover:bg-gray-50 sm:px-6">
                      <span className="flex items-center space-x-3 truncate">
                        <span
                          aria-hidden="true"
                          className={classNames(project.bgColorClass, 'size-2.5 shrink-0 rounded-full')}
                        />
                        <span className="font-medium truncate text-sm/6">
                          {project.title} <span className="font-normal text-gray-500 truncate">in {project.team}</span>
                        </span>
                      </span>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="ml-4 text-gray-400 size-5 group-hover:text-gray-500"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects table (small breakpoint and up) */}
            <div className="hidden mt-8 sm:block">
              <div className="inline-block min-w-full align-middle border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-t border-gray-200">
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-semibold text-left text-gray-900 border-b border-gray-200 bg-gray-50"
                      >
                        <span className="lg:pl-2">Project</span>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-sm font-semibold text-left text-gray-900 border-b border-gray-200 bg-gray-50"
                      >
                        Members
                      </th>
                      <th
                        scope="col"
                        className="hidden px-6 py-3 text-sm font-semibold text-right text-gray-900 border-b border-gray-200 bg-gray-50 md:table-cell"
                      >
                        Last updated
                      </th>
                      <th
                        scope="col"
                        className="py-3 pr-6 text-sm font-semibold text-right text-gray-900 border-b border-gray-200 bg-gray-50"
                      />
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {projects.map((project) => (
                      <tr key={project.id}>
                        <td className="w-full px-6 py-3 text-sm font-medium text-gray-900 max-w-0 whitespace-nowrap">
                          <div className="flex items-center space-x-3 lg:pl-2">
                            <div
                              aria-hidden="true"
                              className={classNames(project.bgColorClass, 'size-2.5 shrink-0 rounded-full')}
                            />
                            <a href="#" className="truncate hover:text-gray-600">
                              <span>
                                {project.title} <span className="font-normal text-gray-500">in {project.team}</span>
                              </span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-gray-500">
                          <div className="flex items-center space-x-2">
                            <div className="flex -space-x-1 shrink-0">
                              {project.members.map((member) => (
                                <img
                                  key={member.handle}
                                  alt={member.name}
                                  src={member.imageUrl}
                                  className="rounded-full size-6 max-w-none ring-2 ring-white"
                                />
                              ))}
                            </div>
                            {project.totalMembers > project.members.length ? (
                              <span className="font-medium shrink-0 text-xs/5">
                                +{project.totalMembers - project.members.length}
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="hidden px-6 py-3 text-sm text-right text-gray-500 whitespace-nowrap md:table-cell">
                          {project.lastUpdated}
                        </td>
                        <td className="px-6 py-3 text-sm font-medium text-right whitespace-nowrap">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
