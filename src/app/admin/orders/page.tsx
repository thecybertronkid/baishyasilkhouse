"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { ShoppingBag, Truck, Printer, CheckCircle2 } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders } = useAuth();
  const { currency } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          <div className="border-b border-silk-gold/30 pb-4">
            <h1 className="font-serif text-3xl font-bold text-silk-maroon">Order Fulfillment & Logistics</h1>
            <p className="text-xs text-silk-black/70 mt-1">Manage dispatch, tracking numbers, and shipping labels.</p>
          </div>

          <div className="bg-silk-cream rounded-2xl border border-silk-gold/30 shadow-card p-6 space-y-4">
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-silk-ivory rounded-xl p-5 border border-silk-gold/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-silk-gold/20 pb-2 text-xs">
                    <div>
                      <span className="font-serif font-bold text-sm text-silk-maroon">{ord.orderNumber}</span>
                      <span className="text-silk-black/60 block">Patron: {ord.shippingAddress.fullName} ({ord.shippingAddress.phone})</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 sm:mt-0">
                      <select
                        defaultValue={ord.status}
                        className="text-xs font-bold bg-silk-beige border border-silk-gold/30 rounded px-2 py-1 text-silk-maroon"
                      >
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                      <button
                        onClick={() => alert(`Generating shipping label for ${ord.orderNumber}...`)}
                        className="bg-silk-maroon text-silk-gold font-bold text-[10px] px-3 py-1.5 rounded flex items-center gap-1 shadow"
                      >
                        <Printer className="w-3 h-3" /> Print Label
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-silk-black/80 space-y-1">
                    <p className="font-bold">Shipping Address:</p>
                    <p>{ord.shippingAddress.street}, {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.zipCode}</p>
                    <p className="text-silk-emerald font-bold pt-1">Carrier: {ord.carrier} ({ord.trackingNumber})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
