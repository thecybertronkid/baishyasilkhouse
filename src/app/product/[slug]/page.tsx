"use client";

import React, { useState, useEffect } from "react";
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
import { Product } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const staticProduct = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [product, setProduct] = useState<Product>(staticProduct);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    const fetchProductFromDb = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          const formattedDbProducts: Product[] = data.products.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            tagline: p.tagline,
            subtitle: p.subtitle,
            price: p.price,
            originalPrice: p.originalPrice || p.price,
            discountPercentage: p.discountPercentage || 0,
            category: p.category,
            silkType: p.silkType,
            weavingStyle: p.weavingStyle || "Handloom",
            occasion: p.occasion || "Bridal",
            stateOrigin: p.stateOrigin || "Sualkuchi, Assam",
            rating: p.rating || 5.0,
            reviewCount: p.reviewCount || 0,
            sku: p.sku,
            stock: p.stock || 10,
            inStock: p.inStock ?? true,
            isSilkMarkCertified: p.isSilkMarkCertified ?? true,
            isBestSeller: p.isBestSeller ?? false,
            isNewArrival: p.isNewArrival ?? true,
            isTrending: p.isTrending ?? false,
            isBridal: p.isBridal ?? false,
            dimensions: p.dimensions || "Saree: 5.5m x 1.15m | Blouse: 0.9m",
            weight: p.weight || "750 grams",
            description: p.description,
            story: p.story,
            images: p.images?.length > 0 ? p.images.map((img: any) => img.url) : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"],
            colors: p.colors?.length > 0 ? p.colors : [{ name: "Standard Gold", hex: "#D4AF37" }],
            reviews: p.reviews || [],
          }));

          const matched = formattedDbProducts.find((p) => p.slug === slug || p.id === slug);
          if (matched) {
            setProduct(matched);
          } else {
            const staticMatch = PRODUCTS.find((p) => p.slug === slug);
            if (staticMatch) setProduct(staticMatch);
          }

          setRelatedProducts(formattedDbProducts);
        }
      } catch (err) {
        console.error("Failed to fetch product details from DB:", err);
      }
    };

    fetchProductFromDb();
  }, [slug]);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useCompare();
  const { currency } = useStore();

  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] ? product.colors[0].name : "Standard"
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

  return (
    <div className="bg-silk-ivory min-h-screen font-sans py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Breadcrumb Trail */}
        <nav className="text-xs font-serif uppercase tracking-widest text-silk-black/60 flex items-center gap-2">
          <Link href="/" className="hover:text-silk-maroon transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-silk-maroon transition">
            Shop Catalog
          </Link>
          <span>/</span>
          <span className="text-silk-maroon font-bold line-clamp-1">{product.title}</span>
        </nav>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Product Gallery (Left) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-silk-gold/30 shadow-card bg-silk-cream">
              <img
                src={product.images[selectedImg] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {product.isSilkMarkCertified && (
                <span className="absolute top-4 left-4 bg-silk-ivory/90 backdrop-blur-md text-silk-maroon text-xs font-serif font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-silk-gold/40 shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-silk-gold" /> Silk Mark Certified
                </span>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                      selectedImg === idx ? "border-silk-maroon shadow-md" : "border-silk-gold/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-serif font-bold tracking-[0.25em] text-silk-gold-dark uppercase block">
                {product.silkType} • {product.stateOrigin}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-silk-maroon leading-tight">
                {product.title}
              </h1>
              <p className="text-xs text-silk-black/60 font-light italic">
                {product.subtitle || product.tagline}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between border-y border-silk-gold/20 py-4">
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif font-extrabold text-2xl text-silk-maroon">
                    {formatPrice(product.price, currency)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-silk-black/40 line-through">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="bg-silk-maroon/10 text-silk-maroon text-xs font-bold px-2 py-0.5 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-silk-black/50">Includes all taxes • Complimentary insured express delivery</p>
              </div>

              <div className="flex items-center gap-1 bg-silk-cream px-3 py-1.5 rounded-full border border-silk-gold/30">
                <Star className="w-4 h-4 fill-silk-gold text-silk-gold" />
                <span className="font-serif font-bold text-xs text-silk-black">{product.rating}</span>
                <span className="text-[10px] text-silk-black/50">({product.reviewCount})</span>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-silk-cream p-4 rounded-xl border border-silk-gold/20">
              <div>
                <span className="text-silk-black/50 block">SKU Code</span>
                <span className="font-mono font-bold text-silk-black">{product.sku}</span>
              </div>
              <div>
                <span className="text-silk-black/50 block">Dimensions</span>
                <span className="font-bold text-silk-black">{product.dimensions || "5.5m Saree"}</span>
              </div>
              <div>
                <span className="text-silk-black/50 block">Weaving Style</span>
                <span className="font-bold text-silk-maroon">{product.weavingStyle}</span>
              </div>
              <div>
                <span className="text-silk-black/50 block">Inventory Stock</span>
                <span className={`font-bold ${product.stock <= 5 ? "text-amber-600" : "text-silk-emerald"}`}>
                  {product.stock} units in stock
                </span>
              </div>
            </div>

            {/* Custom Blouse Stitching Add-on */}
            <div className="bg-silk-cream p-4 rounded-xl border border-silk-gold/20 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={customBlouse}
                    onChange={(e) => setCustomBlouse(e.target.checked)}
                    className="rounded accent-silk-maroon"
                  />
                  <span className="font-serif font-bold text-xs text-silk-black uppercase">
                    Custom Master Tailor Blouse Stitching (+₹1,500)
                  </span>
                </div>
              </label>
              <p className="text-[11px] text-silk-black/60 pl-6">
                Our in-house Sualkuchi tailors will stitch a custom blouse padded with silk lining tailored to your measurements.
              </p>
            </div>

            {/* Actions (Add to Bag, Wishlist, Compare) */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className={`w-full font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl shadow-luxury transition flex items-center justify-center gap-2 ${
                  added ? "bg-silk-emerald text-silk-ivory" : "bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Shopping Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`py-3 px-4 rounded-lg text-xs font-serif uppercase tracking-wider font-bold border transition flex items-center justify-center gap-2 ${
                    isInWishlist(product.id)
                      ? "bg-silk-maroon text-silk-gold border-silk-maroon"
                      : "bg-silk-ivory text-silk-black border-silk-gold/30 hover:border-silk-gold"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} /> Wishlist
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className={`py-3 px-4 rounded-lg text-xs font-serif uppercase tracking-wider font-bold border transition flex items-center justify-center gap-2 ${
                    isInCompare(product.id)
                      ? "bg-silk-emerald text-silk-ivory border-silk-emerald"
                      : "bg-silk-ivory text-silk-black border-silk-gold/30 hover:border-silk-gold"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" /> Compare
                </button>
              </div>
            </div>

            {/* PIN Code Delivery Estimator */}
            <div className="bg-silk-cream p-4 rounded-xl border border-silk-gold/20 space-y-3">
              <label className="font-serif font-bold text-xs text-silk-maroon uppercase flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-silk-gold" /> Check Delivery & Pincode Speed
              </label>
              <form onSubmit={handleCheckDelivery} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 781001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="flex-1 bg-silk-ivory border border-silk-gold/30 rounded px-3 py-2 text-xs focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-silk-maroon text-silk-gold font-bold text-xs uppercase tracking-wider px-4 py-2 rounded"
                >
                  Check
                </button>
              </form>

              {deliveryResult && (
                <div className="text-xs font-semibold text-silk-emerald pt-1">
                  ✓ Delivery available by {deliveryResult.dateString} via Insured Express Courier.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Description, Craft, Care, Reviews) */}
        <div className="bg-silk-ivory rounded-2xl border border-silk-gold/20 p-8 shadow-card space-y-6">
          <div className="flex border-b border-silk-gold/20 gap-8 font-serif text-xs uppercase tracking-widest font-bold">
            {[
              { id: "desc", label: "Craftsmanship & Description" },
              { id: "craft", label: "Heritage Loom Story" },
              { id: "care", label: "Silk Maintenance" },
              { id: "reviews", label: `Patron Reviews (${product.reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 transition border-b-2 ${
                  activeTab === tab.id
                    ? "border-silk-maroon text-silk-maroon font-extrabold"
                    : "border-transparent text-silk-black/50 hover:text-silk-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pt-2 text-xs sm:text-sm text-silk-black/80 leading-relaxed font-sans">
            {activeTab === "desc" && <p>{product.description}</p>}
            {activeTab === "craft" && <p>{product.story || "Handwoven in Sualkuchi by generational master weavers."}</p>}
            {activeTab === "care" && (
              <ul className="list-disc pl-5 space-y-1">
                {(product.careInstructions || [
                  "Dry clean only by pure silk specialist",
                  "Store wrapped in breathable un-dyed muslin cloth",
                  "Press on low silk heat with protective press cloth",
                ]).map((ci, i) => (
                  <li key={i}>{ci}</li>
                ))}
              </ul>
            )}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {product.reviews.length === 0 ? (
                  <p className="italic text-silk-black/60">No reviews yet for this masterpiece. Be the first to leave a review!</p>
                ) : (
                  product.reviews.map((r, i) => (
                    <div key={i} className="bg-silk-cream p-4 rounded-xl border border-silk-gold/20 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-silk-maroon">{r.userName}</span>
                        <div className="flex text-silk-gold text-xs">
                          {[...Array(r.rating || 5)].map((_, idx) => (
                            <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-bold text-xs text-silk-black">{r.title}</h4>
                      <p className="text-xs text-silk-black/70">{r.comment}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="space-y-6">
          <div className="border-b border-silk-gold/20 pb-4">
            <span className="text-[10px] font-serif font-bold tracking-[0.3em] text-silk-gold-dark uppercase block">
              YOU MAY ALSO ADMIRE
            </span>
            <h2 className="font-serif text-2xl font-bold text-silk-maroon uppercase tracking-wide">
              Complementary Silk Masterpieces
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
