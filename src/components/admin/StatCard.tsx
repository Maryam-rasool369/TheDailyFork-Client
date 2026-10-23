import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    tone?: "purple" | "moss" | "gold" | "ink";
}

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
    purple: "bg-purple/10 text-purple",
    moss: "bg-moss-soft text-moss",
    gold: "bg-gold-soft text-gold",
    ink: "bg-ink/5 text-ink",
};

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, tone = "purple" }) => (
    <div className="rounded-card border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">{label}</p>
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${toneClasses[tone]}`}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
        </div>
        <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{value}</p>
    </div>
);

export default StatCard;
