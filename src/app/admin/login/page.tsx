"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, KeyRound, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin } = useAdminAuth();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const success = loginAdmin(username, password);
      if (success) {
        router.push("/admin");
      } else {
        setError("Invalid Admin Username or Password. Default credentials: admin / admin");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] bg-silk-cream flex items-center justify-center p-6 font-sans">
      <div className="bg-silk-ivory rounded-2xl border border-silk-gold/30 w-full max-w-md p-8 sm:p-10 shadow-2xl space-y-6 animate-fadeIn">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-silk-maroon text-silk-gold rounded-full flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-silk-maroon uppercase tracking-widest pt-2">
            BAISHYA SILK HOUSE
          </h1>
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-silk-gold-dark block">
            SHOPIFY ADMIN AUTHENTICATION
          </span>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Notice Box */}
        <div className="bg-silk-beige/60 p-3.5 rounded-lg border border-silk-gold/20 text-xs space-y-1 text-silk-black/80">
          <div className="font-serif font-bold text-silk-maroon uppercase text-[10px] tracking-wider flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-silk-gold" /> Default Access Credentials:
          </div>
          <div className="font-mono text-[11px] text-silk-black">
            Username: <strong className="text-silk-maroon">admin</strong> | Password: <strong className="text-silk-maroon">admin</strong>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-serif font-bold text-silk-black uppercase mb-1">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-silk-gold absolute left-3 top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-silk-cream border border-silk-gold/30 rounded py-2.5 pl-10 pr-3 text-silk-black focus:outline-none focus:border-silk-gold"
              />
            </div>
          </div>

          <div>
            <label className="block font-serif font-bold text-silk-black uppercase mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-silk-gold absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
                className="w-full bg-silk-cream border border-silk-gold/30 rounded py-2.5 pl-10 pr-3 text-silk-black focus:outline-none focus:border-silk-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg shadow transition flex items-center justify-center gap-2 mt-4"
          >
            {loading ? "Authenticating Admin..." : "Authenticate & Access Portal"}
          </button>
        </form>
      </div>
    </div>
  );
}
