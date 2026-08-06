import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const silkType = searchParams.get("silk");
    const query = searchParams.get("q");

    const where: any = {};
    if (category) where.category = category;
    if (silkType) where.silkType = silkType;
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { sku: { contains: query } },
        { silkType: { contains: query } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        images: true,
        colors: true,
        reviews: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      tagline,
      subtitle,
      price,
      originalPrice,
      stock,
      sku,
      category,
      silkType,
      weavingStyle,
      occasion,
      stateOrigin,
      dimensions,
      weight,
      description,
      story,
      images, // array of base64 data URLs or image URLs
      isSilkMarkCertified,
      isBestSeller,
      isNewArrival,
      isBridal,
      blouseIncluded,
    } = body;

    const sellingPrice = parseFloat(price);
    const comparePrice = parseFloat(originalPrice || price);
    const discount = comparePrice > sellingPrice ? Math.round(((comparePrice - sellingPrice) / comparePrice) * 100) : 0;
    const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const imageList = Array.isArray(images) && images.length > 0
      ? images.map((url: string, index: number) => ({ url, isPrimary: index === 0 }))
      : [{ url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200", isPrimary: true }];

    const product = await prisma.product.create({
      data: {
        title,
        slug: `${slugBase}-${Math.floor(1000 + Math.random() * 9000)}`,
        tagline: tagline || "Handwoven Sualkuchi Heritage",
        subtitle: subtitle || "100% Pure Indian Silk",
        price: sellingPrice,
        originalPrice: comparePrice,
        discountPercentage: discount,
        stock: parseInt(stock, 10) || 10,
        inStock: (parseInt(stock, 10) || 10) > 0,
        sku: sku || `BSH-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        category: category || "Silk Sarees",
        silkType: silkType || "Muga Silk",
        weavingStyle: weavingStyle || "Handloom Jacquard",
        occasion: occasion || "Bridal",
        stateOrigin: stateOrigin || "Sualkuchi, Assam",
        dimensions: dimensions || "Saree: 5.5m x 1.15m | Blouse: 0.9m",
        weight: weight || "750 grams",
        description: description || "Handcrafted from 100% pure silk yarns by master weavers in Sualkuchi.",
        story: story || "Woven with generational handloom artistry.",
        isSilkMarkCertified: isSilkMarkCertified ?? true,
        isBestSeller: isBestSeller ?? false,
        isNewArrival: isNewArrival ?? true,
        isBridal: isBridal ?? false,
        blouseIncluded: blouseIncluded ?? true,
        images: {
          create: imageList,
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, price, originalPrice, stock, isBestSeller, isBridal } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(originalPrice !== undefined && { originalPrice: parseFloat(originalPrice) }),
        ...(stock !== undefined && {
          stock: parseInt(stock, 10),
          inStock: parseInt(stock, 10) > 0,
        }),
        ...(isBestSeller !== undefined && { isBestSeller }),
        ...(isBridal !== undefined && { isBridal }),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID required" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
