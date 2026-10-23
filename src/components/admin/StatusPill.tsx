import React from "react";

const styles: Record<string, string> = {
    PENDING: "bg-gold-soft text-gold ring-1 ring-gold/20",
    APPROVED: "bg-moss-soft text-moss ring-1 ring-moss/20",
    active: "bg-moss-soft text-moss ring-1 ring-moss/20",
    trialing: "bg-moss-soft text-moss ring-1 ring-moss/20",
    REJECTED: "bg-red-100 text-red-800 ring-1 ring-red-200",
    unpaid: "bg-red-100 text-red-800 ring-1 ring-red-200",
    past_due: "bg-gold-soft text-gold ring-1 ring-gold/20",
    canceled: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
    none: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
};

const StatusPill: React.FC<{ status: string; label?: string }> = ({ status, label }) => (
    <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ${
            styles[status] ?? "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
        }`}
    >
        {(label ?? status).replace(/_/g, " ")}
    </span>
);

export default StatusPill;
