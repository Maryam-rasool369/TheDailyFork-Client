import toast from "react-hot-toast";
import { getApprovedBlogsApi, getMyBlogsApi, getBlogByIdApi, createBlogApi, editBlogApi, deleteBlogApi, getBlogForEditApi, getPopularBlogsApi, getFeaturedBlogsApi, likeBlogApi, unlikeBlogApi, } from "../api/blogApi";
import type { Blog } from "../common/types/blogType";
import type { CreateBlogFormData } from "../validations/blog.validation";
import { useCallback, useEffect, useState } from "react";
import { LIMIT_PER_PAGE, SEARCH_DEBOUNCE_MS } from "../common/constants";
import { useDebounce } from "./useDebounce";

/** Extracts a readable message from an axios error, falling back to a default. */
const getErrorMessage = (err: unknown, fallback: string): string => {
  const message = (err as any)?.response?.data?.message;
  return typeof message === "string" ? message : fallback;
};


export const useApprovedBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearchValue] = useState("");
  const [category, setCategoryValue] = useState("All");
  const [sortBy, setSortByValue] = useState("Latest");

  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);

  const setSearch = useCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, []);

  const setCategory = useCallback((value: string) => {
    setCategoryValue(value);
    setPage(1);
  }, []);

  const setSortBy = useCallback((value: string) => {
    setSortByValue(value);
    setPage(1);
  }, []);

  useEffect(() => {
    // Ignore the response if the filters changed again before it arrived
    let isCancelled = false;

    setLoading(true);

    getApprovedBlogsApi(page, LIMIT_PER_PAGE, debouncedSearch.trim(), category, sortBy)
      .then((data) => {
        if (isCancelled) return;
        setBlogs(data.blogs);
        setTotalPages(Math.max(data.pagination.totalPages, 1));
        setTotal(data.pagination.total);
      })
      .catch(() => {
        if (!isCancelled) toast.error("Failed to load blogs");
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [page, debouncedSearch, category, sortBy]);

  return {
    blogs, loading, page, setPage, totalPages, total,
    search, setSearch, category, setCategory, sortBy, setSortBy,
  };
};
/**
 * Fetches one page of the logged-in user's blogs (pending/approved/rejected).
 * Search is debounced; changing it sends the user back to page 1.
 */
export const useMyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS);

  // True once a search has actually been applied (not just typed)
  const isSearching = debouncedSearch.trim() !== "";

  const setSearch = useCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, []);

  useEffect(() => {
    // Ignore the response if the filters changed again before it arrived
    let isCancelled = false;

    setLoading(true);

    getMyBlogsApi(page, LIMIT_PER_PAGE, debouncedSearch.trim())
      .then((data) => {
        if (isCancelled) return;
        setBlogs(data.blogs);
        setTotalPages(Math.max(data.pagination.totalPages, 1));
        setTotal(data.pagination.total);
      })
      .catch((err) => {
        if (!isCancelled) toast.error(getErrorMessage(err, "Failed to load your blogs"));
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [page, debouncedSearch]);

  return {
    blogs, loading, page, setPage, totalPages, total,
    search, setSearch, isSearching,
  };
};


/**
 * Fetches a single blog by id. Pass `undefined` while the id isn't ready yet.
 */
export const useBlogDetails = (id: number | undefined) => {
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

/**
 * Fetches the top liked blogs for the home page "popular" section.
 */
export const usePopularBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularBlogsApi()
      .then(setBlogs)
      .catch(() => toast.error("Failed to load popular blogs"))
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
};

/**
 * Fetches the admin-selected featured blogs for the home page hero section.
 */
export const useFeaturedBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedBlogsApi()
      .then(setBlogs)
      .catch(() => toast.error("Failed to load featured blogs"))
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
};

/**
 * Like/unlike state for a single blog. Updates optimistically and rolls back if the request fails.
 */
export const useBlogLike = (
  blogId: number,
  initialLiked: boolean,
  initialCount: number
) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = useCallback(async () => {
    if (isLoading) return;

    const nextLiked = !liked;

    setIsLoading(true);
    setLiked(nextLiked);
    setCount((prev) => prev + (nextLiked ? 1 : -1));

    try {
      if (nextLiked) {
        await likeBlogApi(blogId);
      } else {
        await unlikeBlogApi(blogId);
      }
    } catch (err) {
      setLiked(!nextLiked);
      setCount((prev) => prev + (nextLiked ? -1 : 1));
      toast.error(getErrorMessage(err, "Failed to update like"));
    } finally {
      setIsLoading(false);
    }
  }, [blogId, liked, isLoading]);

  return { liked, count, isLoading, toggleLike };
};