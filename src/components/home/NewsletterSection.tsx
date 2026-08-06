"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-24 bg-silk-maroon text-silk-ivory border-t border-silk-gold/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-silk-gold-light uppercase block">
          THE ROYAL SILK CIRCLE
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-ivory uppercase tracking-wide">
          Private Exhibition Invites & Journal
        </h2>

        <div className="w-12 h-[1px] bg-silk-gold mx-auto" />

        <p className="text-xs text-silk-ivory/80 max-w-lg mx-auto font-sans font-light leading-relaxed">
          Subscribe to receive private preview invitations, silk care journals, and 10% off your inaugural order.
        </p>

        {subscribed ? (
          <div className="bg-silk-ivory text-silk-maroon p-4 rounded-lg font-serif font-bold text-xs max-w-md mx-auto flex items-center justify-center gap-2 animate-fadeIn shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-silk-emerald" />
            Welcome to the Royal Silk Circle! Code: <span className="text-silk-gold-dark font-extrabold">SILK10</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 text-xs font-sans px-4 py-3.5 rounded bg-silk-ivory text-silk-black placeholder-silk-black/50 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded shadow transition"
            >
              Join Circle
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
