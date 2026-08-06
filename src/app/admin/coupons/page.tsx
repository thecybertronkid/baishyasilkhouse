"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Tag, Plus, CheckCircle, Trash2, RefreshCw } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";

export default function AdminCouponsPage() {
  const { currency } = useStore();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("10");
  const [minSpend, setMinSpend] = useState("2000");

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/coupons");
      const data = await res.json();
      if (data.success) {
        setCoupons(data.coupons);
      }
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    setSaving(true);
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          discountPercent: discountPercent ? parseInt(discountPercent, 10) : null,
          minSpend: minSpend ? parseFloat(minSpend) : 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCode("");
        setDiscountPercent("10");
        setMinSpend("2000");
        fetchCoupons();
      }
    } catch (err) {
      console.error("Error creating coupon:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon code permanently from database?")) return;

    try {
      const res = await fetch(`/api/coupons?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchCoupons();
      }
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  return (
    <div className="min-h-screen bg-silk-cream font-sans flex">
      <AdminSidebar activeTab="coupons" />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-silk-gold/20 pb-6">
          <div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-[0.3em] text-silk-gold-dark block">
              SHOPIFY PROMOTIONS & DISCOUNTS ENGINE
            </span>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon uppercase tracking-wide">
              Promotional Coupons ({coupons.length} Active in DB)
            </h1>
          </div>

          <button
            onClick={fetchCoupons}
            className="bg-silk-ivory border border-silk-gold/30 text-silk-black hover:border-silk-gold font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded transition flex items-center gap-2 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-silk-gold ${loading ? "animate-spin" : ""}`} /> Sync DB
          </button>
        </div>

        {/* Create Coupon Form */}
        <div className="bg-silk-ivory p-6 rounded-xl border border-silk-gold/20 shadow-card space-y-4 max-w-xl">
          <h3 className="font-serif font-bold text-base text-silk-maroon uppercase tracking-wider">
            Generate & Save New Promotional Code to Database
          </h3>

          <form onSubmit={handleAddCoupon} className="space-y-4 text-xs">
            <div>
              <label className="block font-serif font-bold text-silk-black uppercase mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. DIWALI20"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black uppercase font-mono font-bold focus:outline-none"
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
              disabled={saving}
              className="w-full bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-wider py-3 rounded shadow transition"
            >
              {saving ? "Saving to Database..." : "Save Coupon to Database"}
            </button>
          </form>
        </div>

        {/* Active Coupons List */}
        <div className="bg-silk-ivory rounded-xl border border-silk-gold/20 shadow-card p-6 space-y-4">
          <h3 className="font-serif font-bold text-base text-silk-black uppercase tracking-wider">
            Live Promotional Codes in Database
          </h3>

          {coupons.length === 0 ? (
            <p className="text-xs text-silk-black/60 italic">No active coupons found in database.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="bg-silk-cream p-4 rounded-lg border border-silk-gold/20 space-y-2 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-lg text-silk-maroon tracking-wider">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      className="text-silk-maroon hover:text-red-600 p-1 transition"
                      title="Delete Coupon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
          )}
        </div>
      </main>
    </div>
  );
}
