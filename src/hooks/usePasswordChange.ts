import { useState } from "react";
import toast from "react-hot-toast";
import { verifyPasswordApi, changePasswordApi } from "../api/profileApi";

export const usePasswordChange = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [changing, setChanging] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");

    const verify = async (password: string) => {
        setVerifying(true);
        try {
            await verifyPasswordApi(password);
            setCurrentPassword(password);
            setIsVerified(true);
            toast.success("Password verified");
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Incorrect password");
            throw err;
        } finally {
            setVerifying(false);
        }
    };

    const changePassword = async (newPassword: string) => {
        setChanging(true);
        try {
            await changePasswordApi(currentPassword, newPassword);
            toast.success("Password changed — please log in again");
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Failed to change password");
            throw err;
        } finally {
            setChanging(false);
        }
    };

    const reset = () => {
        setIsVerified(false);
        setCurrentPassword("");
    };

    return { isVerified, verifying, changing, verify, changePassword, reset };
};