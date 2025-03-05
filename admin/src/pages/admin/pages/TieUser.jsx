import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

export default function TieUser() {
    const { id: userId } = useParams(); // Get userId from URL params
    const [tasks, setTasks] = useState([]);
    const [taskIndex, setTaskIndex] = useState(""); // Input field state
    const [newTaskId, setNewTaskId] = useState(null); // Selected radio button
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch tasks where tie is true
    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get("/api/tasks");
            setTasks(response.data.tasks);
        } catch (err) {
            setError("Failed to fetch tasks. Please try again later.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskIndex || !newTaskId) {
            setError("Please enter a Post No and select a task.");
            setSuccess('')
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.put(`/api/tasks/replace/${userId}`, {
                taskIndex: Number(taskIndex),
                newTaskId,
            });

            setSuccess(response.data.message || "Task updated successfully!");
            setError('')
            setTaskIndex(""); // Reset input field
            setNewTaskId(null); // Reset selection
        } catch (err) {
            setError("Failed to update task. Please try again.");
            setSuccess('')
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="font-medium text-gray-900 text-lg/6 sm:truncate">Tie User</h1>
                </div>
            </div>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <div className="px-4 sm:px-6 lg:px-8">
                    {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
                    {success && <p className="mb-2 text-sm text-green-500">{success}</p>}

                    {/* Post No Input */}
                    <div className="mb-4">
                        <label htmlFor="post-no" className="block text-sm font-medium text-gray-700">
                            Post No
                        </label>
                        <input
                            id="post-no"
                            type="number"
                            value={taskIndex}
                            onChange={(e) => setTaskIndex(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex justify-end mt-4 mb-6">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-400"
                        >
                            {loading ? "Submitting..." : "Tie"}
                        </button>
                    </div>

                    {/* Tasks Table */}
                    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Name</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Value</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Profit</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Select</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {tasks.map((task) => (
                                    <tr key={task._id}>
                                        <td className="px-4 py-3 text-sm text-gray-900">{task.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">{task.value}</td>
                                        <td className="px-4 py-3 text-sm text-gray-500">{task.profit}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <input
                                                type="radio"
                                                name="task"
                                                value={task._id}
                                                checked={newTaskId === task._id}
                                                onChange={() => setNewTaskId(task._id)}
                                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                            />
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
