import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axiosInstance from '../../../../utils/axiosInstance';

export default function CreateDemoUser({ open, setOpen, user }) {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        pin: '',
        employeeNo: '',
        parentUser: user._id,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axiosInstance.post('/api/auth/register', formData);
            if (response.status === 201) {
                setSuccess('User registered successfully!');
                setFormData({ userName: '', password: '', pin: '', employeeNo: '', parentUser: user._id });
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
                    <h2 className="mb-4 text-2xl font-bold">Create Demo Account</h2>
                    {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
                    {success && <p className="mb-2 text-sm text-green-500">{success}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="parentUser" className="block text-sm font-medium text-gray-700">
                                Parent User
                            </label>
                            <input
                                type="text"
                                id="parentUser"
                                name="parentUser"
                                disabled
                                placeholder="Parent User"
                                value={user.userName}
                                className="w-full p-2 bg-gray-200 border rounded"
                            />
                        </div>
                        <input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="pin"
                            placeholder="PIN"
                            value={formData.pin}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <input
                            type="text"
                            name="employeeNo"
                            placeholder="Employee Number"
                            value={formData.employeeNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />

                        <div className="flex justify-center mt-4 space-x-3">
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create'}
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
