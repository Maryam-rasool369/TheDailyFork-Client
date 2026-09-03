import { axiosClient } from "../lib/axiosClient";
import type { Category } from "../common/types/categoryType";
import { API_ROUTES } from "../common/constants";

export const getCategoriesApi = async (): Promise<Category[]> => {
    const res = await axiosClient.get(API_ROUTES.CATEGORY.GET_ALL);
    return res.data.data;
};