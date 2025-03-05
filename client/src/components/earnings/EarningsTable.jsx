import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../loadingscreen/Loading";
import ErrorPage from "../errorpage/ErrorPage";
import { EyeIcon } from "@heroicons/react/24/outline";

export default function EarningsTable() {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    
    useEffect(() => {
        const fetchCompletedTasks = async () => {
            try {
                const response = await axiosInstance.get(`/api/tasks/all-for-user/${user._id}`);
                if (response.data.tasks) {
                    const completed = response.data.tasks.filter(task => task.status === "completed" || task.completed === true);
                    setCompletedTasks(completed);
                }
            } catch (err) {
                setError("Failed to fetch completed tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        console.log(completedTasks);
        fetchCompletedTasks();
    }, [user._id]);

    if (loading) return <Loading />;
    if (error || completedTasks.length === 0) {
        return <ErrorPage errorMessage={"No data available."} errorDesc="You have not completed any tasks yet." />;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <p className="mt-2 text-sm text-gray-700">All of your earnings will display here.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                {completedTasks.map((task) => (
                    <div key={task.taskId._id} className="col-span-1 bg-[#F9F7F7] divide-y divide-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="flex flex-col items-center w-full p-6 space-y-4">
                            <div className="w-full text-center">
                                <h3 className="text-lg font-semibold text-[#112D4E] truncate">{task.taskId.name}</h3>
                                <div className="flex justify-center mt-2 space-x-3">
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-[#3F72AF] rounded-full bg-[#DBE2EF] ring-1 ring-inset ring-[#3F72AF]/20">
                                        ${task.taskId.value}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-[#3F72AF] rounded-full bg-[#DBE2EF] ring-1 ring-inset ring-[#3F72AF]/20">
                                        ${task.taskId.profit}
                                    </span>
                                </div>
                            </div>
                            <div className="w-full">
                                <img alt="Task Preview" src={task.taskId.link} className="object-cover w-full h-48 rounded-md shadow-md" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}