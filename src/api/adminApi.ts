import { axiosClient } from "../lib/axiosClient";
import { API_ROUTES } from "../common/constants";
import type { AdminBlog, AdminStats } from "../common/types/adminType";
import type { LoginFormData } from "../validations/auth.validation";
import type { LoginResponse } from "../common/types/authType";

export const adminLoginApi = async (data: LoginFormData) => {
    const res = await axiosClient.post(API_ROUTES.ADMIN.LOGIN, { email: data.email, password: data.password });
    return res.data.data as LoginResponse;
}

export const getAdminStatsApi = async (): Promise<AdminStats> => {
    const res = await axiosClient.get(API_ROUTES.ADMIN.STATS);
    return res.data.data;
};

export const getAdminUsersApi = async () => {
    const res = await axiosClient.get(API_ROUTES.ADMIN.USERS);
    return res.data.data;
};

export const getAdminSubscriptionsApi = async () => {
    const res = await axiosClient.get(API_ROUTES.ADMIN.SUBSCRIPTIONS);
    return res.data.data;
};

export const getAdminBlogsApi = async () => {
    const res = await axiosClient.get(API_ROUTES.ADMIN.BLOGS);
    return res.data.data as AdminBlog[];
};

export const approveBlogApi = async (id: number) => {
    const res = await axiosClient.patch(API_ROUTES.ADMIN.BLOG_APPROVE(id));
    return res.data.data as AdminBlog;
};

export const rejectBlogApi = async (id: number) => {
    const res = await axiosClient.patch(API_ROUTES.ADMIN.BLOG_REJECT(id));
    return res.data.data as AdminBlog;
};

export const setFeaturedBlogsApi = async (blogIds: number[]) => {
    const res = await axiosClient.patch(API_ROUTES.ADMIN.FEATURED, { blogIds });
    return res.data.data as AdminBlog[];
};
