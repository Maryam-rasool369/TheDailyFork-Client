import React from "react";
import { Link } from "react-router-dom";
import { useSubscription } from "../../hooks/useSubscription";
import { useProfile } from "../../hooks/useProfile";
import type { SubscriptionPlan } from "../../common/types/subscriptionType";

const plans: {
    key: SubscriptionPlan;
    name: string;
    price: string;
    cadence: string;
    highlight?: boolean;
    features: string[];
}[] = [
    {
        key: "MONTHLY",
        name: "Monthly",
        price: "$9",
        cadence: "/ month",
        features: [
            "Unlimited access to premium blogs",
            "Cancel anytime",
            "Billed every month",
        ],
    },
    {
        key: "YEARLY",
        name: "Yearly",
        price: "$90",
        cadence: "/ year",
        highlight: true,
        features: [
            "Unlimited access to premium blogs",
            "2 months free vs monthly",
            "Cancel anytime",
        ],
    },
];

const Pricing: React.FC = () => {
    const { status, loading, redirecting, startCheckout } = useSubscription();
    const { profile, loading: profileLoading } = useProfile();

    const isVerified = profile?.isVerified ?? true; // default true while loading to avoid a flash of the banner
    const canSubscribe = !loading && !profileLoading && isVerified && !status?.isActive;

    if (loading || profileLoading) {
        return (
            <section className="min-h-[60vh] px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex min-h-[40vh] items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple/20 border-t-purple" />
                        <p className="text-sm font-medium text-gray-500">
                            Loading plans...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-cloud px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex rounded-full bg-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple">
                        Pricing
                    </span>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                        Choose Your Plan
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                        Subscribe to unlock premium content and support the writers you love.
                    </p>

                    {status?.isActive && (
                        <div className="mt-7 flex flex-wrap justify-center gap-3">
                            <span className="rounded-full bg-moss-soft px-4 py-2 text-sm font-medium text-moss ring-1 ring-moss/20">
                                You already have an active {status.subscription?.plan.toLowerCase()} subscription
                            </span>
                        </div>
                    )}

                    {!isVerified && !status?.isActive && (
                        <div className="mt-7 flex flex-wrap justify-center gap-3">
                            <span className="rounded-full bg-gold-soft px-4 py-2 text-sm font-medium text-gold ring-1 ring-gold/20">
                                Please verify your email before subscribing.{" "}
                                <Link to="/edit-profile" className="underline">
                                    Check your profile
                                </Link>
                            </span>
                        </div>
                    )}
                </div>

                {/* Plans */}
                <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.key}
                            className={`relative flex flex-col rounded-card border p-6 shadow-sm sm:p-8 ${
                                plan.highlight
                                    ? "border-purple bg-white ring-2 ring-purple/20"
                                    : "border-gray-100 bg-white"
                            }`}
                        >
                            {plan.highlight && (
                                <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                                    Best Value
                                </span>
                            )}

                            <h2 className="text-h3 font-bold text-ink">{plan.name}</h2>

                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-h1 font-bold text-ink">{plan.price}</span>
                                <span className="text-sm text-gray-500">{plan.cadence}</span>
                            </div>

                            <ul className="mt-6 flex-1 space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="mt-0.5 text-moss">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                disabled={redirecting || !canSubscribe}
                                onClick={() => startCheckout(plan.key)}
                                className={`mt-8 w-full rounded-button px-4 py-3 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                    plan.highlight
                                        ? "bg-purple text-white hover:bg-purple-deep"
                                        : "bg-ink text-white hover:bg-ink/90"
                                }`}
                            >
                                {redirecting
                                    ? "Redirecting..."
                                    : status?.isActive
                                    ? "Already Subscribed"
                                    : !isVerified
                                    ? "Verify Email First"
                                    : `Subscribe ${plan.name}`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
