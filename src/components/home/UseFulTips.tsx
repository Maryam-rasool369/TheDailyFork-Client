import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Newspaper,
  LaptopMinimal,
  TrendingUp,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import type React from "react";

const tips = [
  {
    title: "Business Creators",
    description:
      "Everything you need to know to launch your own company.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Freelancers",
    description:
      "Focus on what's important – here are the essentials to help you thrive.",
    icon: LaptopMinimal,
  },
  {
    title: "Trends and News",
    description:
      "What's happening in the world of entrepreneurship.",
    icon: TrendingUp,
  },
  {
    title: "Marketing",
    description:
      "Learn practical marketing strategies for modern businesses.",
    icon: Newspaper,
  },
];

const UsefulTips:React.FC = () => {
  return (
    <section className="rounded-section mt-section bg-ink px-6 py-12 text-cloud md:px-10 lg:px-14">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold leading-tight md:text-6xl">
          Useful tips
          <br />
          for your <span className="text-moss">business</span>
        </h2>
      </div>

      {/* Slider */}
      <div className="mt-14">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".tips-next",
            prevEl: ".tips-prev",
          }}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {tips.map((tip) => {
            const Icon = tip.icon;

            return (
              <SwiperSlide key={tip.title}>
                <div className="flex h-80 flex-col rounded-3xl bg-white/5 p-8 transition duration-300 hover:bg-white/10">
                  <Icon className="h-16 w-16 text-cloud/70" />

                  <h3 className="mt-8 text-3xl font-semibold">
                    {tip.title}
                  </h3>

                  <p className="mt-4 flex-1 text-cloud/60">
                    {tip.description}
                  </p>

                  <button className="mt-8 w-fit rounded-full border border-white/30 px-6 py-2 transition hover:border-moss hover:text-moss">
                    Discover
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-center gap-5">
        <button className="tips-prev flex h-12 w-12 items-center justify-center rounded-full border border-white/30 transition hover:border-moss hover:text-moss">
          <ArrowLeft size={20} />
        </button>

        <button className="tips-next flex h-12 w-12 items-center justify-center rounded-full bg-cloud text-ink transition hover:scale-105">
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default UsefulTips;