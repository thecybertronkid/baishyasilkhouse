"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Lock, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("ananya.baishya@example.com");
  const [password, setPassword] = useState("password123");
  const [authMode, setAuthMode] = useState<"email" | "otp">("email");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push("/account");
  };

  return (
    <div className="py-16 bg-silk-ivory min-h-screen font-sans flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-silk-cream rounded-2xl p-8 border border-silk-gold/40 shadow-2xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
            ROYAL PATRON PORTAL
          </span>
          <h1 className="font-serif text-2xl font-bold text-silk-maroon">Sign In To Baishya Silk House</h1>
        </div>

        {/* Tab Toggle */}
        <div className="flex border border-silk-gold/30 rounded-lg p-1 bg-silk-beige font-serif text-xs uppercase font-bold">
          <button
            onClick={() => setAuthMode("email")}
            className={`flex-1 py-2 rounded transition ${
              authMode === "email" ? "bg-silk-maroon text-silk-gold shadow" : "text-silk-black/60"
            }`}
          >
            Password Login
          </button>
          <button
            onClick={() => setAuthMode("otp")}
            className={`flex-1 py-2 rounded transition ${
              authMode === "otp" ? "bg-silk-maroon text-silk-gold shadow" : "text-silk-black/60"
            }`}
          >
            Instant OTP Login
          </button>
        </div>

        {authMode === "email" ? (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-silk-black block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
              />
            </div>
            <div>
              <label className="font-bold text-silk-black block mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-silk-maroon text-silk-gold font-bold text-xs py-3.5 px-4 rounded-lg hover:bg-silk-maroon-dark transition flex items-center justify-center gap-2 shadow"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-silk-black block mb-1">Mobile Number</label>
              <input
                type="tel"
                placeholder="+91 98640 12345"
                className="w-full px-3 py-2.5 border border-silk-gold/30 rounded bg-silk-ivory"
              />
            </div>
            {otpSent ? (
              <div>
                <label className="font-bold text-silk-black block mb-1">Enter 4-Digit OTP</label>
                <input
                  type="text"
                  placeholder="1 2 3 4"
                  maxLength={4}
                  className="w-full px-3 py-2.5 border border-silk-gold/30 rounded bg-silk-ivory text-center font-bold text-lg text-silk-maroon tracking-widest"
                />
                <button
                  onClick={handleLogin}
                  className="w-full mt-3 bg-silk-maroon text-silk-gold font-bold text-xs py-3 px-4 rounded"
                >
                  Verify & Sign In
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOtpSent(true)}
                className="w-full bg-silk-gold text-silk-black font-bold text-xs py-3 px-4 rounded"
              >
                Send One-Time Password (OTP)
              </button>
            )}
          </div>
        )}

        <div className="pt-2 text-center text-xs text-silk-black/70">
          <span>New patron? </span>
          <Link href="/register" className="font-bold text-silk-maroon underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
