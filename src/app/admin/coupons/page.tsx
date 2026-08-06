"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Tag, Plus, CheckCircle, Trash2, RefreshCw } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";

export default function AdminCouponsPage() {
  const { currency } = useStore();
  const [coupons, setCoupons] = useState<any[]>([
    { id: "c1", code: "SILK10", discountPercent: 10, minSpend: 2000, isActive: true },
    { id: "c2", code: "BRIDAL15", discountPercent: 15, minSpend: 10000, isActive: true },
    { id: "c3", code: "ROYAL500", discountFlat: 500, minSpend: 3000, isActive: true },
  ]);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [minSpend, setMinSpend] = useState("2000");

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newCoupon = {
      id: `c-${Date.now()}`,
      code: code.toUpperCase(),
      discountPercent: parseInt(discountPercent, 10) || 10,
      minSpend: parseFloat(minSpend) || 0,
      isActive: true,
    };

    setCoupons([newCoupon, ...coupons]);
    setCode("");
    setDiscountPercent("");
  };

  return (
    <div className="min-h-screen bg-silk-cream font-sans flex">
      <AdminSidebar activeTab="coupons" />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-silk-gold/20 pb-6">
          <span className="text-[10px] font-serif font-bold uppercase tracking-[0.3em] text-silk-gold-dark block">
            SHOPIFY PROMOTIONS ENGINE
          </span>
          <h1 className="font-serif text-3xl font-bold text-silk-maroon uppercase tracking-wide">
            Discount & Loyalty Coupon Codes
          </h1>
        </div>

        {/* Create Coupon Form */}
        <div className="bg-silk-ivory p-6 rounded-xl border border-silk-gold/20 shadow-card space-y-4 max-w-xl">
          <h3 className="font-serif font-bold text-base text-silk-maroon uppercase tracking-wider">
            Generate New Promotional Code
          </h3>

          <form onSubmit={handleAddCoupon} className="space-y-4 text-xs">
            <div>
              <label className="block font-serif font-bold text-silk-black uppercase mb-1">Coupon Code</label>
              <input
                type="text"
                required
                placeholder="e.g. DIWALI20"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black uppercase focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-serif font-bold text-silk-black uppercase mb-1">Discount %</label>
                <input
                  type="number"
                  placeholder="10"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-serif font-bold text-silk-black uppercase mb-1">Minimum Spend (₹)</label>
                <input
                  type="number"
                  value={minSpend}
                  onChange={(e) => setMinSpend(e.target.value)}
                  className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-wider py-3 rounded shadow transition"
            >
              Create & Publish Promo Code
            </button>
          </form>
        </div>

        {/* Active Coupons List */}
        <div className="bg-silk-ivory rounded-xl border border-silk-gold/20 shadow-card p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-silk-black uppercase tracking-wider">
            Active Promotional Discount Codes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-silk-cream p-4 rounded-lg border border-silk-gold/20 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-lg text-silk-maroon tracking-wider">
                    {coupon.code}
                  </span>
                  <span className="bg-silk-emerald/10 text-silk-emerald text-[9px] font-bold px-2 py-0.5 rounded border border-silk-emerald/30">
                    ACTIVE
                  </span>
                </div>

                <p className="text-xs text-silk-black/80 font-medium">
                  {coupon.discountPercent
                    ? `${coupon.discountPercent}% Discount`
                    : `Flat ${formatPrice(coupon.discountFlat || 0, currency)} Discount`}
                </p>

                <p className="text-[10px] text-silk-black/50">
                  Min spend: {formatPrice(coupon.minSpend || 0, currency)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
