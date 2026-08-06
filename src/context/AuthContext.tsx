"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, Order } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  orders: Order[];
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  addOrder: (order: Order) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: "usr-001",
  name: "Rajkumari Ananya Baishya",
  email: "ananya@baishyasilk.com",
  phone: "+91 98640 12345",
  role: "admin",
  loyaltyPoints: 2450,
  membershipTier: "Royal Silk Circle",
};

const DEFAULT_ORDERS: Order[] = [
  {
    id: "ord-8941",
    orderNumber: "BSH-2026-8941",
    date: "2026-07-28",
    totalAmount: 88500,
    status: "Delivered",
    trackingNumber: "DEL-8894125IN",
    carrier: "Delhivery Express",
    estimatedDelivery: "Aug 1, 2026",
    items: [
      {
        id: "item-1",
        productId: "bsh-001",
        title: "Royal Golden Assam Muga Silk Saree",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
        price: 88500,
        quantity: 1,
        color: "Natural Muga Gold",
      },
    ],
    shippingAddress: {
      fullName: "Ananya Baishya",
      street: "House No 42, GS Road, Christian Basti",
      city: "Guwahati",
      state: "Assam",
      zipCode: "781005",
      country: "India",
      phone: "+91 98640 12345",
    },
    paymentMethod: "Razorpay (UPI / NetBanking)",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);

  useEffect(() => {
    const savedUser = localStorage.getItem("bsh_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
  }, []);

  const login = (email: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      email,
      name: email.split("@")[0].replace(".", " "),
    };
    setUser(newUser);
    localStorage.setItem("bsh_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bsh_user");
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("bsh_user", JSON.stringify(updated));
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ user, orders, login, logout, updateProfile, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
