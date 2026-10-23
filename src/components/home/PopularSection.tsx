import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { usePopularBlogs } from "../../hooks/useBlog";
import LoadingState from "../admin/LoadingState";

const PopularSection:React.FC = () => {
  const { blogs, loading } = usePopularBlogs();

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="rounded-3xl bg-purple-soft px-6 py-10 md:px-10 md:py-14">
      {/* Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
            Our most
            <br />
            popular articles
          </h2>

          <p className="mt-5 text-muted">
            The latest news, tips and advice to help you run your business with
            less fuss.
          </p>
        </div>

        <Link
          to="/blogs"
          className="w-fit rounded-full bg-ink px-8 py-3 font-semibold text-cloud transition hover:bg-black"
        >
          Read All Articles
        </Link>
      </div>

      {/* Cards */}
      {loading ? (
        <LoadingState label="Loading popular articles..." />
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6  lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <article className="group relative h-[420px] overflow-hidden rounded-2xl">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 p-6 text-cloud">
                  <p className="text-xs tracking-[0.18em] uppercase opacity-80">
                    {blog.category.name}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold leading-snug">
                    {blog.title}
                  </h3>

                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm opacity-80">
                    <Heart className="h-4 w-4" />
                    {blog._count?.blogLikes ?? 0}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularSection;
