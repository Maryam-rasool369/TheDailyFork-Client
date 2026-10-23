import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmailApi } from "../../api/authApi";

type Status = "verifying" | "success" | "error";

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<Status>("verifying");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid or missing verification link.");
            return;
        }

        verifyEmailApi(token)
            .then(() => setStatus("success"))
            .catch((err: any) => {
                setStatus("error");
                setMessage(err.response?.data?.message ?? "Invalid or expired verification link.");
            });
    }, [token]);

    return (
        <section className="min-h-[70vh] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl rounded-card border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
                {status === "verifying" && (
                    <>
                        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-purple/20 border-t-purple" />
                        <h1 className="mt-6 text-h2 font-bold text-ink">Verifying Your Email</h1>
                        <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                            Please wait a moment...
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss-soft text-3xl text-moss">
                            ✓
                        </span>
                        <h1 className="mt-6 text-h2 font-bold text-ink">Email Verified</h1>
                        <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                            Your email has been verified successfully. You can now log in to your account.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link
                                to="/login"
                                className="rounded-button bg-purple px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-deep"
                            >
                                Go to Login
                            </Link>
                        </div>
                    </>
                )}

                {status === "error" && (
                    <>
                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
                            ✕
                        </span>
                        <h1 className="mt-6 text-h2 font-bold text-ink">Verification Failed</h1>
                        <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                            {message}
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link
                                to="/"
                                className="rounded-button border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-gray-50"
                            >
                                Go to Home
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default VerifyEmail;
