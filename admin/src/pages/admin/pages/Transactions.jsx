import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosInstance';

export default function Transactions() {
    const { id: userId } = useParams();
    const [withdrawals, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWithdrawals = async () => {
        try {
            const response = await axiosInstance.get(`/api/transactions//${userId}`);
            console.log(response);
            setTransactions(response.data.transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            setError(null);
        } catch (err) {
            setError("Failed to fetch transactions. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-semibold">Transactions</h2>
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && !loading && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <div className="p-4 bg-white rounded-lg shadow-md">
                    {withdrawals.length > 0 ? (
                        <ul className="space-y-4">
                            {withdrawals.map((withdrawal, index) => (
                                <li key={index} className="p-3 border-b last:border-b-0">
                                    <p className="text-lg font-medium">Transaction:  {withdrawal.type} {withdrawal.transaction}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(withdrawal.createdAt).toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">Created By: {withdrawal.createdBy?.userName}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No transactions found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
