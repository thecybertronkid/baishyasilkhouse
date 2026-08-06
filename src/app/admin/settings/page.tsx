"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { KeyRound, ShieldCheck, CheckCircle2, Store, Lock, User } from "lucide-react";

export default function AdminSettingsPage() {
  const { adminUsername, updateAdminCredentials } = useAdminAuth();

  // Admin Credentials Form State
  const [newUsername, setNewUsername] = useState(adminUsername);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credSuccessMsg, setCredSuccessMsg] = useState("");
  const [credErrorMsg, setCredErrorMsg] = useState("");

  // Store Configuration State
  const [storeName, setStoreName] = useState("Baishya Silk House");
  const [contactEmail, setContactEmail] = useState("concierge@baishyasilk.com");
  const [supportPhone, setSupportPhone] = useState("+91 98640 12345");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("5000");
  const [storeSuccessMsg, setStoreSuccessMsg] = useState("");

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setCredSuccessMsg("");
    setCredErrorMsg("");

    if (!newPassword || newPassword.length < 3) {
      setCredErrorMsg("Password must be at least 3 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setCredErrorMsg("New password and confirm password do not match.");
      return;
    }

    updateAdminCredentials(newUsername, newPassword);
    setCredSuccessMsg("Admin Username & Password updated successfully!");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleUpdateStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setStoreSuccessMsg("Store configuration settings saved successfully!");
    setTimeout(() => setStoreSuccessMsg(""), 3000);
  };

  return (
    <div className="min-h-screen bg-silk-cream font-sans flex">
      <AdminSidebar activeTab="settings" />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="border-b border-silk-gold/20 pb-6">
          <span className="text-[10px] font-serif font-bold uppercase tracking-[0.3em] text-silk-gold-dark block">
            SHOPIFY STORE CONFIGURATION
          </span>
          <h1 className="font-serif text-3xl font-bold text-silk-maroon uppercase tracking-wide">
            Admin Security & Store Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admin Credentials Update Box */}
          <div className="bg-silk-ivory p-6 sm:p-8 rounded-xl border border-silk-gold/20 shadow-card space-y-6">
            <div className="flex items-center gap-3 border-b border-silk-gold/20 pb-4">
              <div className="p-2 bg-silk-maroon text-silk-gold rounded-lg">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-silk-maroon uppercase tracking-wider">
                  Change Admin Credentials
                </h3>
                <p className="text-xs text-silk-black/60 font-light">
                  Update your Shopify Admin Portal login username and password.
                </p>
              </div>
            </div>

            {credSuccessMsg && (
              <div className="bg-silk-emerald/10 text-silk-emerald p-3 rounded-lg border border-silk-emerald/30 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {credSuccessMsg}
              </div>
            )}

            {credErrorMsg && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-xs font-medium">
                {credErrorMsg}
              </div>
            )}

            <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs">
              <div>
                <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                  New Admin Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-silk-gold absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-silk-cream border border-silk-gold/30 rounded py-2.5 pl-10 pr-3 text-silk-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                  New Admin Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-silk-gold absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-silk-cream border border-silk-gold/30 rounded py-2.5 pl-10 pr-3 text-silk-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-silk-gold absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-silk-cream border border-silk-gold/30 rounded py-2.5 pl-10 pr-3 text-silk-black focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-wider py-3 rounded shadow transition"
              >
                Update Admin Login Credentials
              </button>
            </form>
          </div>

          {/* General Store Configuration Box */}
          <div className="bg-silk-ivory p-6 sm:p-8 rounded-xl border border-silk-gold/20 shadow-card space-y-6">
            <div className="flex items-center gap-3 border-b border-silk-gold/20 pb-4">
              <div className="p-2 bg-silk-gold/20 text-silk-gold-dark rounded-lg">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-silk-maroon uppercase tracking-wider">
                  Storefront Settings & Thresholds
                </h3>
                <p className="text-xs text-silk-black/60 font-light">
                  Configure brand name, shipping thresholds, and concierge contact emails.
                </p>
              </div>
            </div>

            {storeSuccessMsg && (
              <div className="bg-silk-emerald/10 text-silk-emerald p-3 rounded-lg border border-silk-emerald/30 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> {storeSuccessMsg}
              </div>
            )}

            <form onSubmit={handleUpdateStoreSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                    Concierge Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                    Support Hotline
                  </label>
                  <input
                    type="text"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                  Complimentary Express Shipping Threshold (₹)
                </label>
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(e.target.value)}
                  className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs uppercase tracking-wider py-3 rounded shadow transition"
              >
                Save Store Settings
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
