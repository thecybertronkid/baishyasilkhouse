"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortBar } from "@/components/shop/SortBar";
import { SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/types";

export default function ShopPage() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSilk, setSelectedSilk] = useState<string>("All");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("All");
  const [selectedWeave, setSelectedWeave] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [priceMax, setPriceMax] = useState<number>(120000);
  const [silkMarkOnly, setSilkMarkOnly] = useState<boolean>(false);

  // Sort State
  const [sortBy, setSortBy] = useState<string>("featured");

  // Grid Layout State (1, 2, or 3 columns)
  const [gridCols, setGridCols] = useState<number>(3);

  // Mobile Filter Drawer State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch live products from database API
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

          setProductsList(combined);
        }
      } catch (err) {
        console.error("Failed to fetch database products for shop page:", err);
      }
    };

    fetchLiveProducts();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsList
      .filter((p) => {
        if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
        if (selectedSilk !== "All" && p.silkType !== selectedSilk) return false;
        if (selectedOccasion !== "All" && p.occasion !== selectedOccasion) return false;
        if (selectedWeave !== "All" && p.weavingStyle !== selectedWeave) return false;
        if (p.price > priceMax) return false;
        if (silkMarkOnly && !p.isSilkMarkCertified) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0;
      });
  }, [productsList, selectedCategory, selectedSilk, selectedOccasion, selectedWeave, priceMax, silkMarkOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedSilk("All");
    setSelectedOccasion("All");
    setSelectedWeave("All");
    setSelectedColor("All");
    setPriceMax(120000);
    setSilkMarkOnly(false);
    setSortBy("featured");
  };

  const activeFilters = useMemo(() => {
    const filters = [];
    if (selectedCategory !== "All") {
      filters.push({ label: `Category: ${selectedCategory}`, clear: () => setSelectedCategory("All") });
    }
    if (selectedSilk !== "All") {
      filters.push({ label: `Silk: ${selectedSilk}`, clear: () => setSelectedSilk("All") });
    }
    if (selectedOccasion !== "All") {
      filters.push({ label: `Occasion: ${selectedOccasion}`, clear: () => setSelectedOccasion("All") });
    }
    if (silkMarkOnly) {
      filters.push({ label: "Silk Mark Only", clear: () => setSilkMarkOnly(false) });
    }
    return filters;
  }, [selectedCategory, selectedSilk, selectedOccasion, silkMarkOnly]);

  return (
    <div className="bg-silk-ivory min-h-screen font-sans py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Hero Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-silk-gold-dark uppercase block">
            HANDLOOM LOOM DIRECT CATALOG
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon uppercase tracking-wide">
            Authentic Indian Silk Collection
          </h1>
          <div className="w-12 h-[1px] bg-silk-gold mx-auto" />
          <p className="text-xs text-silk-black/60 font-light">
            Showing {filteredProducts.length} certified masterpieces handwoven in Sualkuchi & traditional Indian looms.
          </p>
        </div>

        {/* Sort Bar */}
        <div className="mb-8">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 text-xs font-serif font-bold uppercase tracking-wider text-silk-maroon border border-silk-gold/30 px-3 py-2.5 rounded bg-silk-cream shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-silk-gold" /> Filter Silk Catalog
          </button>

          <SortBar
            totalResults={filteredProducts.length}
            sortBy={sortBy}
            setSortBy={setSortBy}
            gridCols={gridCols}
            setGridCols={setGridCols}
            activeFilters={activeFilters}
            clearAll={handleResetFilters}
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
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
              onReset={handleResetFilters}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {isMobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
              <div className="w-4/5 max-w-xs bg-silk-ivory h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-silk-gold/20 pb-3">
                    <span className="font-serif font-bold text-silk-maroon text-base uppercase">
                      Filter Catalog
                    </span>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="p-1 text-silk-black hover:text-silk-gold"
                    >
                      <X className="w-5 h-5" />
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
                    onReset={handleResetFilters}
                  />
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-silk-maroon text-silk-gold font-bold text-xs uppercase tracking-wider py-3 rounded mt-6"
                >
                  Apply Filters ({filteredProducts.length} Items)
                </button>
              </div>
            </div>
          )}

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4 bg-silk-cream rounded-xl border border-silk-gold/20">
                <p className="font-serif text-lg font-bold text-silk-maroon">
                  No silk items match your selected filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-silk-maroon text-silk-gold font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 ${
                  gridCols === 1
                    ? "grid-cols-1"
                    : gridCols === 2
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3"
                } gap-6`}
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
