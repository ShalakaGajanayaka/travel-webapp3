import React from 'react'
import { DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Panel({onClose}) {
    return (
        <div>
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                        <DialogPanel
                            transition
                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-base font-semibold text-gray-900">Panel title</DialogTitle>
                                        <div className="flex items-center ml-3 h-7">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="relative text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative flex-1 px-4 mt-6 sm:px-6">{/* Your content */}</div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </div>
    )
}
