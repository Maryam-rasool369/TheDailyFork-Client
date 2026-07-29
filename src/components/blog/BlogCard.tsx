import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import type { Blog } from "../../types/BlogsType";

interface BlogCardProps {
    blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <article
            className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
      "
        >
            {/* Image */}
            <div className="relative h-60 overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <span className="absolute left-4 top-4 rounded-full bg-moss/50 px-3 py-1 text-xs text-ink shadow">
                    {blog.category}
                </span>
            </div>

            {/* Card Body */}
            <div className="flex h-70 flex-col p-4">

                {/* Title */}
                <h2 className="line-clamp-2 text-xl font-bold text-ink transition group-hover:text-purple">
                    {blog.title}
                </h2>

                {/* Description */}
                <p className="mt-2 line-clamp-2 leading-7 text-gray-600">
                    {blog.description}
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <img
                            src={blog.author.avatar}
                            alt={blog.author.name}
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <div>
                            <h4 className="font-semibold text-ink">
                                {blog.author.name}
                            </h4>

                            <p className="text-sm text-gray-500">
                                {blog.publishedDate}
                            </p>
                        </div>

                    </div>

                    {/* Likes */}
                    <div className="flex items-center gap-1 text-rose-500">

                        <Heart
                            className="h-5 w-5"
                            fill="currentColor"
                        />

                        <span className="font-semibold">
                            {blog.likes}
                        </span>

                    </div>

                </div>

                {/* Read More */}
                <button className=" mt-6 flex items-center gap-2 font-semibold text-purple transition group-hover:gap-3">

                    Read More

                    <ArrowRight className="h-5 w-5" />
                </button>

            </div>
        </article>
    );
};

export default BlogCard;