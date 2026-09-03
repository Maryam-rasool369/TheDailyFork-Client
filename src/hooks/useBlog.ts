import toast from "react-hot-toast";
import {
  getApprovedBlogsApi,
  getMyBlogsApi,
  getBlogByIdApi,
  createBlogApi,
  editBlogApi,
  deleteBlogApi,
  getBlogForEditApi,
} from "../api/blogApi";
import type { Blog } from "../common/types/blogType";
import type { CreateBlogFormData } from "../validations/blog.validation";
import { useCallback, useEffect, useState } from "react";

/** Extracts a readable message from an axios error, falling back to a default. */
const getErrorMessage = (err: unknown, fallback: string): string => {
  const message = (err as any)?.response?.data?.message;
  return typeof message === "string" ? message : fallback;
};

/**
 * Fetches all publicly approved blogs (public listing page).
 */
export const useApprovedBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getApprovedBlogsApi();
      setBlogs(data);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load blogs");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loading, error, refetch: fetchBlogs };
};

/**
 * Fetches blogs belonging to the logged-in user (pending/approved/rejected).
 */
export const useMyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyBlogsApi();
      setBlogs(data);
    } catch (err) {
      const message = getErrorMessage(err, "Failed to load your blogs");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  /** Optimistically removes a blog from local state (e.g. after a delete). */
  const removeBlog = useCallback((id: string | number) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { blogs, loading, error, refetch: fetchBlogs, removeBlog };
};

/**
 * Fetches a single blog by id. Pass `undefined` while the id isn't ready yet.
 */
export const useBlogDetails = (id:number | undefined) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    if (id === undefined) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getBlogByIdApi(id);
      setBlog(data);
    } catch (err) {
      setError(getErrorMessage(err, "Blog not found"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return { blog, loading, error, refetch: fetchBlog };
};

/**
 * Mutation hook for creating a blog. Returns the created blog on success, null on failure.
 */
export const useCreateBlog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createBlog = useCallback(
    async (data: CreateBlogFormData, imageFile: File): Promise<Blog | null> => {
      setIsSubmitting(true);
      try {
        return await createBlogApi(data, imageFile);
      } catch (err) {
        toast.error(getErrorMessage(err, "Failed to create blog"));
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  return { createBlog, isSubmitting };
};


export const useEditBlog = (id: number | undefined) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlog = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getBlogForEditApi(id);
      setBlog(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const updateBlog = useCallback(
    async (data: Partial<CreateBlogFormData>, imageFile?: File): Promise<Blog> => {
      if (!id) {
        throw new Error("Blog ID is required");
      }

      setIsSubmitting(true);
      try {
        return await editBlogApi(id, data, imageFile);
      } finally {
        setIsSubmitting(false);
      }
    },
    [id]
  );

  return { blog, loading, error, isSubmitting, updateBlog, refetch: fetchBlog };
};
/**
 * Mutation hook for deleting a blog. Returns true on success.
 */
export const useDeleteBlog = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBlog = useCallback(async (id: number): Promise<boolean> => {
    setIsDeleting(true);
    try {
      await deleteBlogApi(id);
      return true;
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete blog"));
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return { deleteBlog, isDeleting };
};