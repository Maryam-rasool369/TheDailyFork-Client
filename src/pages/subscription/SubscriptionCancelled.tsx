import React from "react";
import { Link } from "react-router-dom";

const SubscriptionCancelled: React.FC = () => {
    return (
        <section className="min-h-[70vh] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl rounded-card border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft text-3xl text-gold">
                    ✕
                </span>

                <h1 className="mt-6 text-h2 font-bold text-ink">
                    Checkout Cancelled
                </h1>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                    You cancelled the checkout process. No charges were made. You can
                    try again whenever you're ready.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        to="/pricing"
                        className="rounded-button bg-purple px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-deep"
                    >
                        Back to Pricing
                    </Link>
                    <Link
                        to="/"
                        className="rounded-button border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-gray-50"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SubscriptionCancelled;
