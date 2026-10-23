import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/logos/LogoSmall.png"
import AuthHero from "../../components/auth/AuthHero";
import AuthButtons from "../../components/auth/AuthButtons";
import TermsConditionsPrivacy from "../../components/auth/TermsConditionsPrivacy";
import { signupSchema, type SignupFormData } from "../../validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const onSubmit = async (data: SignupFormData) => {
    await signup(data);
  };

  return (
    <section className="min-h-screen bg-cloud">
      <div className="mx-auto flex min-h-screen max-w-7xl">

        {/* ================= Left Side ================= */}
        <AuthHero />

        {/* ================= Right Side ================= */}
        <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">

          <div className="w-full max-w-lg">

            {/* Logo */}
            <div className="mb-8 flex justify-center">
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
              <h1 className="text-4xl font-bold text-ink">
                Create Account
              </h1>

              <p className="mt-3 text-base text-ink/70">
                Join our community and start discovering, writing and sharing
                amazing stories.
              </p>
            </div>
            {/* Social Login */}
            <AuthButtons />

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300"></div>

              <span className="text-sm font-medium uppercase tracking-widest text-gray-500">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5">

              {/* First & Last Name */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    First Name
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 transition focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/20">
                    <User className="h-5 w-5 text-gray-400" />

                    <input
                      {...register("firstName")}
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="w-full bg-transparent px-3 py-2 outline-none placeholder:text-gray-400"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    Last Name
                  </label>

                  <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 transition focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/20">
                    <User className="h-5 w-5 text-gray-400" />

                    <input
                      {...register("lastName")}
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="w-full bg-transparent px-3 py-2 outline-none placeholder:text-gray-400"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

              </div>

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
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent px-3 py-2 outline-none placeholder:text-gray-400"
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}

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
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full bg-transparent px-3 py-2 outline-none placeholder:text-gray-400"
                  />

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}

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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Confirm Password
                </label>

                <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 transition focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/20">
                  <Lock className="h-5 w-5 text-gray-400" />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full bg-transparent px-3 py-2 outline-none placeholder:text-gray-400"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="text-gray-500 transition hover:text-purple"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Create Account Button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full rounded-xl bg-purple py-3 font-semibold text-white transition duration-200 hover:bg-purple/90 active:scale-[0.98]"
              >
                {isSubmitting ? "Creating account" : "Create"}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-ink/70">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-purple transition hover:text-moss"
                >
                  Login
                </Link>
              </p>

              {/* Terms */}
              <TermsConditionsPrivacy />

            </form>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Signup;