import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, coupons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, discountPercent, discountFlat, minSpend } = body;

    if (!code) {
      return NextResponse.json({ success: false, error: "Coupon code is required" }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();

    // Check if validating coupon vs creating coupon
    if (discountPercent === undefined && discountFlat === undefined) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: cleanCode },
      });

      if (!coupon || !coupon.isActive) {
        return NextResponse.json({ success: false, message: "Invalid or expired promo code" }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        coupon: {
          code: coupon.code,
          discountPercent: coupon.discountPercent,
          discountFlat: coupon.discountFlat,
        },
      });
    }

    // Create new coupon in database
    const coupon = await prisma.coupon.create({
      data: {
        code: cleanCode,
        discountPercent: discountPercent ? parseInt(discountPercent, 10) : null,
        discountFlat: discountFlat ? parseFloat(discountFlat) : null,
        minSpend: minSpend ? parseFloat(minSpend) : 0,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true, coupon });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Coupon ID required" }, { status: 400 });
    }

    await prisma.coupon.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
