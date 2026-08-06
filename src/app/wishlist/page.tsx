"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/shop/ProductCard";
import { Heart, Sparkles } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="border-b border-silk-gold/30 pb-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon flex items-center gap-2">
              <Heart className="w-6 h-6 text-silk-gold fill-current" /> Saved Wishlist
            </h1>
            <p className="text-xs text-silk-black/70 mt-1">
              Your favorite handwoven silk sarees and heirloom pieces.
            </p>
          </div>
          <span className="text-xs font-bold text-silk-maroon bg-silk-gold/20 px-3 py-1 rounded-full">
            {wishlist.length} Saved Items
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-20 text-center bg-silk-cream rounded-2xl border border-silk-gold/30 p-8 space-y-4 max-w-md mx-auto">
            <Sparkles className="w-12 h-12 text-silk-gold mx-auto" />
            <h3 className="font-serif text-xl font-bold text-silk-black">Your Wishlist is Empty</h3>
            <p className="text-xs text-silk-black/60">
              Click the heart icon on any silk product to save it here for later.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-silk-maroon text-silk-gold font-bold text-xs px-8 py-3 rounded shadow hover:bg-silk-maroon-dark transition"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
