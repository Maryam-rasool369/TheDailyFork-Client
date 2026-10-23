import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useBlogLike } from "../../hooks/useBlog";
import { useAuthStore } from "../../store/authStore";

interface LikeButtonProps {
    blogId: number;
    initialLiked: boolean;
    initialCount: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ blogId, initialLiked, initialCount }) => {
    const navigate = useNavigate();
    const user = useAuthStore((s) => s.user);

    const { liked, count, isLoading, toggleLike } = useBlogLike(blogId, initialLiked, initialCount);

    const handleClick = () => {
        if (!user) {
            toast.error("Please log in to like this blog");
            navigate("/login");
            return;
        }

        toggleLike();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isLoading}
            aria-pressed={liked}
            aria-label={liked ? "Unlike this blog" : "Like this blog"}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition disabled:cursor-not-allowed disabled:opacity-60 ${
                liked
                    ? "bg-red-50 text-red-600 ring-red-200 hover:bg-red-100"
                    : "bg-white text-gray-600 ring-gray-200 hover:bg-gray-50"
            }`}
        >
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            {count}
        </button>
    );
};

export default LikeButton;
