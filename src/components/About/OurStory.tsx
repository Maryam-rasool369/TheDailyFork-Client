import React from "react";

const AboutStory:React.FC = () => {
  return (
    <section className="rounded-section mt-section bg-purple-soft px-6 py-12 md:px-10 lg:px-16">
      {/* Statistics */}
      <div className="grid grid-cols-2 gap-8 border-b border-ink/10 pb-10 md:grid-cols-4">
        <div>
          <h2 className="text-4xl font-bold text-ink md:text-5xl">500+</h2>
          <p className="mt-2 text-sm text-ink/60">
            Articles Published
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-ink md:text-5xl">20+</h2>
          <p className="mt-2 text-sm text-ink/60">
            Categories Covered
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-moss md:text-5xl">50K+</h2>
          <p className="mt-2 text-sm text-ink/60">
            Monthly Readers
          </p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-ink md:text-5xl">2026</h2>
          <p className="mt-2 text-sm text-ink/60">
            Founded
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Left */}
        <div>
          <h2 className="max-w-lg text-3xl font-bold leading-tight text-ink md:text-5xl">
            Empowering curious minds through
            <span className="text-moss"> meaningful stories.</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-ink/70">
            Our goal is to create a platform where readers can discover
            trustworthy knowledge, practical advice, and inspiring stories
            across business, technology, travel, health, lifestyle, and more.
          </p>
        </div>

        {/* Right */}
        <div className="space-y-10">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
              Our Vision
            </h3>

            <p className="mt-4 border-b border-ink/10 pb-6 leading-7 text-ink/70">
              To become a trusted destination where people from around the
              world discover ideas, gain knowledge, and stay inspired through
              high-quality content.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-moss">
              Our Mission
            </h3>

            <p className="mt-4 leading-7 text-ink/70">
              We strive to publish engaging, reliable, and easy-to-read
              articles that help our readers learn new skills, make informed
              decisions, and grow every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;