import React from "react";
import { Users, FileText, Clock, CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { useAdminStats } from "../../hooks/useAdmin";
import { useAuthStore } from "../../store/authStore";
import StatCard from "../../components/admin/StatCard";
import LoadingState from "../../components/admin/LoadingState";

const AdminDashboard: React.FC = () => {
    const { stats, loading } = useAdminStats();
    const user = useAuthStore((s) => s.user);

    return (
        <div>
            <div>
                <span className="inline-flex rounded-full bg-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple">
                    Overview
                </span>
                <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    Welcome back, {user?.firstName ?? "Admin"}
                </h1>
                <p className="mt-2 text-sm text-ink/60">
                    Here's what's happening across the platform right now.
                </p>
            </div>

            {loading || !stats ? (
                <div className="mt-10">
                    <LoadingState label="Loading dashboard..." />
                </div>
            ) : (
                <>
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <StatCard label="Total Users" value={stats.totalUsers} icon={Users} tone="purple" />
                        <StatCard label="Total Blogs" value={stats.totalBlogs} icon={FileText} tone="ink" />
                        <StatCard label="Pending Review" value={stats.pendingBlogs} icon={Clock} tone="gold" />
                        <StatCard label="Approved Blogs" value={stats.approvedBlogs} icon={CheckCircle2} tone="moss" />
                        <StatCard label="Rejected Blogs" value={stats.rejectedBlogs} icon={XCircle} tone="ink" />
                        <StatCard
                            label="Active Subscriptions"
                            value={stats.activeSubscriptions}
                            icon={CreditCard}
                            tone="purple"
                        />
                    </div>

                    {stats.pendingBlogs > 0 && (
                        <div className="mt-8 flex items-center justify-between rounded-card border border-gold/30 bg-gold-soft px-5 py-4">
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-gold" />
                                <p className="text-sm font-medium text-ink">
                                    {stats.pendingBlogs} blog{stats.pendingBlogs === 1 ? "" : "s"} waiting for your
                                    review.
                                </p>
                            </div>
                            <a
                                href="/admin/blogs"
                                className="rounded-button bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-ink/90"
                            >
                                Review now
                            </a>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
