import { axiosClient } from "../lib/axiosClient";
import { API_ROUTES } from "../common/constants";
import type { UserProfile } from "../common/types/profileType";
import type { UpdateProfileFormData } from "../validations/profile.validation";

export const getProfileApi = async (): Promise<UserProfile> => {
    const res = await axiosClient.get(API_ROUTES.PROFILE.GET_ME);
    return res.data.data;
};

export const updateProfileApi = async (
    data: UpdateProfileFormData,
    imageFile?: File
): Promise<UserProfile> => {
    const formData = new FormData();

    if (data.firstName !== undefined) formData.append("firstName", data.firstName);
    if (data.lastName !== undefined) formData.append("lastName", data.lastName);
    if (data.gender !== undefined) formData.append("gender", data.gender);
    if (data.birthday !== undefined && data.birthday !== "") formData.append("birthday", data.birthday);
    if (data.phoneNumber !== undefined && data.phoneNumber !== "") formData.append("phoneNumber", data.phoneNumber);
    if (data.bio !== undefined) formData.append("bio", data.bio);
    if (imageFile) formData.append("image", imageFile);

    const res = await axiosClient.put(API_ROUTES.PROFILE.UPDATE_ME, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
};

export const verifyPasswordApi = async (currentPassword: string): Promise<void> => {
    await axiosClient.post(API_ROUTES.PROFILE.VERIFY_PASSWORD, { currentPassword });
};

export const changePasswordApi = async (
    currentPassword: string,
    newPassword: string
): Promise<void> => {
    await axiosClient.put(API_ROUTES.PROFILE.CHANGE_PASSWORD, { currentPassword, newPassword });
};