"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, SlidersHorizontal, MessageCircle, ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { currency } = useStore();

  const handleInquireWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Baishya Silk House Concierge, I would like to inquire about "${product.title}" (${formatPrice(product.price, currency)}).`
    );
    window.open(`https://wa.me/919864012345?text=${text}`, "_blank");
  };

  return (
    <div className="group bg-silk-ivory rounded-xl border border-silk-gold/20 overflow-hidden hover:shadow-card transition duration-500 flex flex-col justify-between">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-silk-cream">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.isSilkMarkCertified && (
              <span className="bg-silk-ivory/90 backdrop-blur-md text-silk-maroon text-[9px] font-serif font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-silk-gold/40 shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-silk-gold" /> Silk Mark
              </span>
            )}
            {product.isBridal && (
              <span className="bg-silk-maroon/90 backdrop-blur-md text-silk-gold text-[9px] font-serif font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-silk-gold/40 shadow-sm">
                Bridal Silk
              </span>
            )}
          </div>

          {/* Floating Actions (Wishlist & Compare) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-full backdrop-blur-md shadow transition ${
                isInWishlist(product.id)
                  ? "bg-silk-maroon text-silk-gold"
                  : "bg-silk-ivory/90 text-silk-black hover:text-silk-maroon"
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={() => addToCompare(product)}
              className={`p-2 rounded-full backdrop-blur-md shadow transition ${
                isInCompare(product.id)
                  ? "bg-silk-emerald text-silk-ivory"
                  : "bg-silk-ivory/90 text-silk-black hover:text-silk-emerald"
              }`}
              title="Compare Masterpiece"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between text-[10px] font-serif uppercase tracking-widest text-silk-gold-dark font-bold">
            <span>{product.silkType}</span>
            <span>{product.stateOrigin}</span>
          </div>

          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-serif font-bold text-sm text-silk-maroon group-hover:text-silk-gold transition line-clamp-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-[11px] text-silk-black/60 font-light line-clamp-1 italic">
            {product.tagline || product.subtitle}
          </p>

          <div className="pt-2 flex items-baseline justify-between border-t border-silk-gold/10">
            <div className="font-serif font-extrabold text-sm text-silk-black">
              {formatPrice(product.price, currency)}
            </div>
            <div className="text-[10px] text-silk-black/50 font-mono">{product.sku}</div>
          </div>
        </div>
      </div>

      {/* Card Action: Concierge WhatsApp Inquiry */}
      <div className="p-4 pt-0">
        <button
          onClick={handleInquireWhatsApp}
          className="w-full bg-silk-cream border border-silk-gold/30 hover:bg-silk-maroon hover:text-silk-gold text-silk-maroon font-serif font-bold text-xs uppercase tracking-widest py-2.5 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Inquire via Concierge <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
