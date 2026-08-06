export type SilkType = string;
export type CategoryType = string;
export type WeavingTechnique = string;
export type OccasionType = string;

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  subtitle?: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: string;
  silkType: string;
  weavingStyle: string;
  occasion: string;
  stateOrigin: string;
  rating: number;
  reviewCount: number;
  sku: string;
  stock: number;
  inStock: boolean;
  isSilkMarkCertified: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isLimitedEdition?: boolean;
  isBridal?: boolean;
  blouseIncluded?: boolean;
  dimensions?: string;
  weight?: string;
  description: string;
  story?: string;
  careInstructions?: string[];
  images: string[];
  colors: ProductColor[];
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customBlouse?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "customer";
  loyaltyPoints: number;
  tier?: string;
  membershipTier?: string;
}

export type UserProfile = User;

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  totalAmount: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: any[];
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  shippingAddress?: any;
  paymentMethod?: string;
}
