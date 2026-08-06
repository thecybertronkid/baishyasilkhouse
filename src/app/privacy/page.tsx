"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="font-serif text-3xl font-bold text-silk-maroon border-b border-silk-gold/30 pb-3">
          Privacy & Data Protection Policy
        </h1>
        <div className="space-y-4 text-xs text-silk-black/80 leading-relaxed bg-silk-cream p-6 rounded-2xl border border-silk-gold/30">
          <h2 className="font-serif text-base font-bold text-silk-maroon">1. Commitment to Patron Privacy</h2>
          <p>
            Baishya Silk House respects your privacy. We collect personal information solely to process orders, fulfill custom handloom requests, and issue Silk Mark Organization of India digital certificates.
          </p>

          <h2 className="font-serif text-base font-bold text-silk-maroon">2. Information We Collect</h2>
          <p>
            When placing an order or registering for the Royal Silk Circle, we collect your name, shipping address, contact phone number, and email. Payment details are processed directly through 256-bit SSL encrypted PCI-DSS compliant gateways (Razorpay & Stripe). We never store raw credit card numbers.
          </p>

          <h2 className="font-serif text-base font-bold text-silk-maroon">3. Data Security & Cookies</h2>
          <p>
            We employ industry-standard encryption protocols to protect your personal information against unauthorized access. Cookies are used exclusively for shopping cart state retention and currency preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
