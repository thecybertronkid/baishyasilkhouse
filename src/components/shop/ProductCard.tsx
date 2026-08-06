"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setQuickViewProduct, currency } = useStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative bg-silk-ivory flex flex-col justify-between transition-all duration-500 font-sans">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-silk-cream border border-silk-gold/15 rounded-md">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
            />
          )}
        </Link>

        {/* Minimal Discrete Badge */}
        {product.isSilkMarkCertified && (
          <span className="absolute top-3 left-3 bg-silk-ivory/90 backdrop-blur-md text-silk-maroon text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border border-silk-gold/30">
            Silk Mark
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition ${
            isInWishlist(product.id)
              ? "bg-silk-maroon text-silk-gold"
              : "bg-silk-ivory/80 text-silk-maroon hover:bg-silk-maroon hover:text-silk-gold"
          }`}
          title="Wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
        </button>

        {/* Minimal Hover Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-silk-ivory/95 hover:bg-silk-ivory text-silk-black text-[11px] font-bold py-2 rounded border border-silk-gold/30 shadow-sm transition flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-silk-maroon" /> Quick View
          </button>
        </div>
      </div>

      {/* Minimal Details Area */}
      <div className="pt-3 pb-1 space-y-1 text-center">
        <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-silk-gold-dark block">
          {product.silkType}
        </span>

        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="font-serif text-sm font-bold text-silk-black hover:text-silk-gold transition line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-center gap-2 pt-0.5">
          <span className="font-serif font-bold text-xs text-silk-maroon">
            {formatPrice(product.price, currency)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] text-silk-black/40 line-through">
              {formatPrice(product.originalPrice, currency)}
            </span>
          )}
        </div>

        <div className="pt-1">
          <button
            onClick={handleAddToCart}
            className={`w-full text-[11px] font-bold py-2 px-3 rounded transition uppercase tracking-wider ${
              added
                ? "bg-silk-emerald text-silk-ivory"
                : "bg-silk-maroon/90 text-silk-gold hover:bg-silk-maroon"
            }`}
          >
            {added ? (
              <span className="flex items-center justify-center gap-1">
                <Check className="w-3.5 h-3.5" /> Added to Bag
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
