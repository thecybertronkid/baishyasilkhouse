"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Image as ImageIcon, Save, Check } from "lucide-react";

export default function AdminCMSPage() {
  const [announcementText, setAnnouncementText] = useState("✨ Handwoven Royal Muga Silk Sarees - 100% Certified Silk Mark");
  const [heroHeading, setHeroHeading] = useState("THE ROYAL GOLDEN MUGA SILK");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          <div className="border-b border-silk-gold/30 pb-4">
            <h1 className="font-serif text-3xl font-bold text-silk-maroon">CMS & Storefront Content Manager</h1>
            <p className="text-xs text-silk-black/70 mt-1">Manage announcement banner text and homepage hero content without code edits.</p>
          </div>

          <form onSubmit={handleSave} className="bg-silk-cream p-6 rounded-2xl border border-silk-gold/30 shadow-card space-y-4 text-xs">
            <div>
              <label className="font-bold text-silk-black block mb-1">Top Announcement Bar Text</label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full px-3 py-2 border rounded bg-silk-ivory"
              />
            </div>

            <div>
              <label className="font-bold text-silk-black block mb-1">Homepage Main Hero Heading</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full px-3 py-2 border rounded bg-silk-ivory"
              />
            </div>

            <button type="submit" className="bg-silk-maroon text-silk-gold font-bold px-6 py-2.5 rounded flex items-center gap-2">
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />} Save Storefront Content
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
