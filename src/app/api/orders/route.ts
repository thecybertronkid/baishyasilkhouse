import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        shippingAddress: true,
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { totalAmount, paymentMethod, items } = body;

    const orderNumber = `BSH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        totalAmount: parseFloat(totalAmount),
        paymentMethod: paymentMethod || "Razorpay Online",
        trackingNumber: `DEL-${Math.floor(100000 + Math.random() * 900000)}IN`,
        estimatedDelivery: "3-5 Business Days",
        status: "PROCESSING",
        items: {
          create: (items || []).map((item: any) => ({
            productId: item.productId || item.id,
            title: item.title,
            image: item.image || item.images?.[0],
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity, 10),
            color: item.color || "Standard",
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, trackingNumber } = body;

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(trackingNumber && { trackingNumber }),
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
