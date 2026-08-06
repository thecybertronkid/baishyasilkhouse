"use client";

import React, { useState } from "react";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: "r1",
    name: "Dr. Priyanka Sarma",
    city: "New Delhi",
    sareePurchased: "Royal Golden Assam Muga Silk Saree",
    rating: 5,
    date: "June 2026",
    comment:
      "I ordered this Muga silk saree for my daughter's wedding reception. The natural golden sheen is breathtaking! Unboxing the scented wooden box felt like receiving a royal heirloom.",
    verified: true,
  },
  {
    id: "r2",
    name: "Ananya Mukherjee",
    city: "Kolkata",
    sareePurchased: "Ivory & Crimson Pat Silk Mekhela Chador",
    rating: 5,
    date: "May 2026",
    comment:
      "Finding genuine Assam Pat silk outside Guwahati used to be tough. Baishya Silk House is 100% authentic. The Silk Mark certificate and minakari detail are immaculate.",
    verified: true,
  },
  {
    id: "r3",
    name: "Meenakshi Sundaram",
    city: "Chennai",
    sareePurchased: "Organic Eri Ahimsa Silk Stole",
    rating: 5,
    date: "April 2026",
    comment:
      "Eri silk's soft matte texture is divine. It keeps me warm during travel while feeling incredibly lightweight. Exceptional craftsmanship!",
    verified: true,
  },
];

export const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);

  const review = REVIEWS[current];

  return (
    <section className="py-20 bg-silk-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
            PATRON TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon">
            Stories From Our Connoisseurs
          </h2>
          <div className="w-16 h-0.5 bg-silk-gold mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto bg-silk-cream rounded-2xl p-8 sm:p-12 border border-silk-gold/30 shadow-luxury relative">
          <Quote className="w-12 h-12 text-silk-gold/20 absolute top-6 left-6 pointer-events-none" />

          <div className="space-y-6 text-center relative z-10">
            {/* Rating Stars */}
            <div className="flex justify-center gap-1 text-silk-gold">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <p className="font-serif italic text-base sm:text-lg text-silk-black leading-relaxed">
              "{review.comment}"
            </p>

            <div>
              <h4 className="font-serif font-bold text-base text-silk-maroon">{review.name}</h4>
              <p className="text-xs text-silk-black/60">{review.city} • Purchased: {review.sareePurchased}</p>
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-silk-emerald mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Heritage Buyer
                </span>
              )}
            </div>

            {/* Slider controls */}
            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
                className="p-2 rounded-full border border-silk-gold/40 text-silk-maroon hover:bg-silk-maroon hover:text-silk-gold transition"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrent((prev) => (prev + 1) % REVIEWS.length)}
                className="p-2 rounded-full border border-silk-gold/40 text-silk-maroon hover:bg-silk-maroon hover:text-silk-gold transition"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
