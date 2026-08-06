"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "newpatron@example.com");
    router.push("/account");
  };

  return (
    <div className="py-16 bg-silk-ivory min-h-screen font-sans flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-silk-cream rounded-2xl p-8 border border-silk-gold/40 shadow-2xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
            ROYAL SILK CIRCLE
          </span>
          <h1 className="font-serif text-2xl font-bold text-silk-maroon">Create Patron Account</h1>
          <p className="text-xs text-silk-black/70">Join our rewards circle for 10% off your inaugural order.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-silk-black block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rajkumari Ananya Baishya"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
            />
          </div>
          <div>
            <label className="font-bold text-silk-black block mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="ananya@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
            />
          </div>
          <div>
            <label className="font-bold text-silk-black block mb-1">Mobile Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 98640 12345"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-silk-maroon text-silk-gold font-bold text-xs py-3.5 px-4 rounded-lg hover:bg-silk-maroon-dark transition flex items-center justify-center gap-2 shadow"
          >
            Create Account & Join <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-silk-black/70">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-silk-maroon underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
