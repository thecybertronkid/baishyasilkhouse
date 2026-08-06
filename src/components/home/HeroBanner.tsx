"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    title: "ROYAL GOLDEN MUGA SILK",
    subtitle: "Naturally Shimmering Heritage • Handwoven in Sualkuchi",
    description: "The rare golden thread of Assam, traditionally woven with 24K pure zari Kingkhap motifs.",
    badge: "SUALKUCHI HANDLOOM HERITAGE",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1920",
    ctaText: "Explore Muga Sarees",
    ctaLink: "/shop?silk=Muga+Silk",
  },
  {
    id: 2,
    title: "PAT SILK MEKHELA CHADOR",
    subtitle: "Quintessential Assamese Two-Piece Bridal Attire",
    description: "Pristine Ivory Mulberry Silk embroidered with fine Minakari floral vines.",
    badge: "BRIDAL EXCLUSIVE 2026",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1920",
    ctaText: "View Mekhela Chadors",
    ctaLink: "/shop?category=Mekhela+Chador",
  },
  {
    id: 3,
    title: "ORGANIC ERI AHIMSA SILK",
    subtitle: "Non-Violent Thermal Silk of Assam",
    description: "Hand-spun organic thermal yarn offering cozy texture and dull matte luxury warmth.",
    badge: "SUSTAINABLE PEACE SILK",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1920",
    ctaText: "Discover Eri Stoles",
    ctaLink: "/shop?silk=Eri+Silk",
  },
];

export const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-silk-black overflow-hidden flex items-center">
      {/* Background Image Carousel */}
      {HERO_SLIDES.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 scale-105" : "opacity-0 scale-100 pointer-events-none"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-center filter brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-silk-black/80 via-silk-black/30 to-transparent" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6 text-silk-ivory animate-fadeIn">
          {/* Subtle Accent Line */}
          <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.35em] text-silk-gold block font-semibold">
            {slide.badge}
          </span>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest text-silk-ivory leading-tight uppercase">
            {slide.title}
          </h1>

          <div className="w-16 h-[1px] bg-silk-gold mx-auto" />

          <p className="font-serif italic text-silk-gold-light text-base sm:text-lg">
            {slide.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-silk-ivory/80 leading-relaxed font-sans max-w-lg mx-auto font-light">
            {slide.description}
          </p>

          {/* Clean Minimal CTAs */}
          <div className="pt-6 flex justify-center gap-4 items-center">
            <Link
              href={slide.ctaLink}
              className="bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded transition duration-300 flex items-center gap-2 shadow-luxury"
            >
              {slide.ctaText} <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/about"
              className="border border-silk-gold/40 text-silk-ivory hover:border-silk-gold hover:text-silk-gold font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded transition duration-300"
            >
              Our Heritage
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-6 z-20 p-3 rounded-full text-silk-gold hover:bg-silk-maroon/60 transition backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-6 z-20 p-3 rounded-full text-silk-gold hover:bg-silk-maroon/60 transition backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-0.5 transition-all duration-300 ${
              i === current ? "w-8 bg-silk-gold" : "w-3 bg-silk-ivory/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
