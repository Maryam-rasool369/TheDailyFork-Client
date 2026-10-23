import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import BlogEditor from "../../components/blog/BlogEditor";
import { createBlogSchema, type CreateBlogFormData } from "../../validations/blog.validation";
import { useCategories } from "../../hooks/useCategory";
import { useEditBlog } from "../../hooks/useBlog";

const EditBlog: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return;
    }
    const blogId = Number(id);

    const navigate = useNavigate();

    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
    const { blog, loading, error: loadError, isSubmitting: isUpdating, updateBlog, } = useEditBlog(blogId);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { register, handleSubmit, control, reset, formState: { errors }, } = useForm<CreateBlogFormData>({
        resolver: zodResolver(createBlogSchema),
    });

    // No id in the route at all — nothing to edit.
    useEffect(() => {
        if (!id) {
            navigate("/404", { replace: true });
        }
    }, [id, navigate]);

    // Populate the form once the blog has loaded.
    useEffect(() => {
        if (!blog) return;

        reset({
            title: blog.title,
            shortDescription: blog.shortDescription,
            content: blog.content,
            categoryId: blog.categoryId,
        });
        setImagePreview(blog.imageUrl);
    }, [blog, reset]);

    // Surface load failures the same way the original page did (404 / 401 / generic).
    useEffect(() => {
        if (!loadError) return;

        const status = (loadError as any)?.response?.status;

        if (status === 404) {
            navigate("/404", { replace: true });
            return;
        }

        if (status === 401) {
            toast.error("Please login to continue.");
            navigate("/login", { replace: true });
            return;
        }

        toast.error("Failed to load blog.");
    }, [loadError, navigate]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data: CreateBlogFormData) => {
        if (!id) {
            navigate("/404", { replace: true });
            return;
        }

        try {
            await updateBlog(data, imageFile ?? undefined);
            toast.success("Blog updated successfully");
            navigate(`/blog/${id}`, { replace: true });
        } catch (err: any) {
            const status = err?.response?.status;

            if (status === 404) {
                navigate("/404", { replace: true });
                return;
            }

            if (status === 401) {
                toast.error("Please login to continue.");
                navigate("/login", { replace: true });
                return;
            }

            toast.error(err?.response?.data?.message ?? "Failed to update blog.");
        }
    };

    if (loading) {
        return (
            <section className="flex min-h-[60vh] items-center justify-center bg-cloud px-4">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-purple" />
                    <p className="mt-4 text-sm text-gray-500">Loading blog...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-cloud py-10 sm:py-12">
            <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">

                    {/* HEADER */}
                    <div className="border-b border-gray-100 px-6 py-7 sm:px-8 lg:px-12">
                        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Edit Blog</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                            Update your blog content, featured image and category.
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-6 py-8 sm:px-8 lg:px-12 lg:py-10">

                        {/* TITLE */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-ink">Blog Title</label>
                            <input
                                type="text"
                                {...register("title")}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple focus:ring-4 focus:ring-purple/10"
                            />
                            {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
                        </div>

                        {/* CATEGORY */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-ink">Category</label>
                            <select
                                {...register("categoryId", { valueAsNumber: true })}
                                disabled={categoriesLoading}
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-purple focus:ring-4 focus:ring-purple/10 disabled:bg-gray-100"
                            >
                                {categoriesLoading && <option value="">Loading categories...</option>}
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {categoriesError && <p className="mt-2 text-sm text-red-600">{categoriesError}</p>}
                            {errors.categoryId && (
                                <p className="mt-2 text-sm text-red-600">{errors.categoryId.message}</p>
                            )}
                        </div>

                        {/* FEATURED IMAGE */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-ink">Featured Image</label>
                            <label className="group relative block cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Blog preview"
                                        className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.02] sm:h-80"
                                    />
                                ) : (
                                    <div className="flex h-64 flex-col items-center justify-center text-gray-400">
                                        <ImagePlus className="mb-3 h-10 w-10" />
                                        <span>Upload featured image</span>
                                    </div>
                                )}

                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100">
                                    <ImagePlus className="mb-3 h-10 w-10 text-white" />
                                    <span className="font-semibold text-white">Change Image</span>
                                </div>

                                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </label>
                        </div>

                        {/* SHORT DESCRIPTION */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-ink">Short Description</label>
                            <textarea
                                rows={4}
                                {...register("shortDescription")}
                                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple focus:ring-4 focus:ring-purple/10"
                            />
                            {errors.shortDescription && (
                                <p className="mt-2 text-sm text-red-600">{errors.shortDescription.message}</p>
                            )}
                        </div>

                        {/* BLOG CONTENT */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-ink">Blog Content</label>
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => <BlogEditor value={field.value} onChange={field.onChange} />}
                            />
                            {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => navigate(`/blog/${id}`)}
                                disabled={isUpdating}
                                className="rounded-xl border border-gray-300 bg-white px-7 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="rounded-xl bg-purple px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-purple/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isUpdating ? "Updating..." : "Update Blog"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EditBlog;