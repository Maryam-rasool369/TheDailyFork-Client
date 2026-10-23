import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export const useTokenExpiry = () => {
    const token = useAuthStore((s) => s.token);
    const logout = useAuthStore((s) => s.logout);

    useEffect(() => {
        if (!token) return;

        let expiresAt: number;

        try {
            expiresAt = jwtDecode<{ exp: number }>(token).exp * 1000;
        } catch {
            // Token can't be decoded -> it's unusable
            logout();
            return;
        }

        const expireSession = () => {
            logout();
            toast.error("Your session has expired. Please log in again.");
        };

        const checkExpiry = () => {
            if (Date.now() >= expiresAt) expireSession();
        };

        checkExpiry();

        // The auth token lasts 7 days, which is under setTimeout's max delay (~24.8 days)
        const timer = setTimeout(checkExpiry, Math.max(expiresAt - Date.now(), 0));

        window.addEventListener("focus", checkExpiry);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("focus", checkExpiry);
        };
    }, [token, logout]);
};
