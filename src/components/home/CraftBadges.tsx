"use client";

import React from "react";
import { ShieldCheck, Award, Truck, HeartHandshake } from "lucide-react";

export const CraftBadges = () => {
  return (
    <section className="bg-silk-beige py-8 border-y border-silk-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3 p-3 bg-silk-ivory rounded-lg border border-silk-gold/20 shadow-sm">
          <ShieldCheck className="w-8 h-8 text-silk-gold flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-xs text-silk-maroon uppercase tracking-wider">
              Silk Mark Certified
            </h4>
            <p className="text-[11px] text-silk-black/70">100% Verified Pure Silk Quality</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-silk-ivory rounded-lg border border-silk-gold/20 shadow-sm">
          <Award className="w-8 h-8 text-silk-gold flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-xs text-silk-maroon uppercase tracking-wider">
              Sualkuchi Looms
            </h4>
            <p className="text-[11px] text-silk-black/70">Directly from Master Artisans</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-silk-ivory rounded-lg border border-silk-gold/20 shadow-sm">
          <Truck className="w-8 h-8 text-silk-gold flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-xs text-silk-maroon uppercase tracking-wider">
              Insured Express Delivery
            </h4>
            <p className="text-[11px] text-silk-black/70">Free Shipping on ₹5,000+</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-silk-ivory rounded-lg border border-silk-gold/20 shadow-sm">
          <HeartHandshake className="w-8 h-8 text-silk-gold flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-xs text-silk-maroon uppercase tracking-wider">
              Ethical Fair Trade
            </h4>
            <p className="text-[11px] text-silk-black/70">Empowering 200+ Weaver Families</p>
          </div>
        </div>
      </div>
    </section>
  );
};
