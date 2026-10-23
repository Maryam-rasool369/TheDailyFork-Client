import type { Blog } from "./blogType";
import type { Subscription } from "./subscriptionType";

export interface AdminUser {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
    phoneNumber: string | null;
    profileImage?: string | null;
    isVerified: boolean;
    role: string;
    createdAt: string;
    subscription: Subscription | null;
}

export interface AdminBlog extends Blog {}

export interface AdminStats {
    totalUsers: number;
    totalBlogs: number;
    pendingBlogs: number;
    approvedBlogs: number;
    rejectedBlogs: number;
    activeSubscriptions: number;
}
