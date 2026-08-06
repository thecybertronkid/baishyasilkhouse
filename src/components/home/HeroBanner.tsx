"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    title: "THE ROYAL GOLDEN MUGA SILK",
    subtitle: "Authentic Handwoven Masterpieces of Sualkuchi, Assam",
    description: "Experience the natural metallic gold luster of GI-tagged Assam Muga silk woven with 24K pure zari Kingkhap motifs.",
    badge: "100% SILK MARK CERTIFIED",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1920",
    ctaText: "Shop Muga Collection",
    ctaLink: "/shop?silk=Muga+Silk",
  },
  {
    id: 2,
    title: "BRIDAL MEKHELA CHADOR SYMPHONY",
    subtitle: "Assam's Quintessential Two-Piece Heritage Attire",
    description: "Pristine Ivory Pat Silk embroidered with crimson Minakari floral vines & heavy Guna brocades for the modern royal bride.",
    badge: "BRIDAL EXCLUSIVE 2026",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1920",
    ctaText: "Explore Mekhela Chadors",
    ctaLink: "/shop?category=Mekhela+Chador",
  },
  {
    id: 3,
    title: "AHIMSA ERI SILK (PEACE SILK)",
    subtitle: "Sustainable Non-Violent Thermal Silk of Assam",
    description: "Hand-spun organic thermal silk offering cozy breathable warmth and dull matte luxury texture.",
    badge: "ORGANIC & AHIMSA SILK",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1920",
    ctaText: "Discover Eri Silk",
    ctaLink: "/shop?silk=Eri+Silk",
  },
];

export const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-[82vh] min-h-[580px] bg-silk-black overflow-hidden flex items-center">
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
            className="w-full h-full object-cover object-center filter brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-silk-black/90 via-silk-black/50 to-transparent" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full z-10">
        <div className="max-w-2xl space-y-6 text-silk-ivory animate-fadeIn">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-silk-maroon/80 border border-silk-gold/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-silk-gold-light text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-silk-gold" />
            {slide.badge}
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-silk-ivory leading-none">
            {slide.title}
          </h1>

          <p className="font-serif italic text-silk-gold-light text-base sm:text-xl font-medium">
            {slide.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-silk-ivory/80 leading-relaxed font-sans max-w-xl">
            {slide.description}
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <Link
              href={slide.ctaLink}
              className="bg-gradient-to-r from-silk-gold to-silk-gold-dark text-silk-black hover:from-silk-gold-light hover:to-silk-gold font-bold text-xs sm:text-sm uppercase tracking-widest py-3.5 px-8 rounded shadow-luxury transition-all duration-300 flex items-center gap-2"
            >
              {slide.ctaText} <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="border border-silk-gold/50 text-silk-ivory hover:border-silk-gold hover:text-silk-gold font-bold text-xs sm:text-sm uppercase tracking-widest py-3.5 px-8 rounded backdrop-blur-sm transition duration-300"
            >
              Explore Sualkuchi Heritage
            </Link>
          </div>

          {/* Silk Mark Seal Trust */}
          <div className="pt-6 flex items-center gap-3 text-xs text-silk-gold-light/90 border-t border-silk-gold/20 max-w-md">
            <ShieldCheck className="w-5 h-5 text-silk-gold flex-shrink-0" />
            <span>Guaranteed 100% Pure Silk Mark Certificate with every order.</span>
          </div>
        </div>
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 z-20 p-3 rounded-full bg-silk-black/40 text-silk-gold hover:bg-silk-maroon hover:text-silk-ivory border border-silk-gold/30 transition backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)}
        className="absolute right-4 z-20 p-3 rounded-full bg-silk-black/40 text-silk-gold hover:bg-silk-maroon hover:text-silk-ivory border border-silk-gold/30 transition backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-silk-gold" : "w-2 bg-silk-ivory/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
