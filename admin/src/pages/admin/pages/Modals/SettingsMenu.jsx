import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import CreateDemoUser from './CreateDemoUser';
import AdditionalDeductions from './AdditionalDeductions';
import EditUser from './EditUser';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../utils/axiosInstance';
import EditPermitions from './EditPermitions';

export default function SettingsMenu({ user }) {
    const [isDemoCreateModalOpen, setIsDemoCreateModalOpen] = useState(false);
    const [isTieModalOpen, setIsTieModalOpen] = useState(false);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isEditPermitionModalOpen, setIsEditPermitionModalOpen] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post(`/api/tasks/assign/${user._id}`);
            if (response.status === 200) {
                setSuccess('Tasks reassigned successfully!');
            } else {
                throw new Error(response.data.error || 'Something went wrong');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRemove = async () => {
        try {
            const response = await axiosInstance.delete(`/api/users/${user._id}`);
            if (response.status === 200) {
                setSuccess('User removed successfully!');
                // Optionally, you can refresh the page or update the state to reflect the removal
                window.location.reload();
            } else {
                throw new Error(response.data.error || 'Something went wrong');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Menu as="div" className="relative z-50 inline-block text-left">
            <MenuButton className="text-indigo-600 hover:text-indigo-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
            </MenuButton>
            <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems
                    className="absolute right-0 z-50 w-48 mb-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg bottom-full focus:outline-none"
                >
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={() => navigate(`/admin/user-tie/${user._id}`)}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Tie
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={() => setIsDemoCreateModalOpen(true)}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Create Demo Account
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={() => setIsTieModalOpen(true)}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Additional Deductions
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={() => setIsEditUserModalOpen(true)}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Edit Details
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={() => setIsEditPermitionModalOpen(true)}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Edit
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={handleSubmit}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Reassign Tasks
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={() => navigate(`/admin/withdrawels/${user._id}`)}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Withdrawals
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={handleRemove}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Remove
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={() => navigate(`/admin/user-tasks/${user._id}`)}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    User Tasks
                                </a>
                            )}
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    onClick={() => navigate(`/admin/transactions/${user._id}`)}
                                    className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                    href="#"
                                >
                                    Transactions
                                </a>
                            )}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
            <CreateDemoUser open={isDemoCreateModalOpen} setOpen={setIsDemoCreateModalOpen} user={user} />
            <AdditionalDeductions open={isTieModalOpen} setOpen={setIsTieModalOpen} user2={user} />
            <EditUser open={isEditUserModalOpen} setOpen={setIsEditUserModalOpen} user={user} />
            <EditPermitions open={isEditPermitionModalOpen} setOpen={setIsEditPermitionModalOpen} user={user} />
        </Menu>
    );
}