"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import {
  ShieldCheck,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Star,
  Check,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Play,
  Rotate3d,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useStore } from "@/context/StoreContext";
import { formatPrice, calculateEstimatedDelivery } from "@/lib/utils";
import { ProductCard } from "@/components/shop/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { currency } = useStore();

  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0] ? product.colors[0].name : ""
  );
  const [customBlouse, setCustomBlouse] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState<{
    deliverable: boolean;
    dateString: string;
    expressAvailable: boolean;
  } | null>(null);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "craft" | "care" | "reviews">("desc");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [is360Active, setIs360Active] = useState(false);

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateEstimatedDelivery(pincode);
    setDeliveryResult(res);
  };

  const handleAddToCart = () => {
    addToCart(product, 1, selectedColor, customBlouse);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.silkType === product.silkType).slice(0, 4);

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-silk-black/60 font-serif flex items-center gap-2">
          <Link href="/" className="hover:text-silk-maroon">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-silk-maroon">Shop Catalog</Link>
          <span>/</span>
          <Link href={`/shop?silk=${encodeURIComponent(product.silkType)}`} className="hover:text-silk-maroon">{product.silkType}</Link>
          <span>/</span>
          <span className="text-silk-maroon font-bold truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Primary Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] bg-silk-beige rounded-2xl overflow-hidden shadow-card border border-silk-gold/30">
              <img
                src={product.images[selectedImg] || product.images[0]}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  is360Active ? "animate-pulse" : ""
                }`}
              />

              {/* Silk Mark Seal Badge */}
              {product.isSilkMarkCertified && (
                <div className="absolute top-4 left-4 bg-silk-gold text-silk-black font-extrabold text-xs px-3 py-1 rounded shadow-md flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-silk-maroon" /> 100% Silk Mark Certified
                </div>
              )}

              {/* 360 & Video Overlay Triggers */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setIs360Active(!is360Active)}
                  className={`px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-bold shadow flex items-center gap-1 transition ${
                    is360Active ? "bg-silk-maroon text-silk-gold" : "bg-silk-ivory/90 text-silk-maroon hover:bg-silk-gold"
                  }`}
                >
                  <Rotate3d className="w-4 h-4" /> 360° Loom View
                </button>
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-3 py-1.5 rounded-full bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark backdrop-blur-md text-xs font-bold shadow flex items-center gap-1 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Loom Video
                </button>
              </div>
            </div>

            {/* Thumbnail Selector */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImg(idx);
                    setIs360Active(false);
                  }}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                    selectedImg === idx ? "border-silk-maroon scale-105 shadow" : "border-silk-gold/30 opacity-70"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 border-b border-silk-gold/30 pb-4">
              <span className="text-xs uppercase font-bold tracking-widest text-silk-maroon bg-silk-gold/20 px-2.5 py-1 rounded">
                {product.silkType} • {product.weavingStyle}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-silk-black mt-2">
                {product.title}
              </h1>
              <p className="text-xs text-silk-black/70 italic font-serif">{product.subtitle}</p>

              {/* Ratings */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-silk-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-silk-maroon">{product.rating}</span>
                <span className="text-xs text-silk-black/60">({product.reviewCount} Verified Reviews)</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif font-extrabold text-3xl text-silk-maroon">
                  {formatPrice(product.price, currency)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-silk-black/40 line-through">
                    {formatPrice(product.originalPrice, currency)}
                  </span>
                )}
                {product.discountPercentage > 0 && (
                  <span className="text-xs bg-silk-emerald text-silk-ivory font-bold px-2 py-0.5 rounded">
                    SAVE {product.discountPercentage}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-silk-black/60">Inclusive of all handcrafted luxury taxes & Silk Mark certification.</p>
            </div>

            {/* Color Swatch Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-serif font-bold text-silk-black block">
                  Color Option: <span className="font-sans font-normal text-silk-maroon">{selectedColor}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border-2 transition ${
                        selectedColor === c.name ? "border-silk-maroon scale-110 shadow-md" : "border-silk-gold/40"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Custom Blouse Stitching */}
            {product.blouseIncluded && (
              <label className="flex items-center justify-between p-3 rounded-lg bg-silk-beige border border-silk-gold/30 cursor-pointer text-xs font-medium text-silk-black">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-silk-gold" /> Add Custom Tailored Blouse Stitching (+₹1,200)
                </span>
                <input
                  type="checkbox"
                  checked={customBlouse}
                  onChange={(e) => setCustomBlouse(e.target.checked)}
                  className="rounded accent-silk-maroon w-4 h-4"
                />
              </label>
            )}

            {/* Main Primary Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 font-bold text-sm py-4 px-6 rounded-lg shadow-luxury transition flex items-center justify-center gap-2 ${
                    added
                      ? "bg-silk-emerald text-silk-ivory"
                      : "bg-gradient-to-r from-silk-gold to-silk-gold-dark text-silk-black hover:from-silk-gold-light hover:to-silk-gold"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" /> Added to Shopping Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" /> Add to Shopping Bag
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-lg border transition ${
                    isInWishlist(product.id)
                      ? "bg-silk-maroon text-silk-ivory border-silk-maroon"
                      : "bg-silk-ivory text-silk-maroon border-silk-gold/40 hover:border-silk-maroon"
                  }`}
                  title="Add to Wishlist"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className={`p-4 rounded-lg border transition ${
                    isInCompare(product.id)
                      ? "bg-silk-emerald text-silk-ivory border-silk-emerald"
                      : "bg-silk-ivory text-silk-maroon border-silk-gold/40 hover:border-silk-maroon"
                  }`}
                  title="Compare Specs"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              </div>

              <Link
                href="/checkout"
                onClick={() => addToCart(product)}
                className="w-full block text-center bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-sm py-3.5 px-6 rounded-lg shadow transition"
              >
                Buy Now with Express Delivery
              </Link>
            </div>

            {/* PIN Code Delivery Estimator */}
            <div className="bg-silk-cream p-4 rounded-xl border border-silk-gold/30 space-y-2">
              <span className="text-xs font-serif font-bold text-silk-black flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-silk-gold" /> Check Delivery Estimate
              </span>
              <form onSubmit={handleCheckDelivery} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN code (e.g. 781005)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="flex-1 text-xs px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory focus:outline-none focus:border-silk-gold"
                />
                <button
                  type="submit"
                  className="bg-silk-maroon text-silk-gold font-bold text-xs px-4 py-2 rounded"
                >
                  Check
                </button>
              </form>
              {deliveryResult && (
                <p className="text-xs font-semibold text-silk-emerald pt-1">
                  🚚 Expected Delivery: <span className="font-bold">{deliveryResult.dateString}</span>
                </p>
              )}
            </div>

            {/* Specs & Attributes */}
            <div className="text-xs space-y-1.5 pt-2 border-t border-silk-gold/20 text-silk-black/80">
              <div className="flex justify-between">
                <span className="font-bold">SKU Code:</span>
                <span>{product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Loom Origin:</span>
                <span>{product.stateOrigin}</span>
              </div>
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="font-bold">Dimensions:</span>
                  <span>{product.dimensions}</span>
                </div>
              )}
              {product.weight && (
                <div className="flex justify-between">
                  <span className="font-bold">Garment Weight:</span>
                  <span>{product.weight}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabbed Product Details: Description, Craft, Care, Reviews */}
        <div className="bg-silk-cream rounded-2xl border border-silk-gold/30 overflow-hidden shadow-card">
          <div className="flex border-b border-silk-gold/30 bg-silk-beige overflow-x-auto">
            {[
              { id: "desc", label: "Product Story & Description" },
              { id: "craft", label: "Sualkuchi Heritage Craft" },
              { id: "care", label: "Silk Care Instructions" },
              { id: "reviews", label: `Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-6 font-serif text-xs font-bold uppercase tracking-wider transition border-b-2 flex-shrink-0 ${
                  activeTab === tab.id
                    ? "border-silk-maroon text-silk-maroon bg-silk-ivory"
                    : "border-transparent text-silk-black/60 hover:text-silk-maroon"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 text-silk-black">
            {activeTab === "desc" && (
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed max-w-3xl">
                <h3 className="font-serif text-lg font-bold text-silk-maroon">{product.title}</h3>
                <p>{product.description}</p>
                <div className="p-4 bg-silk-ivory rounded-lg border border-silk-gold/20 italic font-serif text-silk-gold-dark">
                  "{product.story}"
                </div>
              </div>
            )}

            {activeTab === "craft" && (
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed max-w-3xl">
                <h3 className="font-serif text-lg font-bold text-silk-maroon">Sualkuchi Handloom Technique</h3>
                <p>
                  Handwoven by master artisans using traditional wooden throw-shuttle looms in Sualkuchi, Assam. Each motif—including the Kingkhap royal crown and Kaziranga peacock—requires manual loom programming without automated machinery.
                </p>
                <div className="flex items-center gap-2 text-silk-emerald font-bold text-xs">
                  <ShieldCheck className="w-5 h-5 text-silk-gold" /> Includes Official SMOI Silk Mark Hologram Tag
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <div className="space-y-2 text-xs sm:text-sm max-w-3xl">
                <h3 className="font-serif text-lg font-bold text-silk-maroon mb-2">Garment Maintenance Protocol</h3>
                <ul className="list-disc pl-5 space-y-1 text-silk-black/80">
                  {product.careInstructions.map((ci, i) => (
                    <li key={i}>{ci}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6 max-w-3xl">
                <h3 className="font-serif text-lg font-bold text-silk-maroon">Verified Customer Reviews</h3>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-silk-ivory rounded-lg border border-silk-gold/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-xs text-silk-black">{rev.userName}</span>
                        <span className="text-[10px] text-silk-black/50">{rev.date}</span>
                      </div>
                      <div className="flex text-silk-gold">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <h4 className="font-serif font-bold text-xs text-silk-maroon">{rev.title}</h4>
                      <p className="text-xs text-silk-black/80">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-silk-black/60">No reviews written yet. Be the first patron to review!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-silk-maroon">You May Also Admire</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      </div>

      {/* Loom Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-silk-ivory rounded-xl p-4 max-w-2xl w-full text-center space-y-4">
            <h3 className="font-serif font-bold text-lg text-silk-maroon">Sualkuchi Loom Weaving Video</h3>
            <div className="aspect-video bg-silk-black rounded overflow-hidden flex items-center justify-center text-silk-gold">
              <Play className="w-12 h-12 animate-pulse" />
              <span className="text-xs font-serif ml-2">Playing Loom Demonstration Video</span>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="bg-silk-maroon text-silk-gold font-bold text-xs px-6 py-2 rounded"
            >
              Close Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
