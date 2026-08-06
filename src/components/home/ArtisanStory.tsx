"use client";

import React from "react";
import Link from "next/link";
import { ARTISANS } from "@/data/artisans";
import { ArrowRight } from "lucide-react";

export const ArtisanStory = () => {
  return (
    <section className="py-28 bg-silk-cream border-t border-silk-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-20">
          <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-silk-gold-dark uppercase block">
            SUALKUCHI ARTISANS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon uppercase tracking-wide">
            Hands Behind The Loom
          </h2>
          <div className="w-12 h-[1px] bg-silk-gold mx-auto" />
          <p className="text-xs text-silk-black/60 font-light leading-relaxed">
            Sualkuchi, known as the 'Manchester of East India', is home to generational master weavers who spend up to 200 hours per masterpiece.
          </p>
        </div>

        {/* Artisans Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {ARTISANS.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-silk-ivory rounded-lg p-6 border border-silk-gold/20 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative rounded overflow-hidden h-64 border border-silk-gold/20">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold text-silk-gold-dark tracking-widest block">
                    {artisan.experienceYears}+ Years Experience
                  </span>
                  <h3 className="font-serif font-bold text-lg text-silk-black">{artisan.name}</h3>
                  <p className="text-xs text-silk-maroon font-serif font-bold">{artisan.role}</p>
                </div>

                <p className="italic text-xs text-silk-black/70 font-light border-l-2 border-silk-gold pl-3">
                  "{artisan.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-silk-gold/15 text-[11px] font-bold text-silk-emerald">
                Specialty: {artisan.specialty}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-silk-maroon hover:text-silk-gold transition"
          >
            Read Complete Artisan Journey <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
