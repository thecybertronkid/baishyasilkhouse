export type SilkType =
  | "Muga Silk"
  | "Pat Silk"
  | "Eri Silk"
  | "Tussar Silk"
  | "Banarasi Katan"
  | "Kanjeevaram Pure Silk"
  | "Raw Silk";

export type CategoryType =
  | "Silk Sarees"
  | "Mekhela Chador"
  | "Silk Fabrics"
  | "Dupattas"
  | "Scarves"
  | "Men's Silk Wear"
  | "Women's Silk Wear"
  | "Accessories";

export type WeavingTechnique =
  | "Handloom Jacquard"
  | "Zari Minakari"
  | "Kadwa Weave"
  | "Pure Gold Zari"
  | "Hand-painted Kalamkari"
  | "Organic Non-violent (Eri)"
  | "Brocade";

export type OccasionType =
  | "Bridal"
  | "Wedding"
  | "Festive"
  | "Reception"
  | "Everyday Luxury"
  | "Royal Gifting";

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  image: string;
  inStock: boolean;
}

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  images?: string[];
  helpfulCount: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  category: CategoryType;
  silkType: SilkType;
  weavingStyle: WeavingTechnique;
  occasion: OccasionType;
  stateOrigin: string; // e.g. Sualkuchi (Assam), Kanchipuram (Tamil Nadu), Varanasi (UP)
  rating: number;
  reviewCount: number;
  sku: string;
  inStock: boolean;
  isSilkMarkCertified: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isLimitedEdition?: boolean;
  isBridal?: boolean;
  images: string[];
  videoUrl?: string;
  colors: { name: string; hex: string }[];
  blouseIncluded: boolean;
  dimensions?: string;
  weight?: string;
  careInstructions: string[];
  description: string;
  story: string;
  variants?: ProductVariant[];
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  customBlouse?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  loyaltyPoints: number;
  membershipTier: "Gold" | "Platinum" | "Royal Silk Circle";
}
