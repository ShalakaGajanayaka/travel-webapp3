import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Dialog, DialogBackdrop } from '@headlessui/react'
import UpdateReferral from "./UpdateReferral";

export default function ProfileCard() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSuccess = () => {
        setSnackbarOpen(true); // Show success snackbar
        setTimeout(() => {
            window.location.reload(); // Refresh the page after success
        }, 1500);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (!user) {
        return (
            <Box className="flex items-center justify-center h-screen">
                <Typography variant="h6" color="text.secondary">
                    Loading user data...
                </Typography>
            </Box>
        );
    }

    return (
        <main className="py-10 bg-[#F9F7F7] rounded-xl">
        {/* Page header */}
        <div className="max-w-3xl px-4 mx-auto sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
                <div className="shrink-0">
                    <div className="relative">
                        <img
                            alt="User Avatar"
                            src="https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg"
                            className="rounded-full size-16 border-4 border-[#3F72AF]"
                        />
                        <span aria-hidden="true" className="absolute inset-0 rounded-full shadow-lg" />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-[#112D4E]">{user.userName}</h1>
                    <p className="text-sm font-medium text-gray-600">
                        Joined on <time dateTime="2020-08-25">{new Date(user.createdAt).toLocaleDateString()}</time>
                    </p>
                </div>
            </div>
            <div className="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                
                {user.referralNo ? (
                    <p className="text-sm font-medium text-gray-700">Referral Code: 
                        <span className="text-[#3F72AF] font-semibold"> {user.referralNo}</span>
                    </p>
                ) : (
                    <button
                        onClick={handleClickOpen}
                        type="button"
                        className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold text-white rounded-md shadow-md bg-[#3F72AF] hover:bg-[#112D4E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F72AF]"
                    >
                        Add Referral Code
                    </button>
                )}
            </div>
        </div>

        <div className="grid max-w-3xl grid-cols-1 gap-6 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2 lg:col-start-1">
                {/* Description list*/}
                <section aria-labelledby="user-info-title">
                    <div className="bg-white shadow-md sm:rounded-lg border border-[#DBE2EF]">
                        <div className="px-4 py-5 bg-[#DBE2EF] sm:px-6 lg:rounded-t-lg">
                            <h2 id="user-info-title" className="text-lg font-medium text-[#112D4E]">
                                User Information
                            </h2>
                        </div>
                        <div className="px-4 py-5 border-t border-gray-300 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-600">Membership</dt>
                                    <dd className="mt-1 text-sm text-[#112D4E] font-semibold">VIP</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-600">Total profit</dt>
                                    <dd className="mt-1 text-sm text-[#112D4E] font-semibold">${user.totalProfit}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-600">Total earnings</dt>
                                    <dd className="mt-1 text-sm text-[#112D4E] font-semibold">${user.totalEarnings}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-600">Last logged in</dt>
                                    <dd className="mt-1 text-sm text-[#112D4E] font-semibold">{user.lastLoggedInTime}</dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <a
                                onClick={() => alert("Edit Profile Coming Soon!")}
                                className="block px-4 py-4 text-sm font-medium text-center text-[#3F72AF] cursor-pointer bg-gray-50 hover:text-[#112D4E] sm:rounded-b-lg"
                            >
                                Edit details
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 transition-opacity bg-gray-500/75"
            />
            <UpdateReferral onClose={handleClose} onSuccess={handleSuccess} />
        </Dialog>
        
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
                Referral code updated successfully!
            </Alert>
        </Snackbar>
    </main>
    )
}
