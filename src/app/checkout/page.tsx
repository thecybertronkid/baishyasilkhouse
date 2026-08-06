"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/context/StoreContext";
import { ShieldCheck, CheckCircle2, CreditCard, Landmark, Truck, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const { currency } = useStore();

  const [step, setStep] = useState<"address" | "payment" | "success">("address");
  const [paymentMethod, setPaymentMethod] = useState<string>("Razorpay (UPI / GPay / Cards)");

  // Address State
  const [formData, setFormData] = useState({
    fullName: user ? user.name : "Ananya Baishya",
    email: user ? user.email : "ananya@baishyasilk.com",
    phone: user ? user.phone : "+91 98640 12345",
    street: "House No 42, GS Road, Christian Basti",
    city: "Guwahati",
    state: "Assam",
    zipCode: "781005",
    country: "India",
  });

  const [createdOrderNumber, setCreatedOrderNumber] = useState("");

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = () => {
    const orderNum = `BSH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toISOString().split("T")[0],
      totalAmount: total,
      status: "Processing" as const,
      trackingNumber: `DEL-${Math.floor(100000 + Math.random() * 900000)}IN`,
      carrier: "Delhivery Express",
      estimatedDelivery: "3-5 Business Days",
      items: cart.map((item) => ({
        id: `item-${item.product.id}`,
        productId: item.product.id,
        title: item.product.title,
        image: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
      })),
      shippingAddress: { ...formData },
      paymentMethod,
    };

    addOrder(newOrder);
    setCreatedOrderNumber(orderNum);
    clearCart();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="py-20 bg-silk-ivory min-h-screen font-sans flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-silk-cream rounded-2xl p-8 border border-silk-gold/40 shadow-2xl text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 bg-silk-emerald/20 text-silk-emerald rounded-full flex items-center justify-center mx-auto border border-silk-emerald">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-serif font-bold text-silk-gold-dark uppercase tracking-widest block">
            ROYAL PATRON ORDER CONFIRMED
          </span>
          <h1 className="font-serif text-2xl font-bold text-silk-maroon">
            Thank You For Shopping With Us!
          </h1>
          <p className="text-xs text-silk-black/80">
            Your order <span className="font-bold text-silk-maroon">{createdOrderNumber}</span> has been confirmed. A Silk Mark certificate copy and tracking receipt have been dispatched to your email.
          </p>

          <div className="p-4 bg-silk-ivory rounded-lg border border-silk-gold/20 text-left text-xs space-y-1 text-silk-black/70">
            <div className="flex justify-between font-bold text-silk-black">
              <span>Shipping Address:</span>
              <span>{formData.fullName}</span>
            </div>
            <p>{formData.street}, {formData.city}, {formData.state} - {formData.zipCode}</p>
            <p className="pt-1 font-bold text-silk-maroon">Estimated Delivery: 3-5 Business Days</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/track-order"
              className="bg-silk-maroon text-silk-gold font-bold text-xs py-3 px-6 rounded shadow hover:bg-silk-maroon-dark transition"
            >
              Track Order Status
            </Link>
            <Link
              href="/account"
              className="border border-silk-gold/40 text-silk-black hover:border-silk-gold font-bold text-xs py-3 px-6 rounded transition"
            >
              Go to Account Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-silk-ivory min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex items-center justify-between border-b border-silk-gold/30 pb-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-silk-maroon">Checkout</h1>
            <p className="text-xs text-silk-black/70 mt-1">Complete your luxury order details.</p>
          </div>
          <Link href="/cart" className="text-xs font-bold text-silk-maroon hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Step Column */}
          <div className="lg:col-span-8 space-y-6">
            {step === "address" && (
              <form onSubmit={handleAddressSubmit} className="bg-silk-cream rounded-xl p-6 border border-silk-gold/30 shadow-card space-y-4">
                <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2">
                  1. Shipping & Delivery Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-silk-black block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-ivory"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-silk-black block mb-1">Country</label>
                    <input
                      type="text"
                      disabled
                      value={formData.country}
                      className="w-full px-3 py-2 border border-silk-gold/30 rounded bg-silk-beige"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-silk-maroon text-silk-gold font-bold text-xs py-3 px-8 rounded hover:bg-silk-maroon-dark transition"
                  >
                    Proceed to Payment Options
                  </button>
                </div>
              </form>
            )}

            {step === "payment" && (
              <div className="bg-silk-cream rounded-xl p-6 border border-silk-gold/30 shadow-card space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-silk-gold/20 pb-2">
                  <h3 className="font-serif font-bold text-base text-silk-maroon">
                    2. Select Configurable Payment Method
                  </h3>
                  <button onClick={() => setStep("address")} className="text-xs text-silk-maroon underline">
                    Edit Address
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "Razorpay (UPI / GPay / Cards)", title: "Razorpay Gateway (UPI, GPay, PhonePe, Cards)", icon: CreditCard },
                    { id: "Stripe International", title: "Stripe International (Credit/Debit Card)", icon: CreditCard },
                    { id: "Net Banking", title: "Net Banking (SBI, HDFC, ICICI, Axis)", icon: Landmark },
                    { id: "Cash on Delivery", title: "Cash on Delivery (COD - Up to ₹25,000)", icon: Truck },
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <label
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition ${
                          paymentMethod === pm.id
                            ? "bg-silk-beige border-silk-maroon shadow-sm"
                            : "bg-silk-ivory border-silk-gold/30 hover:border-silk-gold"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id)}
                          className="accent-silk-maroon"
                        />
                        <Icon className="w-5 h-5 text-silk-gold" />
                        <span className="font-serif font-bold text-xs text-silk-black">{pm.title}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button onClick={() => setStep("address")} className="text-xs text-silk-black/60 font-bold">
                    Back to Address
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-gradient-to-r from-silk-gold to-silk-gold-dark text-silk-black hover:from-silk-gold-light hover:to-silk-gold font-bold text-sm py-3.5 px-8 rounded shadow-luxury transition"
                  >
                    Confirm & Authorize Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-silk-cream rounded-xl p-6 border border-silk-gold/30 shadow-card space-y-4">
              <h3 className="font-serif font-bold text-base text-silk-maroon border-b border-silk-gold/20 pb-2">
                Order Items ({cart.length})
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-xs">
                    <img src={item.product.images[0]} alt="" className="w-12 h-14 object-cover rounded border" />
                    <div className="flex-1">
                      <h4 className="font-bold text-silk-black truncate">{item.product.title}</h4>
                      <p className="text-silk-black/60">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-silk-maroon">{formatPrice(item.product.price * item.quantity, currency)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-silk-gold/20 space-y-1 text-xs">
                <div className="flex justify-between font-serif font-bold text-sm text-silk-maroon">
                  <span>Total Payable</span>
                  <span>{formatPrice(total, currency)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-silk-emerald font-bold pt-2">
                <ShieldCheck className="w-4 h-4 text-silk-gold" /> Encrypted 256-Bit SSL Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
