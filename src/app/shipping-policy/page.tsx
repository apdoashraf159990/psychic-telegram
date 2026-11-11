import React from "react";
import Link from "next/link";
import { Truck, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";
import { EGYPT_GOVERNORATES } from "@/lib/egypt-locations";
import { formatEGP } from "@/lib/currency";

export default function ShippingPolicyPage() {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#354936]/10 text-[#354936] text-xs font-semibold">
          <Truck className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>ROOH Delivery Express</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          سياسة الشحن والتوصيل لجميع محافظات مصر
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          نحرص على توصيل منتجاتكِ بأعلى معايير الأمان والتغليف الفاخر المبرد لضمان الحفاظ على جودة ونقاء الزيوت والمستخلصات الطبيعية.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#E4DCD0] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F6F1E7] text-[#354936] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#C9A96E]" />
          </div>
          <h3 className="font-bold text-base text-[#203A2B]">سرعة التوصيل</h3>
          <p className="text-xs text-[#78866B] leading-relaxed">
            يصلك طلبك خلال 24 إلى 48 ساعة داخل الإسكندرية والقاهرة الكبرى، وخلال 2-4 أيام لباقي محافظات الدلتا والصعيد.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E4DCD0] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F6F1E7] text-[#354936] flex items-center justify-center">
            <Truck className="w-5 h-5 text-[#C9A96E]" />
          </div>
          <h3 className="font-bold text-base text-[#203A2B]">شحن مجاني</h3>
          <p className="text-xs text-[#78866B] leading-relaxed">
            استمتعي بشحن مجاني بالكامل عند وصول قيمة طلبك إلى 600 ج.م أو أكثر لأي محافظة في مصر.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#E4DCD0] shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F6F1E7] text-[#354936] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#C9A96E]" />
          </div>
          <h3 className="font-bold text-base text-[#203A2B]">معاينة الطلب عند الاستلام</h3>
          <p className="text-xs text-[#78866B] leading-relaxed">
            يحق لكِ فحص وتأكيد الطرد مع مندوب التوصيل قبل دفع المبلغ نقداً لضمان راحة بالكِ التامة.
          </p>
        </div>
      </div>

      {/* Governorates Table */}
      <div className="p-8 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#203A2B]">
          جدول تسعيرة الشحن لكافة الـ 27 محافظة مصرية
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm" dir="rtl">
            <thead>
              <tr className="border-b border-[#E4DCD0] text-xs font-bold text-[#354936] bg-[#F6F1E7]">
                <th className="p-3">المحافظة</th>
                <th className="p-3">الاسم بالإنجليزية</th>
                <th className="p-3">تكلفة الشحن</th>
                <th className="p-3">المدة التقديرية للتوصيل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DCD0]/50 text-xs">
              {EGYPT_GOVERNORATES.map((gov) => (
                <tr key={gov.id} className="hover:bg-[#FAF8F5]">
                  <td className="p-3 font-semibold text-[#30332D]">{gov.nameAr}</td>
                  <td className="p-3 text-[#78866B] font-sans">{gov.nameEn}</td>
                  <td className="p-3 font-bold text-[#203A2B]">{formatEGP(gov.shippingFee, "ar")}</td>
                  <td className="p-3 text-[#78866B]">{gov.estimatedDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

