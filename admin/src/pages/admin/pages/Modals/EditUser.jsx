import React, { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axiosInstance from '../../../../utils/axiosInstance';

export default function EditUser({ open, setOpen, user }) {
    const [formData, setFormData] = useState({
        userName: user.userName || '',
        phone: user.phone || '',
        pin: user.pin || '',
        employeeNo: user.employeeNo || '',
        referralNumber: user.referralNumber || '',
        password: user.password || '',
        totalEarnings: user.totalEarnings || 0,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                userName: user.userName || '',
                phone: user.phone || '',
                pin: user.pin || '',
                employeeNo: user.employeeNo || '',
                referralNumber: user.referralNumber || '',
                password: user.password || '',
                totalEarnings: user.totalEarnings || 0,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "permissions.doTasks" || name === "permissions.withdraw") {
            setFormData({
                ...formData,
                permissions: {
                    ...formData.permissions,
                    [name.split('.')[1]]: value === "true"
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axiosInstance.put(`/api/users/${user._id}`, formData);

            if (response.status === 200) {
                setSuccess('User updated successfully!');
                setTimeout(() => {
                    setOpen(false); // Close modal after success
                }, 1500);
            } else {
                throw new Error(response.data.error || 'Something went wrong');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 transition-opacity bg-gray-500/75" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-4 text-2xl font-bold">Edit User</h2>
                    {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
                    {success && <p className="mb-2 text-sm text-green-500">{success}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-200 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-200 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Pin</label>
                            <input
                                type="text"
                                id="pin"
                                name="pin"
                                value={formData.pin}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-200 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="text"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-200 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="employeeNo" className="block text-sm font-medium text-gray-700">Employee No</label>
                            <input
                                type="text"
                                id="employeeNo"
                                name="employeeNo"
                                value={formData.employeeNo}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-200 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="referralNumber" className="block text-sm font-medium text-gray-700">Referral Number</label>
                            <input
                                type="text"
                                id="referralNumber"
                                name="referralNumber"
                                value={formData.referralNumber}
                                onChange={handleChange}
                                className="w-full p-2 bg-gray-200 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="totalEarnings" className="block text-sm font-medium text-gray-700">Total Earnings</label>
                            <input
                                type="number"
                                name="totalEarnings"
                                value={formData.totalEarnings}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex justify-center mt-4 space-x-3">
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
