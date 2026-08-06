"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "cat-1",
    name: "Golden Muga Silk Sarees",
    subtitle: "Naturally Shimmering Assam Muga • GI Tagged",
    itemCount: "24 Masterpieces",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
    href: "/shop?silk=Muga+Silk",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "cat-2",
    name: "Mekhela Chador",
    subtitle: "Assamese 2-Piece Bridal & Festive Attire",
    itemCount: "18 Sets",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
    href: "/shop?category=Mekhela+Chador",
    span: "col-span-1 md:col-span-1",
  },
  {
    id: "cat-3",
    name: "Eri Ahimsa Stoles",
    subtitle: "Non-violent Sustainable Thermal Silk",
    itemCount: "12 Designs",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800",
    href: "/shop?silk=Eri+Silk",
    span: "col-span-1 md:col-span-1",
  },
  {
    id: "cat-4",
    name: "Men's Silk Wear",
    subtitle: "Handloom Muga & Eri Kurta Sets",
    itemCount: "15 Ensembles",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    href: "/shop?category=Men%27s+Silk+Wear",
    span: "col-span-1 md:col-span-2",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="py-20 bg-silk-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
            SUALKUCHI CURATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon">
            Featured Silk Categories
          </h2>
          <div className="w-16 h-0.5 bg-silk-gold mx-auto" />
          <p className="text-xs sm:text-sm text-silk-black/70 font-sans">
            Handwoven in Assam with 100% natural silk yarns, certified by Silk Mark Organization of India.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative rounded-xl overflow-hidden shadow-card border border-silk-gold/20 min-h-[260px] flex flex-col justify-end p-6 ${cat.span}`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-silk-black/90 via-silk-black/40 to-transparent" />

              <div className="relative z-10 text-silk-ivory space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-bold text-silk-gold-light bg-silk-maroon/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  {cat.itemCount}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-silk-ivory group-hover:text-silk-gold transition">
                  {cat.name}
                </h3>
                <p className="text-xs text-silk-ivory/80 line-clamp-1">{cat.subtitle}</p>
                <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-bold text-silk-gold group-hover:translate-x-1 transition">
                  Explore Category <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
