"use client";

import React from "react";

export default function ReturnsPolicyPage() {
  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="font-serif text-3xl font-bold text-silk-maroon border-b border-silk-gold/30 pb-3">
          Returns & Exchange Policy
        </h1>
        <div className="space-y-4 text-xs text-silk-black/80 leading-relaxed bg-silk-cream p-6 rounded-2xl border border-silk-gold/30">
          <h2 className="font-serif text-base font-bold text-silk-maroon">7-Day Hassle-Free Exchange</h2>
          <p>
            If you are not completely enchanted with your purchase, you may initiate a return or exchange within 7 days of delivery. Items must be unused, unwashed, with original Silk Mark hologram tags intact.
          </p>

          <h2 className="font-serif text-base font-bold text-silk-maroon">Custom Tailored Garments</h2>
          <p>
            Garments with custom tailored blouse stitching are non-refundable but eligible for complimentary alterations at our Guwahati atelier.
          </p>
        </div>
      </div>
    </div>
  );
}
