"use client";

import React from "react";
import Link from "next/link";
import { ARTISANS } from "@/data/artisans";
import { ArrowRight, Quote } from "lucide-react";

export const ArtisanStory = () => {
  return (
    <section className="py-20 bg-silk-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
            SUALKUCHI SILK VILLAGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon">
            Hands Behind The Heritage Loom
          </h2>
          <div className="w-16 h-0.5 bg-silk-gold mx-auto" />
          <p className="text-xs sm:text-sm text-silk-black/70 font-sans">
            Sualkuchi, known as the 'Manchester of East India', is home to generational weavers who spend up to 200 hours per saree preserving ancient motifs.
          </p>
        </div>

        {/* Artisans Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTISANS.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-silk-cream rounded-xl p-6 border border-silk-gold/30 shadow-card space-y-4 flex flex-col justify-between hover:shadow-luxury transition duration-300"
            >
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden h-56 border border-silk-gold/30">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-silk-maroon text-silk-gold text-[10px] font-bold px-2 py-1 rounded shadow">
                    {artisan.experienceYears}+ Years Experience
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-silk-black">{artisan.name}</h3>
                  <p className="text-xs text-silk-maroon font-bold">{artisan.role}</p>
                  <p className="text-[11px] text-silk-black/60 italic">{artisan.village}</p>
                </div>

                <div className="relative bg-silk-ivory p-3.5 rounded border border-silk-gold/20 italic text-xs text-silk-black/80">
                  <Quote className="w-4 h-4 text-silk-gold/40 mb-1 inline mr-1" />
                  "{artisan.quote}"
                </div>
              </div>

              <div className="pt-3 border-t border-silk-gold/20 text-xs font-bold text-silk-emerald flex items-center justify-between">
                <span>Specialty: {artisan.specialty}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-silk-maroon text-silk-maroon hover:bg-silk-maroon hover:text-silk-gold font-bold text-xs uppercase tracking-widest py-3 px-8 rounded transition"
          >
            Read Complete Sualkuchi Artisan Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
