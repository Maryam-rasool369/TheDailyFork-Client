import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
    getAdminStatsApi,
    getAdminUsersApi,
    getAdminSubscriptionsApi,
    getAdminBlogsApi,
    approveBlogApi,
    rejectBlogApi,
    setFeaturedBlogsApi,
} from "../api/adminApi";
import type { AdminUser, AdminBlog, AdminStats } from "../common/types/adminType";

export const useAdminStats = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminStatsApi()
            .then(setStats)
            .catch(() => toast.error("Failed to load dashboard stats"))
            .finally(() => setLoading(false));
    }, []);

    return { stats, loading };
};

export const useAdminUsers = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = useCallback(() => {
        setLoading(true);
        return getAdminUsersApi()
            .then(setUsers)
            .catch(() => toast.error("Failed to load users"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, loading, refetch: fetchUsers };
};

export const useAdminSubscriptions = () => {
    const [subscribers, setSubscribers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscribers = useCallback(() => {
        setLoading(true);
        return getAdminSubscriptionsApi()
            .then(setSubscribers)
            .catch(() => toast.error("Failed to load subscriptions"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchSubscribers();
    }, [fetchSubscribers]);

    return { subscribers, loading, refetch: fetchSubscribers };
};

export const useAdminBlogs = () => {
    const [blogs, setBlogs] = useState<AdminBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [actioningId, setActioningId] = useState<number | null>(null);

    const fetchBlogs = useCallback(() => {
        setLoading(true);
        return getAdminBlogsApi()
            .then(setBlogs)
            .catch(() => toast.error("Failed to load blogs"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const approveBlog = async (id: number) => {
        setActioningId(id);
        try {
            const updated = await approveBlogApi(id);
            setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
            toast.success("Blog approved");
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Failed to approve blog");
        } finally {
            setActioningId(null);
        }
    };

    const rejectBlog = async (id: number) => {
        setActioningId(id);
        try {
            const updated = await rejectBlogApi(id);
            setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
            toast.success("Blog rejected");
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Failed to reject blog");
        } finally {
            setActioningId(null);
        }
    };

    return { blogs, loading, actioningId, approveBlog, rejectBlog, refetch: fetchBlogs };
};

export const useSetFeaturedBlogs = () => {
    const [isSaving, setIsSaving] = useState(false);

    /** Saves the featured blogs in order (first id = main banner). Returns true on success. */
    const saveFeaturedBlogs = async (blogIds: number[]): Promise<boolean> => {
        setIsSaving(true);
        try {
            await setFeaturedBlogsApi(blogIds);
            toast.success("Featured blogs updated");
            return true;
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Failed to update featured blogs");
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return { saveFeaturedBlogs, isSaving };
};
