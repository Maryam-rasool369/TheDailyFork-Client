import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import {
    loginApi,
    signupApi,
    googleLoginApi,
    forgetPasswordApi,
    resetPasswordApi,
    logoutApi,
} from "../api/authApi";

import type {
    LoginFormData,
    SignupFormData,
    ForgetPasswordFormData,
    ResetPasswordFormData,
} from "../validations/auth.validation";

export const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const setAuth = useAuthStore((s) => s.setAuth); //takes a selector function. and give you only what you need
    const logout = useAuthStore((s) => s.logout); // same as above

    // If the user was redirected here by PrivateRoute, go back to where
    // they were trying to go instead of always landing on "/".
    const redirectAfterAuth = () => {
        const from = (location.state as { from?: Location } | null)?.from;
        navigate(from ? `${from.pathname}${from.search ?? ""}` : "/", { replace: true }); //from.pathname the path itself, e.g. /dashboard/settings. and from.search — the query string including the leading ?,
    };

    const login = async (data: LoginFormData) => {
        try {
            const result = await loginApi(data);

            setAuth(result.token, result.user);

            toast.success("Logged in successfully");
            redirectAfterAuth();
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ?? "Login failed"
            );

            throw err;
        }
    };

    const signup = async (data: SignupFormData) => {
        try {
            await signupApi(data);

            toast.success("Account created — check your email to verify your account before logging in");
            navigate("/login");
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ?? "Signup failed"
            );

            throw err;
        }
    };

    const googleLogin = async (idToken: string) => {
        try {
            const result = await googleLoginApi(idToken);

            setAuth(result.token, result.user);

            toast.success("Logged in with Google");
            redirectAfterAuth();
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ?? "Google login failed"
            );
        }
    };

    const forgotPassword = async (
        data: ForgetPasswordFormData
    ) => {
        try {
            await forgetPasswordApi(data.email);

            toast.success("Password reset link has been sent");
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ??
                "Unable to send reset link"
            );

            throw err;
        }
    };

    const resetPassword = async (
        token: string,
        data: ResetPasswordFormData
    ) => {
        try {
            await resetPasswordApi(token, data.newPassword);

            toast.success("Password reset successfully");

            navigate("/login");
        } catch (err: any) {
            toast.error(
                err.response?.data?.message ??
                "Unable to reset password"
            );

            throw err;
        }
    };

    const signOut = async () => {
        try {
            // Revoke the token on the server so it can't be reused
            await logoutApi();
        } catch {
            // Even if the request fails (offline, already expired), still log out locally
        } finally {
            logout();
            navigate("/login");
        }
    };

    return {
        login,
        signup,
        googleLogin,
        forgotPassword,
        resetPassword,
        signOut,
    };
};