import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function DepositBody() {
  const { user } = useAuth();
  const [value, setValue] = useState(0);
  const [alert, setAlert] = useState(null);

  return (
    <div className="max-w-xl p-6 mx-auto bg-[#F9F7F7] rounded-lg shadow-lg">
      <div className="max-w-2xl px-6 py-5 mx-auto sm:px-8 sm:py-16 lg:px-0">
        <div className="mx-4 sm:mx-6 ">
          <dl className="space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-lg font-semibold text-[#112D4E]">Total Balance</dt>
              <dd className="ml-4 text-base font-semibold text-[#3F72AF]">${user.totalEarnings}</dd>
            </div>
          </dl>
        </div>

        {alert && alert.open && (
          <div
            className={`m-4 p-4 rounded-lg text-sm  ${alert.severity === "success" ? "bg-[#DBE2EF] text-[#3F72AF]" : "bg-[#DBE2EF] text-[#112D4E]"}`}
            role="alert"
          >
            {alert.message}
          </div>
        )}

        <div className="mx-4 sm:mx-6">
          <label htmlFor="price" className="block text-sm font-medium text-[#112D4E]">
            Deposit Amount
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md  pl-3 outline outline-1 -outline-offset-1 outline-[#DBE2EF] focus-within:outline-2 focus-within:outline-[#3F72AF]">
              <div className="text-base text-[#3F72AF] select-none shrink-0">$</div>
              <input
                id="price"
                name="price"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0.00"
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-[#112D4E] placeholder:text-[#DBE2EF] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[50, 100, 300, 1000, 3000, 5000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setValue(amount)}
                  className="px-3 py-1 text-base font-medium text-[#112D4E] border border-[#3F72AF] rounded-md shadow-sm hover:bg-[#DBE2EF] hover:text-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] focus:ring-offset-2"
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <section aria-labelledby="summary-heading" className="mt-4">
            <div className="mx-4 sm:mx-6">
              <button
                onClick={() => { setAlert({ open: true, message: "Contact live agent" }) }}
                type="submit"
                className="w-full px-4 py-3 text-base font-medium text-white bg-[#3F72AF] border border-transparent rounded-md shadow-sm hover:bg-[#112D4E] focus:outline-none focus:ring-2 focus:ring-[#3F72AF] focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
