"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "../shop/ProductCard";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";

export const ProductCarousel = () => {
  const [activeTab, setActiveTab] = useState<"best" | "new" | "trending" | "bridal">("best");
  const [liveProducts, setLiveProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          const formattedDbProducts: Product[] = data.products.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            tagline: p.tagline,
            subtitle: p.subtitle,
            price: p.price,
            originalPrice: p.originalPrice || p.price,
            discountPercentage: p.discountPercentage || 0,
            category: p.category,
            silkType: p.silkType,
            weavingStyle: p.weavingStyle || "Handloom",
            occasion: p.occasion || "Bridal",
            stateOrigin: p.stateOrigin || "Sualkuchi, Assam",
            rating: p.rating || 5.0,
            reviewCount: p.reviewCount || 0,
            sku: p.sku,
            stock: p.stock || 10,
            inStock: p.inStock ?? true,
            isSilkMarkCertified: p.isSilkMarkCertified ?? true,
            isBestSeller: p.isBestSeller ?? false,
            isNewArrival: p.isNewArrival ?? true,
            isTrending: p.isTrending ?? false,
            isBridal: p.isBridal ?? false,
            description: p.description,
            story: p.story,
            images: p.images?.length > 0 ? p.images.map((img: any) => img.url) : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"],
            colors: p.colors || [{ name: "Standard", hex: "#D4AF37" }],
            reviews: p.reviews || [],
          }));

          const combined = [...formattedDbProducts];
          PRODUCTS.forEach((staticProd) => {
            if (!combined.some((p) => p.id === staticProd.id || p.slug === staticProd.slug)) {
              combined.push(staticProd);
            }
          });

          setLiveProducts(combined);
        }
      } catch (err) {
        console.error("Error loading products for home carousel:", err);
      }
    };

    fetchLiveProducts();
  }, []);

  const getFilteredProducts = () => {
    switch (activeTab) {
      case "best":
        return liveProducts.filter((p) => p.isBestSeller || p.inStock);
      case "new":
        return liveProducts.filter((p) => p.isNewArrival || p.inStock);
      case "trending":
        return liveProducts.filter((p) => p.isTrending || p.inStock);
      case "bridal":
        return liveProducts.filter((p) => p.isBridal || p.category === "Silk Sarees");
      default:
        return liveProducts;
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

          {/* Underlined Navigation Tabs */}
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
            Explore Complete Catalog ({liveProducts.length} Masterpieces) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
