"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="font-serif text-3xl font-bold text-silk-maroon border-b border-silk-gold/30 pb-3">
          Terms & Conditions
        </h1>
        <div className="space-y-4 text-xs text-silk-black/80 leading-relaxed bg-silk-cream p-6 rounded-2xl border border-silk-gold/30">
          <h2 className="font-serif text-base font-bold text-silk-maroon">1. Handloom Handcrafted Variation</h2>
          <p>
            Each garment at Baishya Silk House is individually woven on handlooms in Sualkuchi, Assam. Slight variations in yarn slubs, zari motifs, or weave texture are natural characteristics of 100% genuine handloom silk and celebrate its authentic human artistry.
          </p>

          <h2 className="font-serif text-base font-bold text-silk-maroon">2. Intellectual Property</h2>
          <p>
            All traditional motif designs, Muga silk trademarks, branding assets, and high-resolution photography belong exclusively to Baishya Silk House.
          </p>
        </div>
      </div>
    </div>
  );
}
