import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { EnvelopeIcon } from '@heroicons/react/16/solid'
import { DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, UsersIcon } from '@heroicons/react/24/outline'

export default function UpdateReferral({ onClose, onSuccess }) {
  const [referralNumber, setReferralNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      if (!referralNumber.trim()) {
        setError("Referral code is required.");
        return;
      }

      const response = await axiosInstance.post("/api/users/update-ref", { referralNumber });

      if (response.status === 200) {
        onSuccess(); // Notify parent component
        onClose(); // Close the dialog
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
        <DialogPanel
          transition
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
        >
          <div className="sm:flex sm:items-start">
            <div className="flex items-center justify-center mx-auto bg-blue-100 rounded-full size-12 shrink-0 sm:mx-0 sm:size-10">
              <UsersIcon aria-hidden="true" className="text-blue-600 size-6" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                Add Referral Code
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Please enter your referral code below. This will be used to track your referrals.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 mt-2">
              <input
                id="referral"
                name="referral"
                type="text"
                placeholder="Referral Code"
                value={referralNumber}
                onChange={(e) => {
                  setReferralNumber(e.target.value);
                  setError(""); // Clear error when user starts typing
                }}
                className={`col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 ${error ? "outline-red-600 focus:outline-red-600" : "outline-gray-300 focus:outline-indigo-600"
                  } placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 sm:pl-9 sm:text-sm/6`}
              />
              <EnvelopeIcon
                aria-hidden="true"
                className="self-center col-start-1 row-start-1 ml-3 text-gray-400 pointer-events-none size-5 sm:size-4"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600" id="referral-error">
                {error}
              </p>
            )}
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Update
            </button>
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </div>
  );
}
