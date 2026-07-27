import React from "react";

const AboutHero: React.FC = () => {
  return (
    <section className="mt-section">
      <div className="space-y-10">

        {/* Top */}
        <div className="grid gap-8 px-4 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              About Us
            </p>

            <h1 className="font-display text-4xl font-bold leading-tight text-ink md:text-6xl">
              Stories that
              <br />
              <span className="text-moss">
                inspire, educate
              </span>{" "}
              and connect.
            </h1>
          </div>

          <div className="lg:pt-3">
            <p className="max-w-xl text-lg leading-8 text-ink/70 ">
              We believe great content has the power to inspire ideas,
              encourage curiosity, and bring people together. Our platform
              shares meaningful stories, practical guides, and fresh
              perspectives across business, technology, lifestyle, travel,
              health, and much more.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-[32px]">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600"
            alt="People discussing ideas"
            className="h-[280px] w-full object-cover md:h-[420px]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

          {/* Floating Card */}
          <div className="absolute bottom-6 left-6 hidden rounded-2xl bg-cloud/95 p-5 shadow-xl backdrop-blur md:block">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Our Vision
            </p>

            <h3 className="mt-2 max-w-xs text-xl font-semibold text-ink">
              Helping readers discover something valuable every day.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;