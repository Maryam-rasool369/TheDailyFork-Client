import React, { useState } from "react";
import { ImagePlus } from "lucide-react";
import type { BlogCategory } from "../types/BlogsType";

const categories: BlogCategory[] = [
  "Fashion",
  "Food",
  "Health",
  "History",
  "Politics",
  "Tech",
  "Travel",
];
const CreateBlog: React.FC = () => {

  const [category, setCategory] = useState<BlogCategory>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <section className="bg-cloud py-12">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm lg:p-12">

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-ink">
            Create New Blog
          </h1>

          <p className="mt-2 text-gray-500">
            Share your knowledge and inspire readers around the world.
          </p>
        </div>

        <form className="mt-10 space-y-8">

          {/* Blog Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Blog Title
            </label>

            <input
              type="text"
              placeholder="Enter your blog title..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Category
            </label>

            <select
              onChange={(e) =>
                setCategory(e.target.value as BlogCategory)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
              defaultValue=""
              value={category}

            >

              {
                categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))
              }

            </select>

          </div>

          {/* Featured Image */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-ink">
              Featured Image
            </label>

            <label className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 transition hover:border-purple">
              {
                imagePreview ? (

                  <>
                    {/* Preview */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"/>

                    {/* Hover Overlay */}
                    <div className=" absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100" >

                      <ImagePlus
                        size={48}
                        className="mb-3 text-white"
                      />

                      <span className="font-semibold text-white">
                        Change Image
                      </span>

                      <span className="mt-1 text-sm text-gray-200">
                        Click to upload another image
                      </span>

                    </div>
                  </>

                ) : (

                  <div className="flex flex-col items-center px-6 py-14">

                    <ImagePlus
                      className="mb-4 h-12 w-12 text-purple"
                    />

                    <span className="font-medium text-ink">
                      Click to upload an image
                    </span>

                    <span className="mt-1 text-sm text-gray-500">
                      PNG, JPG or WEBP
                    </span>

                  </div>

                )
              }

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {

                  const file = e.target.files?.[0];

                  if (!file) return;

                  setImageFile(file);
                  setImagePreview(URL.createObjectURL(file));

                }}
              />

            </label>

          </div>
          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Short Description
            </label>

            <textarea
              rows={4}
              placeholder="Write a short summary of your article..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">
              Blog Content
            </label>

            <textarea
              rows={14}
              placeholder="Start writing your article..."
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <button
              type="submit"
              className="rounded-xl bg-purple px-8 py-3 font-semibold text-white transition hover:bg-purple/90"
            >
              Publish Blog
            </button>

          </div>

        </form>

      </div>
    </section>
  );
};

export default CreateBlog;