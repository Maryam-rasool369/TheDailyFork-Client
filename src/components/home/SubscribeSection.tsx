import React from "react";

const SubscribeSection: React.FC = () => {
  return (
    <section className="rounded-section mt-section bg-gold px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Heading */}
        <h2 className="max-w-4xl text-4xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl">
          Subscribe for{" "}
          <span className="text-moss">updates</span>{" "}
          via newsletter
        </h2>

        {/* Form */}
        <form className="mt-12 w-full max-w-2xl">
          <div className="flex flex-col gap-4 rounded-full border border-ink/30 p-2 sm:flex-row sm:items-center">
            <input
              type="email"
              placeholder="Email Address*"
              className="flex-1 bg-transparent px-5 py-3 text-muted placeholder:text-ink/50 focus:outline-none"
            />

            <button
              type="submit"
              className="rounded-full bg-purple-soft px-8 py-3 font-semibold text-ink transition-all duration-300 hover:bg-purple hover:text-cloud"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubscribeSection;