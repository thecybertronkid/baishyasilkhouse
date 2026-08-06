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
    const { totalAmount, paymentMethod, items, shippingAddress } = body;

    const orderNumber = `BSH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        totalAmount: parseFloat(totalAmount),
        paymentMethod,
        trackingNumber: `DEL-${Math.floor(100000 + Math.random() * 900000)}IN`,
        estimatedDelivery: "3-5 Business Days",
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            title: item.title,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            customBlouse: item.customBlouse || false,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
