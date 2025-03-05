import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Index() {
  return (
    <>
      {/* Header Section */}
      <div className="px-6 py-6 border-b border-[#3F72AF] bg-[#112D4E] sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10 shadow-lg">
        <div className="flex items-center gap-2">
          <InformationCircleIcon className="w-6 h-6 text-white" />
          <h1 className="text-xl font-semibold text-white sm:truncate">About Us</h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <div className="px-6 py-16 rounded-lg shadow-md bg-gradient-to-br from-gray-50 to-gray-100 lg:px-12">
          <div className="max-w-4xl mx-auto text-center animate-fadeIn">
            <h1 className="text-4xl font-bold tracking-wide text-gray-900 sm:text-5xl">
              About Us
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Welcome to{" "}
              <span className="font-semibold text-indigo-600">Intrepid.Expert</span>,
              your trusted platform for travel marketing and data entry solutions.
              We are committed to providing high-quality services that empower businesses
              and individuals to achieve their goals in the evolving digital landscape.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mt-10 space-y-6 text-lg text-gray-700 animate-fadeIn">
            <p>
              At{" "}
              <span className="font-semibold text-indigo-600">Intrepid.Expert</span>,
              we believe in seamless and user-friendly experiences. Whether you are looking to
              optimize your marketing strategies, enhance customer engagement, or streamline
              data entry tasks, our platform offers the tools and resources necessary for success.
            </p>

            <p>
              Our team of professionals is dedicated to maintaining the highest standards of accuracy
              and reliability, ensuring that every project is handled with precision.
            </p>

            <p>
              As a globally recognized platform, we continuously evolve to meet the ever-changing
              demands of the digital world. Our commitment to excellence is reflected in our
              customer-centric approach, cutting-edge technology, and comprehensive service offerings.
            </p>

            <p>
              Whether you are an individual freelancer or a large enterprise,{" "}
              <span className="font-semibold text-indigo-600">Intrepid.Expert</span> is here to
              support your journey toward efficiency and growth.
            </p>

            <p className="mt-6 text-xl font-semibold text-center text-gray-900">
              Join us and explore new possibilities in travel marketing and data management with{" "}
              <span className="text-indigo-600">Intrepid.Expert</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
