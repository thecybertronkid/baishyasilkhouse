"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Settings, Save, Check, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
  const [razorpayKey, setRazorpayKey] = useState("rzp_live_984578129038");
  const [stripeKey, setStripeKey] = useState("pk_live_51M0871239857");
  const [gstRate, setGstRate] = useState("5%");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          <div className="border-b border-silk-gold/30 pb-4">
            <h1 className="font-serif text-3xl font-bold text-silk-maroon">Store Environment Settings</h1>
            <p className="text-xs text-silk-black/70 mt-1">Configure payment gateways, tax rates, and logistics API keys.</p>
          </div>

          <form onSubmit={handleSave} className="bg-silk-cream p-6 rounded-2xl border border-silk-gold/30 shadow-card space-y-4 text-xs max-w-lg">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-silk-maroon border-b pb-1">Payment Provider API Keys</h3>
              <div>
                <label className="font-bold text-silk-black block mb-1">Razorpay Live API Key</label>
                <input
                  type="text"
                  value={razorpayKey}
                  onChange={(e) => setRazorpayKey(e.target.value)}
                  className="w-full px-3 py-2 border rounded bg-silk-ivory font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="font-bold text-silk-black block mb-1">Stripe Publishable Key</label>
                <input
                  type="text"
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  className="w-full px-3 py-2 border rounded bg-silk-ivory font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="font-serif font-bold text-sm text-silk-maroon border-b pb-1">Tax & Shipping Settings</h3>
              <div>
                <label className="font-bold text-silk-black block mb-1">Handloom Silk GST Rate</label>
                <input
                  type="text"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  className="w-full px-3 py-2 border rounded bg-silk-ivory"
                />
              </div>
            </div>

            <button type="submit" className="bg-silk-maroon text-silk-gold font-bold px-6 py-2.5 rounded flex items-center gap-2">
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />} Save Store Settings
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
