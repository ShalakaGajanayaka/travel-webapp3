import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axiosInstance from '../../../../utils/axiosInstance';

export default function EditPermissions({ open, setOpen, user }) {
    const [permissions, setPermissions] = useState({
        withdraw: user?.permissions?.withdraw || false,
        doTasks: user?.permissions?.doTasks || false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setPermissions((prevState) => ({
            ...prevState,
            [name]: value === 'true', // Convert 'true'/'false' to boolean
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axiosInstance.put(`/api/users/${user._id}`, {
                permissions,
            });
            if (response.status === 200) {
                setSuccess('Permissions updated successfully!');
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
                    <h2 className="mb-4 text-2xl font-bold">Edit Permissions</h2>
                    <h4 className="mb-4">User: {user.userName}</h4>
                    {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
                    {success && <p className="mb-2 text-sm text-green-500">{success}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="withdraw" className="block text-sm font-medium text-gray-700">
                                Withdrawal Permission
                            </label>
                            <select
                                name="withdraw"
                                value={permissions.withdraw ? 'true' : 'false'}
                                onChange={handleSelectChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="true">Allow</option>
                                <option value="false">Deny</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="doTasks" className="block text-sm font-medium text-gray-700">
                                Do Tasks Permission
                            </label>
                            <select
                                name="doTasks"
                                value={permissions.doTasks ? 'true' : 'false'}
                                onChange={handleSelectChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="true">Allow</option>
                                <option value="false">Deny</option>
                            </select>
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
