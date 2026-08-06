"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";

export const MobileNav = () => {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();
  const { setIsSearchOpen } = useStore();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-silk-ivory/95 backdrop-blur-md border-t border-silk-gold/30 px-3 py-2 shadow-2xl flex items-center justify-around">
      <Link
        href="/"
        className={`flex flex-col items-center p-1 ${
          pathname === "/" ? "text-silk-maroon font-bold" : "text-silk-black/60"
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 font-sans">Home</span>
      </Link>

      <Link
        href="/shop"
        className={`flex flex-col items-center p-1 ${
          pathname === "/shop" ? "text-silk-maroon font-bold" : "text-silk-black/60"
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 font-sans">Catalog</span>
      </Link>

      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center p-1 text-silk-black/60 hover:text-silk-maroon"
        aria-label="Search Catalog"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 font-sans">Search</span>
      </button>

      <Link
        href="/wishlist"
        className={`relative flex flex-col items-center p-1 ${
          pathname === "/wishlist" ? "text-silk-maroon font-bold" : "text-silk-black/60"
        }`}
      >
        <Heart className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 font-sans">Wishlist</span>
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-1 bg-silk-maroon text-silk-ivory text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>

      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex flex-col items-center p-1 text-silk-maroon"
        aria-label="Shopping Cart"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 font-sans font-bold">Cart</span>
        {itemCount > 0 && (
          <span className="absolute top-0 right-1 bg-silk-gold text-silk-maroon text-[9px] font-extrabold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      <Link
        href={user ? (user.role === "admin" ? "/admin" : "/account") : "/login"}
        className={`flex flex-col items-center p-1 ${
          pathname.startsWith("/account") || pathname.startsWith("/admin")
            ? "text-silk-maroon font-bold"
            : "text-silk-black/60"
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px] mt-0.5 font-sans">Account</span>
      </Link>
    </div>
  );
};
