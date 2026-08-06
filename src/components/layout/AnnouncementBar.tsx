"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const ANNOUNCEMENTS = [
  "✨ Handwoven Royal Muga Silk Sarees - 100% Certified Silk Mark",
  "🚚 Complimentary Express Shipping Across India on Orders Above ₹5,000",
  "🎁 Complimentary Luxury Wooden Scented Box Packaging on Bridal Silk Orders",
  "🌿 Ahimsa Eri Silk (Peace Silk) Collection Now Available",
];

export const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const { currency, setCurrency } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-silk-maroon text-silk-ivory text-xs tracking-wider py-2 px-4 border-b border-silk-gold/30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="hidden lg:flex items-center space-x-4 text-silk-gold-light/90">
          <a href="tel:+919864012345" className="hover:text-silk-gold flex items-center gap-1 transition">
            <Phone className="w-3 h-3" /> +91 98640 12345
          </a>
          <span className="text-silk-gold/40">•</span>
          <a href="mailto:concierge@baishyasilk.com" className="hover:text-silk-gold flex items-center gap-1 transition">
            <Mail className="w-3 h-3" /> concierge@baishyasilk.com
          </a>
        </div>

        {/* Sliding announcement text */}
        <div className="flex items-center justify-center space-x-2 text-center font-medium min-h-[1.5rem]">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
            aria-label="Previous announcement"
            className="text-silk-gold-light/60 hover:text-silk-gold p-0.5 transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="flex items-center gap-1.5 transition-all duration-300">
            <Sparkles className="w-3 h-3 text-silk-gold" />
            {ANNOUNCEMENTS[index]}
          </span>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
            aria-label="Next announcement"
            className="text-silk-gold-light/60 hover:text-silk-gold p-0.5 transition"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Utility links & currency selector */}
        <div className="flex items-center space-x-3 text-silk-gold-light/90">
          <a href="/track-order" className="hover:text-silk-gold transition hidden sm:inline">
            Track Order
          </a>
          <span className="text-silk-gold/30 hidden sm:inline">•</span>
          <div className="flex items-center bg-silk-maroon-dark/60 border border-silk-gold/30 rounded px-2 py-0.5">
            <span className="text-[10px] text-silk-gold-light mr-1 font-semibold">CURRENCY:</span>
            <button
              onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
              className="font-bold text-silk-gold hover:underline uppercase text-[11px]"
            >
              {currency} {currency === "INR" ? "₹" : "$"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
