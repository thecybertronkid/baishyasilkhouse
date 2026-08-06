"use client";

import React from "react";
import Link from "next/link";
import { ARTISANS } from "@/data/artisans";
import { ShieldCheck, Award, HeartHandshake, Sparkles, ArrowRight, Quote } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans space-y-16">
      {/* Editorial Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-silk-maroon to-silk-maroon-dark text-silk-ivory rounded-3xl p-8 sm:p-16 border border-silk-gold/40 shadow-2xl relative overflow-hidden text-center space-y-4">
          <span className="text-xs font-serif font-bold text-silk-gold uppercase tracking-[0.3em]">
            ESTABLISHED 1984 • SUALKUCHI ASSAM
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-silk-gold-light leading-tight">
            The Heritage of Baishya Silk House
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-silk-beige max-w-2xl mx-auto">
            "Preserving four generations of sacred Assamese silk weaving, bringing pure Golden Muga Silk & Pat Silk to connoisseurs worldwide."
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs font-serif font-bold tracking-[0.2em] text-silk-gold-dark uppercase block">
            SUALKUCHI: THE MANCHESTER OF THE EAST
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-silk-maroon">
            A Legacy Woven In Golden Thread
          </h2>
          <p className="text-xs sm:text-sm text-silk-black/80 leading-relaxed">
            Founded in 1984 in the historic village of Sualkuchi on the banks of the Brahmaputra River, Baishya Silk House began as a small loom atelier led by Late Master Artisan Hemanta Baishya.
          </p>
          <p className="text-xs sm:text-sm text-silk-black/80 leading-relaxed">
            Today, we collaborate directly with over 200 artisan families, ensuring fair-trade wages, organic cocoon sourcing, and 100% pure Silk Mark Organization of India certification.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-silk-gold/30">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000"
            alt="Handloom Weaving"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Step by Step Silk Journey */}
      <div className="bg-silk-beige py-16 border-y border-silk-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-serif font-bold text-silk-gold-dark uppercase tracking-widest">
              THE 5-STAGE SILK JOURNEY
            </span>
            <h2 className="font-serif text-3xl font-bold text-silk-maroon">From Cocoon to Masterpiece</h2>
            <div className="w-16 h-0.5 bg-silk-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
            {[
              { title: "1. Sericulture", desc: "Wild silkworms feeding on organic Som & Soalu tree leaves." },
              { title: "2. Reeling Yarns", desc: "Hand-reeling golden silk filaments from cocoons." },
              { title: "3. Natural Dyeing", desc: "Eco-friendly vegetable pigments & un-dyed Muga gold." },
              { title: "4. Handloom Weaving", desc: "Up to 45 days per saree on pit looms with Kingkhap motifs." },
              { title: "5. Silk Mark Tagging", desc: "Independent SMOI quality seal inspection." },
            ].map((step, i) => (
              <div key={i} className="p-4 bg-silk-ivory rounded-xl border border-silk-gold/20 shadow-sm space-y-2">
                <span className="w-8 h-8 rounded-full bg-silk-maroon text-silk-gold font-serif font-bold text-sm flex items-center justify-center mx-auto">
                  {i + 1}
                </span>
                <h3 className="font-serif font-bold text-xs text-silk-maroon">{step.title}</h3>
                <p className="text-[11px] text-silk-black/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Master Artisans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-bold text-silk-maroon">Meet Our Master Artisans</h2>
          <p className="text-xs text-silk-black/70">The dedicated weavers preserving Assam's living textile heritage.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTISANS.map((artisan) => (
            <div key={artisan.id} className="bg-silk-cream rounded-xl p-6 border border-silk-gold/30 shadow-card space-y-3">
              <img src={artisan.image} alt="" className="w-full h-48 object-cover rounded-lg border" />
              <h3 className="font-serif font-bold text-base text-silk-maroon">{artisan.name}</h3>
              <p className="text-xs font-bold text-silk-gold-dark">{artisan.role}</p>
              <p className="text-xs italic text-silk-black/80">"{artisan.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
