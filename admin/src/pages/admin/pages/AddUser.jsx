import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

export default function AddUser() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        phone: '',
        pin: '',
        employeeNo: '',
        role: 'user', // Default role
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();

    // auto generate employee number
    useEffect(() => {
        const generateEmployeeNo = () => { 
            return 'EMPU' + Math.floor(10000 + Math.random() * 90000);
        };
        setFormData((prevData) => ({ ...prevData, employeeNo: generateEmployeeNo() }));
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
           const response  = await axiosInstance.post('/api/auth/register', formData);
            console.log(formData);
            if (response.status === 201) {
                setAlert({ open: true, message: 'User registered successfully!', severity: 'success' });
                setTimeout(() => navigate('/admin/user-list'), 1500);
            } else {
                setAlert({ open: true, message: 'Registration failed. Please try again.', severity: 'error' });
            }
        } catch (error) {
            setAlert({
                open: true,
                message: error.response?.data?.error || 'An error occurred. Please try again.',
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="font-medium text-gray-900 text-lg/6 sm:truncate">Add User</h1>
                </div>
            </div>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="max-w-screen-sm p-8 bg-white rounded-lg shadow-md">
                        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-900">Add User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="pin"
                                    value={formData.pin}
                                    onChange={handleChange}
                                    placeholder="PIN"
                                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {/* Removed role select input */}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="w-full px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none disabled:bg-gray-400"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 mx-auto border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                                    ) : (
                                        'Add User'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Alert */}
                    {alert.open && (
                        <div
                            className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-lg shadow-md text-white ${alert.severity === 'success' ? 'bg-green-500' : 'bg-red-500'
                                }`}
                        >
                            {alert.message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}