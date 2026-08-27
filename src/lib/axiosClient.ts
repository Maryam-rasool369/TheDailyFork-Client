import axios from "axios";
import { env } from "../config/env";
import { useAuthStore } from "../store/authStore";

export const axiosClient = axios.create({
    baseURL: env.VITE_API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Attach token to every outgoing request automatically
axiosClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Global handling: auto-logout on 401 (expired/invalid token)
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);