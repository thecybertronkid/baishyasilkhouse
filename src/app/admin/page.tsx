"use client";

import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { TrendingUp, Package, ShoppingBag, Users, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

export default function AdminDashboardPage() {
  const { currency } = useStore();

  const totalRevenue = 1485000;
  const totalOrders = 342;
  const totalCustomers = 289;
  const avgOrderValue = 4342;

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-8">
          <div className="border-b border-silk-gold/30 pb-4">
            <h1 className="font-serif text-3xl font-bold text-silk-maroon">Store Executive Analytics</h1>
            <p className="text-xs text-silk-black/70 mt-1">Live metrics for Baishya Silk House sales, orders & inventory.</p>
          </div>

          {/* KPI Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-silk-cream p-5 rounded-xl border border-silk-gold/30 shadow-card space-y-2">
              <div className="flex justify-between items-center text-silk-gold-dark">
                <span className="text-xs font-bold uppercase">Total Revenue</span>
                <TrendingUp className="w-5 h-5 text-silk-emerald" />
              </div>
              <p className="font-serif font-extrabold text-2xl text-silk-maroon">{formatPrice(totalRevenue, currency)}</p>
              <span className="text-[10px] text-silk-emerald font-bold">+18.4% vs last month</span>
            </div>

            <div className="bg-silk-cream p-5 rounded-xl border border-silk-gold/30 shadow-card space-y-2">
              <div className="flex justify-between items-center text-silk-gold-dark">
                <span className="text-xs font-bold uppercase">Total Orders</span>
                <ShoppingBag className="w-5 h-5 text-silk-maroon" />
              </div>
              <p className="font-serif font-extrabold text-2xl text-silk-black">{totalOrders}</p>
              <span className="text-[10px] text-silk-emerald font-bold">+12 new orders today</span>
            </div>

            <div className="bg-silk-cream p-5 rounded-xl border border-silk-gold/30 shadow-card space-y-2">
              <div className="flex justify-between items-center text-silk-gold-dark">
                <span className="text-xs font-bold uppercase">Patron Base</span>
                <Users className="w-5 h-5 text-silk-gold" />
              </div>
              <p className="font-serif font-extrabold text-2xl text-silk-black">{totalCustomers}</p>
              <span className="text-[10px] text-silk-emerald font-bold">Royal Silk Circle Members</span>
            </div>

            <div className="bg-silk-cream p-5 rounded-xl border border-silk-gold/30 shadow-card space-y-2">
              <div className="flex justify-between items-center text-silk-gold-dark">
                <span className="text-xs font-bold uppercase">Avg Order Value</span>
                <Sparkles className="w-5 h-5 text-silk-gold" />
              </div>
              <p className="font-serif font-extrabold text-2xl text-silk-black">{formatPrice(avgOrderValue, currency)}</p>
              <span className="text-[10px] text-silk-black/60">Bridal sets leading growth</span>
            </div>
          </div>

          {/* Revenue Chart Simulation & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sales Graph Simulation */}
            <div className="lg:col-span-8 bg-silk-cream p-6 rounded-2xl border border-silk-gold/30 shadow-card space-y-4">
              <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2">
                Monthly Silk Sales Breakdown (₹ Lakhs)
              </h3>
              <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-silk-gold/20 px-2">
                {[
                  { month: "Jan", val: 60 },
                  { month: "Feb", val: 75 },
                  { month: "Mar", val: 90 },
                  { month: "Apr", val: 85 },
                  { month: "May", val: 110 },
                  { month: "Jun", val: 130 },
                  { month: "Jul", val: 148 },
                ].map((m) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-silk-maroon to-silk-gold rounded-t transition-all duration-500 hover:brightness-125"
                      style={{ height: `${m.val}%` }}
                    />
                    <span className="text-[10px] font-bold text-silk-black">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory Alerts */}
            <div className="lg:col-span-4 bg-silk-cream p-6 rounded-2xl border border-silk-gold/30 shadow-card space-y-4">
              <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-silk-maroon" /> Low Stock Alerts
              </h3>
              <div className="space-y-3 text-xs">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <div key={p.id} className="p-3 bg-silk-ivory rounded-lg border border-silk-gold/20 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-silk-black truncate max-w-[140px]">{p.title}</h4>
                      <span className="text-[10px] text-silk-maroon font-bold">SKU: {p.sku}</span>
                    </div>
                    <span className="bg-silk-maroon/10 text-silk-maroon font-bold px-2 py-0.5 rounded text-[10px]">
                      2 Left in Stock
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
