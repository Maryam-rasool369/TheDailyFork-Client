import React from "react";

const articles = [
  {
    id: 1,
    category: "CREATORS",
    title: "Everything you need to know about VAT for your business",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700",
  },
  {
    id: 2,
    category: "CREATORS",
    title: "Everything you need to know about VAT for your business",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700",
  },
  {
    id: 3,
    category: "CREATORS",
    title: "Everything you need to know about VAT for your business",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
  },
];

const PopularSection:React.FC = () => {
  return (
    <section className="rounded-3xl bg-purple-soft px-6 py-10 md:px-10 md:py-14">
      {/* Header */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold leading-tight text-ink md:text-6xl">
            Our most
            <br />
            popular articles
          </h2>

          <p className="mt-5 text-muted">
            The latest news, tips and advice to help you run your business with
            less fuss.
          </p>
        </div>

        <button className="w-fit rounded-full bg-ink px-8 py-3 font-semibold text-cloud transition hover:bg-black">
          Read All Articles
        </button>
      </div>

      {/* Cards */}
      <div className="mt-12 grid grid-cols-1 gap-6  lg:grid-cols-3">
        {articles.map((article) => (
          <article
            key={article.id}
            className="group relative h-[420px] overflow-hidden rounded-2xl"
          >
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-lineaar-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 p-6 text-cloud">
              <p className="text-xs tracking-[0.18em] uppercase opacity-80">
                {article.category}
              </p>

              <h3 className="mt-3 text-2xl font-semibold leading-snug">
                {article.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PopularSection;