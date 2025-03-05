import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#F9F7F7]">
      <main className="w-full px-6 pt-10 pb-16 mx-auto max-w-7xl sm:pb-24 lg:px-8">
        <img
          alt="Your Company"
          src="https://bookings.intrepidtravel.com/bookings/intrepid/images/fresh-logo-auth.svg?shade=600"
          className="w-auto h-10 mx-auto sm:h-12"
        />
        <div className="max-w-2xl mx-auto text-center sm:mt-24">
          <p className="text-4xl font-semibold" style={{ color: '#3F72AF' }}>404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-[#112D4E] sm:text-6xl">
            This page does not exist
          </h1>
          <p className="mt-6 text-lg font-medium text-[#3F72AF] sm:text-xl">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
        </div>
        <div className="flow-root max-w-lg mx-auto mt-16 sm:mt-20">
          <div className="flex justify-center mt-10">
            <a
              onClick={handleGoBack}
              className="font-semibold cursor-pointer text-sm/6"
              style={{ color: '#3F72AF' }}
            >
              <span aria-hidden="true">&larr;</span> Go back
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
