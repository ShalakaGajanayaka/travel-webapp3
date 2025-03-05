import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axiosInstance from '../../../../utils/axiosInstance';
import { useAuth } from '../../../../context/AuthContext';

export default function AdditionalDeductions({ open, setOpen, user2 }) {
    const [formData, setFormData] = useState({
        deduction: 0,
    });
    const [addOrSubtract, setAddOrSubtract] = useState('add'); // state for add/subtract
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e) => {
        setAddOrSubtract(e.target.value); // handle dropdown change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
    
        // Determine the new totalEarnings based on addOrSubtract
        const newTotalEarnings = addOrSubtract === 'add'
            ? user2.totalEarnings + parseFloat(formData.deduction)
            : user2.totalEarnings - parseFloat(formData.deduction);
    
        try {
            // Update the user's total earnings
            const response = await axiosInstance.put(`/api/users/${user2._id}`, { totalEarnings: newTotalEarnings });
    
            if (response.status === 200) {
                const transaction = {
                    userId: user2._id,
                    createdBy: user._id,
                    transaction: parseFloat(formData.deduction),
                    type: addOrSubtract === 'add' ? '+' : '-' 
                };
    
                
                const response2 = await axiosInstance.post(`/api/transactions`, transaction);
    
                if (response2.status === 201) {
                    setSuccess('User updated successfully!');
                    setFormData({ deduction: 0 });
                    setTimeout(() => {
                        setOpen(false); // Close modal after success
                    }, 1500);
                } else {
                    throw new Error(response2.data.error || 'Something went wrong');
                }
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
                    <h2 className="mb-4 text-2xl font-bold">Additional Deductions</h2>
                    <h4 className="mb-4">Balance: {user.totalEarnings}</h4>
                    {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
                    {success && <p className="mb-2 text-sm text-green-500">{success}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="parentUser" className="block text-sm font-medium text-gray-700">
                                User
                            </label>
                            <input
                                type="text"
                                id="parentUser"
                                name="parentUser"
                                disabled
                                value={user2.userName}
                                className="w-full p-2 bg-gray-200 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="deduction" className="block text-sm font-medium text-gray-700">
                                Deduction Amount
                            </label>
                            <input
                                type="number"
                                name="deduction"
                                placeholder="deduction"
                                value={formData.deduction}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="addOrSubtract" className="block text-sm font-medium text-gray-700">
                                Add or Subtract
                            </label>
                            <select
                                name="addOrSubtract"
                                value={addOrSubtract}
                                onChange={handleSelectChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="add">Add</option>
                                <option value="subtract">Subtract</option>
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
