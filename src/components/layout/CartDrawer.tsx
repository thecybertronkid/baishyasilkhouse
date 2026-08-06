"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, Gift, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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
  const [inputCoupon, setInputCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg({ success: res.success, text: res.message });
  };

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-silk-ivory h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="bg-silk-maroon text-silk-ivory p-4 flex items-center justify-between border-b border-silk-gold/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-silk-gold" />
            <h3 className="font-serif font-bold text-lg text-silk-gold-light tracking-wide">
              Your Silk Bag ({cart.length})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:text-silk-gold transition"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-silk-beige p-3 border-b border-silk-gold/20 text-xs">
          {subtotal >= freeShippingThreshold ? (
            <p className="text-silk-emerald font-bold text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4" /> You've unlocked FREE Insured Express Shipping!
            </p>
          ) : (
            <div>
              <p className="text-silk-black/80 font-medium text-center">
                Add <span className="font-bold text-silk-maroon">{formatPrice(freeShippingThreshold - subtotal, currency)}</span> more to unlock FREE shipping
              </p>
              <div className="w-full bg-silk-sand h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-silk-gold h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-silk-gold/20">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 bg-silk-beige rounded-full flex items-center justify-center mx-auto text-silk-maroon/40">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-silk-black">Your cart is empty</h4>
              <p className="text-xs text-silk-black/60 max-w-xs mx-auto">
                Explore our handwoven Assam Muga & Pat Silk collections to begin your heritage shopping.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 inline-block bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs px-6 py-2.5 rounded transition shadow"
              >
                Browse Shop Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="pt-4 flex gap-3 items-start">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-24 object-cover rounded border border-silk-gold/30 flex-shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-silk-maroon">
                    {item.product.silkType}
                  </span>
                  <h5 className="font-serif text-xs font-bold text-silk-black line-clamp-1">
                    {item.product.title}
                  </h5>
                  {item.selectedColor && (
                    <p className="text-[11px] text-silk-black/60">Color: {item.selectedColor}</p>
                  )}
                  {item.customBlouse && (
                    <p className="text-[10px] text-silk-emerald font-semibold">
                      + Custom Tailored Blouse Stitching (+₹1,200)
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-silk-gold/40 rounded bg-silk-cream">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-silk-black hover:text-silk-maroon"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-silk-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-silk-black hover:text-silk-maroon"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-xs text-silk-maroon">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-silk-black/40 hover:text-silk-maroon p-1"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="bg-silk-cream p-4 border-t border-silk-gold/30 space-y-3">
            {/* Gift Wrap Toggle */}
            <label className="flex items-center justify-between text-xs font-medium cursor-pointer p-2 bg-silk-ivory rounded border border-silk-gold/20">
              <span className="flex items-center gap-1.5 text-silk-black">
                <Gift className="w-4 h-4 text-silk-gold" /> Add Luxury Wooden Gift Box (+₹250)
              </span>
              <input
                type="checkbox"
                checked={isGiftWrapped}
                onChange={toggleGiftWrap}
                className="rounded accent-silk-maroon w-4 h-4"
              />
            </label>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. SILK10)"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                className="flex-1 text-xs px-3 py-1.5 border border-silk-gold/40 rounded bg-silk-ivory uppercase focus:outline-none focus:border-silk-gold"
              />
              <button
                type="submit"
                className="bg-silk-maroon text-silk-gold hover:bg-silk-maroon-dark font-bold text-xs px-3 py-1.5 rounded transition"
              >
                Apply
              </button>
            </form>
            {couponMsg && (
              <p
                className={`text-[11px] font-semibold ${
                  couponMsg.success ? "text-silk-emerald" : "text-silk-maroon"
                }`}
              >
                {couponMsg.text}
              </p>
            )}
            {couponCode && (
              <div className="flex items-center justify-between text-xs text-silk-emerald font-bold bg-silk-emerald/10 p-1.5 rounded">
                <span>Coupon ({couponCode}) Applied</span>
                <button onClick={removeCoupon} className="text-silk-maroon hover:underline text-[10px]">
                  Remove
                </button>
              </div>
            )}

            {/* Subtotal Calculations */}
            <div className="space-y-1 text-xs pt-1 border-t border-silk-gold/20">
              <div className="flex justify-between text-silk-black/70">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-silk-emerald font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              {isGiftWrapped && (
                <div className="flex justify-between text-silk-black/70">
                  <span>Wooden Gift Packaging</span>
                  <span>+{formatPrice(giftWrapFee, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-silk-black/70">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : formatPrice(shippingFee, currency)}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-silk-maroon pt-2 border-t border-silk-gold/30">
                <span>Total Payable</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-gradient-to-r from-silk-gold to-silk-gold-dark text-silk-black hover:from-silk-gold-light hover:to-silk-gold font-bold text-sm py-3 px-4 rounded shadow-md flex items-center justify-center gap-2 transition"
            >
              Proceed to Luxury Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
