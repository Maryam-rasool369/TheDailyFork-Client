import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/LogoSmall.png"

const ForgotPassword: React.FC = () => {
    return (
        <section className="min-h-screen w-full bg-cloud">
            <div className="grid min-h-screen   lg:grid-cols-2">

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
                                Forgot Password?
                            </h1>

                            <p className="mt-4 leading-7 text-gray-500">
                                No worries! Enter the email address associated with your
                                account and we'll send you a secure password reset link.
                            </p>

                        </div>

                        {/* Form */}
                        <form className="mt-10 space-y-6">
                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-2
                    outline-none
                    transition
                    focus:border-purple
                    focus:ring-2
                    focus:ring-purple/20
                  "
                                />
                            </div>

                            {/* Send Reset Link */}
                            <button
                                type="submit"
                                className="
                  w-full
                  rounded-xl
                  bg-purple
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-purple/90
                  hover:shadow-lg
                "
                            >
                                Send Reset Link
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
                <div className="relative hidden lg:flex">

                    <img
                        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop"
                        alt="Reset Password"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-br from-black/70 via-black/50 to-purple/60" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-12">

                        {/* Badge */}
                        <div className="w-fit rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">
                            <span className="text-sm font-medium tracking-wide text-white">
                                Account Recovery
                            </span>
                        </div>

                        {/* Hero Text */}
                        <div className="max-w-lg">

                            <h2 className="text-5xl font-bold leading-tight text-white">
                                Don't worry,
                                <br />
                                we've got you covered.
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-white/80">
                                Enter your registered email address and we'll send you a
                                secure password reset link. You'll be back in your account
                                in just a few moments.
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default ForgotPassword;