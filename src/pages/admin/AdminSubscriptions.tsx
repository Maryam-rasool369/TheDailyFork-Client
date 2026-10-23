import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useAdminSubscriptions } from "../../hooks/useAdmin";
import LoadingState from "../../components/admin/LoadingState";
import StatusPill from "../../components/admin/StatusPill";

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const AdminSubscriptions: React.FC = () => {
    const { subscribers, loading } = useAdminSubscriptions();
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return subscribers;
        return subscribers.filter((u) =>
            `${u.firstName} ${u.lastName ?? ""} ${u.email}`.toLowerCase().includes(q)
        );
    }, [subscribers, search]);

    const activeCount = subscribers.filter(
        (u) => u.subscription?.status === "active" || u.subscription?.status === "trialing"
    ).length;

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <span className="inline-flex rounded-full bg-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple">
                        Billing
                    </span>
                    <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        Subscriptions
                    </h1>
                    <p className="mt-2 text-sm text-ink/60">
                        {subscribers.length} subscriber{subscribers.length === 1 ? "" : "s"} · {activeCount} active
                    </p>
                </div>

                <div className="flex items-center rounded-button border border-black/10 bg-white px-3.5 py-2.5 sm:w-72">
                    <Search className="h-4 w-4 text-ink/30" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email"
                        className="w-full bg-transparent px-2.5 text-sm outline-none placeholder:text-ink/30"
                    />
                </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-card border border-black/5 bg-white shadow-sm">
                {loading ? (
                    <LoadingState label="Loading subscriptions..." />
                ) : filtered.length === 0 ? (
                    <div className="flex min-h-[30vh] items-center justify-center">
                        <p className="text-sm text-ink/50">No subscribers found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-black/5 bg-cloud/60 text-xs font-semibold uppercase tracking-wider text-ink/50">
                                    <th className="px-5 py-3.5">First Name</th>
                                    <th className="px-5 py-3.5">Last Name</th>
                                    <th className="px-5 py-3.5">Email</th>
                                    <th className="px-5 py-3.5">Phone</th>
                                    <th className="px-5 py-3.5">Plan</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5">Renews / Ends</th>
                                    <th className="px-5 py-3.5">Auto-Renew</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((u) => (
                                    <tr key={u.id} className="border-b border-black/5 last:border-0 hover:bg-cloud/40">
                                        <td className="px-5 py-3.5 font-medium text-ink">{u.firstName}</td>
                                        <td className="px-5 py-3.5 text-ink/70">{u.lastName ?? "—"}</td>
                                        <td className="px-5 py-3.5 text-ink/70">{u.email}</td>
                                        <td className="px-5 py-3.5 text-ink/70">{u.phoneNumber ?? "—"}</td>
                                        <td className="px-5 py-3.5">
                                            {u.subscription ? (
                                                <span className="font-medium text-ink">
                                                    {u.subscription.plan === "MONTHLY" ? "Monthly" : "Yearly"}
                                                </span>
                                            ) : (
                                                <span className="text-ink/40">—</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {u.subscription ? (
                                                <StatusPill status={u.subscription.status} />
                                            ) : (
                                                <StatusPill status="none" label="No plan" />
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-ink/70">
                                            {u.subscription ? formatDate(u.subscription.currentPeriodEnd) : "—"}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {u.subscription ? (
                                                u.subscription.cancelAtPeriodEnd ? (
                                                    <span className="text-xs font-medium text-gold">Off</span>
                                                ) : (
                                                    <span className="text-xs font-medium text-moss">On</span>
                                                )
                                            ) : (
                                                <span className="text-ink/40">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSubscriptions;
