import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubscriptionStatusApi } from "../../api/stripeApi";
import type { SubscriptionStatus } from "../../common/types/subscriptionType";

const SubscriptionSuccess: React.FC = () => {
    const [status, setStatus] = useState<SubscriptionStatus | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSubscriptionStatusApi()
            .then(setStatus)
            .catch(() => setStatus(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="min-h-[70vh] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-xl rounded-card border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-12">

                {
                    status?.isActive
                    &&
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss-soft text-3xl text-moss">
                        ✓
                    </span>}

                {
                    status?.isActive
                        ?
                        <h1 className="mt-6 text-h2 font-bold text-ink">
                            Subscription Successful
                        </h1>
                        :
                        <h1 className="mt-6 text-h2 font-bold text-ink">
                            Looks Like Your Subscription Was Not Successful
                        </h1>
                }

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                    {loading
                        ? "Confirming your subscription..."
                        : status?.isActive
                            ? "Your subscription is now active. You have full access to premium content."
                            : "There was an issue with your payment. Please check your billing details or try again."}
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        to="/"
                        className="rounded-button bg-purple px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-deep"
                    >
                        Go to Home
                    </Link>
                    <Link
                        to="/account"
                        className="rounded-button border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-gray-50"
                    >
                        Manage Billing
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SubscriptionSuccess;
