import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    FileText,
    CreditCard,
    Star,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import logo from "../assets/logos/LogoSmall.png";
import { useAuthStore } from "../store/authStore";
import { DEFAULT_AVATAR } from "../common/constants";
import { logoutApi } from "../api/authApi";

const NAV_ITEMS = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/blogs", label: "Blogs", icon: FileText },
    { to: "/admin/featured", label: "Featured", icon: Star },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
];

const AdminLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const handleLogout = async () => {
        try {
            // Revoke the token on the server so it can't be reused
            await logoutApi();
        } catch {
            // Even if the request fails (offline, already expired), still log out locally
        } finally {
            logout();
            navigate("/admin/login");
        }
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 rounded-button px-4 py-2.5 text-sm font-medium transition ${
            isActive
                ? "bg-purple text-white shadow-sm"
                : "text-ink/70 hover:bg-purple/10 hover:text-ink"
        }`;

    const sidebarContent = (
        <>
            <div className="flex items-center gap-3 px-2 py-1">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    Admin
                </span>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-1.5">
                {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={navLinkClass}
                        onClick={() => setSidebarOpen(false)}
                    >
                        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto border-t border-black/5 pt-4">
                <div className="flex items-center gap-3 rounded-button px-2 py-2">
                    <img
                        src={user?.profileImage || DEFAULT_AVATAR}
                        alt=""
                        className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">
                            {user?.firstName} {user?.lastName ?? ""}
                        </p>
                        <p className="truncate text-xs text-ink/50">{user?.email}</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-button px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                    <LogOut className="h-[18px] w-[18px]" strokeWidth={2} />
                    Log out
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-cloud">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-black/5 bg-white px-4 py-6 lg:flex">
                {sidebarContent}
            </aside>

            {/* Mobile topbar */}
            <header className="sticky top-0 z-30 flex items-center justify-between border-b border-black/5 bg-white px-4 py-3 lg:hidden">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="h-7 w-auto" />
                    <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Admin
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="flex h-9 w-9 items-center justify-center rounded-button text-ink/70 hover:bg-purple/10"
                    aria-label="Open menu"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </header>

            {/* Mobile drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white px-4 py-6 shadow-xl">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-black/5"
                            aria-label="Close menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        {sidebarContent}
                    </aside>
                </div>
            )}

            {/* Main content */}
            <main className="lg:pl-64">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
