"use client";

import React from "react";

export default function ShippingPolicyPage() {
  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="font-serif text-3xl font-bold text-silk-maroon border-b border-silk-gold/30 pb-3">
          Shipping & Delivery Policy
        </h1>
        <div className="space-y-4 text-xs text-silk-black/80 leading-relaxed bg-silk-cream p-6 rounded-2xl border border-silk-gold/30">
          <h2 className="font-serif text-base font-bold text-silk-maroon">Domestic Express Shipping</h2>
          <p>
            We offer COMPLIMENTARY insured express shipping across India on orders exceeding ₹5,000. Delivery timelines range from 2 to 4 business days for North East & metros, and 4 to 6 business days for other states via Delhivery & Blue Dart.
          </p>

          <h2 className="font-serif text-base font-bold text-silk-maroon">International Worldwide Shipping</h2>
          <p>
            We ship worldwide via DHL Express. International shipments arrive within 5 to 8 business days. Customs duties, if applicable in destination countries, are borne by the recipient.
          </p>
        </div>
      </div>
    </div>
  );
}
