"use client";

import React from "react";
import { Grid3X3, Grid2X2, List, X } from "lucide-react";

interface SortBarProps {
  totalResults: number;
  sortBy: string;
  setSortBy: (sort: string) => void;
  gridCols: number;
  setGridCols: (cols: number) => void;
  activeFilters: { label: string; clear: () => void }[];
  clearAll: () => void;
}

export const SortBar: React.FC<SortBarProps> = ({
  totalResults,
  sortBy,
  setSortBy,
  gridCols,
  setGridCols,
  activeFilters,
  clearAll,
}) => {
  return (
    <div className="bg-silk-ivory rounded-xl border border-silk-gold/30 p-4 shadow-card space-y-3 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Results Count */}
        <p className="text-xs font-serif font-bold text-silk-black">
          Showing <span className="text-silk-maroon text-sm">{totalResults}</span> Handwoven Silk Masterpieces
        </p>

        {/* Sort & View Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-silk-black/70 font-semibold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-serif font-bold bg-silk-beige border border-silk-gold/30 rounded px-3 py-1.5 text-silk-black focus:outline-none focus:border-silk-gold"
            >
              <option value="featured">Featured & Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>

          {/* Grid Layout Toggles */}
          <div className="hidden md:flex items-center border border-silk-gold/30 rounded bg-silk-beige p-0.5">
            <button
              onClick={() => setGridCols(2)}
              className={`p-1.5 rounded transition ${
                gridCols === 2 ? "bg-silk-maroon text-silk-gold" : "text-silk-black/60 hover:text-silk-maroon"
              }`}
              title="2 Columns View"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(3)}
              className={`p-1.5 rounded transition ${
                gridCols === 3 ? "bg-silk-maroon text-silk-gold" : "text-silk-black/60 hover:text-silk-maroon"
              }`}
              title="3 Columns View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridCols(1)}
              className={`p-1.5 rounded transition ${
                gridCols === 1 ? "bg-silk-maroon text-silk-gold" : "text-silk-black/60 hover:text-silk-maroon"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Pills */}
      {activeFilters.length > 0 && (
        <div className="pt-2 border-t border-silk-gold/20 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-silk-gold-dark">Active Filters:</span>
          {activeFilters.map((af, i) => (
            <span
              key={i}
              className="bg-silk-beige border border-silk-gold/40 text-silk-maroon font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1"
            >
              {af.label}
              <button onClick={af.clear} className="hover:text-silk-gold">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button onClick={clearAll} className="text-silk-maroon underline font-bold hover:text-silk-gold ml-2">
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
