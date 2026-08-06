"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, customBlouse?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string;
  appliedDiscount: number; // percentage
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isGiftWrapped: boolean;
  toggleGiftWrap: () => void;
  subtotal: number;
  discountAmount: number;
  giftWrapFee: number;
  shippingFee: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("bsh_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bsh_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedColor?: string,
    customBlouse: boolean = false
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        if (selectedColor) updated[existingIndex].selectedColor = selectedColor;
        updated[existingIndex].customBlouse = customBlouse;
        return updated;
      }
      return [
        ...prevCart,
        {
          product,
          quantity,
          selectedColor: selectedColor || (product.colors[0] ? product.colors[0].name : undefined),
          customBlouse,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
    setAppliedDiscount(0);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "SILK10" || cleanCode === "BAISHYA10") {
      setCouponCode(cleanCode);
      setAppliedDiscount(10);
      return { success: true, message: "10% Silk Heritage Discount applied!" };
    }
    if (cleanCode === "ROYAL15" || cleanCode === "BRIDAL15") {
      setCouponCode(cleanCode);
      setAppliedDiscount(15);
      return { success: true, message: "15% Luxury Bridal Discount applied!" };
    }
    return { success: false, message: "Invalid coupon code. Try SILK10 or BRIDAL15" };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setAppliedDiscount(0);
  };

  const toggleGiftWrap = () => {
    setIsGiftWrapped((prev) => !prev);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const giftWrapFee = isGiftWrapped ? 250 : 0;
  const shippingFee = subtotal > 5000 || subtotal === 0 ? 0 : 350;
  const total = subtotal - discountAmount + giftWrapFee + shippingFee;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        appliedDiscount,
        applyCoupon,
        removeCoupon,
        isGiftWrapped,
        toggleGiftWrap,
        subtotal,
        discountAmount,
        giftWrapFee,
        shippingFee,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
