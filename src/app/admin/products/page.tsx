"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Plus,
  Search,
  Trash2,
  Package,
  RefreshCw,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  Tag,
  Info,
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

  // High-Detail New Product Form State
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    subtitle: "",
    price: "",
    originalPrice: "",
    stock: "10",
    sku: "",
    category: "Silk Sarees",
    silkType: "Muga Silk",
    weavingStyle: "Handloom Jacquard",
    occasion: "Bridal",
    stateOrigin: "Sualkuchi, Assam",
    dimensions: "Saree: 5.5m x 1.15m | Blouse: 0.9m",
    weight: "750 grams",
    description: "",
    story: "",
    isSilkMarkCertified: true,
    isBestSeller: false,
    isNewArrival: true,
    isBridal: false,
    blouseIncluded: true,
  });

  // Uploaded Image Base64 Data URLs
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");

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

  // Handle direct file uploads & convert to Base64 data URLs for database storage
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add external image URL
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setUploadedImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput("");
  };

  // Remove image from preview
  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    setSaving(true);
    try {
      const payload = {
        ...formData,
        images: uploadedImages,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setIsAddModalOpen(false);
        setUploadedImages([]);
        setFormData({
          title: "",
          tagline: "",
          subtitle: "",
          price: "",
          originalPrice: "",
          stock: "10",
          sku: "",
          category: "Silk Sarees",
          silkType: "Muga Silk",
          weavingStyle: "Handloom Jacquard",
          occasion: "Bridal",
          stateOrigin: "Sualkuchi, Assam",
          dimensions: "Saree: 5.5m x 1.15m | Blouse: 0.9m",
          weight: "750 grams",
          description: "",
          story: "",
          isSilkMarkCertified: true,
          isBestSeller: false,
          isNewArrival: true,
          isBridal: false,
          blouseIncluded: true,
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
    if (!confirm("Are you sure you want to delete this product from the database?")) return;

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
              SHOPIFY INVENTORY & CATALOG ENGINE
            </span>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon uppercase tracking-wide">
              Product Catalog ({products.length} SKUs)
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
              className="bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded transition flex items-center gap-2 shadow-luxury"
            >
              <Plus className="w-4 h-4" /> Add Detailed Product
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-silk-ivory p-4 rounded-xl border border-silk-gold/20 flex items-center gap-3 shadow-sm">
          <Search className="w-4 h-4 text-silk-gold" />
          <input
            type="text"
            placeholder="Search catalog by title, SKU, silk variety, or category..."
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
                  <th className="py-3.5 px-4">Product Details</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Silk Variety</th>
                  <th className="py-3.5 px-4">Selling / Compare Price</th>
                  <th className="py-3.5 px-4">Inventory Stock</th>
                  <th className="py-3.5 px-4">Silk Mark</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silk-gold/10">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-silk-black/60 italic">
                      No products found. Click "Add Detailed Product" to create one!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-silk-beige/30 transition">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={product.images?.[0]?.url || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"}
                          alt={product.title}
                          className="w-11 h-14 object-cover rounded border border-silk-gold/20 flex-shrink-0"
                        />
                        <div>
                          <div className="font-serif font-bold text-silk-black line-clamp-1 text-xs sm:text-sm">
                            {product.title}
                          </div>
                          <div className="text-[10px] text-silk-gold-dark font-semibold">
                            {product.category} • {product.weavingStyle || "Handloom"}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-silk-black/70">
                        {product.sku}
                      </td>

                      <td className="py-3.5 px-4 font-serif text-silk-maroon font-bold">
                        {product.silkType}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-serif font-bold text-silk-black">
                          {formatPrice(product.price, currency)}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="text-[10px] text-silk-black/40 line-through">
                            {formatPrice(product.originalPrice, currency)} ({product.discountPercentage}% OFF)
                          </div>
                        )}
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

        {/* Detailed High-End Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-silk-ivory rounded-2xl border border-silk-gold/30 w-full max-w-3xl shadow-2xl max-h-[90vh] flex flex-col animate-fadeIn">
              {/* Modal Header */}
              <div className="p-6 border-b border-silk-gold/20 flex items-center justify-between flex-shrink-0">
                <div>
                  <span className="text-[10px] font-serif font-bold uppercase tracking-[0.3em] text-silk-gold-dark block">
                    SHOPIFY INVENTORY CATALOG
                  </span>
                  <h3 className="font-serif text-xl font-bold text-silk-maroon uppercase tracking-wide">
                    Add Detailed Silk Product to Database
                  </h3>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="text-silk-black hover:text-silk-gold">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body - Scrollable Form */}
              <form onSubmit={handleCreateProduct} className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
                {/* 1. Direct Image Upload Section */}
                <div className="space-y-3 bg-silk-cream p-4 rounded-xl border border-silk-gold/20">
                  <div className="flex items-center justify-between">
                    <label className="font-serif font-bold text-silk-maroon uppercase flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-silk-gold" /> Direct Product Image Upload (Saved directly in Database)
                    </label>
                    <span className="text-[10px] text-silk-black/50">{uploadedImages.length} Images Attached</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Upload Box */}
                    <label className="border-2 border-dashed border-silk-gold/40 hover:border-silk-gold rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-silk-ivory transition h-28">
                      <Upload className="w-6 h-6 text-silk-gold mb-1" />
                      <span className="text-[10px] font-bold text-silk-maroon uppercase">Upload Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Uploaded Base64 Image Thumbnails */}
                    {uploadedImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden border border-silk-gold/30 h-28">
                        <img src={img} alt={`Uploaded preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-silk-maroon text-silk-gold p-1 rounded-full opacity-90 hover:opacity-100 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* External Image URL Fallback */}
                  <div className="flex gap-2 pt-2">
                    <input
                      type="url"
                      placeholder="Or paste external image URL (e.g. https://images.unsplash.com/...)"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="flex-1 bg-silk-ivory border border-silk-gold/30 rounded p-2 text-silk-black focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="bg-silk-gold text-silk-black font-bold px-3 py-2 rounded uppercase tracking-wider text-[10px]"
                    >
                      Attach URL
                    </button>
                  </div>
                </div>

                {/* 2. Product Basic Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                      Product Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Golden Assam Muga Silk Saree with Kingkhap Zari Pallu"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-serif font-bold text-silk-black uppercase mb-1">Tagline</label>
                      <input
                        type="text"
                        placeholder="e.g. Natural Golden Luster • Handwoven in Sualkuchi"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-serif font-bold text-silk-black uppercase mb-1">Subtitle</label>
                      <input
                        type="text"
                        placeholder="e.g. 100% Pure Assam Muga Silk with 24K Real Zari Work"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Pricing & Compare at Price */}
                <div className="bg-silk-cream p-4 rounded-xl border border-silk-gold/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-serif font-bold text-silk-maroon uppercase mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="88500"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-silk-ivory border border-silk-gold/30 rounded p-2.5 text-silk-black font-serif font-bold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                      Compare at Price / MRP (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="105000"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="w-full bg-silk-ivory border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full bg-silk-ivory border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Categorization & Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      <option value="Silk Fabrics">Silk Fabrics</option>
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
                      <option value="Kanjeevaram Pure Silk">Kanjeevaram Pure Silk</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">Weaving Style</label>
                    <input
                      type="text"
                      placeholder="e.g. Handloom Jacquard"
                      value={formData.weavingStyle}
                      onChange={(e) => setFormData({ ...formData, weavingStyle: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">SKU Code</label>
                    <input
                      type="text"
                      placeholder="BSH-MUGA-001"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">Dimensions</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">Garment Weight</label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none"
                    />
                  </div>
                </div>

                {/* 5. Detailed Descriptions & Heritage Story */}
                <div className="space-y-4">
                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                      Full Product Description (Craftsmanship & Pallu Details)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Handcrafted from 100% pure Assam Muga silk... Famous for its natural shimmering golden luster..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-serif font-bold text-silk-black uppercase mb-1">
                      Heritage Loom Story (Artisan History)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Muga silk enjoys a Geographical Indication (GI) tag and was historically reserved for Ahom Royalty..."
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      className="w-full bg-silk-cream border border-silk-gold/30 rounded p-2.5 text-silk-black focus:outline-none font-sans"
                    />
                  </div>
                </div>

                {/* 6. Feature Badges & Checks */}
                <div className="flex flex-wrap gap-6 bg-silk-beige/50 p-4 rounded-xl border border-silk-gold/20">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isSilkMarkCertified}
                      onChange={(e) => setFormData({ ...formData, isSilkMarkCertified: e.target.checked })}
                      className="rounded accent-silk-maroon"
                    />
                    <span className="font-bold text-silk-black">Silk Mark Certified</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBridal}
                      onChange={(e) => setFormData({ ...formData, isBridal: e.target.checked })}
                      className="rounded accent-silk-maroon"
                    />
                    <span className="font-bold text-silk-black">Bridal Exclusive</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      className="rounded accent-silk-maroon"
                    />
                    <span className="font-bold text-silk-black">Best Seller</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isNewArrival}
                      onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                      className="rounded accent-silk-maroon"
                    />
                    <span className="font-bold text-silk-black">New Arrival</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.blouseIncluded}
                      onChange={(e) => setFormData({ ...formData, blouseIncluded: e.target.checked })}
                      className="rounded accent-silk-maroon"
                    />
                    <span className="font-bold text-silk-black">Blouse Included</span>
                  </label>
                </div>

                {/* Modal Footer Buttons */}
                <div className="pt-4 flex justify-end gap-4 border-t border-silk-gold/20">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2.5 text-silk-black hover:underline font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-lg shadow-luxury transition"
                  >
                    {saving ? "Saving to Database..." : "Save Product to Database"}
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
