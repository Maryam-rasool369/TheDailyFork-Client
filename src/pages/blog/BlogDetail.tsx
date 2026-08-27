import { Heart, Calendar } from "lucide-react";
import { blogs } from "../../data/BlogsData";
import { useParams } from "react-router-dom";
import type React from "react";
import OwnerActions from "../../components/blog/OwnerActions";

const BlogDetails: React.FC = () => {
    const { id } = useParams();

    const blog = blogs.find(
        (blog) => blog.id === id
    );
    //Just for front end testing purpose
    const currentUser = {
        id: "a1"
    };

    if (!blog) {
        return <p>Blog not found</p>;
    }
    return (
        <main className="mx-auto max-w-5xl px-4 py-10">

            {
                currentUser.id === blog.author.id && (
                    <OwnerActions blogId={blog.id} />
                )
            }
            {/* Category */}
            <span className="inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-medium text-yellow-700">
                {blog.category}
            </span>


            {/* Title */}
            <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900">
                {blog.title}
            </h1>


            {/* Description */}
            <p className="mt-4 text-lg leading-8 text-gray-600">
                {blog.description}
            </p>


            {/* Author Section */}
            <div className="mt-6 flex items-center gap-4">

                <img
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                    <h3 className="font-semibold text-gray-900">
                        {blog.author.name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={15} />

                        {blog.publishedDate}
                    </div>
                </div>

            </div>


            {/* Blog Image */}
            <div className="mt-10 overflow-hidden rounded-2xl">

                <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-112.5 w-full object-cover"
                />

            </div>


            {/* Blog Content */}
            <article className="mt-10 space-y-5 text-lg leading-9 text-gray-700">

                {blog.content}

            </article>


            {/* Actions */}
            <div className="mt-10 flex items-center gap-6 border-t pt-6">

                <button
                    className="
                    flex items-center gap-2 
                    rounded-full 
                    border 
                    px-5 
                    py-2
                    transition
                    hover:bg-gray-100
                    "
                >
                    <Heart size={20} />

                    {blog.likes}
                </button>


            </div>

        </main>
    );
};

export default BlogDetails;