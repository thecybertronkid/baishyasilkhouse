"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export const CollectionSpotlight = () => {
  return (
    <section className="py-20 bg-silk-black text-silk-ivory relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-silk-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Canvas */}
          <div className="relative space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-silk-gold/30">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"
                alt="Royal Assam Muga Silk Saree Collection"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-silk-black/80 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-silk-maroon/90 border border-silk-gold/40 p-4 rounded-xl shadow-2xl backdrop-blur-md max-w-xs space-y-1">
              <div className="flex items-center gap-1.5 text-silk-gold font-serif font-bold text-xs">
                <Sparkles className="w-4 h-4" /> 24K Pure Zari Threadwork
              </div>
              <p className="text-[11px] text-silk-ivory/80">
                Woven on traditional pit looms over 45 days per masterpiece.
              </p>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-silk-gold/20 border border-silk-gold/40 px-3 py-1 rounded-full text-silk-gold text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> GI Tagged Assam Muga Silk
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-silk-gold-light leading-tight">
              The Golden Loom of Assam
            </h2>

            <p className="font-serif italic text-lg text-silk-beige">
              "Muga Silk is not just woven thread; it is the golden blood of Assam royalty that grows brighter with every passing generation."
            </p>

            <p className="text-xs sm:text-sm text-silk-ivory/70 leading-relaxed font-sans">
              Exclusive to the Brahmaputra valley, Muga silk is derived from wild silkworms feeding on Som trees. Naturally shimmering with a warm amber-gold tint without synthetic dyes, it possesses unmatched durability that outlasts human lifespans.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-serif text-silk-gold-light">
              <div className="border-l-2 border-silk-gold pl-3">
                <span className="font-bold text-base block text-silk-ivory">100% Organic</span>
                <span>Un-dyed Natural Luster</span>
              </div>
              <div className="border-l-2 border-silk-gold pl-3">
                <span className="font-bold text-base block text-silk-ivory">50+ Years</span>
                <span>Lifespan Heirloom Quality</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/shop?silk=Muga+Silk"
                className="bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded shadow-luxury transition flex items-center gap-2"
              >
                Shop Muga Masterpieces <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog/muga-silk-the-golden-treasure-of-assam"
                className="border border-silk-gold/40 text-silk-ivory hover:border-silk-gold hover:text-silk-gold font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded transition"
              >
                Read Muga Legend Journal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
