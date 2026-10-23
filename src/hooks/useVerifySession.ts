import { useEffect, useState } from "react";
import { axiosClient } from "../lib/axiosClient";
import { useAuthStore } from "../store/authStore";
import { API_ROUTES } from "../common/constants";

/**
 * Asks the server whether the stored token is still accepted (not logged out,
 * not expired, user still exists). A 401 is handled by the axios interceptor,
 * which logs the user out and clears localStorage.
 */
export const useVerifySession = () => {
    const token = useAuthStore((s) => s.token);
    const [isChecking, setIsChecking] = useState(!!token);

    useEffect(() => {
        if (!token) {
            setIsChecking(false);
            return;
        }

        axiosClient
            .get(API_ROUTES.PROFILE.GET_ME)
            .catch(() => {
                // 401 -> interceptor already logged the user out; other errors (e.g. offline) shouldn't block the page
            })
            .finally(() => setIsChecking(false));
        // Verify once when the guarded area is entered, not on every token change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isChecking };
};
