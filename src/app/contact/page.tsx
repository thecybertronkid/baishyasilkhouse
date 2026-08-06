"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Bridal Custom Weaving Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-serif font-bold text-silk-gold-dark uppercase tracking-widest">
            CONCIERGE & ATELIER VISIT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-silk-maroon">
            Connect With Our Silk Specialist
          </h1>
          <p className="text-xs text-silk-black/70">
            Book a private bridal silk appointment or inquire about custom loom weaving.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-silk-cream rounded-2xl p-6 border border-silk-gold/30 shadow-card space-y-4">
              <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2">
                Flagship Atelier & Showroom
              </h3>
              <div className="space-y-3 text-xs text-silk-black/80">
                <p className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-silk-gold flex-shrink-0 mt-0.5" />
                  <span>Silk Street, Sualkuchi, Kamrup District, Assam - 781103, India</span>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-silk-gold flex-shrink-0" />
                  <span>+91 98640 12345 / 0361 245890</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-silk-gold flex-shrink-0" />
                  <span>concierge@baishyasilk.com</span>
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-silk-gold flex-shrink-0" />
                  <span>Monday - Saturday: 10:00 AM - 7:30 PM IST</span>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/919864012345"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-800 transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Chat on WhatsApp Concierge
                </a>
              </div>
            </div>

            {/* Embedded Map Visualization Container */}
            <div className="bg-silk-beige rounded-2xl p-4 border border-silk-gold/30 shadow-card text-center space-y-2">
              <span className="font-serif font-bold text-xs text-silk-maroon block">Sualkuchi Silk Village Map</span>
              <div className="aspect-video bg-silk-ivory rounded-lg border border-silk-gold/20 flex flex-col items-center justify-center p-4 text-silk-black/60 text-xs space-y-1">
                <MapPin className="w-8 h-8 text-silk-maroon animate-bounce" />
                <span className="font-bold text-silk-black">Baishya Silk House Atelier</span>
                <span>Sualkuchi, Kamrup, Assam 781103</span>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-silk-cream rounded-2xl p-8 border border-silk-gold/30 shadow-card space-y-6">
              <h3 className="font-serif font-bold text-lg text-silk-maroon border-b border-silk-gold/20 pb-2">
                Send Us An Inquiry
              </h3>

              {submitted ? (
                <div className="p-8 text-center bg-silk-ivory rounded-xl border border-silk-gold/30 space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-silk-emerald mx-auto" />
                  <h4 className="font-serif font-bold text-base text-silk-maroon">Message Sent Successfully!</h4>
                  <p className="text-xs text-silk-black/70">
                    Our master silk advisor will review your request and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-silk-black block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-silk-black block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-silk-black block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-silk-black block mb-1">Inquiry Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold font-bold text-silk-maroon"
                      >
                        <option>Bridal Custom Weaving Inquiry</option>
                        <option>Bulk & Wholesale Silk Fabrics</option>
                        <option>Silk Mark Authenticity Verification</option>
                        <option>Order Status Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-silk-black block mb-1">Your Message</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify garment details, preferred silk variety, or bridal dates..."
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-silk-maroon text-silk-gold font-bold text-xs py-3.5 px-6 rounded-lg hover:bg-silk-maroon-dark transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
