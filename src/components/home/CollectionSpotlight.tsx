"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const CollectionSpotlight = () => {
  return (
    <section className="py-28 bg-silk-black text-silk-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Canvas */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-silk-gold/30">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"
                alt="Royal Assam Muga Silk Saree Collection"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-silk-black/70 via-transparent to-transparent" />
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-serif uppercase tracking-[0.3em] font-bold text-silk-gold block">
              SUALKUCHI SPECIALTY
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-silk-gold-light leading-tight uppercase tracking-wide">
              The Golden Loom of Assam
            </h2>

            <div className="w-12 h-[1px] bg-silk-gold" />

            <p className="font-serif italic text-base sm:text-lg text-silk-beige font-light">
              "Muga Silk is not just woven thread; it is the golden blood of Assam royalty that grows richer with every passing generation."
            </p>

            <p className="text-xs sm:text-sm text-silk-ivory/70 leading-relaxed font-sans font-light">
              Exclusive to the Brahmaputra valley, Muga silk is derived from wild silkworms feeding on Som trees. Naturally shimmering with a warm amber-gold tint without synthetic dyes, it possesses unmatched durability that outlasts human lifespans.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/shop?silk=Muga+Silk"
                className="bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded transition duration-300 flex items-center gap-2"
              >
                Shop Muga Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog/muga-silk-the-golden-treasure-of-assam"
                className="border border-silk-gold/40 text-silk-ivory hover:border-silk-gold hover:text-silk-gold font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded transition duration-300"
              >
                Read Muga Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
