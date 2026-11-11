import React from "react";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ReturnsRefundsPolicyPage() {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#354936]/10 text-[#354936] text-xs font-semibold">
          <RotateCcw className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>ضمان رضا العملاء 100%</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          سياسة الاسترجاع والاسترداد
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          نحن واثقون من جودة ونقاء تركيباتنا، ويسرنا تيسير إجراءات الاسترجاع أو الاستبدال وفق شروط واضحة وعادلة تحمي حقوقكِ.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm space-y-8 text-sm leading-relaxed text-[#30332D]">
        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-[#203A2B]">1. مهلة الاسترجاع والاستبدال</h2>
          <p className="text-[#6A7265]">
            يحق للعميل طلب استرجاع أو استبدال أي منتج خلال <strong>14 يوماً</strong> من تاريخ استلام الطلب الفعلي، شريطة أن يكون المنتج بحالته الأصلية غير مفتوح أو مستخدم ومحتفظاً بغلاف الأمان والملصق الخاص به.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-[#203A2B]">2. حالات التلف أو الخطأ في الطلب</h2>
          <p className="text-[#6A7265]">
            في حال استلام منتج تالف أو غير مطابق لما تم طلبه، تتحمل رُوح كافة مصاريف الشحن للإرجاع، ويتم إرسال بديل فوري خلال 48 ساعة أو استرداد كامل المبلغ المدفوع.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-[#203A2B]">3. طريقة استرداد الأموال</h2>
          <ul className="space-y-2 text-[#6A7265]">
            <li>• في حال الدفع بمحفظة إلكترونية (فودافون كاش، أورنج، اتصالات، وي باي): يتم رد المبلغ فورياً لنفس المحفظة خلال 24 ساعة من فحص المرتجع.</li>
            <li>• في حال الدفع بالبطاقة البنكية: يتم رد المبلغ لحساب البطاقة وفق قواعد البنك المصدر (خلال 3 إلى 7 أيام عمل).</li>
            <li>• في حال الدفع عند الاستلام: يتم تحويل المبلغ عبر المحفظة الإلكترونية التي يحددها العميل أو عبر إيداع بنكي مباشر.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-serif font-bold text-[#203A2B]">4. كيفية تقديم طلب الاسترجاع</h2>
          <p className="text-[#6A7265]">
            يمكنكِ تقديم الطلب مباشرة عبر حسابكِ في المتجر من قسم "طلبات الاسترجاع" أو بالتواصل المباشر مع خدمة العملاء عبر هاتف 01098765432 أو محادثة الموقع الحية.
          </p>
        </section>
      </div>
    </div>
  );
}

