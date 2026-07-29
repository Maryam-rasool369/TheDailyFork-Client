import React from "react";
import BlogCard from "./BlogCard";
import type { Blog } from "../../types/BlogsType";
import { Link } from "react-router-dom";

interface BlogGridProps {
  blogs: Blog[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ blogs }) => {
  return (
    <section className="py-8">

      <div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 "
      >
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`}>
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          </Link>
        ))}
      </div>

    </section>
  );
};

export default BlogGrid;