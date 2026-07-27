import React from "react";

const HeroSection: React.FC = () => {
    return (
        <section className="pt-section">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Right Featured Card */}
                <div className="relative overflow-hidden rounded-section min-h-[450px] max-h-[520px] lg:col-span-2 lg:row-span-2">
                    <img
                        src="https://picsum.photos/1000/800?random=3"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="relative flex h-full flex-col justify-end p-8 text-white md:p-10">
                        <p className="text-sm uppercase tracking-[0.2em] text-moss">
                            Finance • Featured
                        </p>

                        <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
                            Everything you need to know about VAT for your business
                        </h1>
                    </div>
                </div>
                <div className=" lg:grid-rows-2 flex flex-col gap-6 ">
                    {/* Left Card 1 */}
                    <div className="relative overflow-hidden rounded-section min-h-[450px] lg:min-h-[250px]">
                        <img
                            src="https://picsum.photos/600/400?random=1"
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/45" />

                        <div className="relative flex h-full flex-col justify-end p-6 text-white">
                            <p className="text-xs uppercase tracking-[0.2em] text-moss">
                                Freelancing
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold leading-snug">
                                What are the tax obligations for freelancers?
                            </h2>
                        </div>
                    </div>

                    {/* Left Card 2 */}
                    <div className="relative overflow-hidden rounded-section min-h-[450px] lg:min-h-[250px]">
                        <img
                            src="https://picsum.photos/600/400?random=2"
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/45" />

                        <div className="relative flex h-full flex-col justify-end p-6 text-white">
                            <p className="text-xs uppercase tracking-[0.2em] text-moss">
                                Business
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold leading-snug">
                                How to grow your business with better financial planning
                            </h2>
                        </div>
                    </div>
                </div>



            </div>
        </section>
    );
};

export default HeroSection;