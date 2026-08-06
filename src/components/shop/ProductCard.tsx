"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, ShieldCheck, SlidersHorizontal, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
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
    <div className="group relative bg-silk-ivory rounded-xl overflow-hidden border border-silk-gold/30 shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-silk-beige">
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

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
          {product.isSilkMarkCertified && (
            <span className="bg-silk-gold text-silk-black text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-silk-maroon" /> Silk Mark
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="bg-silk-maroon text-silk-gold text-[9px] font-bold uppercase px-2 py-0.5 rounded shadow">
              Limited Masterpiece
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="bg-silk-emerald text-silk-ivory text-[9px] font-bold px-1.5 py-0.5 rounded">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition shadow ${
            isInWishlist(product.id)
              ? "bg-silk-maroon text-silk-ivory"
              : "bg-silk-ivory/80 text-silk-maroon hover:bg-silk-maroon hover:text-silk-ivory"
          }`}
          title="Wishlist"
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
        </button>

        {/* Hover Quick Action Toolbar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 bg-silk-ivory/90 hover:bg-silk-ivory text-silk-black text-xs font-bold py-2 rounded shadow backdrop-blur-md transition flex items-center justify-center gap-1"
          >
            <Eye className="w-3.5 h-3.5 text-silk-maroon" /> Quick View
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCompare(product);
            }}
            className={`p-2 rounded backdrop-blur-md shadow transition ${
              isInCompare(product.id)
                ? "bg-silk-emerald text-silk-ivory"
                : "bg-silk-ivory/90 hover:bg-silk-gold text-silk-maroon"
            }`}
            title="Compare Specs"
            aria-label="Compare Specs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] text-silk-maroon font-bold uppercase tracking-wider">
            <span>{product.silkType}</span>
            <span>{product.stateOrigin.split(",")[0]}</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif text-sm font-bold text-silk-black group-hover:text-silk-gold transition line-clamp-1 mt-1">
              {product.title}
            </h3>
          </Link>
          <p className="text-[11px] text-silk-black/60 line-clamp-1 italic">{product.tagline}</p>
        </div>

        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 rounded-full border border-silk-gold/40"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Price & Add to Bag */}
        <div className="pt-2 border-t border-silk-gold/20 flex items-center justify-between">
          <div>
            <span className="font-serif font-bold text-base text-silk-maroon">
              {formatPrice(product.price, currency)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-silk-black/40 line-through block -mt-1">
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`text-xs font-bold px-3 py-1.5 rounded transition shadow flex items-center gap-1 ${
              added
                ? "bg-silk-emerald text-silk-ivory"
                : "bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
