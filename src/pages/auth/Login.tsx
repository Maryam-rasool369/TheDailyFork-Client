import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/LogoSmall.png"
const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="min-h-screen bg-cloud">
      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* ================= Left Side ================= */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">

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
            <div className="text-center">
              <h1 className="text-2xl font-bold text-ink">
                Welcome Back
              </h1>

              <p className="mt-3 text-small text-ink/70">
                Sign in to continue your reading journey and discover
                inspiring stories every day.
              </p>
            </div>

            {/* Social Login */}
            <div className="mt-10 space-y-4">

              {/* Google */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-ink transition hover:border-purple hover:bg-purple/5"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />

                Continue with Google
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-ink transition hover:border-purple hover:bg-purple/5"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="h-5 w-5"
                />

                Continue with Facebook
              </button>

            </div>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="text-sm font-medium uppercase tracking-widest text-gray-500">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            {/* Form Starts Here */}
            <form className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Email Address
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 transition focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/20">
                  <Mail className="h-5 w-5 text-gray-400" />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-3 outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 transition focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/20">
                  <Lock className="h-5 w-5 text-gray-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent px-3 py-3 outline-none placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 transition hover:text-purple"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-purple transition hover:text-moss"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-purple py-3 font-semibold text-white transition duration-200 hover:bg-purple/90 active:scale-[0.98]"
              >
                Sign In
              </button>

              {/* Sign Up */}
              <p className="text-center text-sm text-ink/70">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-semibold text-purple transition hover:text-moss"
                >
                  Sign Up
                </a>
              </p>

              {/* Terms */}
              <p className="text-center text-xs leading-6 text-gray-500">
                By continuing, you agree to our{" "}
                <a
                  href="#"
                  className="font-medium text-purple hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-purple hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>

            </form>
          </div>
        </div>

        {/* ================= Right Side ================= */}
        <div className="relative hidden lg:flex lg:w-1/2">

          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80"
            alt="Reading books"
            className="h-full w-full object-cover"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink/85 via-ink/60 to-purple/70" />

          {/* Decorative Badge */}
          <div className="absolute right-8 top-8">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              ✨ Join 25,000+ Readers
            </span>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">

            <span className="mb-4 w-fit rounded-full bg-moss px-4 py-2 text-sm font-semibold uppercase tracking-widest text-ink">
              Featured Stories
            </span>

            <h2 className="max-w-lg text-5xl font-bold leading-tight">
              Read.
              <br />
              Learn.
              <br />
              Grow.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
              Explore thousands of articles, tutorials and inspiring stories
              written by developers, designers and creators from around the
              world.
            </p>

            <div className="mt-10 flex items-center gap-6">

              <div>
                <h3 className="text-3xl font-bold">20K+</h3>
                <p className="text-sm text-white/70">
                  Articles Published
                </p>
              </div>

              <div className="h-10 w-px bg-white/20" />

              <div>
                <h3 className="text-3xl font-bold">50K+</h3>
                <p className="text-sm text-white/70">
                  Active Readers
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Login;