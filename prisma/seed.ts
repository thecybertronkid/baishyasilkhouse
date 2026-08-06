import { PrismaClient, Role, MembershipTier, OrderStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Baishya Silk House Database Seeding...");

  // 1. Clean existing database tables
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productReview.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.cMSBanner.deleteMany();

  // 2. Create Admin & Customer Users
  const adminUser = await prisma.user.create({
    data: {
      id: "usr-admin-001",
      name: "Rajkumari Ananya Baishya",
      email: "admin@baishyasilk.com",
      phone: "+91 98640 12345",
      role: Role.ADMIN,
      loyaltyPoints: 5000,
      tier: MembershipTier.ROYAL_SILK_CIRCLE,
    },
  });

  const customerUser = await prisma.user.create({
    data: {
      id: "usr-cust-002",
      name: "Priyanka Sarma",
      email: "priyanka.sarma@example.com",
      phone: "+91 98640 98765",
      role: Role.CUSTOMER,
      loyaltyPoints: 1250,
      tier: MembershipTier.GOLD,
    },
  });

  // 3. Create Addresses
  const adminAddress = await prisma.address.create({
    data: {
      userId: adminUser.id,
      fullName: "Ananya Baishya",
      street: "House No 42, GS Road, Christian Basti",
      city: "Guwahati",
      state: "Assam",
      zipCode: "781005",
      country: "India",
      phone: "+91 98640 12345",
      isDefault: true,
    },
  });

  // 4. Create Coupons
  await prisma.coupon.createMany({
    data: [
      { code: "SILK10", discountPercent: 10, minSpend: 2000, isActive: true },
      { code: "BRIDAL15", discountPercent: 15, minSpend: 10000, isActive: true },
      { code: "ROYAL500", discountFlat: 500, minSpend: 3000, isActive: true },
    ],
  });

  // 5. Create CMS Banners
  await prisma.cMSBanner.createMany({
    data: [
      {
        title: "ROYAL GOLDEN MUGA SILK",
        subtitle: "Naturally Shimmering Heritage • Handwoven in Sualkuchi",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1920",
        link: "/shop?silk=Muga+Silk",
        placement: "HERO",
      },
    ],
  });

  // 6. Create Master Silk Products
  const mugaProduct = await prisma.product.create({
    data: {
      id: "bsh-001",
      slug: "royal-assam-muga-golden-saree",
      title: "Royal Golden Assam Muga Silk Saree",
      tagline: "Natural Golden Luster • Handwoven in Sualkuchi",
      subtitle: "The pride of Assam sericulture woven with 24K real gold zari Kingkhap motifs.",
      price: 88500,
      originalPrice: 105000,
      discountPercentage: 15,
      category: "Silk Sarees",
      silkType: "Muga Silk",
      weavingStyle: "Handloom Jacquard",
      occasion: "Bridal",
      stateOrigin: "Sualkuchi, Assam",
      rating: 4.9,
      reviewCount: 42,
      sku: "BSH-MUGA-001",
      stock: 8,
      inStock: true,
      isSilkMarkCertified: true,
      isBestSeller: true,
      isNewArrival: false,
      isTrending: true,
      isLimitedEdition: true,
      isBridal: true,
      blouseIncluded: true,
      dimensions: "Saree: 5.5m x 1.15m | Blouse Piece: 0.9m",
      weight: "780 grams",
      description: "Crafted from 100% pure Muga silk—found exclusively in the Brahmaputra valley of Assam. Famous for its natural shimmering golden luster that grows richer with every wash. Handwoven by master weavers over 45 days, featuring traditional Kingkhap royal crown motifs.",
      story: "Muga silk is GI protected and was historically reserved for Ahom Royalty.",
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200", isPrimary: true },
          { url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200", isPrimary: false },
        ],
      },
      colors: {
        create: [
          { name: "Natural Muga Gold", hex: "#D4AF37" },
          { name: "Deep Maroon Zari", hex: "#58111A" },
        ],
      },
      reviews: {
        create: [
          {
            userName: "Priyanka Sarma",
            userId: customerUser.id,
            rating: 5,
            title: "Breathtaking Heritage Masterpiece!",
            comment: "I ordered this for my wedding reception. The natural gold sheen is hypnotic, and the Silk Mark certificate gave me total peace of mind.",
            verifiedPurchase: true,
            helpfulCount: 18,
          },
        ],
      },
    },
  });

  const patProduct = await prisma.product.create({
    data: {
      id: "bsh-002",
      slug: "traditional-pat-silk-mekhela-chador-maroon",
      title: "Bridal Ivory & Crimson Pat Silk Mekhela Chador",
      tagline: "Assam Mulberry Silk • Traditional Two-Piece Drape",
      subtitle: "Ornate Minakari floral vines woven on pristine mulberry silk with heavy zari pallu.",
      price: 46200,
      originalPrice: 54000,
      discountPercentage: 14,
      category: "Mekhela Chador",
      silkType: "Pat Silk",
      weavingStyle: "Zari Minakari",
      occasion: "Bridal",
      stateOrigin: "Sualkuchi, Assam",
      rating: 4.8,
      reviewCount: 36,
      sku: "BSH-PAT-002",
      stock: 12,
      inStock: true,
      isSilkMarkCertified: true,
      isBestSeller: true,
      isNewArrival: true,
      isTrending: true,
      isBridal: true,
      blouseIncluded: true,
      dimensions: "Chador: 2.75m | Mekhela: 2.4m | Blouse: 0.95m",
      weight: "650 grams",
      description: "The quintessential bridal attire of Assam. Made from fine Pat (Mulberry) silk, this 2-piece ensemble consists of the Mekhela and Chador. Highlighted with Kaziranga rhino and peacock motifs.",
      story: "Pat silk weaving requires delicate thread handling.",
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200", isPrimary: true },
        ],
      },
      colors: {
        create: [
          { name: "Ivory & Crimson", hex: "#7A1C2B" },
        ],
      },
    },
  });

  // 7. Create Orders
  await prisma.order.create({
    data: {
      orderNumber: "BSH-2026-8941",
      userId: adminUser.id,
      totalAmount: 88500,
      status: OrderStatus.DELIVERED,
      trackingNumber: "DEL-8894125IN",
      carrier: "Delhivery Express",
      estimatedDelivery: "Aug 1, 2026",
      paymentMethod: "Razorpay Gateway (UPI / Cards)",
      paymentStatus: "PAID",
      shippingAddressId: adminAddress.id,
      items: {
        create: [
          {
            productId: mugaProduct.id,
            title: mugaProduct.title,
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
            price: 88500,
            quantity: 1,
            color: "Natural Muga Gold",
          },
        ],
      },
    },
  });

  console.log("✅ Baishya Silk House Database Seeding Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Database Seeding Failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
