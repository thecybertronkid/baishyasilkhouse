"use client";

import React from "react";
import { Instagram, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";

const INSTA_POSTS = [
  {
    id: "inst-1",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
    likes: "2.4k",
    product: PRODUCTS[0],
  },
  {
    id: "inst-2",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    likes: "1.8k",
    product: PRODUCTS[1],
  },
  {
    id: "inst-3",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600",
    likes: "3.1k",
    product: PRODUCTS[2],
  },
  {
    id: "inst-4",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
    likes: "1.2k",
    product: PRODUCTS[5],
  },
];

export const InstagramFeed = () => {
  const { setQuickViewProduct } = useStore();

  return (
    <section className="py-16 bg-silk-cream border-t border-silk-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
            @BAISHYASILK
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-silk-maroon flex items-center justify-center gap-2">
            <Instagram className="w-6 h-6 text-silk-gold" /> Shop The Instagram Look
          </h2>
          <p className="text-xs text-silk-black/70">
            Tag #BaishyaSilkRoyal in your silk photos to be featured in our official gallery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {INSTA_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => post.product && setQuickViewProduct(post.product)}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-card border border-silk-gold/30 cursor-pointer"
            >
              <img
                src={post.image}
                alt="Instagram look"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-silk-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-silk-ivory space-y-2 p-4 text-center">
                <ShoppingBag className="w-6 h-6 text-silk-gold" />
                <span className="font-serif font-bold text-xs">Shop This Look</span>
                <span className="text-[10px] text-silk-gold-light">❤️ {post.likes} Likes</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
