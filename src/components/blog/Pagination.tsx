import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const buttonClass =
    "inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Pagination">
            <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className={buttonClass}
            >
                <ChevronLeft className="h-4 w-4" />
                Previous
            </button>

            <span className="text-sm font-medium text-gray-600">
                Page {page} of {totalPages}
            </span>

            <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className={buttonClass}
            >
                Next
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
};

export default Pagination;
