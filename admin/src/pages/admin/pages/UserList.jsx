import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import SettingsMenu from './Modals/SettingsMenu';
import { useNavigate } from 'react-router-dom';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get(`/api/admin/users`);
            const onlyUsers = response.data.filter(user => user.role == 'user');
            // Sort users by registration date in descending order
            onlyUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setUsers(onlyUsers);
            setFilteredUsers(onlyUsers);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch users. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    return (
        <>
            <div className="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="font-medium text-gray-900 text-lg/6 sm:truncate">Users</h1>
                </div>
            </div>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold text-gray-900">Users</h1>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <button
                                type="button"
                                onClick={() => {navigate('/admin/add-user')}}
                                className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add user
                            </button>
                        </div>
                    </div>
                    <div className="flow-root mt-8">
                        <div className="relative mt-4 sm:mt-0">
                            <input
                                type="text"
                                placeholder="Search Users..."
                                className="px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        
                        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full mt-10 overflow-scroll divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                UserName
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Balance
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Withdrawel Status
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Task Status
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                ParentId
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Ref
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Reg. Time
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Last Login
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Last Login IP
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Current Task
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Demo
                                            </th>
                                            <th className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredUsers.map((person) => (
                                            <tr key={person._id}>
                                                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap sm:pl-0">
                                                    {person.userName}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{person.totalEarnings}</td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {person?.permissions?.withdraw ? 'Yes' : 'No'}
                                                </td> 
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {person?.permissions?.doTasks ? 'Yes' : 'No'}
                                                </td>                                     
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{person.parentUserName || 'N/A'}</td>       
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {person.referralNo}
                                                </td>    
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(person.createdAt).toLocaleDateString("en-CA")}</td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {person.lastLoggedInTime ? new Date(person.lastLoggedInTime).toLocaleDateString("en-CA") : "Not Logged in"}
                                                </td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{person.lastLoggedInIP}</td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{person.currentTaskIndex}</td>
                                                <td className="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">{person.parentUserName ? 'Yes' : 'No'}</td>
                                                <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-0">
                                                    <SettingsMenu user={person} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}