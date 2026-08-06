"use client";

import React from "react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { X, ShoppingBag, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { currency } = useStore();

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="border-b border-silk-gold/30 pb-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon flex items-center gap-2">
              <SlidersHorizontal className="w-6 h-6 text-silk-gold" /> Compare Silk Masterpieces
            </h1>
            <p className="text-xs text-silk-black/70 mt-1">
              Side-by-side specification comparison of weaving techniques, weight, silk type & prices.
            </p>
          </div>
          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-silk-maroon hover:underline"
            >
              Clear Comparison Table
            </button>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="py-20 text-center bg-silk-cream rounded-2xl border border-silk-gold/30 p-8 space-y-4 max-w-md mx-auto">
            <Sparkles className="w-12 h-12 text-silk-gold mx-auto" />
            <h3 className="font-serif text-xl font-bold text-silk-black">No Products Added to Compare</h3>
            <p className="text-xs text-silk-black/60">
              Select up to 4 items from the shop catalog to compare specs side-by-side.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-silk-maroon text-silk-gold font-bold text-xs px-8 py-3 rounded shadow hover:bg-silk-maroon-dark transition"
            >
              Explore Shop Catalog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-silk-cream rounded-2xl border border-silk-gold/30 shadow-card p-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-silk-gold/30">
                  <th className="p-3 font-serif font-bold text-silk-maroon w-44 bg-silk-beige">
                    Feature Specs
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-3 min-w-[220px] align-top relative border-l border-silk-gold/20">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2 right-2 p-1 text-silk-black/40 hover:text-silk-maroon"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img src={product.images[0]} alt="" className="w-full h-40 object-cover rounded mb-2 border" />
                      <h4 className="font-serif font-bold text-sm text-silk-black line-clamp-1">{product.title}</h4>
                      <p className="font-serif font-bold text-sm text-silk-maroon mt-1">
                        {formatPrice(product.price, currency)}
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-3 w-full bg-silk-maroon text-silk-gold font-bold text-xs py-2 rounded flex items-center justify-center gap-1 hover:bg-silk-maroon-dark transition"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Bag
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-silk-gold/20">
                <tr>
                  <td className="p-3 font-bold text-silk-black bg-silk-beige">Silk Variety</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 border-l border-silk-gold/20 font-serif font-bold text-silk-maroon">
                      {p.silkType}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-silk-black bg-silk-beige">Weaving Technique</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 border-l border-silk-gold/20">
                      {p.weavingStyle}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-silk-black bg-silk-beige">Loom Origin</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 border-l border-silk-gold/20">
                      {p.stateOrigin}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-silk-black bg-silk-beige">Silk Mark Status</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 border-l border-silk-gold/20 font-bold text-silk-emerald">
                      {p.isSilkMarkCertified ? "✓ Certified SMOI" : "Pending"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-silk-black bg-silk-beige">Dimensions & Weight</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 border-l border-silk-gold/20">
                      {p.dimensions || "Standard"} ({p.weight || "N/A"})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-bold text-silk-black bg-silk-beige">Blouse Included</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-3 border-l border-silk-gold/20">
                      {p.blouseIncluded ? "Yes (Matching Silk)" : "No"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
