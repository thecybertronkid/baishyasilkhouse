"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  SlidersHorizontal,
  ChevronDown,
  Menu,
  X,
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
  const { setIsSearchOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-silk-ivory/95 backdrop-blur-md border-silk-gold/20 shadow-card py-2"
          : "bg-silk-ivory border-silk-gold/15 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3">
        {/* Top Tier: 3-Column Luxury Layout (Left Quick Action, Center Logo, Right User Actions) */}
        <div className="flex items-center justify-between border-b border-silk-gold/10 pb-3">
          {/* Left Column: Mobile Hamburger & Search Trigger */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-silk-maroon hover:text-silk-gold transition"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-silk-black/70 hover:text-silk-maroon transition"
            >
              <Search className="w-4 h-4 text-silk-gold" />
              <span>Search Catalog</span>
            </button>
          </div>

          {/* Center Column: Centered Regal Brand Logo */}
          <Link href="/" className="flex flex-col items-center group text-center">
            <span className="font-serif font-bold text-2xl sm:text-3xl tracking-[0.25em] text-silk-maroon group-hover:text-silk-gold transition duration-300 uppercase">
              BAISHYA SILK HOUSE
            </span>
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-silk-gold-dark font-medium -mt-0.5">
              <span>SUALKUCHI ASSAM</span>
              <span className="text-silk-gold/40">•</span>
              <span>ESTD 1984</span>
            </div>
          </Link>

          {/* Right Column: User Actions (Wishlist, Compare, Account, Cart) */}
          <div className="flex items-center space-x-5 text-silk-maroon">
            {/* Search Icon for Mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-1 hover:text-silk-gold transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Compare Matrix */}
            <Link
              href="/compare"
              className="hidden sm:flex relative p-1 hover:text-silk-gold transition"
              title="Compare Products"
            >
              <SlidersHorizontal className="w-4.5 h-4.5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-silk-emerald text-silk-ivory text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-1 hover:text-silk-gold transition"
              title="Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-silk-maroon text-silk-ivory text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              href={user ? (user.role === "admin" ? "/admin" : "/account") : "/login"}
              className="p-1 hover:text-silk-gold transition flex items-center gap-1.5"
              title={user ? user.name : "Sign In"}
            >
              <User className="w-4.5 h-4.5" />
              {user && (
                <span className="hidden xl:inline text-[11px] font-bold text-silk-black/80 max-w-[70px] truncate">
                  {user.name.split(" ")[0]}
                </span>
              )}
            </Link>

            {/* Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark transition rounded-full shadow-sm"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-silk-gold text-silk-maroon font-extrabold text-[9px] rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Tier: Centered Navigation Menu Bar (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center space-x-10 font-serif text-xs uppercase tracking-[0.25em] font-semibold text-silk-black/80 pt-1">
          <Link href="/" className="hover:text-silk-maroon transition py-1">
            Home
          </Link>

          <div
            onMouseEnter={() => setActiveMegaTab("sarees")}
            className="relative cursor-pointer py-1 hover:text-silk-maroon transition flex items-center gap-1.5"
          >
            <span>Silk Sarees</span>
            <ChevronDown className="w-3 h-3 text-silk-gold" />
          </div>

          <div
            onMouseEnter={() => setActiveMegaTab("mekhela")}
            className="relative cursor-pointer py-1 hover:text-silk-maroon transition flex items-center gap-1.5"
          >
            <span>Mekhela Chador</span>
            <ChevronDown className="w-3 h-3 text-silk-gold" />
          </div>

          <div
            onMouseEnter={() => setActiveMegaTab("menswear")}
            className="relative cursor-pointer py-1 hover:text-silk-maroon transition flex items-center gap-1.5"
          >
            <span>Menswear</span>
            <ChevronDown className="w-3 h-3 text-silk-gold" />
          </div>

          <Link href="/shop" className="hover:text-silk-maroon transition py-1">
            Shop Catalog
          </Link>

          <Link href="/about" className="hover:text-silk-maroon transition py-1">
            Our Heritage
          </Link>

          <Link href="/contact" className="hover:text-silk-maroon transition py-1">
            Contact
          </Link>
        </nav>
      </div>

      {/* Desktop Mega Menu Overlay */}
      <MegaMenu activeTab={activeMegaTab} onClose={() => setActiveMegaTab(null)} />

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="w-4/5 max-w-sm bg-silk-ivory h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-silk-gold/20 pb-4 mb-6">
                <span className="font-serif font-bold text-silk-maroon text-base uppercase tracking-widest">
                  Menu Navigation
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-silk-black hover:text-silk-gold"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 font-serif text-sm uppercase tracking-widest text-silk-black">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-silk-beige hover:text-silk-maroon">
                  Home
                </Link>
                <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-silk-beige hover:text-silk-maroon">
                  All Silk Sarees & Mekhela Chadors
                </Link>
                <Link href="/shop?category=Mekhela+Chador" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-silk-beige hover:text-silk-maroon">
                  Mekhela Chador
                </Link>
                <Link href="/shop?category=Men%27s+Silk+Wear" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-silk-beige hover:text-silk-maroon">
                  Menswear
                </Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-silk-beige hover:text-silk-maroon">
                  Our Heritage & Artisans
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-silk-beige hover:text-silk-maroon">
                  Contact Us
                </Link>
                <Link href="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-silk-beige hover:text-silk-maroon">
                  Track Order
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-silk-maroon font-bold border-b border-silk-beige">
                    Admin Control Panel
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-silk-gold/20 text-center">
              <p className="text-[10px] text-silk-black/60 font-serif tracking-widest uppercase">
                100% Pure Silk Mark Certified • Sualkuchi Assam
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
