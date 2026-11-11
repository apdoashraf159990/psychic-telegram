import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { roohDb } from "@/lib/db";
import { STARTER_PRODUCTS } from "@/lib/starter-catalog";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where = category && category !== "all" ? { category: { slug: category } } : {};
    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    if (products.length === 0) {
      return NextResponse.json({ products: roohDb.getProducts() });
    }

    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ products: roohDb.getProducts() });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = roohDb.saveProduct(body);

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error("Product save error:", err);
    return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
  }
}

