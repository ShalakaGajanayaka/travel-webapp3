import React from "react";
import ProfileCard from "../../components/user/ProfileCard";

const Profile = () => {
    return (
        <>
            <div className="px-4 py-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="font-medium text-gray-900 text-lg/6 sm:truncate">Profile</h1>
                </div>
            </div>
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <ProfileCard />
            </div>
        </>
    );
};

export default Profile;