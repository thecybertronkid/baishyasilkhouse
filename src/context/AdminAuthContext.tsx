"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  adminUsername: string;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (newUser: string, newPass: string) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>("admin");
  const [adminPassword, setAdminPassword] = useState<string>("admin");

  useEffect(() => {
    // Load stored credentials if customized
    const storedUser = localStorage.getItem("bsh_admin_user") || "admin";
    const storedPass = localStorage.getItem("bsh_admin_pass") || "admin";
    const storedAuth = localStorage.getItem("bsh_admin_auth") === "true";

    setAdminUsername(storedUser);
    setAdminPassword(storedPass);
    setIsAdminLoggedIn(storedAuth);
  }, []);

  const loginAdmin = (user: string, pass: string): boolean => {
    if (user === adminUsername && pass === adminPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("bsh_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("bsh_admin_auth");
    router.push("/admin/login");
  };

  const updateAdminCredentials = (newUser: string, newPass: string) => {
    setAdminUsername(newUser);
    setAdminPassword(newPass);
    localStorage.setItem("bsh_admin_user", newUser);
    localStorage.setItem("bsh_admin_pass", newPass);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminLoggedIn,
        adminUsername,
        loginAdmin,
        logoutAdmin,
        updateAdminCredentials,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return context;
};
