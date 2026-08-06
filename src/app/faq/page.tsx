"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/faqs";
import { ChevronDown, HelpCircle, Search } from "lucide-react";

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Authenticity", "Silk Care", "Customization", "Shipping", "Returns", "Payment"];

  const filteredFaqs = FAQS.filter((faq) => {
    if (activeCategory !== "All" && faq.category !== activeCategory) return false;
    if (search && !faq.question.toLowerCase().includes(search.toLowerCase()) && !faq.answer.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-serif font-bold text-silk-gold-dark uppercase tracking-widest">
            PATRON ASSISTANCE
          </span>
          <h1 className="font-serif text-3xl font-bold text-silk-maroon flex items-center justify-center gap-2">
            <HelpCircle className="w-7 h-7 text-silk-gold" /> Frequently Asked Questions
          </h1>
          <p className="text-xs text-silk-black/70">
            Find immediate answers regarding Silk Mark certification, saree care, and global shipping.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-silk-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. Muga silk, dry clean, returns)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-full border border-silk-gold/30 bg-silk-cream focus:outline-none focus:border-silk-gold shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 justify-center font-serif text-xs uppercase tracking-wider font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                activeCategory === cat
                  ? "bg-silk-maroon text-silk-gold border-silk-maroon shadow"
                  : "bg-silk-cream text-silk-black/70 border-silk-gold/30 hover:border-silk-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-silk-cream rounded-xl border border-silk-gold/30 overflow-hidden shadow-card"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full p-4 text-left font-serif font-bold text-sm text-silk-maroon flex items-center justify-between gap-4 hover:bg-silk-beige/50 transition"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-silk-gold transition-transform duration-300 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openId === faq.id && (
                <div className="p-4 pt-0 text-xs text-silk-black/80 leading-relaxed border-t border-silk-gold/10 bg-silk-ivory">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
