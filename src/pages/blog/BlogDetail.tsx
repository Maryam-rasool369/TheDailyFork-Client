

import { useState } from "react";
import {
    Calendar,
    CheckCircle2,
    Loader2,
    X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import OwnerActions from "../../components/blog/OwnerActions";
import { useBlogDetails, useDeleteBlog } from "../../hooks/useBlog";
import { useAuthStore } from "../../store/authStore";
import { DEFAULT_AVATAR } from "../../common/constants";
import PageNotFound from "../PageNotFound";

const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const user = useAuthStore((s) => s.user);

    const { blog, loading } = useBlogDetails(id);
    const { deleteBlog, isDeleting } = useDeleteBlog();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async () => {
        if (!blog) return;

        const success = await deleteBlog(blog.id);

        if (!success) return;

        setShowDeleteModal(false);

        toast.success("Blog deleted successfully");

        navigate("/my-blogs");
    };

    const renderBlogContent = (content: string) => {
        const hasHtml = /<([a-z][\w-]*)\b[^>]*>/i.test(content);

        if (hasHtml) {
            return (
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        }

        return (
            <div className="whitespace-pre-line">
                {content}
            </div>
        );
    };

    if (loading) {
        return (
            <main className="min-h-screen overflow-x-hidden bg-white">
                <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50">
                            <Loader2 className="h-6 w-6 animate-spin text-yellow-600" />
                        </div>

                        <p className="text-sm font-medium text-gray-500">
                            Loading article...
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    if (!blog) {
        return (
            <PageNotFound />
        );
    }

    const isOwner = user?.id === blog.authorId;

    const authorName = `${blog.author.firstName}${blog.author.lastName ? " " + blog.author.lastName : ""
        }`;

    return (
        <>
            <main className="min-h-screen overflow-x-hidden bg-white">
                {/* Main container */}
                <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
                    {/* Owner actions */}
                    {isOwner && blog.status === "APPROVED" && (
                        <div className="mb-8">
                            <OwnerActions
                                blogId={blog.id}
                                onDelete={() => setShowDeleteModal(true)}
                                // isDeleting={isDeleting}
                            />
                        </div>
                    )}

                    {/* Hero section */}
                    <section className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                        {/* LEFT — Content */}
                        <div className="min-w-0">
                            {/* Category */}
                            <div className="mb-5">
                                <span className="inline-flex items-center rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-700">
                                    {blog.category.name}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="wrap-break-words text-3xl font-bold leading-[1.15] tracking-tight text-gray-950 sm:text-2xl md:text-3xl lg:text-4xl">
                                {blog.title}
                            </h1>

                            {/* Short description */}
                            <p className="mt-6 max-w-2xl text-base text-gray-600 sm:text-md sm:leading-8">
                                {blog.shortDescription}
                            </p>

                            {/* Author */}
                            <div className="mt-8 flex items-center gap-4">
                                <div className="relative shrink-0">
                                    <img
                                        src={DEFAULT_AVATAR}
                                        alt={authorName}
                                        className="h-12 w-12 rounded-full object-cover ring-4 ring-gray-50"
                                    />

                                    <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                                        <CheckCircle2 className="h-4 w-4 fill-green-500 text-white" />
                                    </span>
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-900">
                                        {authorName}
                                    </p>

                                    <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                                        <Calendar className="h-4 w-4 shrink-0" />
                                        <span>{formatDate(blog.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT — Image */}
                        <div className="min-w-0">
                            <div className="group relative overflow-hidden rounded-3xl bg-gray-100 shadow-xl shadow-gray-200/60">
                                {/* Decorative background */}
                                <div className="absolute -inset-1 -z-10 rounded-3xl bg-linear-to-br from-yellow-100 via-white to-gray-100 blur-xl" />

                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="aspect-4/3 w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02] lg:aspect-5/4"
                                />

                                {/* Image overlay */}
                                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-white/5" />
                            </div>
                        </div>
                    </section>

                    {/* Article content */}
                    <section className="mx-auto mt-10  min-w-0">
                        <article
                            className="
                                prose
                                prose-lg
                                max-w-none
                                wrap-break-words
                                text-gray-700

                                prose-headings:font-bold
                                prose-headings:tracking-tight
                                prose-headings:text-gray-950

                                prose-h2:mt-12
                                prose-h2:text-2xl
                                prose-h3:mt-10
                                prose-h3:text-xl

                                prose-p:leading-8
                                prose-p:text-gray-700

                                prose-a:font-semibold
                                prose-a:text-yellow-700
                                prose-a:no-underline
                                hover:prose-a:underline

                                prose-strong:text-gray-900

                                prose-blockquote:border-yellow-400
                                prose-blockquote:bg-yellow-50
                                prose-blockquote:px-6
                                prose-blockquote:py-2
                                prose-blockquote:text-gray-700

                                prose-img:rounded-2xl
                                prose-img:shadow-lg

                                prose-li:leading-8
                            "
                        >
                            {renderBlogContent(blog.content)}
                        </article>
                    </section>
                </div>
            </main>

            {/* DELETE CONFIRMATION MODAL */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-blog-title"
                >
                    <div
                        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => !isDeleting && setShowDeleteModal(false)}
                            disabled={isDeleting}
                            aria-label="Close"
                            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="p-6 sm:p-8">

                            {/* Content */}
                            <div className="mt-6">
                                <h2
                                    id="delete-blog-title"
                                    className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl"
                                >
                                    Delete this blog?
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                                    Are you sure you want to delete?
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={isDeleting}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                                >
                                    {isDeleting ? (
                                        <>
                                            Deleting...
                                        </>
                                    ) : (
                                        <>

                                            Delete blog
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogDetails;

