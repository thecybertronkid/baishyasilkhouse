"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    id: "r1",
    name: "Dr. Priyanka Sarma",
    city: "New Delhi",
    sareePurchased: "Royal Golden Assam Muga Silk Saree",
    comment:
      "I ordered this Muga silk saree for my daughter's wedding reception. The natural golden sheen is breathtaking! Unboxing the scented wooden box felt like receiving a royal heirloom.",
  },
  {
    id: "r2",
    name: "Ananya Mukherjee",
    city: "Kolkata",
    sareePurchased: "Ivory & Crimson Pat Silk Mekhela Chador",
    comment:
      "Finding genuine Assam Pat silk outside Guwahati used to be tough. Baishya Silk House is 100% authentic. The Silk Mark certificate and minakari detail are immaculate.",
  },
  {
    id: "r3",
    name: "Meenakshi Sundaram",
    city: "Chennai",
    sareePurchased: "Organic Eri Ahimsa Silk Stole",
    comment:
      "Eri silk's soft matte texture is divine. It keeps me warm during travel while feeling incredibly lightweight. Exceptional craftsmanship!",
  },
];

export const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);

  const review = REVIEWS[current];

  return (
    <section className="py-28 bg-silk-cream border-t border-silk-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-silk-gold-dark uppercase block">
            PATRON TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon uppercase tracking-wide">
            Words of Connoisseurs
          </h2>
          <div className="w-12 h-[1px] bg-silk-gold mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto bg-silk-ivory rounded-xl p-8 sm:p-12 border border-silk-gold/20 shadow-card text-center space-y-6">
          <div className="flex justify-center gap-1 text-silk-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <p className="font-serif italic text-base sm:text-lg text-silk-black leading-relaxed font-light">
            "{review.comment}"
          </p>

          <div>
            <h4 className="font-serif font-bold text-sm text-silk-maroon">{review.name}</h4>
            <p className="text-[11px] text-silk-black/50 font-light">{review.city} • {review.sareePurchased}</p>
          </div>

          {/* Slider controls */}
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
              className="p-2 rounded-full border border-silk-gold/30 text-silk-maroon hover:bg-silk-maroon hover:text-silk-gold transition"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % REVIEWS.length)}
              className="p-2 rounded-full border border-silk-gold/30 text-silk-maroon hover:bg-silk-maroon hover:text-silk-gold transition"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
