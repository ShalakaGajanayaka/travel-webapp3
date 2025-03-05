import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export default function UserTasks() {
    const { id: userId } = useParams(); // Get userId from URL params
    const [tasks, setTasks] = useState([]);
    const [taskIndex, setTaskIndex] = useState(""); // Input field state
    const [newTaskId, setNewTaskId] = useState(null); // Selected radio button
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // const response = await axiosInstance.put(`/api/tasks/replace/${userId}`, {
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get(`/api/tasks/all-for-user/${userId}`);
            setTasks(response.data.tasks);
            console.log(tasks);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch users. Please try again later.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="font-medium text-gray-900 text-lg/6 sm:truncate">Task List</h1>
                </div>
            </div>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-6 lg:px-8">

                    {/* Tasks Table */}
                    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Name</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Value</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Profit</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tasks.map((task) => (
                                    <tr key={task._id} className={` ${task.taskId.tie ? 'text-red-500 font-semibold' : 'text-gray-500'}`}>
                                        <td
                                            className={`px-4 py-3 text-sm`}
                                        >
                                            {task.taskId.name}
                                        </td>

                                        <td className="px-4 py-3 text-sm">{task.taskId.value}</td>
                                        <td className="px-4 py-3 text-sm">{task.taskId.profit}</td>
                                        <td
                                            className={`px-4 py-3 text-sm font-medium`}
                                        >
                                            <p >
                                                {task.status === 'completed' ? 'Completed' : task.status === 'pending' ? 'Pending' : 'Not Completed'}
                                            </p>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
