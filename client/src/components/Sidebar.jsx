'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { RectangleStackIcon, ClockIcon, HomeIcon, XMarkIcon, CurrencyDollarIcon, UsersIcon, Bars3CenterLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate, useLocation } from 'react-router-dom'
import UserMenu from './UserMenu'
import UserMenuMobile from './UserMenuMobile'

const navigation = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Assign Post', href: '/tasks', icon: RectangleStackIcon },
  { name: 'Assign History', href: '/history', icon: ClockIcon },
  { name: 'Earnings', href: '/earnings', icon: CurrencyDollarIcon },
  { name: 'Invites', href: '/invites', icon: UsersIcon },
]
//bar
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Dynamically update the current navigation item based on the location
  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: location.pathname === item.href,
  }))

  return (
    <>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#3F72AF]/75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs flex-1 transform flex-col bg-[#112D4E] pb-4 pt-5 transition duration-300 ease-in-out data-[closed]:-translate-x-full shadow-2xl"
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
                src="https://bookings.intrepidtravel.com/bookings/intrepid/images/fresh-logo-auth.svg"
                alt="Intrepid Logo"
                className="w-auto h-8"
              />
            </div>
            <div className="flex-1 h-0 mt-5 overflow-y-auto">
              <nav className="px-2">
                <div className="space-y-1">
                  {updatedNavigation.map((item) => (
                    <a
                      key={item.name}
                      onClick={() => { navigate(item.href) }}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current
                          ? 'bg-[#3F72AF] text-[#F9F7F7] cursor-pointer'
                          : 'text-[#F9F7F7] hover:bg-[#DBE2EF] hover:text-[#112D4E] cursor-pointer',
                        'group flex items-center rounded-md px-2 py-2 text-base/5 font-medium cursor-pointer',
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          item.current ? 'text-[#F9F7F7]' : 'text-[#DBE2EF] group-hover:text-[#3F72AF]',
                          'mr-3 size-6 shrink-0',
                        )}
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </DialogPanel>
          <div aria-hidden="true" className="w-14 shrink-0">
          </div>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-[#3F72AF] lg:bg-[#112D4E] lg:pb-4 lg:pt-5 shadow-2xl">
        <div className="flex items-center px-6 shrink-0">
          <img
            src="https://bookings.intrepidtravel.com/bookings/intrepid/images/fresh-logo-auth.svg"
            alt="Intrepid Logo"
            className="w-auto h-8"
          />
        </div>
        <div className="flex flex-col flex-1 h-0 p-1 mt-5 overflow-y-auto">
          <UserMenu />
          <nav className="px-3 mt-6">
            <div className="space-y-1">
              {updatedNavigation.map((item) => (
                <a
                  key={item.name}
                  onClick={() => { navigate(item.href) }}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-[#3F72AF] text-[#F9F7F7] cursor-pointer'
                      : 'text-[#F9F7F7] hover:bg-[#DBE2EF] hover:text-[#112D4E] cursor-pointer',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer',
                  )}
                >
                  <item.icon
                    aria-hidden="true"
                    className={classNames(
                      item.current ? 'text-[#F9F7F7]' : 'text-[#DBE2EF] group-hover:text-[#3F72AF]',
                      'mr-3 size-6 shrink-0',
                    )}
                  />
                  {item.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
      
      <div className="sticky top-0 z-10 flex h-16 bg-[#F9F7F7] border-b border-[#3F72AF] shrink-0 lg:hidden">
            <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="px-4 text-[#3F72AF] border-r border-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#DBE2EF] lg:hidden"
            >
                <span className="sr-only">Open sidebar</span>
                <Bars3CenterLeftIcon aria-hidden="true" className="size-6" />
            </button>
            <div className="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
                <UserMenuMobile />
            </div>
        </div>
    </>
  )
}
