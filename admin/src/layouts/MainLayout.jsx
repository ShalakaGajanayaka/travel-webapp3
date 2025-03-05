import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { checkAuth } from "../utils/auth";

const MainLayout = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAuth = async () => {
            const authenticatedUser = await checkAuth();
            if (!authenticatedUser) {
                navigate("/login");
            } else {
                setUser(authenticatedUser);
            }
        };
        checkUserAuth();
    }, [navigate, setUser]);

    return (
        user && (
            <div className="flex flex-col min-h-screen bg-slate-50">
                <Sidebar />
                <div className="flex flex-col flex-1 lg:pl-64">
                    <Outlet />
                </div>
            </div>
        )
    );
};

export default MainLayout;
