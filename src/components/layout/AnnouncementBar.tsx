"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const ANNOUNCEMENTS = [
  "Handwoven Royal Muga Silk Sarees • 100% Certified Silk Mark",
  "Complimentary Express Shipping Across India on Orders Above ₹5,000",
  "Complimentary Scented Wooden Box Packaging on Bridal Silk Orders",
  "Organic Ahimsa Eri Silk (Peace Silk) Collection Now Available",
];

export const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const { currency, setCurrency } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-silk-maroon text-silk-ivory text-[10px] sm:text-[11px] tracking-[0.2em] font-serif uppercase py-2 px-4 border-b border-silk-gold/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Contact snippet */}
        <div className="hidden lg:flex items-center space-x-3 text-silk-gold-light/80">
          <a href="tel:+919864012345" className="hover:text-silk-gold transition">
            +91 98640 12345
          </a>
          <span>•</span>
          <a href="mailto:concierge@baishyasilk.com" className="hover:text-silk-gold transition">
            concierge@baishyasilk.com
          </a>
        </div>

        {/* Sliding announcement text */}
        <div className="flex-1 flex items-center justify-center space-x-2 text-center text-silk-gold-light font-medium">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
            aria-label="Previous announcement"
            className="text-silk-gold-light/50 hover:text-silk-gold transition p-0.5"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <span className="transition-all duration-300">
            {ANNOUNCEMENTS[index]}
          </span>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
            aria-label="Next announcement"
            className="text-silk-gold-light/50 hover:text-silk-gold transition p-0.5"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Utility links & currency selector */}
        <div className="flex items-center space-x-3 text-silk-gold-light/90">
          <a href="/track-order" className="hover:text-silk-gold transition hidden sm:inline">
            Track Order
          </a>
          <span className="hidden sm:inline opacity-30">•</span>
          <button
            onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
            className="font-bold text-silk-gold hover:underline uppercase text-[10px] tracking-widest"
          >
            {currency} ({currency === "INR" ? "₹" : "$"})
          </button>
        </div>
      </div>
    </div>
  );
};
