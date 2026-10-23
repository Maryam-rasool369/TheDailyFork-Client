import React from "react";
import { Link } from "react-router-dom";
import { useFeaturedBlogs } from "../../hooks/useBlog";

const HeroSection: React.FC = () => {
    const { blogs, loading } = useFeaturedBlogs();

    // Admin hasn't picked featured blogs yet (or they're still loading)
    if (loading || blogs.length === 0) return null;

    const [main, ...others] = blogs;

    return (
        <section className="pt-section">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Right Featured Card */}
                <Link
                    to={`/blog/${main.id}`}
                    className="relative overflow-hidden rounded-section min-h-[450px] max-h-[520px] lg:col-span-2 lg:row-span-2"
                >
                    <img
                        src={main.imageUrl}
                        alt={main.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="relative flex h-full flex-col justify-end p-8 text-white md:p-10">
                        <p className="text-sm uppercase tracking-[0.2em] text-moss">
                            {main.category.name} • Featured
                        </p>

                        <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                            {main.title}
                        </h1>
                    </div>
                </Link>

                {others.length > 0 && (
                    <div className=" lg:grid-rows-2 flex flex-col gap-6 ">
                        {others.map((blog) => (
                            <Link
                                key={blog.id}
                                to={`/blog/${blog.id}`}
                                className="relative overflow-hidden rounded-section min-h-[450px] lg:min-h-[250px]"
                            >
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-black/45" />

                                <div className="relative flex h-full flex-col justify-end p-6 text-white">
                                    <p className="text-xs uppercase tracking-[0.2em] text-moss">
                                        {blog.category.name}
                                    </p>

                                    <h2 className="mt-3 text-2xl font-semibold leading-snug">
                                        {blog.title}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;
