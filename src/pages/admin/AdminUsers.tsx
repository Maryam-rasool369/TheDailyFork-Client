import React, { useMemo, useState } from "react";
import { Search, ShieldCheck, ShieldOff } from "lucide-react";
import { useAdminUsers } from "../../hooks/useAdmin";
import { DEFAULT_AVATAR } from "../../common/constants";
import LoadingState from "../../components/admin/LoadingState";
import StatusPill from "../../components/admin/StatusPill";

const AdminUsers: React.FC = () => {
    const { users, loading } = useAdminUsers();
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return users;
        return users.filter((u) =>
            `${u.firstName} ${u.lastName ?? ""} ${u.email}`.toLowerCase().includes(q)
        );
    }, [users, search]);

    return (
        <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <span className="inline-flex rounded-full bg-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple">
                        Users
                    </span>
                    <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        All Users
                    </h1>
                    <p className="mt-2 text-sm text-ink/60">
                        {users.length} registered {users.length === 1 ? "user" : "users"} on the platform.
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
                    <LoadingState label="Loading users..." />
                ) : filtered.length === 0 ? (
                    <div className="flex min-h-[30vh] items-center justify-center">
                        <p className="text-sm text-ink/50">No users found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-black/5 bg-cloud/60 text-xs font-semibold uppercase tracking-wider text-ink/50">
                                    <th className="px-5 py-3.5">User</th>
                                    <th className="px-5 py-3.5">Phone</th>
                                    <th className="px-5 py-3.5">Verified</th>
                                    <th className="px-5 py-3.5">Subscription</th>
                                    <th className="px-5 py-3.5">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((u) => (
                                    <tr key={u.id} className="border-b border-black/5 last:border-0 hover:bg-cloud/40">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={u.profileImage || DEFAULT_AVATAR}
                                                    alt=""
                                                    className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-black/5"
                                                />
                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-ink">
                                                        {u.firstName} {u.lastName ?? ""}
                                                    </p>
                                                    <p className="truncate text-xs text-ink/50">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-ink/70">{u.phoneNumber ?? "—"}</td>
                                        <td className="px-5 py-3.5">
                                            {u.isVerified ? (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-moss">
                                                    <ShieldCheck className="h-3.5 w-3.5" /> Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/40">
                                                    <ShieldOff className="h-3.5 w-3.5" /> Unverified
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {u.subscription ? (
                                                <StatusPill status={u.subscription.status} />
                                            ) : (
                                                <StatusPill status="none" label="No plan" />
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-ink/60">
                                            {new Date(u.createdAt).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
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

export default AdminUsers;
