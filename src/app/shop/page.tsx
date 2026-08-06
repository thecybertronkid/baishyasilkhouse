"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortBar } from "@/components/shop/SortBar";
import { Sparkles, SlidersHorizontal } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();

  const initialCat = searchParams.get("category") || "";
  const initialSilk = searchParams.get("silk") || "";
  const initialOccasion = searchParams.get("occasion") || "";
  const initialWeave = searchParams.get("weave") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [selectedSilk, setSelectedSilk] = useState<string>(initialSilk);
  const [selectedOccasion, setSelectedOccasion] = useState<string>(initialOccasion);
  const [selectedWeave, setSelectedWeave] = useState<string>(initialWeave);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [priceMax, setPriceMax] = useState<number>(150000);
  const [silkMarkOnly, setSilkMarkOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [gridCols, setGridCols] = useState<number>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Reset all filters
  const handleReset = () => {
    setSelectedCategory("");
    setSelectedSilk("");
    setSelectedOccasion("");
    setSelectedWeave("");
    setSelectedColor("");
    setPriceMax(150000);
    setSilkMarkOnly(false);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedSilk && p.silkType !== selectedSilk) return false;
      if (selectedOccasion && p.occasion !== selectedOccasion) return false;
      if (selectedWeave && p.weavingStyle !== selectedWeave) return false;
      if (silkMarkOnly && !p.isSilkMarkCertified) return false;
      if (p.price > priceMax) return false;
      if (selectedColor && !p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return b.isNewArrival ? 1 : -1;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [
    selectedCategory,
    selectedSilk,
    selectedOccasion,
    selectedWeave,
    silkMarkOnly,
    priceMax,
    selectedColor,
    sortBy,
  ]);

  // Active filter tags
  const activeFilters = useMemo(() => {
    const filters: { label: string; clear: () => void }[] = [];
    if (selectedCategory)
      filters.push({ label: `Category: ${selectedCategory}`, clear: () => setSelectedCategory("") });
    if (selectedSilk) filters.push({ label: `Silk: ${selectedSilk}`, clear: () => setSelectedSilk("") });
    if (selectedOccasion)
      filters.push({ label: `Occasion: ${selectedOccasion}`, clear: () => setSelectedOccasion("") });
    if (selectedWeave)
      filters.push({ label: `Weave: ${selectedWeave}`, clear: () => setSelectedWeave("") });
    if (silkMarkOnly)
      filters.push({ label: "Silk Mark Certified Only", clear: () => setSilkMarkOnly(false) });
    if (priceMax < 150000)
      filters.push({ label: `Under ₹${priceMax.toLocaleString()}`, clear: () => setPriceMax(150000) });
    if (selectedColor)
      filters.push({ label: `Color: ${selectedColor}`, clear: () => setSelectedColor("") });
    return filters;
  }, [
    selectedCategory,
    selectedSilk,
    selectedOccasion,
    selectedWeave,
    silkMarkOnly,
    priceMax,
    selectedColor,
  ]);

  return (
    <div className="py-10 bg-silk-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-silk-maroon to-silk-maroon-dark text-silk-ivory p-8 rounded-2xl border border-silk-gold/30 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 max-w-xl z-10">
            <span className="text-xs font-serif font-bold text-silk-gold uppercase tracking-[0.25em] flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-silk-gold" /> Handwoven Sualkuchi Heritage
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-silk-gold-light">
              Shop Luxury Silk Catalog
            </h1>
            <p className="text-xs text-silk-ivory/80 leading-relaxed font-sans">
              Discover authentic Golden Muga Silk sarees, Assamese Mekhela Chadors, Eri Ahimsa silk stoles, Banarasi Katan brocades, and bespoke groomsmen menswear.
            </p>
          </div>

          <div className="flex items-center gap-3 z-10">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden bg-silk-gold text-silk-black font-bold text-xs px-4 py-2.5 rounded flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filter Catalog
            </button>
          </div>
        </div>

        {/* Main Grid & Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block flex-shrink-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedSilk={selectedSilk}
              setSelectedSilk={setSelectedSilk}
              selectedOccasion={selectedOccasion}
              setSelectedOccasion={setSelectedOccasion}
              selectedWeave={selectedWeave}
              setSelectedWeave={setSelectedWeave}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              silkMarkOnly={silkMarkOnly}
              setSilkMarkOnly={setSilkMarkOnly}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              onReset={handleReset}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/70 p-4 flex justify-end">
              <div className="w-4/5 max-w-xs bg-silk-ivory h-full p-4 overflow-y-auto rounded-l-xl">
                <div className="flex justify-between items-center pb-3 border-b border-silk-gold/30 mb-4">
                  <span className="font-serif font-bold text-silk-maroon text-sm">Filter Options</span>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-xs font-bold text-silk-maroon"
                  >
                    Close
                  </button>
                </div>
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedSilk={selectedSilk}
                  setSelectedSilk={setSelectedSilk}
                  selectedOccasion={selectedOccasion}
                  setSelectedOccasion={setSelectedOccasion}
                  selectedWeave={selectedWeave}
                  setSelectedWeave={setSelectedWeave}
                  priceMax={priceMax}
                  setPriceMax={setPriceMax}
                  silkMarkOnly={silkMarkOnly}
                  setSilkMarkOnly={setSilkMarkOnly}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  onReset={handleReset}
                />
              </div>
            </div>
          )}

          {/* Catalog Content Area */}
          <div className="flex-1 space-y-6">
            <SortBar
              totalResults={filteredProducts.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              gridCols={gridCols}
              setGridCols={setGridCols}
              activeFilters={activeFilters}
              clearAll={handleReset}
            />

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-silk-cream rounded-xl border border-silk-gold/30 p-8 space-y-3">
                <h3 className="font-serif text-xl font-bold text-silk-black">No silk items match your criteria</h3>
                <p className="text-xs text-silk-black/60 max-w-md mx-auto">
                  Try clearing active filters or adjusting your price slider range to view available items.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 bg-silk-maroon text-silk-gold font-bold text-xs px-6 py-2.5 rounded transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  gridCols === 1
                    ? "grid-cols-1"
                    : gridCols === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-serif text-silk-maroon">Loading Silk Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
