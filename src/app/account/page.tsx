"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { User, Package, Heart, MapPin, Award, LogOut, ShieldCheck, Download } from "lucide-react";

export default function AccountPage() {
  const { user, orders, logout, updateProfile } = useAuth();
  const { currency } = useStore();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "addresses" | "loyalty">("profile");

  const [name, setName] = useState(user ? user.name : "");
  const [phone, setPhone] = useState(user ? user.phone : "");

  if (!user) {
    return (
      <div className="py-20 bg-silk-ivory min-h-screen font-sans flex items-center justify-center p-4">
        <div className="bg-silk-cream p-8 rounded-2xl border border-silk-gold/30 shadow-card text-center space-y-4 max-w-md w-full">
          <User className="w-12 h-12 text-silk-gold mx-auto" />
          <h2 className="font-serif font-bold text-xl text-silk-maroon">Patron Account Required</h2>
          <p className="text-xs text-silk-black/70">Please sign in to view your orders, saved addresses, and loyalty tier.</p>
          <Link href="/login" className="inline-block bg-silk-maroon text-silk-gold font-bold text-xs px-8 py-3 rounded shadow">
            Sign In To Account
          </Link>
        </div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone });
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* User Greeting Bar */}
        <div className="bg-gradient-to-r from-silk-maroon to-silk-maroon-dark text-silk-ivory p-6 rounded-2xl border border-silk-gold/30 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-silk-gold/20 flex items-center justify-center border-2 border-silk-gold text-silk-gold font-serif font-bold text-xl">
              {user.name.charAt(0)}
            </div>
            <div>
              <span className="text-[10px] text-silk-gold font-extrabold uppercase tracking-widest bg-silk-gold/20 px-2 py-0.5 rounded">
                Tier: {user.membershipTier}
              </span>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-silk-gold-light mt-1">
                Welcome back, {user.name}
              </h1>
              <p className="text-xs text-silk-ivory/70">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right text-xs">
              <span className="text-[10px] text-silk-gold-light uppercase block font-bold">Silk Reward Points</span>
              <span className="font-serif font-bold text-lg text-silk-gold">{user.loyaltyPoints} PTS</span>
            </div>
            <button
              onClick={logout}
              className="bg-silk-ivory/10 hover:bg-silk-maroon text-silk-ivory p-2.5 rounded-lg border border-silk-gold/30 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-2 font-serif text-xs font-bold uppercase tracking-wider">
            {[
              { id: "profile", label: "My Profile Settings", icon: User },
              { id: "orders", label: `My Orders (${orders.length})`, icon: Package },
              { id: "addresses", label: "Saved Addresses", icon: MapPin },
              { id: "loyalty", label: "Loyalty Circle", icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    activeTab === tab.id
                      ? "bg-silk-maroon text-silk-gold border-silk-maroon shadow"
                      : "bg-silk-cream text-silk-black/80 border-silk-gold/30 hover:border-silk-gold"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <Link
              href="/wishlist"
              className="w-full p-3.5 rounded-xl border border-silk-gold/30 bg-silk-cream text-silk-black/80 text-left flex items-center gap-2.5 hover:border-silk-gold transition"
            >
              <Heart className="w-4 h-4 text-silk-maroon" /> My Saved Wishlist
            </Link>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {activeTab === "profile" && (
              <div className="bg-silk-cream rounded-2xl p-6 border border-silk-gold/30 shadow-card space-y-4">
                <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2">
                  Edit Profile Information
                </h3>
                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs max-w-md">
                  <div>
                    <label className="font-bold text-silk-black block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-beige cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-silk-maroon text-silk-gold font-bold text-xs py-2.5 px-6 rounded hover:bg-silk-maroon-dark transition"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-base text-silk-maroon">Order History</h3>
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-silk-cream rounded-xl p-5 border border-silk-gold/30 shadow-card space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-silk-gold/20 pb-2 text-xs">
                      <div>
                        <span className="font-serif font-bold text-sm text-silk-maroon">{ord.orderNumber}</span>
                        <span className="text-silk-black/60 block">Placed on: {ord.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <span className="bg-silk-emerald/10 text-silk-emerald font-bold px-2.5 py-1 rounded-full text-[10px]">
                          {ord.status}
                        </span>
                        <span className="font-serif font-bold text-sm text-silk-maroon">{formatPrice(ord.totalAmount, currency)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 text-xs">
                          <img src={item.image} alt="" className="w-12 h-14 object-cover rounded border" />
                          <div className="flex-1">
                            <h4 className="font-bold text-silk-black">{item.title}</h4>
                            <p className="text-silk-black/60">Color: {item.color || "Default"} • Qty: {item.quantity}</p>
                          </div>
                          <span className="font-bold text-silk-black">{formatPrice(item.price * item.quantity, currency)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-silk-gold/20 flex justify-between items-center text-xs">
                      <span className="text-silk-black/70">Carrier: {ord.carrier} ({ord.trackingNumber})</span>
                      <button className="text-silk-maroon font-bold hover:underline flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" /> Download Tax Invoice PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-silk-cream rounded-2xl p-6 border border-silk-gold/30 shadow-card space-y-4">
                <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2">
                  Saved Shipping Addresses
                </h3>
                <div className="p-4 bg-silk-ivory rounded-xl border border-silk-gold/30 text-xs space-y-1">
                  <span className="bg-silk-maroon text-silk-gold text-[10px] font-bold px-2 py-0.5 rounded">Primary Address</span>
                  <h4 className="font-bold text-silk-black pt-1">Ananya Baishya</h4>
                  <p className="text-silk-black/70">House No 42, GS Road, Christian Basti, Guwahati, Assam - 781005</p>
                  <p className="text-silk-black/70">Phone: +91 98640 12345</p>
                </div>
              </div>
            )}

            {activeTab === "loyalty" && (
              <div className="bg-silk-cream rounded-2xl p-6 border border-silk-gold/30 shadow-card space-y-4">
                <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2">
                  Royal Silk Circle Loyalty Rewards
                </h3>
                <p className="text-xs text-silk-black/80">
                  Earn 5 Silk Points for every ₹100 spent. Redeem points for bespoke custom stitching, private preview invitations, and complimentary wooden gift boxes.
                </p>
                <div className="p-4 bg-silk-beige rounded-xl border border-silk-gold/30 text-xs font-bold text-silk-maroon flex justify-between items-center">
                  <span>Current Balance: {user.loyaltyPoints} Points</span>
                  <span className="text-silk-emerald">Tier Benefits Active</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
