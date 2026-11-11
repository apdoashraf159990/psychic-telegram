"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, Heart, RotateCcw, Clock, CheckCircle2, ChevronRight, Printer, Phone } from "lucide-react";
import { formatEGP } from "@/lib/currency";

export default function CustomerAccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "wishlist" | "returns">("orders");

  // Realistic sample order state
  const [orders, setOrders] = useState([
    {
      id: "ord_1001",
      orderNumber: "ROOH-EG-2026-0042",
      invoiceNumber: "INV-2026-0042",
      createdAt: "2026-11-10T14:30:00Z",
      status: "OUT_FOR_DELIVERY",
      statusLabel: "خرج للتوصيل مع مندوب رُوح",
      governorate: "الإسكندرية (سموحة)",
      totalAmount: 620,
      paymentMethod: "فودافون كاش (Vodafone Cash)",
      items: [
        { name: "سيروم الهيالورونيك أسيد المركز", qty: 1, price: 380 },
        { name: "غسول الوجه اللطيف بخلاصة الزيتون", qty: 1, price: 240 },
      ],
    },
  ]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" dir="rtl">
      {/* Account Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#203A2B] to-[#354936] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-[#3A5644]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#354936] border-2 border-[#C9A96E] flex items-center justify-center text-white text-2xl font-bold font-serif">
            ي
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold">حساب العميل | ياسمين أحمد</h1>
            <p className="text-xs text-[#E4DCD0] mt-0.5">01098765432 • عميلة مميزة في رُوح (120 نقطة ولاء)</p>
          </div>
        </div>

        <Link
          href="/store"
          className="px-6 py-2.5 rounded-full bg-[#C9A96E] hover:bg-[#B39255] text-[#203A2B] font-bold text-xs shadow"
        >
          متابعة التسوق في المتجر
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E4DCD0] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === "orders" ? "bg-[#354936] text-white shadow" : "bg-white text-[#78866B] border border-[#E4DCD0]"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>طلباتي وتتبع الشحنات ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("addresses")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === "addresses" ? "bg-[#354936] text-white shadow" : "bg-white text-[#78866B] border border-[#E4DCD0]"
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>العناوين المحفوظة</span>
        </button>

        <button
          onClick={() => setActiveTab("wishlist")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === "wishlist" ? "bg-[#354936] text-white shadow" : "bg-white text-[#78866B] border border-[#E4DCD0]"
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>قائمة أمنياتي</span>
        </button>

        <button
          onClick={() => setActiveTab("returns")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
            activeTab === "returns" ? "bg-[#354936] text-white shadow" : "bg-white text-[#78866B] border border-[#E4DCD0]"
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>طلبات الاسترجاع والاستبدال</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="p-6 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm space-y-6">
              {/* Order Top Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DCD0]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-[#354936]">{order.orderNumber}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                      {order.statusLabel}
                    </span>
                  </div>
                  <div className="text-xs text-[#78866B] mt-1">
                    بتاريخ: {new Date(order.createdAt).toLocaleDateString("ar-EG")} • الفاتورة: {order.invoiceNumber}
                  </div>
                </div>

                <div className="text-left">
                  <div className="text-base font-bold text-[#203A2B]">{formatEGP(order.totalAmount, "ar")}</div>
                  <div className="text-xs text-[#78866B]">{order.paymentMethod}</div>
                </div>
              </div>

              {/* Delivery Progress Bar */}
              <div className="p-4 rounded-2xl bg-[#F6F1E7]/70 border border-[#E4DCD0] space-y-3">
                <div className="text-xs font-bold text-[#203A2B] flex items-center justify-between">
                  <span>حالة تتبع الشحنة مع ROOH Delivery:</span>
                  <span className="text-[#354936]">المندوب في طريقه لعنوانكِ بالإسكندرية</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold text-[#78866B]">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">1. تم التأكيد ✓</div>
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">2. تم التجهيز ✓</div>
                  <div className="p-2 rounded-lg bg-amber-200 text-amber-900 font-bold animate-pulse">3. في الطريق إليكِ</div>
                  <div className="p-2 rounded-lg bg-white border border-[#E4DCD0]">4. تم التسليم</div>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-[#E4DCD0]">
                {order.items.map((it, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-semibold text-[#30332D]">{it.name} (×{it.qty})</span>
                    <span className="font-bold text-[#354936]">{formatEGP(it.price * it.qty, "ar")}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => alert(`طباعة فاتورة الطلب ${order.invoiceNumber}`)}
                  className="px-4 py-2 rounded-full border border-[#E4DCD0] text-xs font-semibold text-[#30332D] hover:bg-[#F6F1E7] flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة الفاتورة الضريبية</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "addresses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#354936] shadow-sm space-y-3 relative">
            <span className="absolute top-4 left-4 text-[10px] font-bold bg-[#354936] text-white px-2.5 py-0.5 rounded-full">
              العنوان الافتراضي
            </span>
            <h3 className="font-bold text-sm text-[#203A2B]">المنزل (الإسكندرية)</h3>
            <p className="text-xs text-[#6A7265] leading-relaxed">
              شارع فوزي معاذ، برج النخيل، سموحة، الدور 4، شقة 12، الإسكندرية.
            </p>
            <div className="text-xs text-[#78866B]">هاتف المستلم: 01098765432</div>
          </div>
        </div>
      )}

      {activeTab === "wishlist" && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#E4DCD0]">
          <p className="text-sm text-[#78866B]">جميع منتجاتكِ المفضلة محفوظة ويمكنكِ نقلها لسلة التسوق في أي وقت.</p>
        </div>
      )}

      {activeTab === "returns" && (
        <div className="p-8 rounded-3xl bg-white border border-[#E4DCD0] text-center space-y-3">
          <h3 className="font-serif font-bold text-lg text-[#203A2B]">لا توجد طلبات استرجاع حالية</h3>
          <p className="text-xs text-[#78866B] max-w-md mx-auto">
            جميع مشترياتكِ مشمولة بضمان رُوح الذهبي للاسترجاع والاستبدال خلال 14 يوماً من الاستلام.
          </p>
        </div>
      )}
    </div>
  );
}

