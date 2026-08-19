import React from 'react';
import { Star, Quote, Sparkles, Building } from 'lucide-react';
import { SEED_TESTIMONIALS } from '@/data/seed-properties';

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-white text-zinc-950 border-b border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-zinc-950 tracking-tight">
            Trusted by Discerning Homebuyers &amp; Investors
          </h2>
          <p className="text-zinc-600 text-xs sm:text-base leading-relaxed font-light">
            Read how high-net-worth families, enterprise founders, and investors secured their ideal properties through the L2H advisory journey.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SEED_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200 shadow-sm hover:shadow-luxury hover:border-black transition-all duration-300 flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                {/* Stars & Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-black">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-zinc-300" />
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Property Purchased Tag & Client Bio */}
              <div className="pt-4 border-t border-zinc-200 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-900 text-[11px] font-semibold">
                  <Building className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                  <span className="truncate">{t.propertyPurchased}</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-300"
                  />
                  <div>
                    <div className="text-xs font-bold text-zinc-950 font-serif">
                      {t.clientName}
                    </div>
                    <div className="text-[11px] text-zinc-500 line-clamp-1">
                      {t.designation || t.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
