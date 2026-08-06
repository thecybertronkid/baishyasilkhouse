import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    let settings = await prisma.storeSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await prisma.storeSettings.create({
        data: {
          id: "default",
          brandName: "Baishya Silk House",
          conciergeEmail: "concierge@baishyasilk.com",
          supportPhone: "+91 98640 12345",
          freeShippingThreshold: 5000,
        },
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      settings: {
        id: "default",
        brandName: "Baishya Silk House",
        conciergeEmail: "concierge@baishyasilk.com",
        supportPhone: "+91 98640 12345",
        freeShippingThreshold: 5000,
      },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { brandName, conciergeEmail, supportPhone, freeShippingThreshold } = body;

    const settings = await prisma.storeSettings.upsert({
      where: { id: "default" },
      update: {
        ...(brandName && { brandName }),
        ...(conciergeEmail && { conciergeEmail }),
        ...(supportPhone && { supportPhone }),
        ...(freeShippingThreshold !== undefined && { freeShippingThreshold: parseFloat(freeShippingThreshold) }),
      },
      create: {
        id: "default",
        brandName: brandName || "Baishya Silk House",
        conciergeEmail: conciergeEmail || "concierge@baishyasilk.com",
        supportPhone: supportPhone || "+91 98640 12345",
        freeShippingThreshold: parseFloat(freeShippingThreshold) || 5000,
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
