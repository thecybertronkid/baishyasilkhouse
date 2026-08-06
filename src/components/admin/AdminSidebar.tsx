"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  FileText,
  Settings,
  Store,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export const AdminSidebar: React.FC<{ activeTab?: string }> = ({ activeTab = "dashboard" }) => {
  const router = useRouter();
  const { isAdminLoggedIn, logoutAdmin, adminUsername } = useAdminAuth();

  useEffect(() => {
    // Redirect if not logged in
    const storedAuth = localStorage.getItem("bsh_admin_auth") === "true";
    if (!isAdminLoggedIn && !storedAuth) {
      router.push("/admin/login");
    }
  }, [isAdminLoggedIn]);

  const menuItems = [
    { key: "dashboard", label: "Executive Dashboard", href: "/admin", icon: LayoutDashboard },
    { key: "products", label: "Inventory SKUs", href: "/admin/products", icon: Package },
    { key: "orders", label: "Order Dispatch", href: "/admin/orders", icon: ShoppingBag },
    { key: "coupons", label: "Promotions & Discounts", href: "/admin/coupons", icon: Tag },
    { key: "cms", label: "CMS & Banners", href: "/admin/cms", icon: FileText },
    { key: "settings", label: "Security & Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-silk-maroon text-silk-ivory min-h-screen p-6 hidden md:flex flex-col justify-between flex-shrink-0 border-r border-silk-gold/30">
      <div className="space-y-8">
        {/* Admin Brand */}
        <div className="border-b border-silk-gold/20 pb-4">
          <Link href="/admin" className="block text-center space-y-1">
            <span className="font-serif font-bold text-lg tracking-[0.2em] text-silk-gold block uppercase">
              BAISHYA SILK
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-silk-ivory/60 block font-medium">
              ADMIN PORTAL • {adminUsername.toUpperCase()}
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 font-serif text-xs uppercase tracking-wider font-semibold">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-silk-gold text-silk-black font-extrabold shadow"
                    : "text-silk-ivory/80 hover:bg-silk-maroon-dark hover:text-silk-gold"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-silk-black" : "text-silk-gold"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout & Live Storefront */}
      <div className="pt-6 border-t border-silk-gold/20 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 bg-silk-gold text-silk-black hover:bg-silk-gold-light text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow transition"
        >
          <Store className="w-4 h-4" /> Live Storefront
        </Link>

        <button
          onClick={logoutAdmin}
          className="w-full flex items-center justify-center gap-2 text-silk-ivory/70 hover:text-red-400 text-xs font-bold uppercase tracking-wider py-2 transition"
        >
          <LogOut className="w-4 h-4" /> Logout Admin
        </button>
      </div>
    </aside>
  );
};
