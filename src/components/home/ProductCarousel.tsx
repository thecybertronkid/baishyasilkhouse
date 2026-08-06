"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "../shop/ProductCard";
import { ArrowRight } from "lucide-react";

export const ProductCarousel = () => {
  const [activeTab, setActiveTab] = useState<"best" | "new" | "trending" | "bridal">("best");

  const getFilteredProducts = () => {
    switch (activeTab) {
      case "best":
        return PRODUCTS.filter((p) => p.isBestSeller);
      case "new":
        return PRODUCTS.filter((p) => p.isNewArrival);
      case "trending":
        return PRODUCTS.filter((p) => p.isTrending);
      case "bridal":
        return PRODUCTS.filter((p) => p.isBridal);
      default:
        return PRODUCTS;
    }
  };

  const productsList = getFilteredProducts().slice(0, 4);

  return (
    <section className="py-24 bg-silk-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-silk-gold/20 pb-6">
          <div className="space-y-2">
            <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-silk-gold-dark uppercase block">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-3xl font-bold text-silk-maroon uppercase tracking-wide">
              Patron Favorites
            </h2>
          </div>

          {/* Clean Underlined Navigation Tabs */}
          <div className="flex flex-wrap gap-6 font-serif text-xs uppercase tracking-widest font-bold">
            {[
              { key: "best", label: "Best Sellers" },
              { key: "new", label: "New Arrivals" },
              { key: "trending", label: "Trending" },
              { key: "bridal", label: "Bridal Silk" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-2 transition border-b-2 ${
                  activeTab === tab.key
                    ? "border-silk-maroon text-silk-maroon"
                    : "border-transparent text-silk-black/50 hover:text-silk-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-silk-maroon text-silk-maroon hover:bg-silk-maroon hover:text-silk-gold font-bold text-xs uppercase tracking-widest py-3.5 px-8 rounded transition duration-300"
          >
            Explore Complete Catalog ({PRODUCTS.length} Masterpieces) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
