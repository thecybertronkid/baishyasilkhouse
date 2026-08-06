"use client";

import React, { createContext, useContext, useState } from "react";
import { Product } from "@/types";

interface StoreContextType {
  currency: "INR" | "USD";
  setCurrency: (c: "INR" | "USD") => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  isAiAdvisorOpen: boolean;
  setIsAiAdvisorOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        quickViewProduct,
        setQuickViewProduct,
        isAiAdvisorOpen,
        setIsAiAdvisorOpen,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
