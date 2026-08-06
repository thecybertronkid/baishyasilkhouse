"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { MegaMenu } from "./MegaMenu";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaTab, setActiveMegaTab] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareList } = useCompare();
  const { user } = useAuth();
  const { setIsSearchOpen, setIsAiAdvisorOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-silk-ivory/95 backdrop-blur-md shadow-card border-b border-silk-gold/30 py-3"
          : "bg-silk-ivory border-b border-silk-gold/20 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Mobile menu hamburger button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-silk-maroon hover:text-silk-gold transition"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo & Tagline */}
        <Link href="/" className="flex flex-col items-center group text-center">
          <span className="font-serif font-bold text-xl sm:text-2xl md:text-3xl tracking-widest text-silk-maroon group-hover:text-silk-gold transition duration-300">
            BAISHYA SILK HOUSE
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-silk-gold-dark font-medium -mt-1">
            ESTD 1984 • SUALKUCHI ASSAM
          </span>
        </Link>

        {/* Navigation Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-7 font-serif text-sm uppercase tracking-widest font-semibold text-silk-black/80">
          <Link href="/" className="hover:text-silk-gold transition">
            Home
          </Link>
          <div
            onMouseEnter={() => setActiveMegaTab("sarees")}
            className="relative cursor-pointer py-2 hover:text-silk-gold transition flex items-center gap-1"
          >
            <span>Silk Sarees</span>
            <ChevronDown className="w-3.5 h-3.5 text-silk-gold" />
          </div>
          <div
            onMouseEnter={() => setActiveMegaTab("mekhela")}
            className="relative cursor-pointer py-2 hover:text-silk-gold transition flex items-center gap-1"
          >
            <span>Mekhela Chador</span>
            <ChevronDown className="w-3.5 h-3.5 text-silk-gold" />
          </div>
          <div
            onMouseEnter={() => setActiveMegaTab("menswear")}
            className="relative cursor-pointer py-2 hover:text-silk-gold transition flex items-center gap-1"
          >
            <span>Menswear</span>
            <ChevronDown className="w-3.5 h-3.5 text-silk-gold" />
          </div>
          <Link href="/shop" className="hover:text-silk-gold transition">
            Shop Catalog
          </Link>
          <Link href="/about" className="hover:text-silk-gold transition">
            Our Heritage
          </Link>
          <Link href="/contact" className="hover:text-silk-gold transition">
            Contact
          </Link>
        </nav>

        {/* Utility Icon Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* AI Silk Specialist Button */}
          <button
            onClick={() => setIsAiAdvisorOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-silk-gold/20 to-silk-maroon/10 border border-silk-gold/40 text-silk-maroon hover:border-silk-gold font-sans text-xs font-bold px-2.5 py-1.5 rounded-full transition shadow-sm"
            title="Interactive Silk Advisor"
          >
            <Sparkles className="w-3.5 h-3.5 text-silk-gold" />
            <span className="hidden md:inline">Silk Advisor</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-silk-maroon hover:text-silk-gold transition"
            title="Search Catalog"
            aria-label="Search Catalog"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Compare Counter */}
          <Link
            href="/compare"
            className="hidden md:flex relative p-2 text-silk-maroon hover:text-silk-gold transition"
            title="Compare Products"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute top-0 right-0 bg-silk-emerald text-silk-ivory text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </Link>

          {/* Wishlist Counter */}
          <Link
            href="/wishlist"
            className="relative p-2 text-silk-maroon hover:text-silk-gold transition"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-silk-maroon-light text-silk-ivory text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* User Account */}
          <Link
            href={user ? (user.role === "admin" ? "/admin" : "/account") : "/login"}
            className="p-2 text-silk-maroon hover:text-silk-gold transition flex items-center gap-1"
            title={user ? user.name : "Sign In"}
          >
            <User className="w-5 h-5" />
            {user && (
              <span className="hidden xl:inline text-xs font-bold text-silk-black/80 max-w-[80px] truncate">
                {user.name.split(" ")[0]}
              </span>
            )}
          </Link>

          {/* Cart Counter Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark transition rounded-full shadow-sm"
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-silk-gold text-silk-maroon font-extrabold text-[11px] rounded-full w-5 h-5 flex items-center justify-center shadow">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Overlay */}
      <MegaMenu activeTab={activeMegaTab} onClose={() => setActiveMegaTab(null)} />

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="w-4/5 max-w-sm bg-silk-ivory h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-silk-gold/30 pb-4 mb-6">
                <span className="font-serif font-bold text-silk-maroon text-lg">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-silk-black hover:text-silk-gold"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 font-serif text-base text-silk-black">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-silk-gold border-b border-silk-beige">
                  Home
                </Link>
                <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-silk-gold border-b border-silk-beige">
                  All Silk Sarees & Mekhela Chadors
                </Link>
                <Link href="/shop?category=Mekhela+Chador" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-silk-gold border-b border-silk-beige">
                  Mekhela Chador
                </Link>
                <Link href="/shop?category=Men%27s+Silk+Wear" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-silk-gold border-b border-silk-beige">
                  Menswear
                </Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-silk-gold border-b border-silk-beige">
                  Our Heritage & Artisans
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-silk-gold border-b border-silk-beige">
                  Contact Us
                </Link>
                <Link href="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-silk-gold border-b border-silk-beige">
                  Track Order
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-silk-maroon font-bold border-b border-silk-beige">
                    Admin Control Panel
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-silk-gold/30 text-center space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAiAdvisorOpen(true);
                }}
                className="w-full bg-silk-gold text-silk-black font-bold py-2.5 rounded text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-silk-maroon" /> Open AI Silk Advisor
              </button>
              <p className="text-xs text-silk-black/60">
                Certified 100% Pure Silk Mark • Sualkuchi Assam
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
