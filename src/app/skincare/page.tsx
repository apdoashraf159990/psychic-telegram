import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Droplets, Sun, Moon } from "lucide-react";
import { STARTER_PRODUCTS } from "@/lib/starter-catalog";
import { ProductCard } from "@/components/ProductCard";

export default function SkincarePage() {
  const skincareProducts = STARTER_PRODUCTS.filter((p) => p.categorySlug === "skincare");

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#354936]/10 text-[#354936] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>العناية بالبشرة | Skincare Ritual</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          روتين العناية بالبشرة من رُوح
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          تركيبات نباتية غنية بحمض الهيالورونيك، فيتامين سي، وزيت الزيتون البكر المعصور على البارد لتنظيف وترطيب وحماية البشرة وإعادة إشراقتها الطبيعية.
        </p>
      </div>

      {/* Routine Steps Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4DCD0] shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F6F1E7] text-[#354936] flex items-center justify-center font-bold text-sm shrink-0">
            1
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#203A2B] mb-1">التنظيف اللطيف</h3>
            <p className="text-xs text-[#78866B]">إزالة الشوائب والدهون الزائدة بغسول رُوح دون تجفيف البشرة.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4DCD0] shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F6F1E7] text-[#354936] flex items-center justify-center font-bold text-sm shrink-0">
            2
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#203A2B] mb-1">الترطيب والتغذية المركزة</h3>
            <p className="text-xs text-[#78866B]">سيروم الهيالورونيك أو فيتامين سي الذهبي لتغذية الطبقات العميقة.</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E4DCD0] shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F6F1E7] text-[#354936] flex items-center justify-center font-bold text-sm shrink-0">
            3
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#203A2B] mb-1">حماية الحاجز الجلدي</h3>
            <p className="text-xs text-[#78866B]">كريم الزيتون والسيراميد لحبس الرطوبة وحماية البشرة 24 ساعة.</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-[#203A2B]">
            منتجات العناية بالبشرة ({skincareProducts.length})
          </h2>
          <Link href="/store?category=skincare" className="text-sm font-semibold text-[#354936] hover:underline">
            عرض الكل في المتجر ←
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skincareProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

