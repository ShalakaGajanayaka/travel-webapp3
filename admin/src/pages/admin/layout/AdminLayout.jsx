import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { checkAuth } from "../../../utils/adminAuth";

const AdminLayout = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const checkUserAuth = async () => {
            const authenticatedUser = await checkAuth();
            if (!authenticatedUser) {
                navigate("/login");
            } else if (authenticatedUser.role !== "admin" && authenticatedUser.role !== "superadmin") {
                navigate("/dashboard");
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

export default AdminLayout;