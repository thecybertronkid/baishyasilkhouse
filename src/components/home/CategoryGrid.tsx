"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "cat-1",
    name: "Golden Muga Silk",
    subtitle: "GI-Tagged Natural Golden Silk of Assam",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
    href: "/shop?silk=Muga+Silk",
    span: "col-span-1 md:col-span-2 row-span-2 min-h-[420px]",
  },
  {
    id: "cat-2",
    name: "Mekhela Chador",
    subtitle: "Two-Piece Bridal & Festive Attire",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
    href: "/shop?category=Mekhela+Chador",
    span: "col-span-1 md:col-span-1 min-h-[260px]",
  },
  {
    id: "cat-3",
    name: "Eri Ahimsa Stoles",
    subtitle: "Non-Violent Thermal Silk",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800",
    href: "/shop?silk=Eri+Silk",
    span: "col-span-1 md:col-span-1 min-h-[260px]",
  },
  {
    id: "cat-4",
    name: "Men's Silk Wear",
    subtitle: "Handloom Muga & Eri Kurtas",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
    href: "/shop?category=Men%27s+Silk+Wear",
    span: "col-span-1 md:col-span-2 min-h-[240px]",
  },
];

export const CategoryGrid = () => {
  return (
    <section className="py-24 bg-silk-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-lg mx-auto space-y-3 mb-16">
          <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-silk-gold-dark uppercase block">
            THE HERITAGE LOOM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon uppercase tracking-wide">
            Featured Silk Collections
          </h2>
          <div className="w-12 h-[1px] bg-silk-gold mx-auto" />
          <p className="text-xs text-silk-black/60 font-light leading-relaxed">
            Handcrafted in Sualkuchi with 100% natural silk yarns, certified by Silk Mark Organization of India.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className={`group relative rounded-lg overflow-hidden border border-silk-gold/20 flex flex-col justify-end p-8 ${cat.span}`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-silk-black/85 via-silk-black/30 to-transparent" />

              <div className="relative z-10 text-silk-ivory space-y-1.5">
                <h3 className="font-serif text-2xl font-bold text-silk-ivory group-hover:text-silk-gold transition tracking-wide uppercase">
                  {cat.name}
                </h3>
                <p className="text-xs text-silk-ivory/80 font-light">{cat.subtitle}</p>
                <div className="pt-2 inline-flex items-center gap-1.5 text-xs font-bold text-silk-gold uppercase tracking-widest group-hover:translate-x-1 transition">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
