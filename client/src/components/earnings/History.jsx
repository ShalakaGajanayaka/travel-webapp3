import React from 'react';
import EarningsTable from './EarningsTable';

export default function History() {

    return (
        <>
        <div className="px-6 py-6 border-b border-[#3F72AF] bg-[#112D4E] sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10 shadow-lg">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-white sm:truncate">Earnings</h1>
                </div>
            </div>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <EarningsTable />
            </div>
        </>
    );
}
