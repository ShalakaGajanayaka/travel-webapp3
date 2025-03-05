import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../loadingscreen/Loading";
import ErrorPage from "../errorpage/ErrorPage";
import { EyeIcon } from "@heroicons/react/24/outline";

const CompletedTasksList = () => {
  const [completedTasks, setCompletedTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const userId = user._id;
  const navigate = useNavigate();

  const fetchCompletedTasks = async () => {
    try {
      const response = await axiosInstance.get(`/api/tasks/${userId}`);
      if (response.data.tasks.status ?? response.data.tasks.status === 'pending') {
        setCompletedTasks(response.data.tasks.taskId);
      }
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No tasks completed by you.");
      } else {
        setError("Failed to fetch completed tasks. Please try again later.");
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompletedTasks();
  }, []);


  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <ErrorPage errorMessage={'No data available.'} errorDesc='You do not completed any task up to now.' />
    );
  }

  return (
<>
  {completedTasks ? (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <li
        key={completedTasks._id}
        className="col-span-1 bg-[#F9F7F7] divide-y divide-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
      >
        <div className="flex flex-col items-center w-full p-6 space-y-4">
          {/* Task Details */}
          <div className="w-full text-center">
            <h3 className="text-lg font-semibold text-[#112D4E] truncate">{completedTasks.name}</h3>
            <div className="flex justify-center mt-2 space-x-3">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-[#3F72AF] rounded-full bg-[#DBE2EF] ring-1 ring-inset ring-[#3F72AF]/20">
                ${completedTasks.value}
              </span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-[#3F72AF] rounded-full bg-[#DBE2EF] ring-1 ring-inset ring-[#3F72AF]/20">
                ${completedTasks.profit}
              </span>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full">
            <img
              alt="Task Preview"
              src={completedTasks.link}
              className="object-cover w-full h-48 rounded-md shadow-md"
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <div className="flex -mt-px divide-x divide-gray-200">
            <div className="flex flex-1 w-0">
              <a
                onClick={() => navigate(`/task-overview`)}
                className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-semibold text-[#112D4E] border border-transparent rounded-bl-lg cursor-pointer gap-x-3 hover:bg-[#DBE2EF] transition duration-300"
              >
                <EyeIcon aria-hidden="true" className="text-[#3F72AF] size-5" />
                View Task
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  ) : (
    <ErrorPage errorMessage={'No data available.'} errorDesc="You have not completed any task yet." />
  )}
</>
  );
};

export default CompletedTasksList;
