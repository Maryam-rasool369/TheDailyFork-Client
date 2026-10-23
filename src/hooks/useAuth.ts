import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import {
    loginApi,
    signupApi,
    googleLoginApi,
    forgetPasswordApi,
    resetPasswordApi,
} from "../api/authApi";

import type {
    LoginFormData,
    SignupFormData,
    ForgetPasswordFormData,
    ResetPasswordFormData,
} from "../validations/auth.validation";

export const useAuth = () => {
    const navigate = useNavigate();

    const setAuth = useAuthStore((s) => s.setAuth);
    const logout = useAuthStore((s) => s.logout);

    const login = async (data: LoginFormData) => {
        try {
            const result = await loginApi(data);

            setAuth(result.token, result.user);

            toast.success("Logged in successfully");
            navigate("/");
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

            toast.success("Account created — please log in");
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
            navigate("/");
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

    const signOut = () => {
        logout();
        navigate("/login");
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