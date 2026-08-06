"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, X, ArrowRight, RefreshCw, CheckCircle2, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export const SilkAdvisorModal = () => {
  const { isAiAdvisorOpen, setIsAiAdvisorOpen, setQuickViewProduct, currency } = useStore();

  const [step, setStep] = useState<number>(1);
  const [occasion, setOccasion] = useState<string>("Bridal");
  const [silkPreference, setSilkPreference] = useState<string>("Muga Silk");
  const [budget, setBudget] = useState<string>("Under ₹50,000");

  if (!isAiAdvisorOpen) return null;

  const getRecommendations = () => {
    return PRODUCTS.filter((p) => {
      if (silkPreference === "Muga Silk" && p.silkType === "Muga Silk") return true;
      if (silkPreference === "Pat Silk" && p.silkType === "Pat Silk") return true;
      if (silkPreference === "Eri Silk" && p.silkType === "Eri Silk") return true;
      if (silkPreference === "Banarasi" && p.silkType.includes("Banarasi")) return true;
      if (silkPreference === "Kanjeevaram" && p.silkType.includes("Kanjeevaram")) return true;
      return p.isBestSeller || p.isTrending;
    }).slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-silk-ivory rounded-2xl shadow-2xl overflow-hidden border border-silk-gold/50 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-silk-maroon to-silk-maroon-dark text-silk-ivory p-5 flex items-center justify-between border-b border-silk-gold/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-silk-gold/20 flex items-center justify-center border border-silk-gold">
              <Sparkles className="w-4 h-4 text-silk-gold" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-silk-gold-light">
                Baishya AI Silk Advisor
              </h3>
              <p className="text-[10px] text-silk-ivory/70 uppercase tracking-widest">
                Personalized Silk Concierge
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAiAdvisorOpen(false)}
            className="p-1 hover:text-silk-gold text-silk-ivory transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <span className="text-[11px] font-bold uppercase text-silk-maroon tracking-wider bg-silk-gold/20 px-2 py-0.5 rounded">
                Step 1 of 3 • Select Occasion
              </span>
              <h4 className="font-serif text-xl font-bold text-silk-black">
                What grand occasion are you dressing for?
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "Bridal / Wedding", desc: "Heavy gold zari & authentic Muga / Pat silk" },
                  { title: "Reception & Gala", desc: "Rich Banarasi & Kanjeevaram statements" },
                  { title: "Festive & Bihu", desc: "Traditional Assam handloom weaves" },
                  { title: "Groom & Menswear", desc: "Royal Muga & Eri silk Kurta sets" },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setOccasion(item.title)}
                    className={`p-4 rounded-xl border text-left transition ${
                      occasion === item.title
                        ? "bg-silk-beige border-silk-maroon shadow-md text-silk-maroon"
                        : "bg-silk-cream border-silk-gold/30 hover:border-silk-gold text-silk-black"
                    }`}
                  >
                    <span className="font-serif font-bold text-sm block">{item.title}</span>
                    <span className="text-[11px] text-silk-black/60 block mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-silk-maroon text-silk-gold font-bold text-xs py-2.5 px-6 rounded-lg hover:bg-silk-maroon-dark transition flex items-center gap-2"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <span className="text-[11px] font-bold uppercase text-silk-maroon tracking-wider bg-silk-gold/20 px-2 py-0.5 rounded">
                Step 2 of 3 • Silk Craft Preference
              </span>
              <h4 className="font-serif text-xl font-bold text-silk-black">
                Which luxury Indian silk variety do you prefer?
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "Muga Silk", tag: "Golden Assam Silk (GI Tagged)" },
                  { title: "Pat Silk", tag: "Pristine Mulberry Silk" },
                  { title: "Eri Silk", tag: "Non-violent Ahimsa Thermal Silk" },
                  { title: "Kanjeevaram", tag: "Korvai Pure Gold Zari" },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => setSilkPreference(item.title)}
                    className={`p-4 rounded-xl border text-left transition ${
                      silkPreference === item.title
                        ? "bg-silk-beige border-silk-maroon shadow-md text-silk-maroon"
                        : "bg-silk-cream border-silk-gold/30 hover:border-silk-gold text-silk-black"
                    }`}
                  >
                    <span className="font-serif font-bold text-sm block">{item.title}</span>
                    <span className="text-[10px] font-semibold text-silk-gold-dark block mt-1">{item.tag}</span>
                  </button>
                ))}
              </div>
              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-silk-black/60 hover:text-silk-black"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-silk-maroon text-silk-gold font-bold text-xs py-2.5 px-6 rounded-lg hover:bg-silk-maroon-dark transition flex items-center gap-2"
                >
                  Generate Recommendations <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-silk-gold/30 pb-3">
                <div>
                  <span className="text-[11px] font-bold uppercase text-silk-emerald tracking-wider bg-silk-emerald/10 px-2 py-0.5 rounded">
                    Curated Results
                  </span>
                  <h4 className="font-serif text-lg font-bold text-silk-black mt-1">
                    Your Personalized Silk Masterpieces
                  </h4>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-silk-maroon font-bold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-silk-cream rounded-xl p-3 border border-silk-gold/30 flex flex-col justify-between hover:shadow-lg transition"
                  >
                    <div>
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-full h-36 object-cover rounded border border-silk-gold/20"
                      />
                      <span className="text-[9px] uppercase font-bold text-silk-maroon mt-2 block">
                        {prod.silkType}
                      </span>
                      <h5 className="font-serif text-xs font-bold text-silk-black line-clamp-1 mt-0.5">
                        {prod.title}
                      </h5>
                      <span className="font-bold text-xs text-silk-maroon block mt-1">
                        {formatPrice(prod.price, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setIsAiAdvisorOpen(false);
                        setQuickViewProduct(prod);
                      }}
                      className="mt-3 w-full bg-silk-gold text-silk-black hover:bg-silk-gold-light text-[11px] font-bold py-1.5 rounded transition text-center"
                    >
                      Quick View & Specs
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-silk-beige rounded-lg border border-silk-gold/20 flex items-center gap-2 text-xs text-silk-black/80">
                <ShieldCheck className="w-5 h-5 text-silk-gold flex-shrink-0" />
                <span>All recommended items include complimentary Silk Mark Certificate & Velvet Packaging.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
