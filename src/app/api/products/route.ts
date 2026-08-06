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
      price,
      originalPrice,
      stock,
      sku,
      category,
      silkType,
      weavingStyle,
      occasion,
      stateOrigin,
      description,
      imageUrl,
      isSilkMarkCertified,
      isBestSeller,
      isBridal,
    } = body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const product = await prisma.product.create({
      data: {
        title,
        slug: `${slug}-${Math.floor(1000 + Math.random() * 9000)}`,
        price: parseFloat(price),
        originalPrice: parseFloat(originalPrice || price),
        stock: parseInt(stock, 10),
        inStock: parseInt(stock, 10) > 0,
        sku: sku || `BSH-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        category: category || "Silk Sarees",
        silkType: silkType || "Muga Silk",
        weavingStyle: weavingStyle || "Handloom Jacquard",
        occasion: occasion || "Festive",
        stateOrigin: stateOrigin || "Sualkuchi, Assam",
        description: description || "Authentic 100% pure Indian silk handwoven by master artisans.",
        isSilkMarkCertified: isSilkMarkCertified ?? true,
        isBestSeller: isBestSeller ?? false,
        isBridal: isBridal ?? false,
        images: {
          create: [
            {
              url: imageUrl || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
              isPrimary: true,
            },
          ],
        },
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
    const { id, price, stock, isBestSeller, isBridal } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(price !== undefined && { price: parseFloat(price) }),
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
