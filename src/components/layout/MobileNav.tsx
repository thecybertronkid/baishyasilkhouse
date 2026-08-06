"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Heart, Sparkles, MessageCircle } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export const MobileNav = () => {
  const pathname = usePathname();
  const { wishlistCount } = useWishlist();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Catalog", href: "/shop", icon: Grid },
    { label: "Wishlist", href: "/wishlist", icon: Heart, badge: wishlistCount },
    { label: "Heritage", href: "/about", icon: Sparkles },
    {
      label: "Inquire",
      href: "https://wa.me/919864012345?text=Hello%20Baishya%20Silk%20House,%20I%20would%20like%20to%20inquire%20about%20your%20handloom%20silk%20collection.",
      icon: MessageCircle,
      external: true,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-silk-ivory/95 backdrop-blur-md border-t border-silk-gold/30 shadow-2xl py-2 px-4">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 text-silk-emerald"
              >
                <Icon className="w-5 h-5 fill-current" />
                <span className="text-[10px] font-serif uppercase tracking-wider font-bold">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 relative transition ${
                isActive ? "text-silk-maroon font-bold" : "text-silk-black/60 hover:text-silk-maroon"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-silk-maroon text-silk-gold text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-silk-gold">
                  {item.badge}
                </span>
              )}
              <span className="text-[10px] font-serif uppercase tracking-wider font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
