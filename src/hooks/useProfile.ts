import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfileApi, updateProfileApi } from "../api/profileApi";
import type { UserProfile } from "../common/types/profileType";
import type { UpdateProfileFormData } from "../validations/profile.validation";

export const useProfile = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfileApi()
            .then(setProfile)
            .catch(() => toast.error("Failed to load profile"))
            .finally(() => setLoading(false));
    }, []);

    const updateProfile = async (data: UpdateProfileFormData, imageFile?: File) => {
        try {
            const updated = await updateProfileApi(data, imageFile);
            setProfile(updated);
            toast.success("Profile updated successfully");
            return updated;
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Failed to update profile");
            throw err;
        }
    };

    return { profile, loading, updateProfile };
};