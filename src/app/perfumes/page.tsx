import React from "react";
import Link from "next/link";
import { Sparkles, Feather } from "lucide-react";
import { STARTER_PRODUCTS } from "@/lib/starter-catalog";
import { ProductCard } from "@/components/ProductCard";

export default function PerfumesPage() {
  const perfumeProducts = STARTER_PRODUCTS.filter((p) => p.categorySlug === "perfumes");

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#354936]/10 text-[#354936] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>العطور الملكية | Haute Parfumerie</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          عطور رُوح المستوحاة من سحر الطبيعة
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          توليفات فريدة تمزج نقاء زهر الزيتون مع فخامة العود والعنبر في زجاجات فاخرة خضراء زيتونية بغطاء ذهبي محفور. ثبات يتجاوز 24 ساعة.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-[#203A2B]">
            العطور المتاحة ({perfumeProducts.length})
          </h2>
          <Link href="/store?category=perfumes" className="text-sm font-semibold text-[#354936] hover:underline">
            عرض الكل في المتجر ←
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {perfumeProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

