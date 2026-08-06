"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export const MobileNav = () => {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) return null;

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Catalog", href: "/shop", icon: Compass },
    { label: "Wishlist", href: "/wishlist", icon: Heart, badge: wishlistCount },
    { label: "Account", href: "/account", icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-silk-ivory/95 backdrop-blur-md border-t border-silk-gold/20 py-2 px-4 shadow-luxury">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition ${
                isActive ? "text-silk-maroon font-bold" : "text-silk-black/60 hover:text-silk-maroon"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 bg-silk-maroon text-silk-gold font-extrabold text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-serif uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}

        {/* Cart Drawer Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-silk-maroon hover:text-silk-gold transition"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-silk-gold text-silk-maroon font-extrabold text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center shadow-sm">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-serif uppercase tracking-wider font-bold">Bag</span>
        </button>
      </div>
    </div>
  );
};
