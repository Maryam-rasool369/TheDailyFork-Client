import { axiosClient } from "../lib/axiosClient";
import type { SignupFormData, LoginFormData } from "../validations/auth.validation";
import  {API_ROUTES}  from  "../common/constants";
import type { ApiUser, LoginResponse } from "../common/types/authType";
 


export const signupApi = async (data: SignupFormData) => {
    const { confirmPassword, ...payload } = data;

    const res = await axiosClient.post(API_ROUTES.AUTH.SIGNUP, payload);
    return res.data.data as ApiUser
    ;
};

export const loginApi = async (data: LoginFormData) => {
    const res = await axiosClient.post(API_ROUTES.AUTH.LOGIN, data);
    return res.data.data as LoginResponse;
};

export const forgetPasswordApi = async (email: string) => {
    const res = await axiosClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email });
    return res.data;
};

export const resetPasswordApi = async (token: string, newPassword: string) => {
    const res = await axiosClient.post(API_ROUTES.AUTH.RESET_PASSWORD, { token, newPassword });
    return res.data;
};

export const googleLoginApi = async (idToken: string) => {
    const res = await axiosClient.post(API_ROUTES.AUTH.GOOGLE, { idToken });
    return res.data.data as LoginResponse;
};

export const logoutApi = async () => {
    const res = await axiosClient.post(API_ROUTES.AUTH.LOGOUT);
    return res.data;
};

export const verifyEmailApi =async (token: string) => {
    const res = await axiosClient.get(API_ROUTES.AUTH.VERIFY_EMAIL, { params: { token } });
    return res.data;
};