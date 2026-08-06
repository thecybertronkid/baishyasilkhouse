"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";

export default function AdminOrdersPage() {
  const { currency } = useStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = activeFilter === "ALL" || o.status === activeFilter;
    const matchesQuery =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-silk-cream font-sans flex">
      <AdminSidebar activeTab="orders" />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-silk-gold/20 pb-6">
          <div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-[0.3em] text-silk-gold-dark block">
              SHOPIFY FULFILLMENT ENGINE
            </span>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon uppercase tracking-wide">
              Order Dispatch & Fulfillment ({orders.length} Total Orders)
            </h1>
          </div>

          <button
            onClick={fetchOrders}
            className="bg-silk-ivory border border-silk-gold/30 text-silk-black hover:border-silk-gold font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded transition flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5 text-silk-gold" /> Sync Database Orders
          </button>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 font-serif text-xs uppercase tracking-wider font-bold">
            {["ALL", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((status) => (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                className={`py-2 px-4 rounded transition ${
                  activeFilter === status
                    ? "bg-silk-maroon text-silk-gold shadow"
                    : "bg-silk-ivory text-silk-black/70 hover:text-silk-maroon border border-silk-gold/20"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="bg-silk-ivory px-4 py-2 rounded-lg border border-silk-gold/20 flex items-center gap-2 min-w-[240px]">
            <Search className="w-4 h-4 text-silk-gold" />
            <input
              type="text"
              placeholder="Filter by Order ID or Patron Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Orders List Table */}
        <div className="bg-silk-ivory rounded-xl border border-silk-gold/20 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-silk-gold/20 text-[10px] font-serif uppercase tracking-widest text-silk-black/60 bg-silk-beige/50">
                  <th className="py-3.5 px-4">Order ID & Date</th>
                  <th className="py-3.5 px-4">Customer Info</th>
                  <th className="py-3.5 px-4">Items Woven</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Tracking Code</th>
                  <th className="py-3.5 px-4">Fulfillment Status</th>
                  <th className="py-3.5 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silk-gold/10">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-silk-black/60 italic">
                      No orders found under selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-silk-beige/30 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-serif font-bold text-silk-maroon text-sm">
                          {order.orderNumber}
                        </div>
                        <div className="text-[10px] text-silk-black/50">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-silk-black">
                          {order.user?.name || "Guest Patron"}
                        </div>
                        <div className="text-[10px] text-silk-black/60">{order.user?.email || "Direct Online"}</div>
                      </td>

                      <td className="py-3.5 px-4 font-medium">
                        {order.items?.map((item: any) => (
                          <div key={item.id} className="line-clamp-1">
                            {item.quantity}x {item.title}
                          </div>
                        ))}
                      </td>

                      <td className="py-3.5 px-4 font-serif font-bold text-silk-black">
                        {formatPrice(order.totalAmount, currency)}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-silk-black/70">
                        {order.trackingNumber || "Assigning..."}
                      </td>

                      <td className="py-3.5 px-4">
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

                      <td className="py-3.5 px-4 text-right space-x-1">
                        {order.status !== "DELIVERED" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "DELIVERED")}
                            className="bg-silk-emerald text-silk-ivory text-[10px] font-bold py-1 px-2.5 rounded uppercase tracking-wider hover:opacity-90 transition"
                          >
                            Mark Delivered
                          </button>
                        )}
                        {order.status === "PROCESSING" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "SHIPPED")}
                            className="bg-blue-600 text-white text-[10px] font-bold py-1 px-2.5 rounded uppercase tracking-wider hover:opacity-90 transition"
                          >
                            Mark Shipped
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
