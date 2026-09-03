import { useEffect } from "react";
import { axiosClient } from "../lib/axiosClient";
import { useAuthStore } from "../store/authStore";

export const useInitAuth = () => {
    const { token, setAuth } = useAuthStore();

    useEffect(() => {
        if (!token) return;

        axiosClient.get("/profile/me").then((res) => {
            setAuth(token, res.data.data);
        }).catch(() => {
            // token invalid/expired — interceptor already handles logout on 401
        });
    }, []);
};