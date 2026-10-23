import icon from "../assets/images/profile_icon.png";
export const DEFAULT_AVATAR = icon
// Paginaion and search debounce constants
export const LIMIT_PER_PAGE = 9;
export const SEARCH_DEBOUNCE_MS = 500;


export const API_ROUTES = {
    AUTH: {
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
        GOOGLE: "/auth/google",
        FORGOT_PASSWORD: "/auth/forget-password",
        RESET_PASSWORD: "/auth/reset-password",
        VERIFY_EMAIL: "/auth/verify-email",
        LOGOUT: "/auth/logout",
    },

    BLOG: {
        GET_ALL: "/blog",
        GET_BY_ID: (id: number) => `/blog/${id}`,
        GET_MINE: "/blog/mine",
        CREATE: "/blog",
        UPDATE: (id: number) => `/blog/${id}`,
        GET_EDIT_BY_ID: (id: number) => `/blog/${id}/edit`,
        DELETE: (id: number) => `/blog/${id}`,
        POPULAR: "/blog/popular",
        FEATURED: "/blog/featured",
        LIKE: (id: number) => `/blog/${id}/like`,
        // ADMIN_ALL: "/blog/admin/all",
        // APPROVE: (id: number) => `/blog/admin/${id}/approve`,
        // REJECT: (id: number) => `/blog/admin/${id}/reject`,
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
        SET_PASSWORD: "/profile/me/set-password",
    },

    STRIPE: {
        CREATE_CHECKOUT_SESSION: "/stripe/create-checkout-session",
        CREATE_PORTAL_SESSION: "/stripe/create-portal-session",
        STATUS: "/stripe/status",
    },

    ADMIN: {
        LOGIN: "/admin/login",
        STATS: "/admin/stats",
        USERS: "/admin/users",
        SUBSCRIPTIONS: "/admin/subscriptions",
        BLOGS: "/admin/all",
        BLOG_APPROVE: (id: number) => `/admin/${id}/approve`,
        BLOG_REJECT: (id: number) => `/admin/${id}/reject`,
        FEATURED: "/admin/featured",
    },
};