"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Star, Sparkles, Check, ArrowRight } from "lucide-react";
import { StarterProduct } from "@/lib/starter-catalog";
import { PackagingGraphic } from "./PackagingGraphic";
import { formatEGP, calculateDiscount } from "@/lib/currency";

interface ProductCardProps {
  product: StarterProduct & { stock?: number };
  onAddToCart?: (product: StarterProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isWishlist, setIsWishlist] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = product.previousPrice
    ? calculateDiscount(product.previousPrice, product.sellingPrice)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-[#FFFFFF] rounded-2xl border border-[#E4DCD0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-start">
        {product.isBestSeller && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#354936] text-[#FFFDF7] shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#C9A96E]" />
            الأكثر مبيعاً
          </span>
        )}
        {product.isNewArrival && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C9A96E] text-[#203A2B] shadow-sm">
            وصل حديثاً
          </span>
        )}
        {discount > 0 && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-sm">
            خصم {discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsWishlist(!isWishlist);
        }}
        className="absolute top-3 left-3 z-10 p-2 rounded-full bg-[#FFFDF7]/80 backdrop-blur-sm text-[#78866B] hover:text-rose-600 hover:bg-white shadow-sm transition-all active:scale-90"
        title="إضافة للمفضلة"
      >
        <Heart className={`w-4 h-4 ${isWishlist ? "fill-rose-600 text-rose-600" : ""}`} />
      </button>

      {/* Product Image / Luxury Vector Packaging Container */}
      <Link href={`/store/product/${product.slug}`} className="block relative pt-6 pb-2 px-4 bg-gradient-to-b from-[#FAF8F4] to-[#FFFDF7] overflow-hidden">
        <div className="transform group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
          <PackagingGraphic
            type={product.packageType}
            productNameAr={product.nameAr}
            productNameEn={product.nameEn}
            accentColor={product.packagingColor}
            size="md"
          />
        </div>
      </Link>

      {/* Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between" dir="rtl">
        <div>
          {/* Category & Volume */}
          <div className="flex items-center justify-between text-[11px] text-[#78866B] mb-1.5">
            <span className="font-medium bg-[#F6F1E7] px-2 py-0.5 rounded text-[#354936]">
              {product.categoryNameAr}
            </span>
            <span className="opacity-80">{product.volume}</span>
          </div>

          {/* Title */}
          <Link href={`/store/product/${product.slug}`} className="block group-hover:text-[#354936] transition-colors">
            <h3 className="font-bold text-sm text-[#203A2B] line-clamp-1 leading-snug">
              {product.nameAr}
            </h3>
            <p className="text-[11px] text-[#78866B] line-clamp-1 mt-0.5 font-sans">
              {product.nameEn}
            </p>
          </Link>

          {/* Short description */}
          <p className="text-xs text-[#6A7265] line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescAr}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[11px] font-bold text-[#30332D] mr-1">4.9</span>
            <span className="text-[10px] text-[#78866B]">(128 تقييم)</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-[#E4DCD0]/70 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#203A2B]">
                {formatEGP(product.sellingPrice, "ar")}
              </span>
              {product.previousPrice && (
                <span className="text-xs text-[#A6B39A] line-through">
                  {formatEGP(product.previousPrice, "ar")}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">
              شامل ضريبة القيمة المضافة
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={added}
            className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center shadow-sm ${
              added
                ? "bg-emerald-600 text-white scale-105"
                : "bg-[#354936] hover:bg-[#203A2B] text-[#FFFDF7] hover:scale-105 active:scale-95"
            }`}
            title="أضف إلى السلة"
            aria-label="أضف إلى السلة"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

