import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import Loading from '../loadingscreen/Loading';
import ErrorPage from '../errorpage/ErrorPage';

export default function TaskOverview() {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const userId = user._id;
    const doTask = user.permissions.doTasks;

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axiosInstance.get(`/api/tasks/${userId}`);
                setTask(response.data.tasks.taskId);
            } catch (err) {
                setError('Failed to fetch task data');
                setOpenAlert(true);
            } finally {
                setLoading(false);
            }
        };
        fetchTask();
    }, [userId]);

    const completeTask = async () => {
        try {
            setError(null); // Reset error before new request
            setOpenAlert(false); // Reset alert
            const response = await axiosInstance.post(`/api/tasks/complete/${userId}`);
            if (response.status === 200) {
                setError(null); // Clear any previous error
                setOpenAlert(true);
                window.location.href = "/tasks";
            } else {
                setError('Unexpected error while completing the task');
                setOpenAlert(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while completing the task");
            setOpenAlert(true);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loading />
            </Container>
        );
    }

    return (
        <>
            {task ? (
                <>
                <div className="px-6 py-6 border-b border-[#3F72AF] bg-[#112D4E] sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10 shadow-lg">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-semibold text-[#F9F7F7] sm:truncate">{task.name}</h1>
                        </div>
                    </div>
                    <div className="px-4 mt-6 sm:px-6 lg:px-8 ">
                        <Container maxWidth="sm">
                            <div key={task._id}>
                                {error && <p className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</p>}
                                <div className="relative">
                                    <div className="relative w-full overflow-hidden rounded-lg h-72">
                                        <img alt={task.link} src={task.link} className="object-cover size-full" />
                                    </div>
                                    <div className="relative mt-4">
                                        <h3 className="text-sm font-medium text-gray-900">{task.name}</h3>
                                    </div>
                                    <div className="absolute inset-x-0 top-0 flex items-end justify-end p-4 overflow-hidden rounded-lg h-72">
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-x-0 bottom-0 opacity-50 h-36 bg-gradient-to-t from-black"
                                        />
                                        <p className="relative mr-4 text-lg text-white font-sm">Profit: ${task.profit}</p>
                                        <p className="relative text-lg text-white font-sm">Total: ${task.value}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        onClick={completeTask}
                                        disabled={!doTask}
                                        className="w-full px-8 py-3 text-sm font-medium text-[#F9F7F7] bg-[#3F72AF] rounded-lg shadow-md hover:bg-[#112D4E] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#3F72AF] focus:ring-offset-2"
                                        >
                                        { doTask ? 'Complete Task' : 'You are not allowed to perform tasks' }
                                    </button>
                                </div>
                            </div>
                        </Container>
                    </div>
                </>
            ) : (
                <ErrorPage errorMessage={'No data available.'} errorDesc='You have not completed any tasks yet.' />
            )}
        </>
    );
}
