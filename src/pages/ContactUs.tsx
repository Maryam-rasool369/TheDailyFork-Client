import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  SendHorizonal,
} from "lucide-react";

const ContactUs:React.FC = () => {
  return (
    <section className="py-20">
      {/* Heading */}

      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="font-semibold uppercase tracking-[0.3em] text-gold">
          Contact Us
        </p>

        <h1 className="mt-4 text-4xl font-bold text-ink md:text-6xl">
          Have a question?
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/70">
          Whether you have a question, feedback, partnership opportunity,
          or simply want to say hello, we'd love to hear from you.
        </p>
      </div>

      {/* Content */}

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left */}

        <div className="relative overflow-hidden rounded-[32px]">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
            alt="Team working"
            className="h-full min-h-[650px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

          <div className="absolute bottom-8 left-8 right-8 rounded-3xl bg-cloud/95 p-8 backdrop-blur">
            <h2 className="text-2xl font-bold text-ink">
              Let's start a conversation.
            </h2>

            <p className="mt-3 text-ink/70">
              We're always excited to connect with readers,
              creators and businesses.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-gold-soft p-3">
                  <Mail className="text-gold" />
                </div>

                <div>
                  <p className="text-sm text-ink/50">
                    Email
                  </p>

                  <p className="font-medium text-ink">
                    info@scribbly.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-gold-soft p-3">
                  <Phone className="text-gold" />
                </div>

                <div>
                  <p className="text-sm text-ink/50">
                    Phone
                  </p>

                  <p className="font-medium text-ink">
                    +92 300 1234567
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-gold-soft p-3">
                  <MapPin className="text-gold" />
                </div>

                <div>
                  <p className="text-sm text-ink/50">
                    Office
                  </p>

                  <p className="font-medium text-ink">
                    Lahore, Pakistan
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right */}

        <div className="rounded-[32px] border border-gray-200 bg-cloud p-8 shadow-sm md:p-10">
          <h2 className="text-3xl font-bold text-ink">
            Send us a message
          </h2>

          <p className="mt-3 text-ink/60">
            Fill in the form and we'll get back to you as soon as possible.
          </p>

          <form className="mt-10 space-y-6">

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Subject
              </label>

              <input
                type="text"
                placeholder="How can we help?"
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-gold"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">
                Message
              </label>

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-5 py-4 outline-none transition focus:border-gold"
              />
            </div>

            <button
              className="flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-cloud transition hover:bg-moss"
            >
              Send Message
              <SendHorizonal size={18} />
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;