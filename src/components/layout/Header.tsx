"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, Menu, MessageCircle } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useStore } from "@/context/StoreContext";

export const Header = () => {
  const { wishlistCount } = useWishlist();
  const { setIsSearchOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/" },
    {
      label: "SILK SAREES ▾",
      href: "/shop?category=Silk+Sarees",
      subLinks: [
        { label: "GI-Tagged Assam Muga Silk", href: "/shop?silk=Muga+Silk" },
        { label: "Pure Sualkuchi Mulberry Pat Silk", href: "/shop?silk=Pat+Silk" },
        { label: "Bridal Zari Silk Sarees", href: "/shop?category=Silk+Sarees&bridal=true" },
        { label: "Eri Ahimsa Peace Silk", href: "/shop?silk=Eri+Silk" },
      ],
    },
    {
      label: "MEKHELA CHADOR ▾",
      href: "/shop?category=Mekhela+Chador",
      subLinks: [
        { label: "Muga Silk Mekhela Chador", href: "/shop?category=Mekhela+Chador&silk=Muga+Silk" },
        { label: "Pat Silk Bridal Mekhela Chador", href: "/shop?category=Mekhela+Chador&silk=Pat+Silk" },
        { label: "Daily Comfort Eri Silk Sets", href: "/shop?category=Mekhela+Chador&silk=Eri+Silk" },
      ],
    },
    {
      label: "MENSWEAR ▾",
      href: "/shop?category=Men%27s+Silk+Wear",
      subLinks: [
        { label: "Assam Muga Silk Kurta Sets", href: "/shop?category=Men%27s+Silk+Wear" },
        { label: "Traditional Assamese Silk Dhoti", href: "/shop?category=Men%27s+Silk+Wear" },
        { label: "Royal Eri Silk Waistcoats", href: "/shop?category=Men%27s+Silk+Wear" },
      ],
    },
    { label: "SHOWROOM CATALOG", href: "/shop" },
    { label: "OUR HERITAGE", href: "/about" },
    { label: "CONTACT CONCIERGE", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-silk-ivory transition-all duration-300 ${
        isScrolled ? "shadow-md py-1 border-b border-silk-gold/30" : "py-3"
      }`}
    >
      {/* Tier 1: Brand Logo & Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Mobile Menu Trigger & Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-silk-maroon hover:text-silk-gold transition"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-silk-maroon hover:text-silk-gold transition flex items-center gap-2"
            title="Search Catalog"
          >
            <Search className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-serif tracking-widest uppercase text-silk-black/70">
              Search Catalog
            </span>
          </button>
        </div>

        {/* Center: Brand Regal Logo */}
        <Link href="/" className="text-center group py-1">
          <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-[0.25em] text-silk-maroon group-hover:text-silk-gold transition duration-300 block uppercase">
            BAISHYA SILK HOUSE
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-silk-gold-dark font-serif font-bold block">
            SUALKUCHI • ESTD 1986
          </span>
        </Link>

        {/* Right: Actions (Wishlist & Concierge WhatsApp) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/wishlist"
            className="p-2 text-silk-maroon hover:text-silk-gold transition relative"
            title="Saved Masterpieces"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-silk-maroon text-silk-gold text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-silk-gold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <a
            href="https://wa.me/919864012345?text=Hello%20Baishya%20Silk%20House,%20I%20would%20like%20to%20inquire%20about%20your%20handloom%20silk%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-silk-emerald text-silk-ivory hover:bg-emerald-800 text-[11px] font-serif font-bold uppercase tracking-wider px-3.5 py-2 rounded-full shadow transition"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Concierge Inquiry</span>
          </a>
        </div>
      </div>

      {/* Tier 2: Dedicated Single-Line Navigation Links Bar */}
      <div className="hidden lg:block border-t border-silk-gold/20 mt-2 pt-2.5">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-8 font-serif text-xs uppercase tracking-[0.2em] font-semibold text-silk-black/90">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group py-1">
              <Link
                href={link.href}
                className="hover:text-silk-maroon transition duration-200 whitespace-nowrap block"
              >
                {link.label}
              </Link>

              {/* Sub-menu Dropdown */}
              {link.subLinks && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-silk-ivory border border-silk-gold/30 shadow-2xl rounded-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="space-y-1">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-3 py-2 text-[11px] text-silk-black hover:bg-silk-beige hover:text-silk-maroon rounded transition font-medium normal-case tracking-normal"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="w-4/5 max-w-xs bg-silk-ivory h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-silk-gold/20 pb-4">
                <span className="font-serif font-bold text-silk-maroon tracking-wider text-base uppercase">
                  BAISHYA SILK HOUSE
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-silk-black hover:text-silk-gold font-bold text-xl"
                >
                  ✕
                </button>
              </div>

              <nav className="space-y-3 font-serif text-xs uppercase tracking-wider font-semibold">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-silk-black hover:text-silk-maroon border-b border-silk-gold/10"
                  >
                    {link.label.replace(" ▾", "")}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-silk-gold/20 space-y-3 text-center">
              <a
                href="https://wa.me/919864012345?text=Hello%20Baishya%20Silk%20House,%20I%20would%20like%20to%20inquire%20about%20your%20handloom%20silk%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-silk-emerald text-silk-ivory font-bold text-xs uppercase tracking-wider py-3 rounded-full shadow"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Concierge Inquiry
              </a>
              <p className="text-[10px] text-silk-gold-dark font-serif font-bold tracking-widest uppercase">
                SUALKUCHI, ASSAM • ESTD 1986
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
