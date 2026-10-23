import React, { useMemo, useState } from "react";
import { Search, Eye, Check, X as XIcon, Calendar, Loader2 } from "lucide-react";
import { useAdminBlogs } from "../../hooks/useAdmin";
import type { AdminBlog } from "../../common/types/adminType";
import type { BlogStatus } from "../../common/types/blogType";
import { DEFAULT_AVATAR } from "../../common/constants";
import LoadingState from "../../components/admin/LoadingState";
import StatusPill from "../../components/admin/StatusPill";

const TABS: { key: BlogStatus | "ALL"; label: string }[] = [
    { key: "ALL", label: "All" },
    { key: "PENDING", label: "Pending" },
    { key: "APPROVED", label: "Approved" },
    { key: "REJECTED", label: "Rejected" },
];

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

const renderContent = (content: string) => {
    const hasHtml = /<([a-z][\w-]*)\b[^>]*>/i.test(content);
    if (hasHtml) return <div dangerouslySetInnerHTML={{ __html: content }} />;
    return <div className="whitespace-pre-line">{content}</div>;
};

const AdminBlogs: React.FC = () => {
    const { blogs, loading, actioningId, approveBlog, rejectBlog } = useAdminBlogs();
    const [tab, setTab] = useState<BlogStatus | "ALL">("PENDING");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<AdminBlog | null>(null);

    const counts = useMemo(
        () => ({
            ALL: blogs.length,
            PENDING: blogs.filter((b) => b.status === "PENDING").length,
            APPROVED: blogs.filter((b) => b.status === "APPROVED").length,
            REJECTED: blogs.filter((b) => b.status === "REJECTED").length,
        }),
        [blogs]
    );

    const filtered = useMemo(() => {
        let list = tab === "ALL" ? blogs : blogs.filter((b) => b.status === tab);
        const q = search.trim().toLowerCase();
        if (q) {
            list = list.filter((b) =>
                `${b.title} ${b.author.firstName} ${b.author.lastName ?? ""}`.toLowerCase().includes(q)
            );
        }
        return list;
    }, [blogs, tab, search]);

    const handleApprove = async (id: number) => {
        await approveBlog(id);
        setSelected((prev) => (prev && prev.id === id ? { ...prev, status: "APPROVED" } : prev));
    };

    const handleReject = async (id: number) => {
        await rejectBlog(id);
        setSelected((prev) => (prev && prev.id === id ? { ...prev, status: "REJECTED" } : prev));
    };

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <span className="inline-flex rounded-full bg-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple">
                        Moderation
                    </span>
                    <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        Blogs
                    </h1>
                    <p className="mt-2 text-sm text-ink/60">
                        Review submissions and approve or reject them before they go live.
                    </p>
                </div>

                <div className="flex items-center rounded-button border border-black/10 bg-white px-3.5 py-2.5 sm:w-72">
                    <Search className="h-4 w-4 text-ink/30" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by title or author"
                        className="w-full bg-transparent px-2.5 text-sm outline-none placeholder:text-ink/30"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
                {TABS.map(({ key, label }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setTab(key)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            tab === key
                                ? "bg-ink text-white"
                                : "bg-white text-ink/60 ring-1 ring-black/10 hover:bg-cloud"
                        }`}
                    >
                        {label}
                        <span className="ml-1.5 opacity-60">{counts[key]}</span>
                    </button>
                ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-card border border-black/5 bg-white shadow-sm">
                {loading ? (
                    <LoadingState label="Loading blogs..." />
                ) : filtered.length === 0 ? (
                    <div className="flex min-h-[30vh] items-center justify-center">
                        <p className="text-sm text-ink/50">No blogs in this category.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[840px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-black/5 bg-cloud/60 text-xs font-semibold uppercase tracking-wider text-ink/50">
                                    <th className="px-5 py-3.5">Blog</th>
                                    <th className="px-5 py-3.5">Author</th>
                                    <th className="px-5 py-3.5">Category</th>
                                    <th className="px-5 py-3.5">Submitted</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((blog) => (
                                    <tr key={blog.id} className="border-b border-black/5 last:border-0 hover:bg-cloud/40">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={blog.imageUrl}
                                                    alt=""
                                                    className="h-11 w-14 shrink-0 rounded-lg object-cover ring-1 ring-black/5"
                                                />
                                                <p className="line-clamp-2 max-w-xs font-medium text-ink">
                                                    {blog.title}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-ink/70">
                                            {blog.author.firstName} {blog.author.lastName ?? ""}
                                        </td>
                                        <td className="px-5 py-3.5 text-ink/70">{blog.category.name}</td>
                                        <td className="px-5 py-3.5 text-ink/60">{formatDate(blog.createdAt)}</td>
                                        <td className="px-5 py-3.5">
                                            <StatusPill status={blog.status} />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelected(blog)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition hover:bg-purple/10 hover:text-purple"
                                                    title="View details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>

                                                {blog.status !== "APPROVED" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleApprove(blog.id)}
                                                        disabled={actioningId === blog.id}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full text-moss transition hover:bg-moss-soft disabled:cursor-not-allowed disabled:opacity-50"
                                                        title="Approve"
                                                    >
                                                        {actioningId === blog.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Check className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                )}

                                                {blog.status !== "REJECTED" && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReject(blog.id)}
                                                        disabled={actioningId === blog.id}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                        title="Reject"
                                                    >
                                                        {actioningId === blog.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <XIcon className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail modal */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setSelected(null)}
                            aria-label="Close"
                            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm transition hover:bg-gray-100 hover:text-gray-800"
                        >
                            <XIcon className="h-5 w-5" />
                        </button>

                        <div className="max-h-[85vh] overflow-y-auto">
                            <img
                                src={selected.imageUrl}
                                alt={selected.title}
                                className="h-56 w-full object-cover sm:h-72"
                            />

                            <div className="p-6 sm:p-8">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-flex items-center rounded-full border border-purple/20 bg-purple/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple">
                                        {selected.category.name}
                                    </span>
                                    <StatusPill status={selected.status} />
                                </div>

                                <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                                    {selected.title}
                                </h2>

                                <p className="mt-3 text-sm leading-7 text-ink/60">{selected.shortDescription}</p>

                                <div className="mt-5 flex items-center gap-3 border-y border-black/5 py-4">
                                    <img
                                        src={DEFAULT_AVATAR}
                                        alt=""
                                        className="h-10 w-10 rounded-full object-cover ring-1 ring-black/5"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-ink">
                                            {selected.author.firstName} {selected.author.lastName ?? ""}
                                        </p>
                                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-ink/50">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {formatDate(selected.createdAt)}
                                        </div>
                                    </div>
                                </div>

                                <article className="prose prose-sm mt-6 max-w-none text-ink/80 prose-headings:text-ink prose-a:text-purple">
                                    {renderContent(selected.content)}
                                </article>

                                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                    {selected.status !== "REJECTED" && (
                                        <button
                                            type="button"
                                            onClick={() => handleReject(selected.id)}
                                            disabled={actioningId === selected.id}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <XIcon className="h-4 w-4" />
                                            Reject
                                        </button>
                                    )}
                                    {selected.status !== "APPROVED" && (
                                        <button
                                            type="button"
                                            onClick={() => handleApprove(selected.id)}
                                            disabled={actioningId === selected.id}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-moss px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-moss/90 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <Check className="h-4 w-4" />
                                            Approve
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogs;
