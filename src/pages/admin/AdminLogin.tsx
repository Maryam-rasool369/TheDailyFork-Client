import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import logo from "../../assets/logos/LogoSmall.png";
import { loginSchema, type LoginFormData } from "../../validations/auth.validation";
import { useAuthStore } from "../../store/authStore";
import { adminLoginApi } from "../../api/adminApi";

const AdminLogin: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const setAuth = useAuthStore((s) => s.setAuth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await adminLoginApi(data);
            setAuth(result.token, result.user);
            toast.success("Welcome back, admin");
            navigate("/admin", { replace: true });
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Login failed");
        }
    };

    return (
        <section className="flex min-h-screen w-full items-center justify-center bg-ink px-4 py-12">
            <div className="w-full max-w-md">
                <div className="rounded-section border border-white/10 bg-[#1c1a2b] p-8 shadow-2xl sm:p-10">
                    {/* Logo + badge */}
                    <div className="flex flex-col items-center text-center">
                        <img src={logo} alt="Logo" className="h-9 w-auto brightness-0 invert" />

                        <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-purple/20 ring-1 ring-purple/40">
                            <ShieldCheck className="h-6 w-6 text-purple" strokeWidth={2} />
                        </div>

                        <h1 className="mt-4 text-2xl font-bold text-white">Admin Access</h1>
                        <p className="mt-2 text-sm text-white/50">
                            Sign in with your administrator credentials to manage the platform.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
                                Email Address
                            </label>
                            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/30">
                                <Mail className="h-5 w-5 text-white/30" />
                                <input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="admin@blogweb.com"
                                    className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-white/30"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-white/80">
                                Password
                            </label>
                            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4 transition focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/30">
                                <Lock className="h-5 w-5 text-white/30" />
                                <input
                                    {...register("password")}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent px-3 py-3 text-white outline-none placeholder:text-white/30"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="text-white/40 transition hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-xl bg-purple py-3 font-semibold text-white transition duration-200 hover:bg-purple-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Signing in..." : "Sign in to Admin Panel"}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-white/30">
                    Restricted area — authorized personnel only.
                </p>
            </div>
        </section>
    );
};

export default AdminLogin;
