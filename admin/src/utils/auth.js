import axiosInstance from "./axiosInstance";

export const checkAuth = async () => {
    try {
        const res = await axiosInstance.get('/api/auth/session');
        if (res.status === 200) {
            const { user } = res.data;
            return user; // Return user data for use in the caller
        }
        return null;
    } catch (error) {
        console.error("Authentication check failed", error);
        return null;
    }
};

