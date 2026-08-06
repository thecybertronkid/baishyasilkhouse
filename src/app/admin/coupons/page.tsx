"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Ticket, Plus, Trash2 } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: "c1", code: "SILK10", discount: "10%", type: "Percentage", uses: 142, status: "Active" },
    { id: "c2", code: "BRIDAL15", discount: "15%", type: "Percentage", uses: 89, status: "Active" },
    { id: "c3", code: "BAISHYA500", discount: "₹500 Flat", type: "Flat Amount", uses: 34, status: "Active" },
  ]);

  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("10%");

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;
    setCoupons([...coupons, { id: `c-${Date.now()}`, code: newCode.toUpperCase(), discount: newDiscount, type: "Percentage", uses: 0, status: "Active" }]);
    setNewCode("");
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          <div className="border-b border-silk-gold/30 pb-4">
            <h1 className="font-serif text-3xl font-bold text-silk-maroon">Promotions & Coupon Manager</h1>
            <p className="text-xs text-silk-black/70 mt-1">Create and manage festival offer promo codes.</p>
          </div>

          {/* Add Coupon Form */}
          <form onSubmit={handleAddCoupon} className="bg-silk-cream p-4 rounded-xl border border-silk-gold/30 shadow-card flex gap-3 text-xs">
            <input
              type="text"
              placeholder="Promo Code (e.g. FESTIVE20)"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="flex-1 px-3 py-2 border rounded bg-silk-ivory uppercase"
            />
            <input
              type="text"
              placeholder="Discount (e.g. 20%)"
              value={newDiscount}
              onChange={(e) => setNewDiscount(e.target.value)}
              className="w-32 px-3 py-2 border rounded bg-silk-ivory"
            />
            <button type="submit" className="bg-silk-maroon text-silk-gold font-bold px-6 py-2 rounded">
              Create Coupon
            </button>
          </form>

          <div className="bg-silk-cream rounded-2xl border border-silk-gold/30 shadow-card overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-silk-beige border-b font-serif font-bold text-silk-maroon">
                  <th className="p-3">Code</th>
                  <th className="p-3">Discount</th>
                  <th className="p-3">Redemptions</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silk-gold/20">
                {coupons.map((c) => (
                  <tr key={c.id}>
                    <td className="p-3 font-bold text-silk-maroon">{c.code}</td>
                    <td className="p-3">{c.discount}</td>
                    <td className="p-3">{c.uses} times</td>
                    <td className="p-3 font-bold text-silk-emerald">{c.status}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => setCoupons(coupons.filter(x => x.id !== c.id))} className="text-silk-black/40 hover:text-silk-maroon">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
