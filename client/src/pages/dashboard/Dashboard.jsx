import React from 'react';
import Blog from '../blog/Blog';
import Buttons from '../../components/dashboard/Buttons';
import Incentives from '../../components/dashboard/Incentives';

export default function Dashboard() {
  return (
    <>
    <div className="px-6 py-6 border-b border-[#3F72AF] bg-[#112D4E] sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10 shadow-lg">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-semibold text-[#F9F7F7] sm:truncate">Dashboard</h1>
      </div>
    </div>
    <div className="px-6 mt-8 mb-8 sm:px-8 lg:px-10 bg-[#DBE2EF] min-h-screen">
      <Buttons />
      <Incentives />
      <Blog />
    </div>
  </>
  );
}