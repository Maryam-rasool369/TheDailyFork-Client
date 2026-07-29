import { useParams } from "react-router-dom";
import { blogs } from "../data/BlogsData";
import { useState } from "react";
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


const EditBlog = () => {

    const { id } = useParams<{ id: string }>();

    const blog = blogs.find(
        (blog) => blog.id === id
    );


    if (!blog) {
        return <p>Blog not found</p>;
    }


    const [title, setTitle] = useState(blog.title);
    const [description, setDescription] = useState(blog.description);
    const [category, setCategory] = useState<BlogCategory>(blog.category);
    const [image, setImage] = useState(blog.image);
    const [content, setContent] = useState(blog.content);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedBlog = {
            title,
            description,
            category,
            image,
            content
        };

        console.log(updatedBlog);
    };


    return (

        <section className="bg-cloud py-12">

            <div className="
                mx-auto 
                max-w-5xl 
                rounded-2xl 
                bg-white 
                p-8 
                shadow-sm 
                lg:p-12
            ">


                {/* Heading */}
                <div>

                    <h1 className="text-4xl font-bold text-ink">
                        Edit Blog
                    </h1>


                    <p className="mt-2 text-gray-500">
                        Update your blog content and save changes.
                    </p>

                </div>



                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-8"
                >


                    {/* Title */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-ink">
                            Blog Title
                        </label>


                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="
                                w-full 
                                rounded-xl 
                                border 
                                border-gray-300 
                                px-4 
                                py-3 
                                outline-none 
                                transition 
                                focus:border-purple 
                                focus:ring-2 
                                focus:ring-purple/20
                            "
                        />

                    </div>




                    {/* Category */}
                    <div>

                        <label className="mb-2 block text-sm font-semibold text-ink">
                            Category
                        </label>


                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value as BlogCategory)
                            }
                            className="
                                w-full 
                                rounded-xl 
                                border 
                                border-gray-300 
                                bg-white 
                                px-4 
                                py-3 
                                outline-none 
                                transition 
                                focus:border-purple 
                                focus:ring-2 
                                focus:ring-purple/20
                            "
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
                    {/* <div>

                        <label className="mb-2 block text-sm font-semibold text-ink">
                            Featured Image
                        </label> */}


                        {/* Current Image Preview */}
                        {/* <div className="mb-5 overflow-hidden rounded-xl">

                            <img
                                src={image}
                                alt={title}
                                className="
                                    h-64 
                                    w-full 
                                    object-cover
                                "
                            />

                        </div>



                        <label className="
                            flex 
                            cursor-pointer 
                            flex-col 
                            items-center 
                            justify-center 
                            rounded-xl 
                            border-2 
                            border-dashed 
                            border-gray-300 
                            px-6 
                            py-10 
                            transition 
                            hover:border-purple 
                            hover:bg-purple/5
                        ">


                            <ImagePlus className="mb-4 h-12 w-12 text-purple" />


                            <span className="font-medium text-ink">
                                Replace image
                            </span>


                            <span className="mt-1 text-sm text-gray-500">
                                PNG, JPG or WEBP
                            </span>


                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {

                                    const file = e.target.files?.[0];

                                    if (file) {
                                        setImage(
                                            URL.createObjectURL(file)
                                        );
                                    }

                                }}
                            />


                        </label>


                    </div> */}

                        {/* Featured Image */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-ink">
                                Featured Image
                            </label>


                            <label
                                className="
            group
            relative
            block
            cursor-pointer
            overflow-hidden
            rounded-xl
        "
                            >

                                {/* Current Image */}
                                <img
                                    src={image}
                                    alt={title}
                                    className="
                h-72
                w-full
                object-cover
                transition
                duration-300
                group-hover:scale-105
            "
                                />


                                {/* Hover Overlay */}
                                <div
                                    className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                bg-black/50
                opacity-0
                transition
                duration-300
                group-hover:opacity-100
            "
                                >

                                    <ImagePlus
                                        className="
                    h-12
                    w-12
                    text-white
                    mb-3
                "
                                    />


                                    <span className="font-medium text-white">
                                        Change Image
                                    </span>

                                </div>



                                {/* Hidden Input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {

                                        const file = e.target.files?.[0];

                                        if (file) {

                                            setImage(
                                                URL.createObjectURL(file)
                                            );

                                        }

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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="
                                w-full 
                                resize-none 
                                rounded-xl 
                                border 
                                border-gray-300 
                                px-4 
                                py-3 
                                outline-none 
                                transition 
                                focus:border-purple 
                                focus:ring-2 
                                focus:ring-purple/20
                            "
                            />


                        </div>





                        {/* Content */}
                        <div>

                            <label className="mb-2 block text-sm font-semibold text-ink">
                                Blog Content
                            </label>


                            <textarea
                                rows={14}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="
                                w-full 
                                rounded-xl 
                                border 
                                border-gray-300 
                                px-4 
                                py-3 
                                outline-none 
                                transition 
                                focus:border-purple 
                                focus:ring-2 
                                focus:ring-purple/20
                            "
                            />


                        </div>




                        {/* Button */}
                        <div className="
                        flex 
                        flex-col 
                        gap-4 
                        sm:flex-row 
                        sm:justify-end
                    ">


                            <button
                                type="submit"
                                className="
                                rounded-xl 
                                bg-purple 
                                px-8 
                                py-3 
                                font-semibold 
                                text-white 
                                transition 
                                hover:bg-purple/90
                            "
                            >
                                Save Changes
                            </button>


                        </div>



                </form>


            </div>


        </section>

    );
};


export default EditBlog;