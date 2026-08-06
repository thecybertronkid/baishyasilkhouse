"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  Sparkles,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-silk-black text-silk-ivory pt-16 pb-24 md:pb-12 border-t-4 border-silk-gold">
      {/* Upper Value Proposition Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-silk-gold/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center p-4 rounded bg-silk-charcoal/40 border border-silk-gold/10">
          <ShieldCheck className="w-8 h-8 text-silk-gold mb-2" />
          <h4 className="font-serif font-bold text-sm text-silk-gold-light">Silk Mark Certified</h4>
          <p className="text-xs text-silk-ivory/60 mt-1">100% Guaranteed Pure Indian Handloom Silk</p>
        </div>

        <div className="flex flex-col items-center p-4 rounded bg-silk-charcoal/40 border border-silk-gold/10">
          <Award className="w-8 h-8 text-silk-gold mb-2" />
          <h4 className="font-serif font-bold text-sm text-silk-gold-light">Direct Sualkuchi Looms</h4>
          <p className="text-xs text-silk-ivory/60 mt-1">Woven by Master Artisans of Assam</p>
        </div>

        <div className="flex flex-col items-center p-4 rounded bg-silk-charcoal/40 border border-silk-gold/10">
          <Truck className="w-8 h-8 text-silk-gold mb-2" />
          <h4 className="font-serif font-bold text-sm text-silk-gold-light">Free Worldwide Express</h4>
          <p className="text-xs text-silk-ivory/60 mt-1">Free Shipping on domestic orders above ₹5,000</p>
        </div>

        <div className="flex flex-col items-center p-4 rounded bg-silk-charcoal/40 border border-silk-gold/10">
          <RotateCcw className="w-8 h-8 text-silk-gold mb-2" />
          <h4 className="font-serif font-bold text-sm text-silk-gold-light">Hassle-Free Returns</h4>
          <p className="text-xs text-silk-ivory/60 mt-1">7 Days Easy Exchange & Velvet Packaging</p>
        </div>
      </div>

      {/* Main Footer Link Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-serif font-bold text-2xl tracking-widest text-silk-gold">
              BAISHYA SILK HOUSE
            </span>
            <p className="text-[10px] tracking-[0.3em] uppercase text-silk-beige/70">
              Assam Heritage • Estd 1984
            </p>
          </Link>
          <p className="text-xs text-silk-ivory/70 leading-relaxed max-w-sm">
            Preserving centuries of Assam sericulture. We craft authentic Golden Muga Silk, Pat Silk Mekhela Chadors, Eri Ahimsa Silk, and royal handloom bridal wear in Sualkuchi, Assam.
          </p>
          <div className="pt-2 flex items-center space-x-3 text-silk-gold">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-silk-charcoal hover:bg-silk-maroon hover:text-silk-ivory transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-silk-charcoal hover:bg-silk-maroon hover:text-silk-ivory transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2 rounded-full bg-silk-charcoal hover:bg-silk-maroon hover:text-silk-ivory transition">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Collections */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-silk-gold border-b border-silk-gold/20 pb-2">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-silk-ivory/70">
            <li><Link href="/shop?silk=Muga+Silk" className="hover:text-silk-gold transition">Golden Muga Silk Sarees</Link></li>
            <li><Link href="/shop?category=Mekhela+Chador" className="hover:text-silk-gold transition">Assam Mekhela Chador</Link></li>
            <li><Link href="/shop?silk=Eri+Silk" className="hover:text-silk-gold transition">Ahimsa Eri Silk Stoles</Link></li>
            <li><Link href="/shop?silk=Banarasi+Katan" className="hover:text-silk-gold transition">Banarasi Katan Brocades</Link></li>
            <li><Link href="/shop?silk=Kanjeevaram+Pure+Silk" className="hover:text-silk-gold transition">Kanjeevaram Gold Sarees</Link></li>
            <li><Link href="/shop?category=Men%27s+Silk+Wear" className="hover:text-silk-gold transition">Men's Handloom Kurtas</Link></li>
          </ul>
        </div>

        {/* Support & Care */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-silk-gold border-b border-silk-gold/20 pb-2">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs text-silk-ivory/70">
            <li><Link href="/track-order" className="hover:text-silk-gold transition">Track Your Order</Link></li>
            <li><Link href="/faq" className="hover:text-silk-gold transition">Frequently Asked Questions</Link></li>
            <li><Link href="/shipping" className="hover:text-silk-gold transition">Shipping & Delivery Policy</Link></li>
            <li><Link href="/returns" className="hover:text-silk-gold transition">Returns & Exchange Policy</Link></li>
            <li><Link href="/privacy" className="hover:text-silk-gold transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-silk-gold transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Showroom & Contact */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-silk-gold border-b border-silk-gold/20 pb-2">
            Flagship Atelier
          </h4>
          <div className="space-y-2 text-xs text-silk-ivory/70">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-silk-gold flex-shrink-0 mt-0.5" />
              <span>Silk Street, Sualkuchi, Kamrup District, Assam - 781103</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-silk-gold flex-shrink-0" />
              <span>+91 98640 12345 / 0361 245890</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-silk-gold flex-shrink-0" />
              <span>concierge@baishyasilk.com</span>
            </p>
          </div>
          <div className="pt-2">
            <span className="text-[10px] text-silk-gold/80 block uppercase font-bold tracking-wider">Accepted Payment Gateways</span>
            <div className="flex items-center gap-2 mt-1.5 opacity-80">
              <span className="bg-silk-charcoal px-2 py-1 rounded text-[10px] font-bold text-silk-gold border border-silk-gold/30">RAZORPAY</span>
              <span className="bg-silk-charcoal px-2 py-1 rounded text-[10px] font-bold text-silk-gold border border-silk-gold/30">STRIPE</span>
              <span className="bg-silk-charcoal px-2 py-1 rounded text-[10px] font-bold text-silk-gold border border-silk-gold/30">UPI</span>
              <span className="bg-silk-charcoal px-2 py-1 rounded text-[10px] font-bold text-silk-gold border border-silk-gold/30">COD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-silk-gold/20 flex flex-col md:flex-row items-center justify-between text-[11px] text-silk-ivory/50">
        <p>© 2026 Baishya Silk House. All rights reserved. Handcrafted in Sualkuchi, Assam, India.</p>
        <p className="mt-2 md:mt-0 flex items-center gap-1">
          <span>Designed with</span> <Sparkles className="w-3 h-3 text-silk-gold inline" /> <span>Luxury Heritage Crafts</span>
        </p>
      </div>
    </footer>
  );
};
