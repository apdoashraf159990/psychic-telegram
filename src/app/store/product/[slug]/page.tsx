"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, Sparkles, Check, ArrowRight, Share2, AlertCircle } from "lucide-react";
import { STARTER_PRODUCTS } from "@/lib/starter-catalog";
import { PackagingGraphic } from "@/components/PackagingGraphic";
import { formatEGP, calculateDiscount, calculateProfit } from "@/lib/currency";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const product = STARTER_PRODUCTS.find((p) => p.slug === slug) || STARTER_PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<"desc" | "ingredients" | "howToUse" | "reviews">("desc");
  const [isWishlist, setIsWishlist] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = product.previousPrice ? calculateDiscount(product.previousPrice, product.sellingPrice) : 0;
  const related = STARTER_PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    try {
      const existing = JSON.parse(localStorage.getItem("rooh_cart") || "[]");
      const index = existing.findIndex((item: any) => item.id === product.id);
      if (index >= 0) {
        existing[index].quantity += quantity;
      } else {
        existing.push({
          id: product.id,
          slug: product.slug,
          nameAr: product.nameAr,
          nameEn: product.nameEn,
          sellingPrice: product.sellingPrice,
          purchaseCost: product.purchaseCost,
          packageType: product.packageType,
          packagingColor: product.packagingColor,
          volume: product.volume,
          quantity: quantity,
        });
      }
      localStorage.setItem("rooh_cart", JSON.stringify(existing));
      window.dispatchEvent(new Event("cart_updated"));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/store/checkout");
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#78866B]" dir="rtl">
        <Link href="/" className="hover:text-[#354936]">الرئيسية</Link>
        <span>/</span>
        <Link href="/store" className="hover:text-[#354936]">المتجر</Link>
        <span>/</span>
        <Link href={`/store?category=${product.categorySlug}`} className="hover:text-[#354936]">{product.categoryNameAr}</Link>
        <span>/</span>
        <span className="text-[#30332D] font-medium">{product.nameAr}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" dir="rtl">
        {/* Left Column: Visual Product Concept Packaging Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl bg-gradient-to-b from-[#F6F1E7] to-[#FFFDF7] border border-[#E4DCD0] shadow-sm flex items-center justify-center p-8 overflow-hidden">
            {discount > 0 && (
              <span className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow">
                وفّري {discount}%
              </span>
            )}

            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-rose-600 shadow-sm transition-all"
            >
              <Heart className={`w-5 h-5 ${isWishlist ? "fill-rose-600 text-rose-600" : ""}`} />
            </button>

            <PackagingGraphic
              type={product.packageType}
              productNameAr={product.nameAr}
              productNameEn={product.nameEn}
              accentColor={product.packagingColor}
              size="lg"
            />
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-[#6A7265]">
            <div className="p-3 rounded-xl bg-white border border-[#E4DCD0] flex flex-col items-center gap-1">
              <ShieldCheck className="w-5 h-5 text-[#354936]" />
              <span className="font-semibold text-[#203A2B]">نباتي طبيعي 100%</span>
              <span className="text-[10px]">خالي من السلفات والبارابين</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E4DCD0] flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-[#354936]" />
              <span className="font-semibold text-[#203A2B]">شحن لكافة المحافظات</span>
              <span className="text-[10px]">توصيل 24-48 ساعة بمصر</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E4DCD0] flex flex-col items-center gap-1">
              <Sparkles className="w-5 h-5 text-[#C9A96E]" />
              <span className="font-semibold text-[#203A2B]">معصور على البارد</span>
              <span className="text-[10px]">بأعلى تركيز فيتامينات</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Pricing, Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#F6F1E7] text-[#354936]">
              {product.categoryNameAr} • {product.volume}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#203A2B]">
              {product.nameAr}
            </h1>
            <p className="text-sm font-sans text-[#78866B]">
              {product.nameEn}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-[#30332D]">4.9 من 5</span>
            <span className="text-xs text-[#78866B]">(142 تقييم موثق من عميلات في مصر)</span>
          </div>

          {/* Price */}
          <div className="p-4 rounded-2xl bg-[#F6F1E7]/70 border border-[#E4DCD0] space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#203A2B]">
                {formatEGP(product.sellingPrice, "ar")}
              </span>
              {product.previousPrice && (
                <span className="text-base text-[#78866B] line-through">
                  {formatEGP(product.previousPrice, "ar")}
                </span>
              )}
            </div>
            <p className="text-xs text-emerald-700 font-semibold">
              ✓ السعر شامل ضريبة القيمة المضافة والشحن متاح لجميع المحافظات
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="space-y-2 text-xs sm:text-sm text-[#30332D]">
            {product.skinType && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#78866B]">نوع البشرة المناسب:</span>
                <span>{product.skinType}</span>
              </div>
            )}
            {product.hairType && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#78866B]">نوع الشعر المناسب:</span>
                <span>{product.hairType}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#78866B]">الحجم الصافي:</span>
              <span>{product.volume}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#78866B]">رمز المنتج (SKU):</span>
              <span className="font-mono text-xs">{product.sku}</span>
            </div>
          </div>

          {/* Quantity & Buy Buttons */}
          <div className="space-y-4 pt-4 border-t border-[#E4DCD0]">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[#30332D]">الكمية المطلوبة:</span>
              <div className="flex items-center border border-[#E4DCD0] rounded-full bg-white px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-base text-gray-700"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#30332D]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center font-bold text-base text-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-4 rounded-full font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-[#354936] hover:bg-[#203A2B] text-white active:scale-95"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>تمت الإضافة بنجاح!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>إضافة إلى سلة التسوق</span>
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-4 rounded-full bg-[#C9A96E] hover:bg-[#B39255] text-[#203A2B] font-bold text-sm shadow-md transition-all active:scale-95"
              >
                شراء فوري والذهاب للدفع
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Ingredients, How to Use, Reviews */}
      <div className="border-t border-[#E4DCD0] pt-12 space-y-8" dir="rtl">
        <div className="flex items-center gap-3 border-b border-[#E4DCD0] overflow-x-auto">
          <button
            onClick={() => setSelectedTab("desc")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors shrink-0 ${
              selectedTab === "desc"
                ? "border-[#354936] text-[#354936]"
                : "border-transparent text-[#78866B] hover:text-[#30332D]"
            }`}
          >
            الوصف الكامل والفوائد
          </button>
          <button
            onClick={() => setSelectedTab("ingredients")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors shrink-0 ${
              selectedTab === "ingredients"
                ? "border-[#354936] text-[#354936]"
                : "border-transparent text-[#78866B] hover:text-[#30332D]"
            }`}
          >
            المكونات الطبيعية النقية
          </button>
          <button
            onClick={() => setSelectedTab("howToUse")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors shrink-0 ${
              selectedTab === "howToUse"
                ? "border-[#354936] text-[#354936]"
                : "border-transparent text-[#78866B] hover:text-[#30332D]"
            }`}
          >
            طريقة الاستخدام المثلى
          </button>
          <button
            onClick={() => setSelectedTab("reviews")}
            className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors shrink-0 ${
              selectedTab === "reviews"
                ? "border-[#354936] text-[#354936]"
                : "border-transparent text-[#78866B] hover:text-[#30332D]"
            }`}
          >
            آراء العميلات وتجاربهن
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E4DCD0] shadow-sm leading-relaxed text-sm text-[#30332D]">
          {selectedTab === "desc" && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#203A2B]">عن هذا المستحضر</h3>
              <p className="text-[#6A7265] leading-relaxed whitespace-pre-line">{product.fullDescAr}</p>
              <div className="pt-4 border-t border-[#E4DCD0] text-xs text-[#78866B]">
                بلد المنشأ: جمهورية مصر العربية — تصنيع رُوح للجمال والعناية.
              </div>
            </div>
          )}

          {selectedTab === "ingredients" && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#203A2B]">قائمة المكونات</h3>
              <div className="p-4 rounded-2xl bg-[#F6F1E7] text-[#354936] font-medium text-xs leading-relaxed">
                {product.ingredientsAr}
              </div>
              <div className="text-xs text-[#78866B] font-sans">
                <strong>INCI:</strong> {product.ingredientsEn}
              </div>
            </div>
          )}

          {selectedTab === "howToUse" && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#203A2B]">إرشادات الاستعمال للحصول على أفضل نتيجة</h3>
              <p className="text-[#6A7265] leading-relaxed">{product.instructionsAr}</p>
            </div>
          )}

          {selectedTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E4DCD0]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#203A2B]">تقييمات العميلات</h3>
                  <p className="text-xs text-[#78866B]">جميع التقييمات صادرة عن مشترين حقيقيين من محافظات مصر</p>
                </div>
                <div className="text-2xl font-bold text-[#354936]">4.9 / 5</div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#203A2B]">مريم ع. (الإسكندرية)</span>
                    <div className="flex text-amber-400"><Star className="w-3.5 h-3.5 fill-current" /> 5/5</div>
                  </div>
                  <p className="text-xs text-[#6A7265]">
                    "المنتج رائع جداً وملمسه مخملي غير دهني تماماً، رائحته هادئة ونقية وبشرتي أصبحت نضرة بعد أسبوع من الاستخدام."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E4DCD0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#203A2B]">سلمى ك. (القاهرة)</span>
                    <div className="flex text-amber-400"><Star className="w-3.5 h-3.5 fill-current" /> 5/5</div>
                  </div>
                  <p className="text-xs text-[#6A7265]">
                    "سرعة التوصيل كانت ممتازة والتغليف في العبوة الخضراء الزيتونية أفخم بكثير من التوقعات. سأكرر الطلب بالتأكيد."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="space-y-6" dir="rtl">
          <h2 className="text-2xl font-serif font-bold text-[#203A2B]">
            منتجات مكملة لروتينكِ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

