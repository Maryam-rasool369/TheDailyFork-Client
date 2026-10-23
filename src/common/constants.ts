import icon from "../assets/images/profile_icon.png";
export const DEFAULT_AVATAR = icon

export const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
        GOOGLE: "/auth/google",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
    },

    BLOG: {
        GET_ALL: "/blog",
        GET_BY_ID: (id: number) => `/blog/${id}`,
        GET_MINE: "/blog/mine",
        CREATE: "/blog",
        UPDATE: (id: number) => `/blog/${id}`,
        GET_EDIT_BY_ID: (id: number) => `/blog/${id}/edit`,
        DELETE: (id: number) => `/blog/${id}`,
        ADMIN_ALL: "/blog/admin/all",
        APPROVE: (id: number) => `/blog/admin/${id}/approve`,
        REJECT: (id: number) => `/blog/admin/${id}/reject`,
    },

    CATEGORY: {
        GET_ALL: "/category",
        GET_BY_ID: (id: number) => `/category/${id}`,
        CREATE: "/category",
        UPDATE: (id: number) => `/category/${id}`,
        DELETE: (id: number) => `/category/${id}`,
    },
    PROFILE: {
        GET_ME: "/profile/me",
        UPDATE_ME: "/profile/me",
        VERIFY_PASSWORD: "/profile/me/verify-password",
        CHANGE_PASSWORD: "/profile/me/password",
    },
};