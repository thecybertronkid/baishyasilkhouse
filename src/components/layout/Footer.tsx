"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-silk-maroon text-silk-ivory border-t border-silk-gold/30 font-sans">
      {/* Brand Craftsmanship Guarantee Banner */}
      <div className="border-b border-silk-gold/20 py-10 bg-silk-maroon-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 bg-silk-gold/10 text-silk-gold rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-silk-gold">
              100% Silk Mark Certified
            </h4>
            <p className="text-[11px] text-silk-ivory/70 font-light">
              Authenticated with Government of India Silk Mark Board security holograms.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 bg-silk-gold/10 text-silk-gold rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-silk-gold">
              Sualkuchi Heritage Looms
            </h4>
            <p className="text-[11px] text-silk-ivory/70 font-light">
              Directly supporting 120+ master artisan weaving families in Assam.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 bg-silk-gold/10 text-silk-gold rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-silk-gold">
              Bespoke Bridal Concierge
            </h4>
            <p className="text-[11px] text-silk-ivory/70 font-light">
              Personalized video consultations & custom loom weaving for brides.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
        {/* Col 1: Brand Lore */}
        <div className="space-y-4 md:col-span-1">
          <span className="font-serif font-bold text-lg tracking-[0.2em] text-silk-gold uppercase block">
            BAISHYA SILK HOUSE
          </span>
          <p className="text-silk-ivory/80 leading-relaxed font-light">
            Crafting royal Assamese silk heirlooms since 1986. Home to GI-tagged Golden Muga, Mulberry Pat, and Eri Ahimsa Peace Silk.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/919864012345?text=Hello%20Baishya%20Silk%20House,%20I%20would%20like%20to%20inquire%20about%20your%20handloom%20silk%20collection."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-silk-emerald text-silk-ivory hover:bg-emerald-800 text-[10px] font-serif font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition shadow"
            >
              <MessageCircle className="w-4 h-4 fill-current" /> Contact Concierge WhatsApp
            </a>
          </div>
        </div>

        {/* Col 2: Showroom Collections */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-silk-gold border-b border-silk-gold/20 pb-2">
            Silk Collections
          </h4>
          <ul className="space-y-2 text-silk-ivory/75 font-serif uppercase tracking-wider text-[11px]">
            <li>
              <Link href="/shop?silk=Muga+Silk" className="hover:text-silk-gold transition">
                Assam Muga Silk Sarees
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Mekhela+Chador" className="hover:text-silk-gold transition">
                Pat Silk Mekhela Chador
              </Link>
            </li>
            <li>
              <Link href="/shop?silk=Eri+Silk" className="hover:text-silk-gold transition">
                Eri Ahimsa Stoles & Fabrics
              </Link>
            </li>
            <li>
              <Link href="/shop?category=Men%27s+Silk+Wear" className="hover:text-silk-gold transition">
                Men's Silk Kurtas & Dhotis
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Brand Story & Heritage */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-silk-gold border-b border-silk-gold/20 pb-2">
            Brand Heritage
          </h4>
          <ul className="space-y-2 text-silk-ivory/75 font-serif uppercase tracking-wider text-[11px]">
            <li>
              <Link href="/about" className="hover:text-silk-gold transition">
                Our Sualkuchi Legacy
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-silk-gold transition">
                Assamese Silk Journal
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-silk-gold transition">
                Silk Care & FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-silk-gold transition">
                Visit Sualkuchi Showroom
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Showroom Address & Hours */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-xs uppercase tracking-widest text-silk-gold border-b border-silk-gold/20 pb-2">
            Flagship Showroom
          </h4>
          <div className="space-y-2 text-silk-ivory/80 text-[11px]">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-silk-gold flex-shrink-0 mt-0.5" />
              <span>Baishya Silk House, Silk Street, Sualkuchi, Kamrup District, Assam - 781103</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-silk-gold flex-shrink-0" />
              <span>+91 98640 12345 / +91 361 2840123</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-silk-gold flex-shrink-0" />
              <span>concierge@baishyasilk.com</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-silk-gold flex-shrink-0" />
              <span>Mon - Sat: 9:30 AM - 7:30 PM</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div className="border-t border-silk-gold/20 py-6 bg-silk-maroon-dark text-[10px] text-center text-silk-ivory/60 font-serif uppercase tracking-widest">
        © {new Date().getFullYear()} BAISHYA SILK HOUSE. ALL RIGHTS RESERVED. SUALKUCHI, ASSAM.
      </div>
    </footer>
  );
};
