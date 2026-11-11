import React from "react";
import Link from "next/link";
import { Sparkles, Shield } from "lucide-react";
import { STARTER_PRODUCTS } from "@/lib/starter-catalog";
import { ProductCard } from "@/components/ProductCard";

export default function MensCarePage() {
  const mensProducts = STARTER_PRODUCTS.filter((p) => p.categorySlug === "mens-care");

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#354936]/10 text-[#354936] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>العناية بالرجال | Men's Grooming</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          أناقة الرجل بنقاء الزيوت الطبيعية
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          عناية فائقة لشعر اللحية وبشرة الوجه، تجمع بين زيت خشب الأرز الأطلسي وزيت الجوجوبا والأرجان، لتنعيم اللحية ومنع الحكة والتمتع بمظهر مهندم ورائحة ذكورية جذابة.
        </p>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {mensProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

