"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Ticket,
  Image as ImageIcon,
  Settings,
  ArrowLeft,
  Users,
  Star,
} from "lucide-react";

export const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products Catalog", icon: Package },
    { href: "/admin/orders", label: "Orders Fulfillment", icon: ShoppingBag },
    { href: "/admin/coupons", label: "Discount Coupons", icon: Ticket },
    { href: "/admin/cms", label: "CMS & Banners", icon: ImageIcon },
    { href: "/admin/settings", label: "Store Settings", icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-64 bg-silk-maroon text-silk-ivory p-6 flex flex-col justify-between rounded-2xl shadow-2xl border border-silk-gold/40 font-sans">
      <div className="space-y-6">
        <div className="border-b border-silk-gold/30 pb-4">
          <span className="text-[10px] font-serif font-bold text-silk-gold uppercase tracking-[0.25em] block">
            ADMINISTRATOR CONTROL
          </span>
          <h2 className="font-serif text-xl font-extrabold text-silk-gold-light mt-1">
            Baishya Atelier HQ
          </h2>
        </div>

        <nav className="space-y-1 font-serif text-xs uppercase font-bold tracking-wider">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  active
                    ? "bg-silk-gold text-silk-black shadow-md font-extrabold"
                    : "text-silk-gold-light/80 hover:bg-silk-maroon-dark hover:text-silk-gold"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-silk-gold/20">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-xs font-bold text-silk-gold hover:underline bg-silk-maroon-dark/60 p-2.5 rounded border border-silk-gold/30"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
        </Link>
      </div>
    </aside>
  );
};
