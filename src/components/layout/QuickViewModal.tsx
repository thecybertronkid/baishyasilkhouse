"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ShieldCheck, Heart, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, currency } = useStore();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [customBlouse, setCustomBlouse] = useState(false);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor = selectedColor || (product.colors[0] ? product.colors[0].name : "");

  const handleAddToCart = () => {
    addToCart(product, 1, activeColor, customBlouse);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-3xl bg-silk-ivory rounded-xl shadow-2xl overflow-hidden border border-silk-gold/40 relative grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-10 p-2 bg-silk-ivory/80 text-silk-black hover:text-silk-maroon rounded-full transition shadow"
          aria-label="Close product quick view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Preview */}
        <div className="relative bg-silk-beige p-4 flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-80 md:h-full object-cover rounded shadow"
          />
          {product.isSilkMarkCertified && (
            <span className="absolute top-4 left-4 bg-silk-gold text-silk-black text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow">
              <ShieldCheck className="w-3 h-3 text-silk-maroon" /> Silk Mark Certified
            </span>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-silk-maroon bg-silk-maroon/10 px-2 py-0.5 rounded">
              {product.silkType} • {product.category}
            </span>
            <h3 className="font-serif text-xl font-bold text-silk-black mt-2">
              {product.title}
            </h3>
            <p className="text-xs text-silk-black/70 italic mt-1 line-clamp-2">
              {product.subtitle}
            </p>

            {/* Price & Discount */}
            <div className="flex items-center gap-3 mt-3">
              <span className="font-serif text-xl font-bold text-silk-maroon">
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-silk-black/40 line-through">
                  {formatPrice(product.originalPrice, currency)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-[10px] bg-silk-emerald text-silk-ivory font-bold px-1.5 py-0.5 rounded">
                  SAVE {product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4 space-y-1.5">
                <span className="text-xs font-bold text-silk-black block">
                  Color Option: <span className="font-normal text-silk-black/70">{activeColor}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 rounded-full border-2 transition ${
                        activeColor === c.name ? "border-silk-maroon scale-110 shadow" : "border-silk-gold/30"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Blouse Stitching Checkbox */}
            {product.blouseIncluded && (
              <label className="mt-4 flex items-center gap-2 text-xs font-medium cursor-pointer p-2 bg-silk-cream rounded border border-silk-gold/20">
                <input
                  type="checkbox"
                  checked={customBlouse}
                  onChange={(e) => setCustomBlouse(e.target.checked)}
                  className="rounded accent-silk-maroon w-4 h-4"
                />
                <span>Add Custom Tailored Blouse Stitching (+₹1,200)</span>
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2 border-t border-silk-gold/20">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 font-bold text-xs py-3 px-4 rounded shadow transition flex items-center justify-center gap-2 ${
                  added
                    ? "bg-silk-emerald text-silk-ivory"
                    : "bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded border transition ${
                  isInWishlist(product.id)
                    ? "bg-silk-maroon text-silk-ivory border-silk-maroon"
                    : "bg-silk-ivory text-silk-maroon border-silk-gold/40 hover:border-silk-maroon"
                }`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4 fill-current" />
              </button>
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={() => setQuickViewProduct(null)}
              className="block text-center text-xs font-bold text-silk-gold-dark hover:text-silk-maroon transition pt-1"
            >
              View Full Specs, Reviews & 360° Loom Video <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
