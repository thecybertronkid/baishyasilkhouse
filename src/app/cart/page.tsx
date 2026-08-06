"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { Trash2, Plus, Minus, Gift, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    giftWrapFee,
    shippingFee,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    isGiftWrapped,
    toggleGiftWrap,
  } = useCart();

  const { currency } = useStore();
  const [couponInput, setCouponInput] = useState("");
  const [msg, setMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setMsg({ success: res.success, text: res.message });
  };

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="border-b border-silk-gold/30 pb-4">
          <h1 className="font-serif text-3xl font-bold text-silk-maroon">Your Shopping Bag</h1>
          <p className="text-xs text-silk-black/70 mt-1">Review your selected silk masterpieces before proceeding to luxury checkout.</p>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center bg-silk-cream rounded-2xl border border-silk-gold/30 p-8 space-y-4 max-w-md mx-auto">
            <Sparkles className="w-12 h-12 text-silk-gold mx-auto" />
            <h3 className="font-serif text-xl font-bold text-silk-black">Your shopping bag is currently empty</h3>
            <p className="text-xs text-silk-black/60">Explore our handwoven Muga Silk & Mekhela Chador collections.</p>
            <Link
              href="/shop"
              className="inline-block bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs px-8 py-3 rounded shadow transition"
            >
              Browse Shop Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-silk-cream rounded-xl p-4 border border-silk-gold/30 shadow-card flex flex-col sm:flex-row gap-4 items-center justify-between"
                >
                  <div className="flex gap-4 items-center w-full sm:w-auto">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-20 h-24 object-cover rounded border border-silk-gold/30 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-silk-maroon tracking-wider">
                        {item.product.silkType}
                      </span>
                      <h3 className="font-serif font-bold text-sm text-silk-black">{item.product.title}</h3>
                      {item.selectedColor && (
                        <p className="text-xs text-silk-black/60">Color: {item.selectedColor}</p>
                      )}
                      {item.customBlouse && (
                        <span className="text-[10px] text-silk-emerald font-bold block">
                          + Custom Tailored Blouse Stitching (+₹1,200)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-silk-gold/20">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-silk-gold/40 rounded bg-silk-ivory">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-silk-black hover:text-silk-maroon"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-silk-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-silk-black hover:text-silk-maroon"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-serif font-bold text-sm text-silk-maroon">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-silk-black/40 hover:text-silk-maroon p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-silk-cream rounded-xl p-6 border border-silk-gold/30 shadow-card space-y-4">
                <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2">
                  Order Summary
                </h3>

                {/* Gift Wrap Toggle */}
                <label className="flex items-center justify-between text-xs font-medium cursor-pointer p-2.5 bg-silk-ivory rounded border border-silk-gold/20">
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-silk-gold" /> Add Luxury Wooden Gift Box (+₹250)
                  </span>
                  <input
                    type="checkbox"
                    checked={isGiftWrapped}
                    onChange={toggleGiftWrap}
                    className="rounded accent-silk-maroon w-4 h-4"
                  />
                </label>

                {/* Promo Code */}
                <form onSubmit={handleCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. SILK10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory uppercase"
                  />
                  <button type="submit" className="bg-silk-maroon text-silk-gold font-bold text-xs px-4 py-2 rounded">
                    Apply
                  </button>
                </form>
                {msg && (
                  <p className={`text-[11px] font-bold ${msg.success ? "text-silk-emerald" : "text-silk-maroon"}`}>
                    {msg.text}
                  </p>
                )}
                {couponCode && (
                  <div className="flex items-center justify-between text-xs text-silk-emerald font-bold bg-silk-emerald/10 p-2 rounded">
                    <span>Applied ({couponCode})</span>
                    <button onClick={removeCoupon} className="text-silk-maroon hover:underline text-[10px]">
                      Remove
                    </button>
                  </div>
                )}

                {/* Totals Breakdown */}
                <div className="space-y-2 text-xs pt-2 border-t border-silk-gold/20">
                  <div className="flex justify-between text-silk-black/70">
                    <span>Bag Subtotal</span>
                    <span>{formatPrice(subtotal, currency)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-silk-emerald font-semibold">
                      <span>Promo Discount</span>
                      <span>-{formatPrice(discountAmount, currency)}</span>
                    </div>
                  )}
                  {isGiftWrapped && (
                    <div className="flex justify-between text-silk-black/70">
                      <span>Wooden Packaging</span>
                      <span>+{formatPrice(giftWrapFee, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-silk-black/70">
                    <span>Insured Shipping</span>
                    <span>{shippingFee === 0 ? "FREE" : formatPrice(shippingFee, currency)}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-silk-maroon pt-3 border-t border-silk-gold/30">
                    <span>Total Amount</span>
                    <span>{formatPrice(total, currency)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-silk-gold to-silk-gold-dark text-silk-black hover:from-silk-gold-light hover:to-silk-gold font-bold text-sm py-3.5 px-4 rounded shadow-luxury flex items-center justify-center gap-2 transition"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-silk-emerald font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4 text-silk-gold" /> 100% Silk Mark Authenticity Guaranteed
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
