import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import BlogGrid from "../components/blog/BlogGrid";
import EmptyState from "../components/blog/EmptyState";
import { blogs } from "../data/BlogsData";
import { useSearchParams } from "react-router-dom";

const categories = [
  "All",
  "Fashion",
  "Food",
  "Health",
  "History",
  "Politics",
  "Tech",
  "Travel",
];

const sortOptions = [
  "Latest",
  "Oldest",
  "Most Liked",
];

const Blogs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!categoryFromUrl) {
      setSelectedCategory("All");
      return;
    }
    const match = categories.find(
      (category) => category.toLowerCase() === categoryFromUrl.toLowerCase()
    );
    setSelectedCategory(match || "All");
  }, [categoryFromUrl]);

  const filteredBlogs = useMemo(() => {
    let filtered = [...blogs];

    // Search
    if (search.trim()) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (blog) => blog.category === selectedCategory
      );
    }

    // Sorting
    if (sortBy === "Most Liked") {
      filtered.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "Latest") {
      filtered.reverse();
    }

    return filtered;
  }, [search, selectedCategory, sortBy]);


  return (
    <section className="py-10">

      {/* Hero */}
      <div className="text-center">

        <h1 className="text-5xl font-bold text-ink">
          Explore Blogs
        </h1>

        <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
          Discover stories, tutorials, opinions and ideas from
          writers around the world.
        </p>

      </div>

      {/* Search */}
      <div className="mx-auto mt-10 max-w-2xl">

        <div className="flex items-center rounded-xl border border-gray-300 bg-white px-4 shadow-sm">

          <Search className="h-5 w-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-3 py-4 outline-none"
          />

        </div>

      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Categories */}
        <div className="flex flex-wrap gap-3">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition
                ${selectedCategory === category
                  ? "bg-purple text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-purple/10"
                }
              `}
            >
              {category}
            </button>
          ))}

        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-gray-300 bg-white px-4  py-2 outline-none"
        >
          {sortOptions.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

      </div>

      {/* Blog Count */}
      <div className="mt-8">

        <p className="text-gray-500">
          Showing{" "}
          <span className="font-semibold text-ink">
            {filteredBlogs.length}
          </span>{" "}
          articles
        </p>

      </div>

      {/* Blogs */}
      {filteredBlogs.length > 0 ? (
        <BlogGrid blogs={filteredBlogs} />
      ) : (
        <EmptyState
          title="No Blogs Found"
          description="Try searching with another keyword or choose another category."
          buttonText="Create Blog"
        />
      )}

    </section>
  );
};

export default Blogs;