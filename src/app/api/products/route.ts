import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const silkType = searchParams.get("silk");

    const where: any = {};
    if (category) where.category = category;
    if (silkType) where.silkType = silkType;

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
    const { title, price, category, silkType, weavingStyle, occasion, stateOrigin, sku, description } = body;

    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        price: parseFloat(price),
        originalPrice: parseFloat(price) * 1.2,
        category,
        silkType,
        weavingStyle: weavingStyle || "Handloom Jacquard",
        occasion: occasion || "Bridal",
        stateOrigin: stateOrigin || "Sualkuchi, Assam",
        sku,
        description,
        inStock: true,
        isSilkMarkCertified: true,
        images: {
          create: [
            {
              url: body.image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
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
