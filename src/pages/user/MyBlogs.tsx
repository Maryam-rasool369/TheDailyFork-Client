import React from "react";
import { Search } from "lucide-react";
import EmptyState from "../../components/blog/EmptyState";
import Pagination from "../../components/blog/Pagination";
import BlogCard from "../../components/blog/BlogCard";
import LoadingState from "../../components/admin/LoadingState";
import { useMyBlogs } from "../../hooks/useBlog";
import type { Blog } from "../../common/types/blogType";

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
    const {
        blogs, loading, page, setPage, totalPages, total,
        search, setSearch, isSearching,
    } = useMyBlogs();

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // First load only; later loads keep the page (and the search box) on screen
    if (loading && blogs.length === 0 && !isSearching) {
        return <LoadingState label="Loading your blogs..." />;
    }

    // The user truly has no blogs (as opposed to a search that found nothing)
    if (!loading && total === 0 && !isSearching) {
        return (
            <EmptyState
                title="No Blogs Yet"
                description="You haven't written any blogs yet. Start sharing your ideas."
                buttonText="Create Blog"
            />
        );
    }

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
                            {total} {total === 1 ? "Blog" : "Blogs"}
                        </span>
                    </div>
                </div>

                {/* Search */}
                <div className="mx-auto mt-10 max-w-2xl">
                    <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 shadow-sm">
                        <Search className="h-5 w-5 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search your blogs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent px-3 py-4 outline-none"
                        />
                    </div>
                </div>

                {/* Blogs */}
                {loading ? (
                    <LoadingState label="Loading your blogs..." />
                ) : blogs.length > 0 ? (
                    <>
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

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <p className="mt-10 text-center text-gray-500">
                        No blogs match your search.
                    </p>
                )}
            </div>
        </section>
    );
};

export default MyBlogs;
