import React from 'react'
import AboutHero from '../components/About/AboutHero'
import OurStory from '../components/About/OurStory'

const AboutUs: React.FC = () => {
  return (
    <>
      <section className="rounded-section mb-section bg-gold-soft px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            About Us
          </p>

          <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
            Discover ideas,
            <br />
            learn something new,
            <br />
            <span className="text-gold">
              and grow every day.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-ink/70">
            Our blog is built for curious minds. We publish thoughtful articles,
            practical guides, and inspiring stories to help you stay informed,
            improve your skills, and explore new perspectives.
          </p>
        </div>
      </section>
      <AboutHero />
      <OurStory />
    </>
  )
}

export default AboutUs