import { axiosClient } from "../lib/axiosClient";
import { API_ROUTES } from "../common/constants";
import type { SubscriptionPlan, SubscriptionStatus } from "../common/types/subscriptionType";

export const createCheckoutSessionApi = async (plan: SubscriptionPlan): Promise<string> => {
    const res = await axiosClient.post(API_ROUTES.STRIPE.CREATE_CHECKOUT_SESSION, { plan });
    return res.data.data.url; //because the backend returns { success: true, data: { url: string } }
};

export const createPortalSessionApi = async (): Promise<string> => {
    const res = await axiosClient.post(API_ROUTES.STRIPE.CREATE_PORTAL_SESSION);
    return res.data.data.url;
};

export const getSubscriptionStatusApi = async (): Promise<SubscriptionStatus> => {
    const res = await axiosClient.get(API_ROUTES.STRIPE.STATUS);
    return res.data.data;
};
