import React from "react";
import { Link } from "react-router-dom";
import { useSubscription } from "../../hooks/useSubscription";

const statusStyle: Record<string, string> = {
    active: "bg-moss-soft text-moss ring-1 ring-moss/20",
    trialing: "bg-moss-soft text-moss ring-1 ring-moss/20",
    past_due: "bg-gold-soft text-gold ring-1 ring-gold/20",
    unpaid: "bg-red-100 text-red-800 ring-1 ring-red-200",
    canceled: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
};

const Billing: React.FC = () => {
    const { status, loading, redirecting, openBillingPortal } = useSubscription();

    if (loading) {
        return (
            <section className="min-h-[60vh] px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex min-h-[40vh] items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple/20 border-t-purple" />
                        <p className="text-sm font-medium text-gray-500">
                            Loading billing details...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    const subscription = status?.subscription;

    return (
        <section className="min-h-screen bg-cloud px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-2xl">
                <div className="mx-auto max-w-xl text-center">
                    <span className="inline-flex rounded-full bg-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple">
                        Billing
                    </span>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                        Manage Subscription
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base">
                        View your current plan and manage payment details, invoices, or
                        cancel your subscription.
                    </p>
                </div>

                <div className="mt-10 rounded-card border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                    {!subscription ? (
                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                You don't have a subscription yet.
                            </p>
                            <Link
                                to="/pricing"
                                className="mt-6 inline-flex rounded-button bg-purple px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-deep"
                            >
                                View Plans
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Current Plan
                                    </p>
                                    <p className="mt-1 text-h3 font-bold text-ink">
                                        {subscription.plan === "MONTHLY" ? "Monthly" : "Yearly"}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                                        statusStyle[subscription.status] ??
                                        "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
                                    }`}
                                >
                                    {subscription.status.replace("_", " ")}
                                </span>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-button bg-cloud px-4 py-3">
                                    <p className="text-xs font-medium text-gray-500">
                                        {subscription.cancelAtPeriodEnd
                                            ? "Access Ends"
                                            : "Renews On"}
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-ink">
                                        {new Date(subscription.currentPeriodEnd).toLocaleDateString(
                                            undefined,
                                            { year: "numeric", month: "long", day: "numeric" }
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-button bg-cloud px-4 py-3">
                                    <p className="text-xs font-medium text-gray-500">
                                        Auto-Renew
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-ink">
                                        {subscription.cancelAtPeriodEnd ? "Off" : "On"}
                                    </p>
                                </div>
                            </div>

                            {subscription.cancelAtPeriodEnd && (
                                <p className="mt-4 rounded-button bg-gold-soft px-4 py-3 text-sm text-gold">
                                    Your subscription is set to cancel at the end of the
                                    current billing period. You'll keep access until then.
                                </p>
                            )}

                            <button
                                type="button"
                                disabled={redirecting}
                                onClick={openBillingPortal}
                                className="mt-8 w-full rounded-button bg-ink px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {redirecting ? "Redirecting..." : "Manage in Stripe Portal"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Billing;
