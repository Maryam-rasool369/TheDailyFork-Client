import React from "react";
import { ArrowRight } from "lucide-react";
import { DEFAULT_AVATAR } from "../../common/constants";
import { Link } from "react-router-dom";
import type { Blog } from "../../common/types/blogType";

interface BlogCardProps {
    blog: Blog;
}


const formatDate = (isoDate: string) =>
    new Date(isoDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });



const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const authorName = `${blog.author.firstName}${blog.author.lastName ? ` ${blog.author.lastName}` : ""
        }`;

    return (
        <div key={blog.id} className="relative flex min-w-0">

            <Link
                to={`/blog/${blog.id}`}
                className="group flex h-full w-full min-w-0"
            >
                <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">

                    {/* Image */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100">
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            loading="lazy"
                            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        />

                        {/* Image overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />

                        {/* Category */}
                        <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink shadow-sm backdrop-blur-sm">
                            {blog.category.name}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">

                        {/* Title */}
                        <h2 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-ink transition-colors duration-200 group-hover:text-purple">
                            {blog.title}
                        </h2>

                        {/* Description */}
                        <p className="mt-3 line-clamp-2 min-h-13 text-sm leading-6 text-gray-600">
                            {blog.shortDescription}
                        </p>

                        {/* Author */}
                        <div className=" flex justify-between min-w-0 items-center gap-3">
                            <div className="mt-5 flex gap-2">
                                <img
                                    src={DEFAULT_AVATAR}
                                    alt={authorName}
                                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-gray-100"
                                />

                                <div className="min-w-0">
                                    <h4 className="truncate text-sm font-semibold text-ink">
                                        {authorName}
                                    </h4>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        {formatDate(blog.createdAt)}
                                    </p>
                                </div>
                            </div>
                            {/* Read More */}
                            <div className="">
                                <span className="inline-flex items-center gap-2 text-sm font-bold text-purple transition-all duration-200 group-hover:gap-3">
                                    Read More

                                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </div>


                    </div>
                </article>
            </Link>
        </div>
    );
};

export default BlogCard;