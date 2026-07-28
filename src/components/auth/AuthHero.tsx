import React from 'react'

const AuthHero: React.FC = () => {
    return (
        <>
            {/* ================= Right Side ================= */}
            <div className="relative hidden lg:flex lg:w-1/2">

                {/* Background Image */}
                <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80"
                    alt="Reading books"
                    className="h-full w-full object-cover"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-ink/85 via-ink/60 to-purple/70" />

                {/* Decorative Badge */}
                <div className="absolute right-8 top-8">
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                        ✨ Join 25,000+ Readers
                    </span>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">

                    <span className="mb-4 w-fit rounded-full bg-moss px-4 py-2 text-sm font-semibold uppercase tracking-widest text-ink">
                        Featured Stories
                    </span>

                    <h2 className="max-w-lg text-5xl font-bold leading-tight">
                        Read.
                        <br />
                        Learn.
                        <br />
                        Grow.
                    </h2>

                    <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
                        Explore thousands of articles, tutorials and inspiring stories
                        written by developers, designers and creators from around the
                        world.
                    </p>

                    <div className="mt-10 flex items-center gap-6">

                        <div>
                            <h3 className="text-3xl font-bold">20K+</h3>
                            <p className="text-sm text-white/70">
                                Articles Published
                            </p>
                        </div>

                        <div className="h-10 w-px bg-white/20" />

                        <div>
                            <h3 className="text-3xl font-bold">50K+</h3>
                            <p className="text-sm text-white/70">
                                Active Readers
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default AuthHero