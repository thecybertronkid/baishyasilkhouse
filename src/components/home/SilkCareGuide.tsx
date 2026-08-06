"use client";

import React, { useState } from "react";
import { Sparkles, ShieldAlert, Sun, Wind, Shirt, Flame } from "lucide-react";

export const SilkCareGuide = () => {
  const [activeTab, setActiveTab] = useState<"storage" | "cleaning" | "ironing" | "burnTest">("storage");

  return (
    <section className="py-20 bg-silk-beige border-y border-silk-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
            PRESERVING HERITAGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon">
            Silk Care & Authenticity Guide
          </h2>
          <div className="w-16 h-0.5 bg-silk-gold mx-auto" />
          <p className="text-xs sm:text-sm text-silk-black/70 font-sans">
            Proper care ensures your handwoven Muga & Pat silk garments remain luminous for generations.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="max-w-4xl mx-auto bg-silk-ivory rounded-2xl shadow-luxury border border-silk-gold/30 overflow-hidden">
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-silk-maroon text-silk-ivory text-xs font-serif font-bold uppercase tracking-wider">
            {[
              { id: "storage", label: "Muslin Storage", icon: Shirt },
              { id: "cleaning", label: "Dry Cleaning", icon: Wind },
              { id: "ironing", label: "Ironing Protocol", icon: Sun },
              { id: "burnTest", label: "Pure Burn Test", icon: Flame },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-3 flex flex-col items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? "bg-silk-gold text-silk-black font-extrabold shadow"
                      : "hover:bg-silk-maroon-dark text-silk-gold-light"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-8 text-silk-black">
            {activeTab === "storage" && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-serif text-xl font-bold text-silk-maroon flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-silk-gold" /> Proper Storage in Muslin Cloth
                </h3>
                <p className="text-xs sm:text-sm text-silk-black/80 leading-relaxed">
                  Never store pure silk in plastic bags as moisture entrapment causes yellowing. Wrap your sarees in un-dyed breathable white muslin cotton cloth. Refold heavy zari sarees every 3 months to prevent thread weakness along fold lines.
                </p>
                <div className="p-3 bg-silk-cream rounded border border-silk-gold/20 text-xs font-semibold text-silk-gold-dark">
                  💡 Tip: Place neem leaves or cedarwood balls inside wardrobe corners (avoid direct contact with zari).
                </div>
              </div>
            )}

            {activeTab === "cleaning" && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-serif text-xl font-bold text-silk-maroon flex items-center gap-2">
                  <Wind className="w-5 h-5 text-silk-gold" /> Dry Cleaning & Airing
                </h3>
                <p className="text-xs sm:text-sm text-silk-black/80 leading-relaxed">
                  Heavy zari Muga, Pat, and Banarasi sarees must ALWAYS be dry cleaned by reputed specialists. For Ahimsa Eri silk stoles, gentle hand washing with mild organic baby shampoo in lukewarm water is allowed.
                </p>
                <div className="p-3 bg-silk-cream rounded border border-silk-gold/20 text-xs font-semibold text-silk-gold-dark flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-silk-maroon" /> Never wring silk yarn; air dry flat in shaded breeze.
                </div>
              </div>
            )}

            {activeTab === "ironing" && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-serif text-xl font-bold text-silk-maroon flex items-center gap-2">
                  <Sun className="w-5 h-5 text-silk-gold" /> Low Heat Pressing
                </h3>
                <p className="text-xs sm:text-sm text-silk-black/80 leading-relaxed">
                  Iron on low heat setting ('Silk' option). Always place a thin cotton pressing cloth between the iron and your silk garment. Never spray water directly on silk while ironing to prevent water mark stains.
                </p>
              </div>
            )}

            {activeTab === "burnTest" && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="font-serif text-xl font-bold text-silk-maroon flex items-center gap-2">
                  <Flame className="w-5 h-5 text-silk-gold" /> How to Verify 100% Pure Silk
                </h3>
                <p className="text-xs sm:text-sm text-silk-black/80 leading-relaxed">
                  Pure silk contains natural protein. When a single thread is burned, it burns slowly, smelling like burnt hair, and leaves a dark crushable ash. Synthetic imitation polyester melts into a hard plastic bead.
                </p>
                <div className="p-3 bg-silk-gold/20 rounded border border-silk-gold/40 text-xs font-bold text-silk-maroon flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-silk-gold" /> All Baishya Silk House products carry certified SMOI Silk Mark holograms.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
