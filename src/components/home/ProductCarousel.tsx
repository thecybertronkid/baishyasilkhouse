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

  const productsList = getFilteredProducts();

  return (
    <section className="py-20 bg-silk-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-silk-gold/30 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
              HERITAGE LOOMS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon">
              Curated Silk Collection
            </h2>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 font-serif text-xs uppercase tracking-wider font-bold">
            {[
              { key: "best", label: "Best Sellers" },
              { key: "new", label: "New Arrivals" },
              { key: "trending", label: "Trending Now" },
              { key: "bridal", label: "Bridal Silk" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-full border transition ${
                  activeTab === tab.key
                    ? "bg-silk-maroon text-silk-gold border-silk-maroon shadow"
                    : "bg-silk-ivory text-silk-black/70 border-silk-gold/30 hover:border-silk-gold"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs uppercase tracking-widest py-3 px-8 rounded shadow-md transition"
          >
            Explore Complete Shop Catalog ({PRODUCTS.length} Items) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
