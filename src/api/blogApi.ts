import { axiosClient } from "../lib/axiosClient";
import type { Blog } from "../common/types/blogType";
import type { CreateBlogFormData } from "../validations/blog.validation";
// import { useAuthStore } from "../store/authStore";
import { API_ROUTES } from "../common/constants";

const buildBlogFormData = (data: Partial<CreateBlogFormData>, imageFile?: File) => {

    // this is for the testing purpose 
    // const token = useAuthStore.getState().token;
    // console.log("TOKEN BEFORE BLOG REQUEST:", token);

    // ********
    const formData = new FormData();
    if (data.title !== undefined) formData.append("title", data.title);
    if (data.shortDescription !== undefined) formData.append("shortDescription", data.shortDescription);
    if (data.content !== undefined) formData.append("content", data.content);
    if (data.categoryId !== undefined) formData.append("categoryId", String(data.categoryId));
    if (imageFile) formData.append("image", imageFile);
    return formData;
};

export const getApprovedBlogsApi = async (): Promise<Blog[]> => {
    const res = await axiosClient.get(API_ROUTES.BLOG.GET_ALL);
    return res.data.data;
};

export const getMyBlogsApi = async (): Promise<Blog[]> => {
    const res = await axiosClient.get(API_ROUTES.BLOG.GET_MINE);
    return res.data.data;
};

export const getBlogByIdApi = async (id: number): Promise<Blog> => {
    const res = await axiosClient.get(API_ROUTES.BLOG.GET_BY_ID(id));
    return res.data.data;
};

export const createBlogApi = async (data: CreateBlogFormData, imageFile: File): Promise<Blog> => {
    const formData = buildBlogFormData(data, imageFile);
    const res = await axiosClient.post(API_ROUTES.BLOG.CREATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
};
export const getBlogForEditApi = async (
    id: number
): Promise<Blog> => {
    const res = await axiosClient.get(API_ROUTES.BLOG.GET_EDIT_BY_ID(id));

    return res.data.data;
};

export const editBlogApi = async (
    id: number,
    data: Partial<CreateBlogFormData>,
    imageFile?: File
): Promise<Blog> => {
    const formData = buildBlogFormData(data, imageFile);
    const res = await axiosClient.put(API_ROUTES.BLOG.UPDATE(id), formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data;
};

export const deleteBlogApi = async (id:  number): Promise<void> => {
    await axiosClient.delete(`/blog/${id}`);
};