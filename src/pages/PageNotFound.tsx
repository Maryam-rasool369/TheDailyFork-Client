
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const PageNotFound: React.FC = () => {
    return (
        <section className="flex min-h-[70vh] items-center justify-center px-6 py-16">
            <div className="max-w-xl text-center">
                <p className="text-8xl font-extrabold tracking-tight text-purple">
                    404
                </p>

                <h1 className="mt-6 text-3xl font-bold text-ink sm:text-4xl">
                    Page Not Found
                </h1>

                <p className="mx-auto mt-4 max-w-md leading-7 text-gray-600">
                    Sorry, the page you're looking for doesn't exist or may
                    have been moved.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-xl bg-purple px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        <Home className="h-5 w-5" />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Go Back
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PageNotFound;
