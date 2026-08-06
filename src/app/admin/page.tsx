"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Plus,
  RefreshCw,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";

export default function AdminDashboardPage() {
  const { currency } = useStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 134700,
    totalOrders: 2,
    totalProducts: 8,
    lowStockProducts: 1,
    pendingOrders: 1,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockList, setLowStockList] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    setRefreshing(true);
    try {
      const resStats = await fetch("/api/admin/stats");
      const dataStats = await resStats.json();
      if (dataStats.success) {
        setStats(dataStats.stats);
        if (dataStats.recentOrders) setRecentOrders(dataStats.recentOrders);
      }

      const resProducts = await fetch("/api/products");
      const dataProducts = await resProducts.json();
      if (dataProducts.success) {
        const low = dataProducts.products.filter((p: any) => p.stock <= 5);
        setLowStockList(low);
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  return (
    <div className="min-h-screen bg-silk-cream font-sans flex">
      <AdminSidebar activeTab="dashboard" />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-silk-gold/20 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-serif font-bold uppercase tracking-[0.3em] text-silk-gold-dark">
                SHOPIFY-GRADE CONTROL CENTER
              </span>
              <span className="bg-silk-emerald/10 text-silk-emerald text-[9px] font-bold px-2 py-0.5 rounded border border-silk-emerald/30">
                DATABASE LIVE SYNC
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon uppercase tracking-wide">
              Store Executive Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={refreshing}
              className="bg-silk-ivory border border-silk-gold/30 text-silk-black hover:border-silk-gold font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded transition flex items-center gap-2 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-silk-gold ${refreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </button>
            <Link
              href="/admin/products"
              className="bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded transition flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4" /> Add Product
            </Link>
            <Link
              href="/"
              target="_blank"
              className="bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded transition flex items-center gap-1.5 shadow"
            >
              View Storefront <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Executive Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Revenue */}
          <div className="bg-silk-ivory rounded-xl p-6 border border-silk-gold/20 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif uppercase tracking-widest text-silk-black/60 font-semibold">
                Total Gross Revenue
              </span>
              <div className="p-2 bg-silk-emerald/10 text-silk-emerald rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-silk-maroon">
              {formatPrice(stats.totalRevenue, currency)}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-silk-emerald font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last month
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-silk-ivory rounded-xl p-6 border border-silk-gold/20 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif uppercase tracking-widest text-silk-black/60 font-semibold">
                Total Orders Woven
              </span>
              <div className="p-2 bg-silk-maroon/10 text-silk-maroon rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-silk-black">
              {stats.totalOrders}
            </div>
            <div className="text-[11px] text-silk-black/60 font-light">
              {stats.pendingOrders} orders requiring fulfillment
            </div>
          </div>

          {/* Catalog SKU Items */}
          <div className="bg-silk-ivory rounded-xl p-6 border border-silk-gold/20 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif uppercase tracking-widest text-silk-black/60 font-semibold">
                Active Catalog SKUs
              </span>
              <div className="p-2 bg-silk-gold/20 text-silk-gold-dark rounded-lg">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-silk-black">
              {stats.totalProducts}
            </div>
            <div className="text-[11px] text-silk-emerald font-bold">
              100% Silk Mark Verified
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-silk-ivory rounded-xl p-6 border border-silk-gold/20 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif uppercase tracking-widest text-silk-black/60 font-semibold">
                Low Stock Alerts
              </span>
              <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-600">
              {stats.lowStockProducts}
            </div>
            <div className="text-[11px] text-amber-600 font-bold">
              Stock quantity ≤ 5 items remaining
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-silk-ivory rounded-xl border border-silk-gold/20 p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-silk-gold/20 pb-4">
            <div>
              <h2 className="font-serif text-lg font-bold text-silk-maroon uppercase tracking-wide">
                Live Orders Queue & Fulfillment
              </h2>
              <p className="text-xs text-silk-black/60 font-light">
                Manage order status updates directly synced with PostgreSQL database.
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-silk-maroon hover:text-silk-gold uppercase tracking-wider transition"
            >
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-silk-gold/20 text-[10px] font-serif uppercase tracking-widest text-silk-black/60 bg-silk-beige/50">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4 text-right">Fulfillment Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silk-gold/10">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-silk-black/60 italic">
                      No orders found in database.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-silk-beige/30 transition">
                      <td className="py-3 px-4 font-serif font-bold text-silk-maroon">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-4 font-medium text-silk-black">
                        {order.user?.name || "Guest Patron"}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-silk-black">
                        {formatPrice(order.totalAmount, currency)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${
                            order.status === "DELIVERED"
                              ? "bg-silk-emerald/10 text-silk-emerald border border-silk-emerald/30"
                              : order.status === "SHIPPED"
                              ? "bg-blue-500/10 text-blue-600 border border-blue-500/30"
                              : "bg-amber-500/10 text-amber-600 border border-amber-500/30"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-silk-black/70">
                        {order.paymentMethod} ({order.paymentStatus})
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-silk-ivory text-silk-black text-[11px] border border-silk-gold/30 rounded py-1 px-2 focus:outline-none"
                        >
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Warning Table */}
        {lowStockList.length > 0 && (
          <div className="bg-amber-500/5 rounded-xl border border-amber-500/30 p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-700 font-serif font-bold uppercase tracking-wider text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Low Inventory Stock Warnings ({lowStockList.length} SKUs)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockList.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-silk-ivory p-4 rounded-lg border border-silk-gold/20 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-xs text-silk-black line-clamp-1">
                      {prod.title}
                    </h4>
                    <p className="text-[10px] text-silk-black/60">SKU: {prod.sku}</p>
                    <div className="text-xs font-bold text-amber-600">
                      Remaining Stock: {prod.stock} units
                    </div>
                  </div>
                  <Link
                    href="/admin/products"
                    className="bg-silk-maroon text-silk-gold text-[10px] font-bold py-1.5 px-3 rounded uppercase tracking-wider"
                  >
                    Restock
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
