import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const ActiveTasksList = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const takeTask = async () => {

    if( user.tasks.length > 0 ) {
      const response = await axiosInstance.get(`/api/tasks/${user._id}`);
    if (response.data.tasks.status ?? response.data.tasks.status === 'pending') {
      setAlert({ open: true, message: 'You have pending journey and complete it in assign histoty.' });
      return;
    }
    if (user.totalEarnings < 50) {
      setAlert({ open: true, message: 'Balance is below 50, Cannot start to assign posts.' });
      return;
    }
    if (user.currentTaskIndex >= 16) {
      setAlert({ open: true, message: 'No post assign available.' });
      return;
    }
    try {
      const response = await axiosInstance.patch(`/api/tasks/take-task/${user._id}`);

      if (response.status === 200) {
        navigate("/task-overview");
      }
    } catch (err) {
      console.error("Error:", err);
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again later.";
      setAlert({ open: true, message: errorMessage, severity: "error" });
    }
    }
    else {
      setAlert({ open: true, message: 'No post assign available.' });
    }
  };


  return (
    <div className="max-w-4xl p-6 mx-auto bg-[#F9F7F7] rounded-lg shadow-xl">
      {/* Alert Section */}
      {alert && alert.open && (
        <div
          className={`mb-4 p-4 rounded-lg text-sm ${alert.severity === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          role="alert"
        >
          {alert.message}
        </div>
      )}

      {/* Task Information */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center justify-between bg-[#DBE2EF] p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <span className="font-semibold text-[#112D4E]">Total Balance:</span>
          <span className="text-lg font-medium text-[#3F72AF]">${user.totalEarnings}</span>
        </div>
        <div className="flex items-center justify-between bg-[#DBE2EF] p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <span className="font-semibold text-[#112D4E]">Current Journey:</span>
          <span className="text-lg font-medium text-[#3F72AF]">{user.currentTaskIndex}</span>
        </div>
        <div className="flex items-center justify-between bg-[#DBE2EF] p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <span className="font-semibold text-[#112D4E]">Total Earnings:</span>
          <span className="text-lg font-medium text-[#3F72AF]">${user.totalProfit}</span>
        </div>
        <div className="flex items-center justify-between bg-[#DBE2EF] p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <span className="font-semibold text-[#112D4E]">Total Journeys:</span>
          <span className="text-lg font-medium text-[#3F72AF]">{user.tasks?.length || 0}</span>
        </div>
      </div>

      {/* Button */}
      <div className="mt-6 text-center">
        <button
          onClick={takeTask}
          className="px-6 py-3 font-semibold text-white bg-[#3F72AF] rounded-lg shadow-lg hover:bg-[#112D4E] focus:outline-none focus:ring-4 focus:ring-[#DBE2EF] focus:ring-opacity-50 transition duration-300"
        >
          Start Assign Post
        </button>
      </div>
    </div>

  );
};

export default ActiveTasksList;
