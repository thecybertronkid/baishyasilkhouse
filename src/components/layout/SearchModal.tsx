"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, X, Mic, Sparkles, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const TRENDING_SEARCHES = [
  "Muga Silk Saree",
  "Mekhela Chador",
  "Assam Pat Silk",
  "Bridal Silk",
  "Eri Ahimsa Stole",
  "Men's Kurta",
  "Silk Mark",
];

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, currency } = useStore();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.silkType.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.weavingStyle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleVoiceSearchMock = () => {
    setIsListening(true);
    setTimeout(() => {
      setQuery("Muga Silk");
      setIsListening(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-16 px-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-silk-ivory rounded-xl shadow-2xl overflow-hidden border border-silk-gold/30">
        {/* Search Input Bar */}
        <div className="p-4 bg-silk-maroon text-silk-ivory flex items-center gap-3 border-b border-silk-gold/30">
          <Search className="w-5 h-5 text-silk-gold" />
          <input
            type="text"
            placeholder="Search Muga Silk, Mekhela Chador, Kurtas, Fabrics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-silk-ivory placeholder-silk-ivory/60 text-base font-serif focus:outline-none"
          />
          <button
            onClick={handleVoiceSearchMock}
            className={`p-2 rounded-full transition ${
              isListening ? "bg-silk-gold text-silk-maroon animate-pulse" : "text-silk-gold hover:bg-silk-maroon-dark"
            }`}
            title="Voice Search"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 hover:text-silk-gold text-silk-ivory transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Listening Indicator */}
        {isListening && (
          <div className="bg-silk-gold/20 p-2 text-center text-xs font-bold text-silk-maroon flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin" /> Listening... Speak now (e.g., "Muga Silk")
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {query.trim() === "" ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-silk-gold-dark mb-2">
                  Popular & Trending Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs bg-silk-beige hover:bg-silk-gold hover:text-silk-black text-silk-black/80 font-medium px-3 py-1.5 rounded-full border border-silk-gold/20 transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-silk-gold/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-silk-gold-dark mb-3">
                  Featured Heritage Silk Categories
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Link
                    href="/shop?silk=Muga+Silk"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 bg-silk-cream rounded border border-silk-gold/20 text-center hover:border-silk-gold transition"
                  >
                    <span className="font-serif font-bold text-xs text-silk-maroon block">
                      Golden Muga Silk
                    </span>
                    <span className="text-[10px] text-silk-black/60">GI Protected</span>
                  </Link>
                  <Link
                    href="/shop?category=Mekhela+Chador"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 bg-silk-cream rounded border border-silk-gold/20 text-center hover:border-silk-gold transition"
                  >
                    <span className="font-serif font-bold text-xs text-silk-maroon block">
                      Mekhela Chador
                    </span>
                    <span className="text-[10px] text-silk-black/60">Assam Traditional</span>
                  </Link>
                  <Link
                    href="/shop?silk=Eri+Silk"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 bg-silk-cream rounded border border-silk-gold/20 text-center hover:border-silk-gold transition"
                  >
                    <span className="font-serif font-bold text-xs text-silk-maroon block">
                      Eri Ahimsa Silk
                    </span>
                    <span className="text-[10px] text-silk-black/60">Sustainable</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-serif text-base text-silk-black font-bold">
                No silk items found matching "{query}"
              </p>
              <p className="text-xs text-silk-black/60">
                Try searching for "Muga", "Pat Silk", "Saree", or "Kurta"
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-silk-gold-dark">
                Search Results ({filteredProducts.length})
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center gap-4 p-2.5 rounded-lg bg-silk-cream hover:bg-silk-beige border border-silk-gold/20 transition group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-14 h-16 object-cover rounded border border-silk-gold/30"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase text-silk-maroon tracking-wider">
                        {product.silkType} • {product.category}
                      </span>
                      <h5 className="font-serif text-xs font-bold text-silk-black group-hover:text-silk-gold transition truncate">
                        {product.title}
                      </h5>
                      <p className="text-xs font-bold text-silk-maroon mt-0.5">
                        {formatPrice(product.price, currency)}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-silk-gold opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
