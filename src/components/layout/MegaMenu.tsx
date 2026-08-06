"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

interface MegaMenuProps {
  activeTab: string | null;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeTab, onClose }) => {
  if (!activeTab) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-silk-ivory border-b border-silk-gold/30 shadow-luxury z-40 animate-fadeIn transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto py-8 px-6 grid grid-cols-12 gap-8">
        {activeTab === "sarees" && (
          <>
            <div className="col-span-3 space-y-3">
              <h4 className="font-serif font-bold text-silk-maroon text-sm uppercase tracking-widest border-b border-silk-gold/30 pb-2">
                By Silk Variety
              </h4>
              <ul className="space-y-2 text-sm text-silk-black/80 font-sans">
                <li>
                  <Link href="/shop?silk=Muga+Silk" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Golden Muga Silk Sarees <span className="text-[10px] text-silk-gold font-bold ml-1">GI Tagged</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shop?silk=Pat+Silk" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Traditional Assam Pat Silk Sarees
                  </Link>
                </li>
                <li>
                  <Link href="/shop?silk=Eri+Silk" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Ahimsa Eri Silk Sarees (Peace Silk)
                  </Link>
                </li>
                <li>
                  <Link href="/shop?silk=Banarasi+Katan" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Banarasi Katan Silk Brocades
                  </Link>
                </li>
                <li>
                  <Link href="/shop?silk=Kanjeevaram+Pure+Silk" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Kanjeevaram Pure Gold Zari Sarees
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-3 space-y-3">
              <h4 className="font-serif font-bold text-silk-maroon text-sm uppercase tracking-widest border-b border-silk-gold/30 pb-2">
                By Craft & Occasion
              </h4>
              <ul className="space-y-2 text-sm text-silk-black/80 font-sans">
                <li>
                  <Link href="/shop?occasion=Bridal" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Bridal Royal Silk Collection
                  </Link>
                </li>
                <li>
                  <Link href="/shop?occasion=Festive" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Bihu & Festival Sarees
                  </Link>
                </li>
                <li>
                  <Link href="/shop?weave=Zari+Minakari" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Handwoven Zari Minakari Motifs
                  </Link>
                </li>
                <li>
                  <Link href="/shop?weave=Handloom+Jacquard" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Sualkuchi Masterloom Sarees
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-6 bg-gradient-to-br from-silk-beige to-silk-cream p-5 rounded-lg border border-silk-gold/20 flex gap-6 items-center">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400"
                alt="Royal Assam Muga Silk Saree"
                className="w-36 h-48 object-cover rounded shadow-md border border-silk-gold/30"
              />
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-silk-maroon uppercase tracking-widest bg-silk-gold/20 px-2 py-0.5 rounded">
                  Craft Spotlight
                </span>
                <h5 className="font-serif text-lg font-bold text-silk-black">
                  Royal Golden Assam Muga Silk
                </h5>
                <p className="text-xs text-silk-black/70 line-clamp-2">
                  Handwoven in Sualkuchi with 24K real gold zari Kingkhap motifs. Certified by Silk Mark Organization of India.
                </p>
                <Link
                  href="/product/royal-assam-muga-golden-saree"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-silk-maroon hover:text-silk-gold transition pt-2"
                >
                  Explore Muga Masterpiece <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </>
        )}

        {activeTab === "mekhela" && (
          <>
            <div className="col-span-4 space-y-3">
              <h4 className="font-serif font-bold text-silk-maroon text-sm uppercase tracking-widest border-b border-silk-gold/30 pb-2">
                Authentic Mekhela Chador
              </h4>
              <ul className="space-y-2.5 text-sm text-silk-black/80 font-sans">
                <li>
                  <Link href="/shop?category=Mekhela+Chador&silk=Muga+Silk" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Pure Muga Silk Mekhela Chador <span className="text-[10px] text-silk-gold font-bold ml-1">GI Tagged</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Mekhela+Chador&silk=Pat+Silk" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Ivory & Crimson Pat Silk Mekhela Chador
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Mekhela+Chador&occasion=Bridal" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Assamese Bridal Mekhela Chador Sets
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Mekhela+Chador&silk=Eri+Silk" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Hand-spun Eri Ahimsa Mekhela Chador
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-4 space-y-3">
              <h4 className="font-serif font-bold text-silk-maroon text-sm uppercase tracking-widest border-b border-silk-gold/30 pb-2">
                Assam Weaving Motifs
              </h4>
              <p className="text-xs text-silk-black/70 leading-relaxed">
                Every weave incorporates centuries of symbolic Assamese motifs including Jaapi (conical hat), Kaziranga Peacock, Floral Lotus, and Kingkhap Royal Crown patterns.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-silk-emerald">
                <ShieldCheck className="w-4 h-4" /> 100% Genuine Sualkuchi Loom Origin
              </div>
            </div>

            <div className="col-span-4 bg-silk-maroon text-silk-ivory p-5 rounded-lg border border-silk-gold/30 flex flex-col justify-between">
              <div className="space-y-2">
                <Sparkles className="w-5 h-5 text-silk-gold" />
                <h5 className="font-serif text-base font-bold text-silk-gold-light">
                  Bridal Custom Weaving Service
                </h5>
                <p className="text-xs text-silk-ivory/80">
                  Desire a bespoke Mekhela Chador custom woven with your choice of Guna thread colors and initials?
                </p>
              </div>
              <Link
                href="/contact"
                onClick={onClose}
                className="mt-4 text-center bg-silk-gold text-silk-black hover:bg-silk-gold-light font-bold text-xs py-2 px-4 rounded transition"
              >
                Book Bridal Consultation
              </Link>
            </div>
          </>
        )}

        {activeTab === "menswear" && (
          <>
            <div className="col-span-4 space-y-3">
              <h4 className="font-serif font-bold text-silk-maroon text-sm uppercase tracking-widest border-b border-silk-gold/30 pb-2">
                Men's Royal Silk Attire
              </h4>
              <ul className="space-y-2 text-sm text-silk-black/80">
                <li>
                  <Link href="/shop?category=Men%27s+Silk+Wear" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Handloom Golden Muga Silk Kurta Sets
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Men%27s+Silk+Wear" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Eri Silk Nehru Jackets & Waistcoats
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Men%27s+Silk+Wear" onClick={onClose} className="hover:text-silk-gold hover:translate-x-1 inline-block transition">
                    Assam Silk Groomsmen Stoles (Cheleng Chador)
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-8 bg-silk-beige p-5 rounded-lg border border-silk-gold/20 flex gap-6 items-center">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400"
                alt="Men's Silk Kurta"
                className="w-32 h-40 object-cover rounded border border-silk-gold/30"
              />
              <div className="space-y-2">
                <h5 className="font-serif text-base font-bold text-silk-black">
                  Royal Groomsmen Muga Silk Set
                </h5>
                <p className="text-xs text-silk-black/70">
                  Breathable handloom Muga silk kurta with hand-embroidered brass filigree detail.
                </p>
                <Link
                  href="/product/mens-handloom-assam-muga-silk-kurta-set"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-bold text-silk-maroon hover:text-silk-gold transition"
                >
                  View Kurta Set <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
