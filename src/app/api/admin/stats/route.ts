import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalProducts = await prisma.product.count();
    const lowStockProducts = await prisma.product.count({
      where: { stock: { lte: 5 } },
    });
    
    const orders = await prisma.order.findMany({
      include: { items: true },
    });

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter((o) => o.status === "PROCESSING" || o.status === "PENDING").length;

    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { items: true, user: true },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        lowStockProducts,
        pendingOrders,
      },
      recentOrders,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
