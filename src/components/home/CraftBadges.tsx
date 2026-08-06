"use client";

import React from "react";
import { ShieldCheck, Award, Truck, HeartHandshake } from "lucide-react";

export const CraftBadges = () => {
  return (
    <section className="bg-silk-ivory py-10 border-b border-silk-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex items-center justify-center gap-3 text-center sm:text-left">
          <ShieldCheck className="w-6 h-6 text-silk-gold flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-xs text-silk-maroon uppercase tracking-widest">
              Silk Mark Certified
            </h4>
            <p className="text-[10px] text-silk-black/60 font-light">100% Pure Indian Handloom Silk</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-center sm:text-left">
          <Award className="w-6 h-6 text-silk-gold flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-xs text-silk-maroon uppercase tracking-widest">
              Sualkuchi Looms
            </h4>
            <p className="text-[10px] text-silk-black/60 font-light">Direct from Master Artisans</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-center sm:text-left">
          <Truck className="w-6 h-6 text-silk-gold flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-xs text-silk-maroon uppercase tracking-widest">
              Insured Express Delivery
            </h4>
            <p className="text-[10px] text-silk-black/60 font-light">Complimentary on ₹5,000+</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-center sm:text-left">
          <HeartHandshake className="w-6 h-6 text-silk-gold flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-xs text-silk-maroon uppercase tracking-widest">
              Fair Trade Heritage
            </h4>
            <p className="text-[10px] text-silk-black/60 font-light">Sustaining 200+ Weaver Families</p>
          </div>
        </div>
      </div>
    </section>
  );
};
