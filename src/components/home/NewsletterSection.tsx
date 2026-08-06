"use client";

import React, { useState } from "react";
import { Mail, Sparkles, CheckCircle2 } from "lucide-react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="py-20 bg-silk-maroon text-silk-ivory relative overflow-hidden border-t-2 border-silk-gold">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
        <div className="w-12 h-12 rounded-full bg-silk-gold/20 flex items-center justify-center mx-auto border border-silk-gold">
          <Sparkles className="w-6 h-6 text-silk-gold" />
        </div>

        <span className="text-xs font-serif font-bold tracking-[0.25em] text-silk-gold-light uppercase block">
          THE ROYAL SILK CIRCLE
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-ivory">
          Receive Private Exhibition Invites & Heritage Silk Journal
        </h2>

        <p className="text-xs sm:text-sm text-silk-ivory/80 max-w-xl mx-auto font-sans leading-relaxed">
          Subscribe to receive our collector's digital booklet: <span className="font-serif font-bold text-silk-gold">"The Connoisseur's Guide to Muga & Pat Silk Identification"</span> plus 10% off your inaugural order.
        </p>

        {subscribed ? (
          <div className="bg-silk-ivory text-silk-maroon p-4 rounded-xl font-serif font-bold text-sm max-w-md mx-auto flex items-center justify-center gap-2 animate-fadeIn shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-silk-emerald" />
            Welcome to the Royal Silk Circle! Check your inbox for your 10% promo code: <span className="text-silk-gold-dark font-extrabold">SILK10</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-silk-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xs font-sans pl-10 pr-4 py-3.5 rounded bg-silk-ivory text-silk-black placeholder-silk-black/50 focus:outline-none focus:ring-2 focus:ring-silk-gold"
              />
            </div>
            <button
              type="submit"
              className="bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded shadow transition"
            >
              Join Circle
            </button>
          </form>
        )}

        <p className="text-[10px] text-silk-ivory/50">
          We respect your privacy. Unsubscribe at any time. Zero spam guarantee.
        </p>
      </div>
    </section>
  );
};
