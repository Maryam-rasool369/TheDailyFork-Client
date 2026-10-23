import { useState } from "react";
import toast from "react-hot-toast";
import { setPasswordApi } from "../api/profileApi";

export const useSetPassword = () => {
    const [setting, setSetting] = useState(false);

    const setPassword = async (newPassword: string) => {
        setSetting(true);
        try {
            await setPasswordApi(newPassword);
            toast.success("Password set successfully");
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Failed to set password");
            throw err;
        } finally {
            setSetting(false);
        }
    };

    return { setting, setPassword };
};
