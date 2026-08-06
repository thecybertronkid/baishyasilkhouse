"use client";

import React, { useState } from "react";
import { Shirt, Wind, Sun, Flame } from "lucide-react";

export const SilkCareGuide = () => {
  const [activeTab, setActiveTab] = useState<"storage" | "cleaning" | "ironing" | "burnTest">("storage");

  return (
    <section className="py-28 bg-silk-ivory border-t border-silk-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-silk-gold-dark uppercase block">
            PRESERVING LUXURY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon uppercase tracking-wide">
            Silk Care & Authenticity
          </h2>
          <div className="w-12 h-[1px] bg-silk-gold mx-auto" />
          <p className="text-xs text-silk-black/60 font-light leading-relaxed">
            Proper care ensures your handwoven Muga & Pat silk garments remain luminous for generations.
          </p>
        </div>

        {/* Minimal Clean Tabs */}
        <div className="max-w-4xl mx-auto bg-silk-cream rounded-xl border border-silk-gold/20 overflow-hidden shadow-card">
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-silk-beige/60 border-b border-silk-gold/20 text-xs font-serif font-bold uppercase tracking-wider">
            {[
              { id: "storage", label: "Muslin Storage", icon: Shirt },
              { id: "cleaning", label: "Dry Cleaning", icon: Wind },
              { id: "ironing", label: "Low Heat Press", icon: Sun },
              { id: "burnTest", label: "Pure Burn Test", icon: Flame },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-3 flex flex-col items-center gap-1.5 transition ${
                    activeTab === tab.id
                      ? "bg-silk-maroon text-silk-gold font-extrabold"
                      : "text-silk-black/70 hover:text-silk-maroon"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-8 text-silk-black font-sans">
            {activeTab === "storage" && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-serif text-lg font-bold text-silk-maroon">Proper Storage in Muslin Cloth</h3>
                <p className="text-xs text-silk-black/80 leading-relaxed font-light">
                  Never store pure silk in synthetic plastic bags. Wrap your sarees in un-dyed breathable white muslin cotton cloth. Refold heavy zari sarees every 3 months to prevent thread strain along crease lines.
                </p>
              </div>
            )}

            {activeTab === "cleaning" && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-serif text-lg font-bold text-silk-maroon">Professional Dry Cleaning</h3>
                <p className="text-xs text-silk-black/80 leading-relaxed font-light">
                  Heavy zari Muga, Pat, and Banarasi sarees must ALWAYS be dry cleaned by reputed specialists. For Ahimsa Eri silk stoles, gentle hand washing with mild organic shampoo in lukewarm water is allowed.
                </p>
              </div>
            )}

            {activeTab === "ironing" && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-serif text-lg font-bold text-silk-maroon">Low Heat Pressing Protocol</h3>
                <p className="text-xs text-silk-black/80 leading-relaxed font-light">
                  Iron on low heat setting ('Silk' option). Always place a thin cotton pressing cloth between the iron and your silk garment. Avoid spraying water directly on silk to prevent water mark stains.
                </p>
              </div>
            )}

            {activeTab === "burnTest" && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="font-serif text-lg font-bold text-silk-maroon">Pure Silk Burn Test</h3>
                <p className="text-xs text-silk-black/80 leading-relaxed font-light">
                  Pure silk contains natural protein. When burned, it burns slowly, smelling like burnt hair, leaving a fine crushable black ash. Synthetic polyester melts into a hard plastic bead.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
