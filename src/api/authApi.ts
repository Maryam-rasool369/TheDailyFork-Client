import { axiosClient } from "../lib/axiosClient";
import type { SignupFormData, LoginFormData } from "../validations/auth.validation";

export interface ApiUser {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
}

interface LoginResponse {
    token: string;
    user: ApiUser;
}

export const signupApi = async (data: SignupFormData) => {
    const { confirmPassword, ...payload } = data;

    const res = await axiosClient.post("/auth/signup", payload);
    return res.data.data as ApiUser;
};

export const loginApi = async (data: LoginFormData) => {
    const res = await axiosClient.post("/auth/login", data);
    return res.data.data as LoginResponse;
};

export const forgetPasswordApi = async (email: string) => {
    const res = await axiosClient.post("/auth/forget-password", { email });
    return res.data;
};

export const resetPasswordApi = async (token: string, newPassword: string) => {
    const res = await axiosClient.post("/auth/reset-password", { token, newPassword });
    return res.data;
};

export const googleLoginApi = async (idToken: string) => {
    const res = await axiosClient.post("/auth/google", { idToken });
    return res.data.data as LoginResponse;
};