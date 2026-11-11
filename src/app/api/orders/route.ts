import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { roohDb } from "@/lib/db";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ orders });
  } catch (err) {
    // fallback to JSON state
    return NextResponse.json({ orders: roohDb.getOrders() });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderCount = await prisma.order.count();
    const orderIndex = orderCount + 1;
    const orderNumber = `ROOH-EG-${new Date().getFullYear()}-${String(orderIndex).padStart(4, "0")}`;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(orderIndex).padStart(4, "0")}`;

    // Create order with items in transaction
    const newOrder = await prisma.order.create({
      data: {
        orderNumber,
        invoiceNumber,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        customerEmail: body.customerEmail || null,
        governorate: body.governorate,
        city: body.city,
        address: body.address,
        subtotal: body.subtotal,
        shippingFee: body.shippingFee,
        discountAmount: body.discountAmount || 0,
        codFee: body.codFee || 0,
        totalAmount: body.totalAmount,
        paymentMethod: body.paymentMethod,
        paymentStatus: body.paymentStatus || "PENDING",
        orderStatus: body.orderStatus || "NEW",
        notes: body.notes || null,
        items: {
          create: body.items.map((it: any) => ({
            productId: it.productId,
            productNameAr: it.productNameAr,
            productNameEn: it.productNameEn,
            quantity: it.quantity,
            unitPrice: it.unitPrice,
            purchaseCost: it.purchaseCost || 0,
            totalPrice: it.totalPrice,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Also sync to JSON state for instant offline reactivity
    roohDb.createOrder(body);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    console.error("Order creation error:", err);
    // fallback creation
    const fallbackOrder = roohDb.createOrder(await req.json().catch(() => ({})));
    return NextResponse.json({ success: true, order: fallbackOrder });
  }
}

