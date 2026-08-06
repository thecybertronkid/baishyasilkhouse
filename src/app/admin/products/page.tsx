"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  X,
  Package,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";

export default function AdminProductsPage() {
  const { currency } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // New Product Form State
  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    price: "",
    originalPrice: "",
    stock: "10",
    category: "Silk Sarees",
    silkType: "Muga Silk",
    imageUrl: "",
    isSilkMarkCertified: true,
    isBestSeller: false,
    isBridal: false,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    setSaving(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        setFormData({
          title: "",
          sku: "",
          price: "",
          originalPrice: "",
          stock: "10",
          category: "Silk Sarees",
          silkType: "Muga Silk",
          imageUrl: "",
          isSilkMarkCertified: true,
          isBestSeller: false,
          isBridal: false,
        });
        fetchProducts();
      }
    } catch (err) {
      console.error("Error creating product:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product from database?")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleStockUpdate = async (id: string, currentStock: number, delta: number) => {
    const newStock = Math.max(0, currentStock + delta);
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stock: newStock }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (err) {
      console.error("Error updating stock:", err);
    }
  };

  return (
    <div className="min-h-screen bg-silk-cream font-sans flex">
      <AdminSidebar activeTab="products" />

      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-silk-gold/20 pb-6">
          <div>
            <span className="text-[10px] font-serif font-bold uppercase tracking-[0.3em] text-silk-gold-dark block">
              SHOPIFY INVENTORY ENGINE
            </span>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon uppercase tracking-wide">
              Product & Stock Control ({products.length} SKUs)
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchProducts}
              className="bg-silk-ivory border border-silk-gold/30 text-silk-black hover:border-silk-gold font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded transition flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-silk-gold" /> Sync
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded transition flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4" /> Add New Silk Saree
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-silk-ivory p-4 rounded-xl border border-silk-gold/20 flex items-center gap-3 shadow-sm">
          <Search className="w-4 h-4 text-silk-gold" />
          <input
            type="text"
            placeholder="Search catalog by product title, SKU, or silk type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-silk-black focus:outline-none"
          />
        </div>

        {/* Products Table */}
        <div className="bg-silk-ivory rounded-xl border border-silk-gold/20 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-silk-gold/20 text-[10px] font-serif uppercase tracking-widest text-silk-black/60 bg-silk-beige/50">
                  <th className="py-3.5 px-4">Item</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Silk Type</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Inventory Stock</th>
                  <th className="py-3.5 px-4">Silk Mark</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silk-gold/10">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-silk-black/60 italic">
                      No products found matching query.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-silk-beige/30 transition">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"}
                          alt={product.title}
                          className="w-10 h-12 object-cover rounded border border-silk-gold/20"
                        />
                        <div>
                          <div className="font-serif font-bold text-silk-black line-clamp-1">
                            {product.title}
                          </div>
                          <span className="text-[10px] text-silk-gold-dark font-semibold">
                            {product.category}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-silk-black/70">
                        {product.sku}
                      </td>

                      <td className="py-3.5 px-4 font-serif text-silk-maroon font-bold">
                        {product.silkType}
                      </td>

                      <td className="py-3.5 px-4 font-serif font-bold text-silk-black">
                        {formatPrice(product.price, currency)}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              product.stock <= 5 ? "text-amber-600" : "text-silk-emerald"
                            }`}
                          >
                            {product.stock} units
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStockUpdate(product.id, product.stock, -1)}
                              className="w-5 h-5 bg-silk-beige border border-silk-gold/30 rounded text-silk-black hover:bg-silk-maroon hover:text-silk-gold flex items-center justify-center font-bold text-xs"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleStockUpdate(product.id, product.stock, 1)}
                              className="w-5 h-5 bg-silk-beige border border-silk-gold/30 rounded text-silk-black hover:bg-silk-maroon hover:text-silk-gold flex items-center justify-center font-bold text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {product.isSilkMarkCertified ? (
                          <span className="bg-silk-emerald/10 text-silk-emerald text-[9px] font-bold px-2 py-0.5 rounded border border-silk-emerald/30">
                            CERTIFIED
                          </span>
                        ) : (
                          <span className="text-silk-black/40 text-[10px]">Standard</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 text-silk-maroon hover:bg-silk-maroon hover:text-silk-gold rounded transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-silk-ivory rounded-xl border border-silk-gold/30 w-full max-w-lg shadow-2xl p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-silk-gold/20 pb-3">
                <h3 className="font-serif text-lg font-bold text-silk-maroon uppercase tracking-wide">
                  Add New Silk Product to Database
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-silk-black hover:text-silk-gold">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-serif font-bold text-silk-black uppercase mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Imperial Crimson Assam Muga Silk Saree"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      placeholder="85000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    >
                      <option value="Silk Sarees">Silk Sarees</option>
                      <option value="Mekhela Chador">Mekhela Chador</option>
                      <option value="Men's Silk Wear">Men's Silk Wear</option>
                      <option value="Dupattas & Stoles">Dupattas & Stoles</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">Silk Variety</label>
                    <select
                      value={formData.silkType}
                      onChange={(e) => setFormData({ ...formData, silkType: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    >
                      <option value="Muga Silk">Muga Silk (Golden)</option>
                      <option value="Pat Silk">Pat Silk (Mulberry)</option>
                      <option value="Eri Silk">Eri Silk (Ahimsa)</option>
                      <option value="Banarasi Katan">Banarasi Katan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-serif font-bold text-silk-black uppercase mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSilkMarkCertified}
                      onChange={(e) => setFormData({ ...formData, isSilkMarkCertified: e.target.checked })}
                      className="rounded accent-silk-maroon"
                    />
                    <span>Silk Mark Certified</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBridal}
                      onChange={(e) => setFormData({ ...formData, isBridal: e.target.checked })}
                      className="rounded accent-silk-maroon"
                    />
                    <span>Bridal Exclusive</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-silk-black hover:underline font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded shadow"
                  >
                    {saving ? "Saving to Database..." : "Save Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
