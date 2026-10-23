import React, { useEffect, useMemo, useState } from "react";
import { Search, ChevronUp, ChevronDown, X as XIcon, Check } from "lucide-react";
import { useAdminBlogs, useSetFeaturedBlogs } from "../../hooks/useAdmin";
import LoadingState from "../../components/admin/LoadingState";

const FEATURED_COUNT = 3;

const SLOT_LABELS = ["Main banner", "Side card 1", "Side card 2"];

const AdminFeatured: React.FC = () => {
    const { blogs, loading, refetch } = useAdminBlogs();
    const { saveFeaturedBlogs, isSaving } = useSetFeaturedBlogs();

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [search, setSearch] = useState("");

    // Only approved blogs can be featured
    const approvedBlogs = useMemo(
        () => blogs.filter((b) => b.status === "APPROVED"),
        [blogs]
    );

    // Start from whatever is currently featured, in order
    useEffect(() => {
        setSelectedIds(
            blogs
                .filter((b) => b.status === "APPROVED" && b.featuredOrder != null)
                .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
                .map((b) => b.id)
        );
    }, [blogs]);

    const selectedBlogs = selectedIds
        .map((id) => approvedBlogs.find((b) => b.id === id))
        .filter((b) => b !== undefined);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return approvedBlogs;

        return approvedBlogs.filter((b) =>
            `${b.title} ${b.author.firstName} ${b.author.lastName ?? ""}`.toLowerCase().includes(q)
        );
    }, [approvedBlogs, search]);

    const toggleBlog = (id: number) => {
        setSelectedIds((prev) => {
            if (prev.includes(id)) return prev.filter((x) => x !== id);
            if (prev.length >= FEATURED_COUNT) return prev;
            return [...prev, id];
        });
    };

    const moveBlog = (index: number, direction: -1 | 1) => {
        setSelectedIds((prev) => {
            const target = index + direction;
            if (target < 0 || target >= prev.length) return prev;

            const next = [...prev];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });
    };

    const handleSave = async () => {
        const success = await saveFeaturedBlogs(selectedIds);
        if (success) await refetch();
    };

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <span className="inline-flex rounded-full bg-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple">
                        Home page
                    </span>
                    <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        Featured Blogs
                    </h1>
                    <p className="mt-2 text-sm text-ink/60">
                        Pick exactly {FEATURED_COUNT} approved blogs for the home page hero section.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving || selectedIds.length !== FEATURED_COUNT}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isSaving ? "Saving..." : "Save featured blogs"}
                </button>
            </div>

            {loading ? (
                <LoadingState label="Loading blogs..." />
            ) : (
                <>
                    {/* Selected slots */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {Array.from({ length: FEATURED_COUNT }).map((_, index) => {
                            const blog = selectedBlogs[index];

                            return (
                                <div
                                    key={index}
                                    className="rounded-card border border-black/5 bg-white p-4 shadow-sm"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                                        {index + 1}. {SLOT_LABELS[index]}
                                    </p>

                                    {blog ? (
                                        <div className="mt-3 flex items-start gap-3">
                                            <img
                                                src={blog.imageUrl}
                                                alt=""
                                                className="h-11 w-14 shrink-0 rounded-lg object-cover ring-1 ring-black/5"
                                            />

                                            <p className="line-clamp-2 min-w-0 flex-1 text-sm font-medium text-ink">
                                                {blog.title}
                                            </p>

                                            <div className="flex shrink-0 flex-col">
                                                <button
                                                    type="button"
                                                    onClick={() => moveBlog(index, -1)}
                                                    disabled={index === 0}
                                                    aria-label="Move up"
                                                    className="text-ink/40 transition hover:text-purple disabled:cursor-not-allowed disabled:opacity-30"
                                                >
                                                    <ChevronUp className="h-4 w-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => moveBlog(index, 1)}
                                                    disabled={index === selectedBlogs.length - 1}
                                                    aria-label="Move down"
                                                    className="text-ink/40 transition hover:text-purple disabled:cursor-not-allowed disabled:opacity-30"
                                                >
                                                    <ChevronDown className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => toggleBlog(blog.id)}
                                                aria-label="Remove"
                                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-red-600 transition hover:bg-red-50"
                                            >
                                                <XIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <p className="mt-3 text-sm text-ink/40">Empty slot</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Search */}
                    <div className="mt-6 flex items-center rounded-button border border-black/10 bg-white px-3.5 py-2.5 sm:w-72">
                        <Search className="h-4 w-4 text-ink/30" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or author"
                            className="w-full bg-transparent px-2.5 text-sm outline-none placeholder:text-ink/30"
                        />
                    </div>

                    {/* Approved blogs */}
                    <div className="mt-4 overflow-hidden rounded-card border border-black/5 bg-white shadow-sm">
                        {filtered.length === 0 ? (
                            <div className="flex min-h-[30vh] items-center justify-center">
                                <p className="text-sm text-ink/50">No approved blogs found.</p>
                            </div>
                        ) : (
                            <ul>
                                {filtered.map((blog) => {
                                    const isSelected = selectedIds.includes(blog.id);
                                    const isDisabled = !isSelected && selectedIds.length >= FEATURED_COUNT;

                                    return (
                                        <li
                                            key={blog.id}
                                            className="border-b border-black/5 last:border-0"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => toggleBlog(blog.id)}
                                                disabled={isDisabled}
                                                className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-cloud/40 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <img
                                                    src={blog.imageUrl}
                                                    alt=""
                                                    className="h-11 w-14 shrink-0 rounded-lg object-cover ring-1 ring-black/5"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <p className="line-clamp-1 text-sm font-medium text-ink">
                                                        {blog.title}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-ink/50">
                                                        {blog.author.firstName} {blog.author.lastName ?? ""} • {blog.category.name}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ${
                                                        isSelected
                                                            ? "bg-purple text-white ring-purple"
                                                            : "bg-white text-transparent ring-black/15"
                                                    }`}
                                                >
                                                    <Check className="h-4 w-4" />
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminFeatured;
