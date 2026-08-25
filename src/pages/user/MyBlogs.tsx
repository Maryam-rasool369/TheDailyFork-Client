import React from 'react'
import BlogGrid from '../../components/blog/BlogGrid'
import { blogs } from '../../data/BlogsData'
import EmptyState from '../../components/blog/EmptyState'

const MyBlogs: React.FC = () => {
    if (blogs.length === 0) {
        return <>
            <EmptyState />
        </>
    }
    return (
        <>
            <section className="py-10">
                {/* Hero */}
                <div className="text-center">

                    <h1 className="text-5xl font-bold text-ink">
                        My Blogs
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
                        Stories, tutorials, opinions and ideas from my life and ideas.
                    </p>

                </div>
                <BlogGrid blogs={blogs} />
            </section>
        </>
    )
}

export default MyBlogs