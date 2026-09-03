import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import EmptyState from "../../components/blog/EmptyState";
import { getApprovedBlogsApi } from "../../api/blogApi";
import { useCategories } from "../../hooks/useCategory";
import type { Blog } from "../../common/types/blogType";
import BlogCard from "../../components/blog/BlogCard";

const sortOptions = ["Latest", "Oldest"];

const Blogs: React.FC = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("Latest");

    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category");

    const [selectedCategory, setSelectedCategory] = useState("All");

    const { categories } = useCategories();

    const categoryNames = useMemo(
        () => ["All", ...categories.map((c) => c.name)],
        [categories]
    );

    useEffect(() => {
        getApprovedBlogsApi()
            .then(setBlogs)
            .catch(() => toast.error("Failed to load blogs"))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!categoryFromUrl) {
            setSelectedCategory("All");
            return;
        }

        const match = categoryNames.find(
            (category) =>
                category.toLowerCase() === categoryFromUrl.toLowerCase()
        );

        setSelectedCategory(match || "All");
    }, [categoryFromUrl, categoryNames]);

    const filteredBlogs = useMemo(() => {
        let filtered = [...blogs];

        if (search.trim()) {
            filtered = filtered.filter((blog) =>
                blog.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedCategory !== "All") {
            filtered = filtered.filter(
                (blog) =>
                    blog.category.name.toLowerCase() ===
                    selectedCategory.toLowerCase()
            );
        }

        filtered.sort((a, b) => {
            const diff =
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime();

            return sortBy === "Latest" ? -diff : diff;
        });

        return filtered;
    }, [blogs, search, selectedCategory, sortBy]);

    return (
        <section className="py-10">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-ink">
                    Explore Blogs
                </h1>

                <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
                    Discover stories, tutorials, opinions and ideas from
                    writers around the world.
                </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
                <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 shadow-sm">
                    <Search className="h-5 w-5 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent px-3 py-4 outline-none"
                    />
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-3">
                    {categoryNames.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition ${selectedCategory === category
                                ? "bg-purple text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-purple/10"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none"
                >
                    {sortOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-8">
                <p className="text-gray-500 ">
                    Showing{" "}
                    <span className="font-semibold text-ink">
                        {filteredBlogs.length}
                    </span>{" "}
                    articles
                </p>
            </div>

            {loading ? (
                <p className="mt-10 text-center text-gray-500">
                    Loading blogs...
                </p>
            ) : filteredBlogs.length > 0 ? (
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                    {filteredBlogs.map((blog) => (
                        <BlogCard blog={blog} />
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="No Blogs Found"
                    description="Try searching with another keyword or choose another category."
                    buttonText="Create Blog"
                />
            )}
        </section>
    );
};

export default Blogs;
