import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
    title?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No Blogs Found",
    description = "There are no blogs to display right now. Start by creating your first blog.",
    buttonText = "Create Blog",
    onButtonClick,
}) => {
    return (
        <section className="flex min-h-[60vh] items-center justify-center px-6">
            <div className="max-w-md text-center">

                {/* Title */}
                <h2 className="mt-8 text-3xl font-bold text-ink">
                    {title}
                </h2>

                {/* Description */}
                <p className="mt-4 leading-7 text-gray-600">
                    {description}
                </p>

                {/* Button */}
                <Link to='/create-blog'>
                    <button
                        onClick={onButtonClick}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-purple px-6 py-3 font-semibold text-white transition hover:bg-purple/90"
                    >
                        <Plus className="h-5 w-5" />
                        {buttonText}
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default EmptyState;