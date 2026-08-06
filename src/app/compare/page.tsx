"use client";

import React from "react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { Trash2, ShieldCheck, MessageCircle, Sparkles } from "lucide-react";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { currency } = useStore();

  const handleInquireWhatsApp = (title: string, price: number) => {
    const text = encodeURIComponent(
      `Hello Baishya Silk House Concierge, I would like to inquire about "${title}" (${formatPrice(price, currency)}).`
    );
    window.open(`https://wa.me/919864012345?text=${text}`, "_blank");
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="border-b border-silk-gold/30 pb-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-silk-gold" /> Masterpiece Comparison
            </h1>
            <p className="text-xs text-silk-black/70 mt-1">
              Compare weave techniques, silk purity, dimensions, and craftsmanship across selected items.
            </p>
          </div>
          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-silk-maroon underline hover:text-silk-gold"
            >
              Clear Comparison
            </button>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="py-20 text-center bg-silk-cream rounded-2xl border border-silk-gold/30 p-8 space-y-4 max-w-md mx-auto">
            <Sparkles className="w-12 h-12 text-silk-gold mx-auto" />
            <h3 className="font-serif text-xl font-bold text-silk-black">No Masterpieces Added to Compare</h3>
            <p className="text-xs text-silk-black/60">
              Click the compare icon on any silk product card to compare specs side-by-side.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-silk-maroon text-silk-gold font-bold text-xs px-8 py-3 rounded shadow hover:bg-silk-maroon-dark transition"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-silk-cream rounded-2xl border border-silk-gold/30 overflow-hidden text-xs">
              <thead>
                <tr className="bg-silk-beige border-b border-silk-gold/30 font-serif font-bold text-silk-maroon text-sm">
                  <th className="p-4 w-48">Spec Attribute</th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-4 min-w-[240px] relative">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-2 right-2 text-silk-black/40 hover:text-silk-maroon"
                        title="Remove from compare"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded-lg mb-2 border border-silk-gold/20"
                      />
                      <div className="font-bold line-clamp-1">{product.title}</div>
                      <div className="text-silk-black text-xs font-normal">
                        {formatPrice(product.price, currency)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-silk-gold/20">
                <tr>
                  <td className="p-4 font-bold font-serif text-silk-black">Silk Variety</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 font-bold text-silk-maroon">{p.silkType}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold font-serif text-silk-black">Category</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold font-serif text-silk-black">Weaving Style</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">{p.weavingStyle}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold font-serif text-silk-black">State Origin</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">{p.stateOrigin}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold font-serif text-silk-black">Silk Mark Certified</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.isSilkMarkCertified ? (
                        <span className="text-silk-emerald font-bold flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4" /> Certified
                        </span>
                      ) : (
                        "Standard"
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-bold font-serif text-silk-black">Actions</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">
                      <button
                        onClick={() => handleInquireWhatsApp(p.title, p.price)}
                        className="w-full bg-silk-emerald text-silk-ivory font-bold text-xs uppercase tracking-wider py-2.5 rounded shadow flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" /> Inquire WhatsApp
                      </button>
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
