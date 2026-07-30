import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/LogoSmall.png"

const ResetPassword: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <section className="min-h-screen bg-cloud">
            <div className="grid min-h-screen w-full lg:grid-cols-2">

                {/* Left Side */}
                <div className="flex items-center justify-center px-6 py-12 lg:px-16">

                    <div className="w-full max-w-md">

                        {/* Logo */}
                        <div className="mb-10 flex justify-center">
                            <Link
                                to="/"
                                className="font-display text-4xl font-bold text-ink"
                            >
                                <img
                                    src={logo}
                                    alt="Our Web Logo"
                                    className="max-w-55"
                                />

                            </Link>
                        </div>

                        {/* Heading */}
                        <div className="mt-10">

                            <h1 className="text-4xl font-bold text-ink">
                                Reset Password
                            </h1>

                            <p className="mt-4 leading-7 text-gray-500">
                                Create a new password for your account. Your new password
                                should be strong and different from the one you used
                                previously.
                            </p>

                        </div>

                        {/* Form */}
                        <form className="mt-10 space-y-6">
                            {/* New Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    New Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your new password"
                                        className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      px-4
                      py-3
                      pr-12
                      outline-none
                      transition
                      focus:border-purple
                      focus:ring-2
                      focus:ring-purple/20
                    "
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      transition
                      hover:text-purple
                    "
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>

                                </div>

                                <p className="mt-2 text-sm text-gray-500">
                                    Use at least 8 characters with a mix of letters,
                                    numbers, and symbols.
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your new password"
                                        className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      px-4
                      py-3
                      pr-12
                      outline-none
                      transition
                      focus:border-purple
                      focus:ring-2
                      focus:ring-purple/20
                    "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      transition
                      hover:text-purple
                    "
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>

                                </div>
                            </div>

                            {/* Reset Password Button */}
                            <button
                                type="submit"
                                className="
                  w-full
                  rounded-xl
                  bg-purple
                  px-6
                  py-3.5
                  font-semibold
                  text-white
                  transition
                  hover:bg-purple/90
                  hover:shadow-lg
                "
                            >
                                Reset Password
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="h-px flex-1 bg-gray-200" />

                            <span className="px-4 text-sm text-gray-500">
                                Remember your password?
                            </span>

                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        {/* Back to Login */}
                        <a
                            href="/login"
                            className="
                inline-flex
                items-center
                gap-2
                font-medium
                text-purple
                transition
                hover:gap-3
              "
                        >
                            <ArrowLeft size={18} />
                            Back to Login
                        </a>

                    </div>
                </div>
                {/* Right Side Hero */}
                <div className="relative hidden overflow-hidden lg:flex">

                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
                        alt="Reset Password"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-black/75 via-black/55 to-purple/60" />

                    {/* Hero Content */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-12">

                        {/* Badge */}
                        <div className="w-fit rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
                            <span className="text-sm font-medium tracking-wide text-white">
                                Security First
                            </span>
                        </div>

                        {/* Text */}
                        <div className="max-w-lg">

                            <h2 className="text-5xl font-bold leading-tight text-white">
                                Create a
                                <br />
                                Strong Password
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-white/80">
                                Protect your account with a strong password that's
                                unique and difficult to guess. A secure password helps
                                keep your personal information and your blog safe.
                            </p>

                            {/* Password Tips */}
                            <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">

                                <h3 className="text-lg font-semibold text-white">
                                    Password Tips
                                </h3>

                                <ul className="mt-4 space-y-3 text-white/80">

                                    <li>
                                        • Use at least <strong>8 characters</strong>.
                                    </li>

                                    <li>
                                        • Include uppercase and lowercase letters.
                                    </li>

                                    <li>
                                        • Add numbers and special characters.
                                    </li>

                                    <li>
                                        • Don't reuse passwords from other websites.
                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default ResetPassword;