import React from 'react'
import IdCard from '../../components/user/IdCard'

export default function ID() {
    return (
        <div className="flex flex-col h-screen">
            <div className="px-6 py-6 border-b border-[#3F72AF] bg-[#112D4E] sm:flex sm:items-center sm:justify-between sm:px-8 lg:px-10 shadow-lg">
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl font-semibold text-white sm:truncate">Employee ID</h1>
                </div>
            </div>
            <div className="flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
                <IdCard />
            </div>
        </div>
    )
}
