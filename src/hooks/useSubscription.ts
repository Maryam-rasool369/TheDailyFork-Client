import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    createCheckoutSessionApi,
    createPortalSessionApi,
    getSubscriptionStatusApi,
} from "../api/stripeApi";
import type { SubscriptionPlan, SubscriptionStatus } from "../common/types/subscriptionType";

export const useSubscription = () => {
    const [status, setStatus] = useState<SubscriptionStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [redirecting, setRedirecting] = useState(false);

    const fetchStatus = () => {
        setLoading(true);
        return getSubscriptionStatusApi()
            .then(setStatus)
            .catch(() => toast.error("Failed to load subscription status"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchStatus();

        const handleVisibility = () => {
            if (document.visibilityState === "visible") fetchStatus();
        };
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    const startCheckout = async (plan: SubscriptionPlan) => {
        try {
            setRedirecting(true);
            const url = await createCheckoutSessionApi(plan);
            window.location.href = url;
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Failed to start checkout");
            setRedirecting(false);
        }
    };

    const openBillingPortal = async () => {
        try {
            setRedirecting(true);
            const url = await createPortalSessionApi();
            window.location.href = url;
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? "Failed to open billing portal");
            setRedirecting(false);
        }
    };

    return { status, loading, redirecting, startCheckout, openBillingPortal, refetch: fetchStatus };
};
