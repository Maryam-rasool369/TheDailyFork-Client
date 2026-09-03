// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ImagePlus } from "lucide-react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// import BlogEditor from "../../components/blog/BlogEditor";
// import { createBlogSchema, type CreateBlogFormData } from "../../validations/blog.validation";
// import { createBlogApi } from "../../api/blogApi";

// import { useCategories } from "../../hooks/useCategory";

// const CreateBlog: React.FC = () => {
//   const navigate = useNavigate();
//   const { categories, loading: categoriesLoading, error: categoriesError, } = useCategories();
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm<CreateBlogFormData>({
//     resolver: zodResolver(createBlogSchema),
//     defaultValues: { content: "" },
//   });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const onSubmit = async (data: CreateBlogFormData) => {
//     if (!imageFile) {
//       toast.error("Please upload a featured image");
//       return;
//     }

//     try {
//       await createBlogApi(data, imageFile);
//       toast.success("Blog submitted for approval");
//       navigate("/my-blogs");
//     } catch (err: any) {
//       toast.error(err.response?.data?.message ?? "Failed to create blog");
//     }
//   };

//   return (
//     <section className="bg-cloud py-12">
//       <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm lg:p-12">
//         <div>
//           <h1 className="text-4xl font-bold text-ink">Create New Blog</h1>
//           <p className="mt-2 text-gray-500">
//             Share your knowledge and inspire readers around the world.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
//           {/* Blog Title */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-ink">
//               Blog Title
//             </label>
//             <input
//               type="text"
//               placeholder="Enter your blog title..."
//               {...register("title")}
//               className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
//             />
//             {errors.title && (
//               <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
//             )}
//           </div>

//           {/* Category */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-ink">
//               Category
//             </label>
//             <select
//               {...register("categoryId", {
//                 valueAsNumber: true,
//               })}
//               defaultValue=""
//               disabled={categoriesLoading}
//               className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20 disabled:bg-gray-100"
//             >
//               <option value="" disabled>
//                 {categoriesLoading ? "Loading categories..." : "Select a category"}
//               </option>

//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
//               {categoriesError && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {categoriesError}
//                 </p>
//               )}
//             </select>
//             {errors.categoryId && (
//               <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
//             )}

//           </div>

//           {/* Featured Image */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-ink">
//               Featured Image
//             </label>
//             <label className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 transition hover:border-purple">
//               {imagePreview ? (
//                 <>
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
//                     <ImagePlus size={48} className="mb-3 text-white" />
//                     <span className="font-semibold text-white">Change Image</span>
//                     <span className="mt-1 text-sm text-gray-200">
//                       Click to upload another image
//                     </span>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex flex-col items-center px-6 py-14">
//                   <ImagePlus className="mb-4 h-12 w-12 text-purple" />
//                   <span className="font-medium text-ink">Click to upload an image</span>
//                   <span className="mt-1 text-sm text-gray-500">PNG, JPG or WEBP</span>
//                 </div>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </label>
//           </div>

//           {/* Short Description */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-ink">
//               Short Description
//             </label>
//             <textarea
//               rows={4}
//               placeholder="Write a short summary of your article..."
//               {...register("shortDescription")}
//               className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
//             />
//             {errors.shortDescription && (
//               <p className="mt-1 text-sm text-red-600">{errors.shortDescription.message}</p>
//             )}
//           </div>

//           {/* Blog Content */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-ink">
//               Blog Content
//             </label>
//             <Controller
//               name="content"
//               control={control}
//               render={({ field }) => (
//                 <BlogEditor value={field.value} onChange={field.onChange} />
//               )}
//             />
//             {errors.content && (
//               <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="rounded-xl bg-purple px-8 py-3 font-semibold text-white transition hover:bg-purple/90 disabled:opacity-50"
//             >
//               {isSubmitting ? "Publishing..." : "Publish Blog"}
//             </button>
//           </div>
//         </form>
//       </div >
//     </section >
//   );
// };

// export default CreateBlog;

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import BlogEditor from "../../components/blog/BlogEditor";
import { createBlogSchema, type CreateBlogFormData } from "../../validations/blog.validation";
import { useCreateBlog } from "../../hooks/useBlog";
import { useCategories } from "../../hooks/useCategory";

const CreateBlog: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { createBlog, isSubmitting } = useCreateBlog();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBlogFormData>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: { content: "" },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: CreateBlogFormData) => {
    if (!imageFile) {
      toast.error("Please upload a featured image");
      return;
    }

    const blog = await createBlog(data, imageFile);
    if (!blog) return; // error toast already shown by the hook

    toast.success("Blog submitted for approval");
    navigate("/my-blogs");
  };

  return (
    <section className="bg-cloud py-12">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-sm lg:p-12">
        <div>
          <h1 className="text-4xl font-bold text-ink">Create New Blog</h1>
          <p className="mt-2 text-gray-500">
            Share your knowledge and inspire readers around the world.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
          {/* Blog Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Blog Title</label>
            <input
              type="text"
              placeholder="Enter your blog title..."
              {...register("title")}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Category</label>
            <select
              {...register("categoryId", { valueAsNumber: true })}
              defaultValue=""
              disabled={categoriesLoading}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20 disabled:bg-gray-100"
            >
              <option value="" disabled>
                {categoriesLoading ? "Loading categories..." : "Select a category"}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {categoriesError && <p className="mt-1 text-sm text-red-600">{categoriesError}</p>}
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Featured Image</label>
            <label className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 transition hover:border-purple">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-72 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ImagePlus size={48} className="mb-3 text-white" />
                    <span className="font-semibold text-white">Change Image</span>
                    <span className="mt-1 text-sm text-gray-200">Click to upload another image</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center px-6 py-14">
                  <ImagePlus className="mb-4 h-12 w-12 text-purple" />
                  <span className="font-medium text-ink">Click to upload an image</span>
                  <span className="mt-1 text-sm text-gray-500">PNG, JPG or WEBP</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          {/* Short Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Short Description</label>
            <textarea
              rows={4}
              placeholder="Write a short summary of your article..."
              {...register("shortDescription")}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-purple focus:ring-2 focus:ring-purple/20"
            />
            {errors.shortDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.shortDescription.message}</p>
            )}
          </div>

          {/* Blog Content */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Blog Content</label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => <BlogEditor value={field.value} onChange={field.onChange} />}
            />
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-purple px-8 py-3 font-semibold text-white transition hover:bg-purple/90 disabled:opacity-50"
            >
              {isSubmitting ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;