import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Add auth token to headers if needed
        const token = btoa(`${import.meta.env.VITE_APP_RENTVINE_USER}:${import.meta.env.VITE_APP_RENTVINE_PASSWORD}`);
        if (token) {
            config.headers.Authorization = `Basic ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
