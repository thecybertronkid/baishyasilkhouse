"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { Plus, Trash2, Edit3, ShieldCheck, Search, Check } from "lucide-react";

export default function AdminProductsPage() {
  const { currency } = useStore();
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Add Product
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("45000");
  const [silkType, setSilkType] = useState("Muga Silk");
  const [category, setCategory] = useState("Silk Sarees");

  const filtered = productList.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const newProd: Product = {
      id: `bsh-${Date.now()}`,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      tagline: "Handwoven in Sualkuchi",
      subtitle: "100% Genuine Handloom Silk",
      price: Number(price),
      originalPrice: Number(price) * 1.2,
      discountPercentage: 15,
      category: category as any,
      silkType: silkType as any,
      weavingStyle: "Handloom Jacquard",
      occasion: "Bridal",
      stateOrigin: "Sualkuchi, Assam",
      rating: 5.0,
      reviewCount: 1,
      sku: `BSH-${silkType.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      inStock: true,
      isSilkMarkCertified: true,
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
      ],
      colors: [{ name: "Gold", hex: "#D4AF37" }],
      blouseIncluded: true,
      careInstructions: ["Dry clean only"],
      description: "Authentic handwoven silk masterpiece.",
      story: "Woven in Sualkuchi.",
    };

    setProductList([newProd, ...productList]);
    setIsModalOpen(false);
    setTitle("");
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-8">
        <AdminSidebar />

        <main className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-silk-gold/30 pb-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-silk-maroon">Silk Catalog Management</h1>
              <p className="text-xs text-silk-black/70 mt-1">Add, edit, or remove products and inventory status.</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-silk-maroon text-silk-gold font-bold text-xs py-3 px-6 rounded-lg hover:bg-silk-maroon-dark transition flex items-center justify-center gap-2 shadow"
            >
              <Plus className="w-4 h-4 text-silk-gold" /> Add New Silk Garment
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-silk-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by title or SKU code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-lg border border-silk-gold/30 bg-silk-cream"
            />
          </div>

          {/* Catalog Data Table */}
          <div className="bg-silk-cream rounded-2xl border border-silk-gold/30 shadow-card overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-silk-beige border-b border-silk-gold/30 font-serif font-bold text-silk-maroon">
                  <th className="p-3">Product</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Silk Type</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Silk Mark</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silk-gold/20">
                {filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-silk-ivory transition">
                    <td className="p-3 flex items-center gap-3">
                      <img src={prod.images[0]} alt="" className="w-10 h-12 object-cover rounded border" />
                      <div>
                        <span className="font-serif font-bold text-silk-black block">{prod.title}</span>
                        <span className="text-[10px] text-silk-black/50">{prod.stateOrigin}</span>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-silk-maroon">{prod.sku}</td>
                    <td className="p-3">{prod.silkType}</td>
                    <td className="p-3">{prod.category}</td>
                    <td className="p-3 font-serif font-bold text-silk-black">{formatPrice(prod.price, currency)}</td>
                    <td className="p-3 font-bold text-silk-emerald">
                      {prod.isSilkMarkCertified ? "✓ Certified" : "No"}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 text-silk-black/40 hover:text-silk-maroon"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-silk-ivory rounded-2xl p-6 max-w-md w-full border border-silk-gold/40 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-silk-maroon border-b border-silk-gold/30 pb-2">
              Add New Silk Garment To Catalog
            </h3>
            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-silk-black block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Golden Assam Muga Saree"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-cream"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-silk-black block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-cream"
                  />
                </div>
                <div>
                  <label className="font-bold text-silk-black block mb-1">Silk Variety</label>
                  <select
                    value={silkType}
                    onChange={(e) => setSilkType(e.target.value)}
                    className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-cream"
                  >
                    <option>Muga Silk</option>
                    <option>Pat Silk</option>
                    <option>Eri Silk</option>
                    <option>Banarasi Katan</option>
                    <option>Kanjeevaram Pure Silk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-silk-black block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-cream"
                >
                  <option>Silk Sarees</option>
                  <option>Mekhela Chador</option>
                  <option>Dupattas</option>
                  <option>Men's Silk Wear</option>
                  <option>Silk Fabrics</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-silk-black/60 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-silk-maroon text-silk-gold font-bold text-xs py-2 px-6 rounded shadow"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
