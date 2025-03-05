// axiosInstance.js
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true, // Include cookies in requests
});

export default axiosInstance;

