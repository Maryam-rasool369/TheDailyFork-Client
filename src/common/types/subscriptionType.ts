export type SubscriptionPlan = "MONTHLY" | "YEARLY";

export interface Subscription {
    id: number;
    userId: number;
    stripeSubscriptionId: string;
    stripePriceId: string;
    status: string;
    plan: SubscriptionPlan;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SubscriptionStatus {
    isActive: boolean;
    subscription: Subscription | null;
}
