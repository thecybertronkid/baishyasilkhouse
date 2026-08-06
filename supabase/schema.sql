-- ========================================================
-- BAISHYA SILK HOUSE - SUPABASE POSTGRESQL DDL QUERY
-- Copy and paste this directly into Supabase Dashboard -> SQL Editor
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "MembershipTier" AS ENUM ('SILVER', 'GOLD', 'PLATINUM', 'ROYAL_SILK_CIRCLE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "loyaltyPoints" INT NOT NULL DEFAULT 100,
    "tier" "MembershipTier" NOT NULL DEFAULT 'ROYAL_SILK_CIRCLE',
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Addresses Table
CREATE TABLE IF NOT EXISTS "Address" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "fullName" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "phone" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Products Table
CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "slug" TEXT UNIQUE NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT,
    "subtitle" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION NOT NULL,
    "discountPercentage" INT NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "silkType" TEXT NOT NULL,
    "weavingStyle" TEXT NOT NULL,
    "occasion" TEXT NOT NULL,
    "stateOrigin" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "reviewCount" INT NOT NULL DEFAULT 0,
    "sku" TEXT UNIQUE NOT NULL,
    "stock" INT NOT NULL DEFAULT 10,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "isSilkMarkCertified" BOOLEAN NOT NULL DEFAULT true,
    "isBestSeller" BOOLEAN NOT NULL DEFAULT false,
    "isNewArrival" BOOLEAN NOT NULL DEFAULT false,
    "isTrending" BOOLEAN NOT NULL DEFAULT false,
    "isLimitedEdition" BOOLEAN NOT NULL DEFAULT false,
    "isBridal" BOOLEAN NOT NULL DEFAULT false,
    "blouseIncluded" BOOLEAN NOT NULL DEFAULT true,
    "dimensions" TEXT,
    "weight" TEXT,
    "description" TEXT NOT NULL,
    "story" TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create ProductImages Table
CREATE TABLE IF NOT EXISTS "ProductImage" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "productId" TEXT NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "url" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false
);

-- 6. Create ProductColors Table
CREATE TABLE IF NOT EXISTS "ProductColor" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "productId" TEXT NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL
);

-- 7. Create ProductReviews Table
CREATE TABLE IF NOT EXISTS "ProductReview" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "productId" TEXT NOT NULL REFERENCES "Product"("id") ON DELETE CASCADE,
    "userId" TEXT REFERENCES "User"("id") ON DELETE SET NULL,
    "userName" TEXT NOT NULL,
    "rating" INT NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "verifiedPurchase" BOOLEAN NOT NULL DEFAULT true,
    "helpfulCount" INT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Create Orders Table
CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "orderNumber" TEXT UNIQUE NOT NULL,
    "userId" TEXT REFERENCES "User"("id") ON DELETE SET NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PROCESSING',
    "trackingNumber" TEXT,
    "carrier" TEXT DEFAULT 'Delhivery Express',
    "estimatedDelivery" TEXT,
    "paymentMethod" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL DEFAULT 'PAID',
    "shippingAddressId" TEXT REFERENCES "Address"("id"),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Create OrderItems Table
CREATE TABLE IF NOT EXISTS "OrderItem" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "orderId" TEXT NOT NULL REFERENCES "Order"("id") ON DELETE CASCADE,
    "productId" TEXT NOT NULL REFERENCES "Product"("id"),
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INT NOT NULL,
    "color" TEXT,
    "customBlouse" BOOLEAN NOT NULL DEFAULT false
);

-- 10. Create Coupons Table
CREATE TABLE IF NOT EXISTS "Coupon" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "code" TEXT UNIQUE NOT NULL,
    "discountPercent" INT,
    "discountFlat" DOUBLE PRECISION,
    "minSpend" DOUBLE PRECISION DEFAULT 0,
    "maxUses" INT,
    "usedCount" INT NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP WITH TIME ZONE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Create CMSBanners Table
CREATE TABLE IF NOT EXISTS "CMSBanner" (
    "id" TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image" TEXT NOT NULL,
    "link" TEXT,
    "placement" TEXT NOT NULL DEFAULT 'HERO',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ========================================================
-- SEED INITIAL PRODUCTION DATA
-- ========================================================

-- Insert Coupons
INSERT INTO "Coupon" ("id", "code", "discountPercent", "minSpend", "isActive")
VALUES 
  ('c1', 'SILK10', 10, 2000, true),
  ('c2', 'BRIDAL15', 15, 10000, true)
ON CONFLICT ("code") DO NOTHING;

-- Insert Admin User
INSERT INTO "User" ("id", "name", "email", "phone", "role", "loyaltyPoints", "tier")
VALUES 
  ('usr-admin-001', 'Rajkumari Ananya Baishya', 'admin@baishyasilk.com', '+91 98640 12345', 'ADMIN', 5000, 'ROYAL_SILK_CIRCLE')
ON CONFLICT ("email") DO NOTHING;

-- Insert Royal Muga Silk Saree Product
INSERT INTO "Product" (
  "id", "slug", "title", "tagline", "subtitle", "price", "originalPrice", 
  "discountPercentage", "category", "silkType", "weavingStyle", "occasion", 
  "stateOrigin", "rating", "reviewCount", "sku", "stock", "inStock", 
  "isSilkMarkCertified", "isBestSeller", "isNewArrival", "isTrending", 
  "isLimitedEdition", "isBridal", "blouseIncluded", "dimensions", "weight", 
  "description", "story"
) VALUES (
  'bsh-001', 
  'royal-assam-muga-golden-saree', 
  'Royal Golden Assam Muga Silk Saree', 
  'Natural Golden Luster • Handwoven in Sualkuchi', 
  'The pride of Assam sericulture woven with 24K real gold zari Kingkhap motifs.', 
  88500, 105000, 15, 
  'Silk Sarees', 'Muga Silk', 'Handloom Jacquard', 'Bridal', 
  'Sualkuchi, Assam', 4.9, 42, 
  'BSH-MUGA-001', 8, true, 
  true, true, false, true, true, true, true, 
  'Saree: 5.5m x 1.15m | Blouse Piece: 0.9m', '780 grams', 
  'Crafted from 100% pure Muga silk—found exclusively in the Brahmaputra valley of Assam. Famous for its natural shimmering golden luster.', 
  'Muga silk is GI protected and was historically reserved for Ahom Royalty.'
) ON CONFLICT ("slug") DO NOTHING;

-- Insert Primary Image for Muga Saree
INSERT INTO "ProductImage" ("id", "productId", "url", "isPrimary")
VALUES ('img-001', 'bsh-001', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200', true)
ON CONFLICT ("id") DO NOTHING;
