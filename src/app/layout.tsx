import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider } from "@/context/CompareContext";
import { AuthProvider } from "@/context/AuthContext";
import { StoreProvider } from "@/context/StoreContext";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SearchModal } from "@/components/layout/SearchModal";
import { QuickViewModal } from "@/components/layout/QuickViewModal";
import { FloatingWhatsapp } from "@/components/layout/FloatingWhatsapp";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Baishya Silk House | Authentic Assam Muga & Handloom Silk Sarees",
  description:
    "Explore luxury handcrafted Indian silk sarees, Mekhela Chadors, Eri Ahimsa silk stoles, Banarasi & Kanjeevaram sarees woven in Sualkuchi, Assam. 100% Silk Mark Certified.",
  keywords: [
    "Muga Silk Saree",
    "Mekhela Chador",
    "Assam Silk",
    "Sualkuchi Sarees",
    "Eri Ahimsa Silk",
    "Pat Silk",
    "Baishya Silk House",
    "Handloom Silk India",
  ],
  openGraph: {
    title: "Baishya Silk House | Luxury Indian Silk E-Commerce",
    description: "Handcrafted 100% Silk Mark Certified Sarees, Mekhela Chadors & Apparel direct from Sualkuchi looms.",
    siteName: "Baishya Silk House",
    images: [
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Baishya Silk House Muga Saree",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${outfit.variable}`}>
      <body className="bg-silk-ivory text-silk-black font-sans antialiased min-h-screen flex flex-col selection:bg-silk-gold selection:text-silk-black">
        <StoreProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <AnnouncementBar />
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <MobileNav />
                  <CartDrawer />
                  <SearchModal />
                  <QuickViewModal />
                  <FloatingWhatsapp />
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
