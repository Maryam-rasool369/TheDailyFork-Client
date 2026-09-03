import React from "react";
import EmptyState from "../../components/blog/EmptyState";
import { useMyBlogs } from "../../hooks/useBlog";
import type { Blog } from "../../common/types/blogType";
import BlogCard from "../../components/blog/BlogCard";

const statusLabel: Record<Blog["status"], string> = {
    PENDING: "Pending Approval",
    APPROVED: "Approved",
    REJECTED: "Rejected",
};

const statusStyle: Record<Blog["status"], string> = {
    PENDING: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
    APPROVED: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200",
    REJECTED: "bg-red-100 text-red-800 ring-1 ring-red-200",
};

const MyBlogs: React.FC = () => {
    const { blogs, loading } = useMyBlogs();


    if (loading) {
        return (
            <section className="min-h-[60vh] px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex min-h-[40vh] items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple/20 border-t-purple" />

                        <p className="text-sm font-medium text-gray-500">
                            Loading your blogs...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (blogs.length === 0) {
        return (
            <EmptyState
                title="No Blogs Yet"
                description="You haven't written any blogs yet. Start sharing your ideas."
                buttonText="Create Blog"
            />
        );
    }

    const publishedCount = blogs.filter(
        (blog) => blog.status === "APPROVED"
    ).length;

    const pendingCount = blogs.filter(
        (blog) => blog.status === "PENDING"
    ).length;

    return (
        <section className="min-h-screen bg-cloud px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple">
                        Your Stories
                    </span>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                        My Blogs
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                        All the blogs you've written, including stories waiting
                        for approval and published articles.
                    </p>

                    {/* Stats */}
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
                            {blogs.length}{" "}
                            {blogs.length === 1 ? "Blog" : "Blogs"}
                        </span>

                        <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
                            {publishedCount} Published
                        </span>

                        <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
                            {pendingCount} Pending
                        </span>
                    </div>
                </div>

                {/* Blogs */}
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="relative flex min-w-0"
                        >
                            {/* Status */}
                            <span
                                className={`absolute right-4 top-4 z-20 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm backdrop-blur-sm ${statusStyle[blog.status]}`}
                            >
                                {statusLabel[blog.status]}
                            </span>

                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyBlogs;