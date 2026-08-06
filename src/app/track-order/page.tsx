"use client";

import React, { useState } from "react";
import { Search, Truck, CheckCircle2, Clock, PackageCheck, MapPin, ShieldCheck } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setSearched(true);
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-serif font-bold text-silk-gold-dark uppercase tracking-widest">
            LOGISTICS & DISPATCH
          </span>
          <h1 className="font-serif text-3xl font-bold text-silk-maroon">Track Your Silk Shipment</h1>
          <p className="text-xs text-silk-black/70">
            Enter your order number or tracking ID to view live shipment timeline details.
          </p>
        </div>

        {/* Lookup Form */}
        <form onSubmit={handleTrack} className="bg-silk-cream p-6 rounded-2xl border border-silk-gold/30 shadow-card flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Order Number (e.g. BSH-2026-8941)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            className="flex-1 text-xs px-4 py-3 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
          />
          <input
            type="email"
            placeholder="Billing Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-xs px-4 py-3 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
          />
          <button
            type="submit"
            className="bg-silk-maroon text-silk-gold font-bold text-xs px-8 py-3 rounded hover:bg-silk-maroon-dark transition flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" /> Track Order
          </button>
        </form>

        {/* Tracking Timeline Output */}
        {searched && (
          <div className="bg-silk-cream rounded-2xl p-8 border border-silk-gold/30 shadow-card space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between border-b border-silk-gold/20 pb-4 gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-silk-emerald tracking-wider bg-silk-emerald/10 px-2 py-0.5 rounded">
                  Status: In Transit (Delhivery Express)
                </span>
                <h3 className="font-serif font-bold text-lg text-silk-maroon mt-1">
                  Order #{orderId || "BSH-2026-8941"}
                </h3>
              </div>
              <div className="text-xs text-right sm:text-left text-silk-black/70">
                <p className="font-bold text-silk-black">Airway Bill: DEL-8894125IN</p>
                <p>Est. Delivery: Aug 10, 2026</p>
              </div>
            </div>

            {/* Interactive Timeline */}
            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-silk-gold/30">
              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-silk-emerald text-silk-ivory flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-silk-black">Order Placed & Certified</h4>
                  <p className="text-[11px] text-silk-black/60">Silk Mark certificate attached in Sualkuchi Atelier</p>
                  <span className="text-[10px] text-silk-black/40">Aug 6, 2026 • 10:30 AM</span>
                </div>
              </div>

              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-silk-emerald text-silk-ivory flex items-center justify-center flex-shrink-0">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-silk-black">Wooden Box Packaging Completed</h4>
                  <p className="text-[11px] text-silk-black/60">Wrapped in muslin cloth with organic lavender sachet</p>
                  <span className="text-[10px] text-silk-black/40">Aug 6, 2026 • 02:45 PM</span>
                </div>
              </div>

              <div className="flex gap-4 items-start relative z-10">
                <div className="w-7 h-7 rounded-full bg-silk-maroon text-silk-gold flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-silk-maroon">In Transit - Guwahati Airport Hub</h4>
                  <p className="text-[11px] text-silk-black/60">Dispatched via express air freight</p>
                  <span className="text-[10px] text-silk-black/40">Aug 6, 2026 • 07:15 PM</span>
                </div>
              </div>

              <div className="flex gap-4 items-start relative z-10 opacity-50">
                <div className="w-7 h-7 rounded-full bg-silk-sand text-silk-black flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-silk-black">Out For Delivery</h4>
                  <p className="text-[11px] text-silk-black/60">Courier executive will call prior to delivery</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
