"use client";

import React from "react";
import { MessageCircle, Phone } from "lucide-react";

export const FloatingWhatsapp = () => {
  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-40 flex flex-col gap-2">
      {/* Phone Direct Call */}
      <a
        href="tel:+919864012345"
        className="bg-silk-maroon text-silk-gold p-3 rounded-full shadow-floating hover:scale-110 transition duration-300 border border-silk-gold/40 flex items-center justify-center group"
        title="Call Silk Concierge"
      >
        <Phone className="w-5 h-5" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2 text-silk-ivory">
          +91 98640 12345
        </span>
      </a>

      {/* WhatsApp Chat */}
      <a
        href="https://wa.me/919864012345?text=Hello%20Baishya%20Silk%20House,%20I%20would%20like%20to%20inquire%20about%20authentic%20Muga%20Silk%20and%20Mekhela%20Chadors."
        target="_blank"
        rel="noreferrer"
        className="bg-emerald-700 text-white p-3.5 rounded-full shadow-floating hover:scale-110 transition duration-300 border border-emerald-400 flex items-center justify-center group"
        title="WhatsApp Silk Specialist"
      >
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2 text-white">
          WhatsApp Concierge
        </span>
      </a>
    </div>
  );
};
