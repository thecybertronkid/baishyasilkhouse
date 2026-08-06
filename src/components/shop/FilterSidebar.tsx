"use client";

import React from "react";
import { ShieldCheck, RotateCcw, SlidersHorizontal } from "lucide-react";
import { SilkType, CategoryType, WeavingTechnique, OccasionType } from "@/types";

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSilk: string;
  setSelectedSilk: (silk: string) => void;
  selectedOccasion: string;
  setSelectedOccasion: (occ: string) => void;
  selectedWeave: string;
  setSelectedWeave: (w: string) => void;
  priceMax: number;
  setPriceMax: (val: number) => void;
  silkMarkOnly: boolean;
  setSilkMarkOnly: (val: boolean) => void;
  selectedColor: string;
  setSelectedColor: (col: string) => void;
  onReset: () => void;
}

const CATEGORIES: CategoryType[] = [
  "Silk Sarees",
  "Mekhela Chador",
  "Silk Fabrics",
  "Dupattas",
  "Scarves",
  "Men's Silk Wear",
];

const SILK_TYPES: SilkType[] = [
  "Muga Silk",
  "Pat Silk",
  "Eri Silk",
  "Banarasi Katan",
  "Kanjeevaram Pure Silk",
  "Tussar Silk",
];

const OCCASIONS: OccasionType[] = [
  "Bridal",
  "Wedding",
  "Festive",
  "Everyday Luxury",
];

const WEAVING_STYLES: WeavingTechnique[] = [
  "Handloom Jacquard",
  "Zari Minakari",
  "Pure Gold Zari",
  "Organic Non-violent (Eri)",
  "Hand-painted Kalamkari",
];

const COLORS = [
  { name: "Gold", hex: "#D4AF37" },
  { name: "Maroon", hex: "#58111A" },
  { name: "Emerald", hex: "#0A382C" },
  { name: "Cream / Ivory", hex: "#FDFBF7" },
  { name: "Midnight Blue", hex: "#1A2B4C" },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedSilk,
  setSelectedSilk,
  selectedOccasion,
  setSelectedOccasion,
  selectedWeave,
  setSelectedWeave,
  priceMax,
  setPriceMax,
  silkMarkOnly,
  setSilkMarkOnly,
  selectedColor,
  setSelectedColor,
  onReset,
}) => {
  return (
    <aside className="w-full lg:w-64 bg-silk-ivory rounded-xl border border-silk-gold/30 p-5 space-y-6 shadow-card font-sans">
      <div className="flex items-center justify-between border-b border-silk-gold/30 pb-3">
        <h3 className="font-serif font-bold text-base text-silk-maroon flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-silk-gold" /> Filter Catalog
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-silk-gold-dark hover:text-silk-maroon font-bold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Silk Mark Only Toggle */}
      <label className="flex items-center justify-between p-2.5 rounded bg-silk-beige border border-silk-gold/20 cursor-pointer text-xs font-bold text-silk-maroon">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-silk-gold" /> Silk Mark Certified Only
        </span>
        <input
          type="checkbox"
          checked={silkMarkOnly}
          onChange={(e) => setSilkMarkOnly(e.target.checked)}
          className="accent-silk-maroon rounded w-4 h-4"
        />
      </label>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-silk-black border-b border-silk-gold/20 pb-1">
          Category
        </h4>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => setSelectedCategory("")}
            className={`block w-full text-left py-1 px-2 rounded transition ${
              selectedCategory === ""
                ? "bg-silk-maroon text-silk-gold font-bold"
                : "text-silk-black/70 hover:text-silk-maroon"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full text-left py-1 px-2 rounded transition ${
                selectedCategory === cat
                  ? "bg-silk-maroon text-silk-gold font-bold"
                  : "text-silk-black/70 hover:text-silk-maroon"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Silk Variety Filter */}
      <div className="space-y-2">
        <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-silk-black border-b border-silk-gold/20 pb-1">
          Silk Variety
        </h4>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => setSelectedSilk("")}
            className={`block w-full text-left py-1 px-2 rounded transition ${
              selectedSilk === ""
                ? "bg-silk-maroon text-silk-gold font-bold"
                : "text-silk-black/70 hover:text-silk-maroon"
            }`}
          >
            All Silk Types
          </button>
          {SILK_TYPES.map((silk) => (
            <button
              key={silk}
              onClick={() => setSelectedSilk(silk)}
              className={`block w-full text-left py-1 px-2 rounded transition ${
                selectedSilk === silk
                  ? "bg-silk-maroon text-silk-gold font-bold"
                  : "text-silk-black/70 hover:text-silk-maroon"
              }`}
            >
              {silk}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion Filter */}
      <div className="space-y-2">
        <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-silk-black border-b border-silk-gold/20 pb-1">
          Occasion
        </h4>
        <div className="space-y-1 text-xs">
          <button
            onClick={() => setSelectedOccasion("")}
            className={`block w-full text-left py-1 px-2 rounded transition ${
              selectedOccasion === ""
                ? "bg-silk-maroon text-silk-gold font-bold"
                : "text-silk-black/70 hover:text-silk-maroon"
            }`}
          >
            All Occasions
          </button>
          {OCCASIONS.map((occ) => (
            <button
              key={occ}
              onClick={() => setSelectedOccasion(occ)}
              className={`block w-full text-left py-1 px-2 rounded transition ${
                selectedOccasion === occ
                  ? "bg-silk-maroon text-silk-gold font-bold"
                  : "text-silk-black/70 hover:text-silk-maroon"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-serif font-bold">
          <span className="uppercase tracking-wider text-silk-black">Max Price</span>
          <span className="text-silk-maroon">₹{priceMax.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="5000"
          max="150000"
          step="5000"
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-silk-maroon cursor-pointer"
        />
      </div>

      {/* Color Filter */}
      <div className="space-y-2">
        <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-silk-black border-b border-silk-gold/20 pb-1">
          Color Swatch
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((col) => (
            <button
              key={col.name}
              onClick={() => setSelectedColor(selectedColor === col.name ? "" : col.name)}
              className={`w-6 h-6 rounded-full border-2 transition ${
                selectedColor === col.name ? "border-silk-maroon scale-110 shadow" : "border-silk-gold/30"
              }`}
              style={{ backgroundColor: col.hex }}
              title={col.name}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
