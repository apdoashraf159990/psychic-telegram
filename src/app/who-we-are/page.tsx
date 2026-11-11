import React from "react";
import Link from "next/link";
import { Users, Award, Shield, CheckCircle2, ArrowLeft } from "lucide-react";

export default function WhoWeArePage() {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          من نحن | علامة رُوح
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          نحن فريق مصري شغوف بالجمال الطبيعي، يضم خبراء كيمياء تجميلية ومتخصصين في المستخلصات النباتية الطبية، تجمعنا غاية واحدة: ابتكار مستحضرات تجميل آمنة ونقية 100%.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-8 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#203A2B]">فريق العمل والخبرة</h2>
          <p className="text-sm text-[#6A7265] leading-relaxed">
            يخضع كل مستحضر يحمل اسم <strong>رُوح</strong> لأشهر من التطوير الدقيق لضمان الوصول إلى التركيبة المثالية من حيث الفعالية والملمس والامتصاص السريع.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-[#30332D]">
              <CheckCircle2 className="w-5 h-5 text-[#354936]" />
              <span>فريق استشاري متخصص في أحدث علوم العناية بالبشرة</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#30332D]">
              <CheckCircle2 className="w-5 h-5 text-[#354936]" />
              <span>مختبرات مصرية متطورة معتمدة تطبق أعلى معايير الجودة الدولية</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#30332D]">
              <CheckCircle2 className="w-5 h-5 text-[#354936]" />
              <span>فريق دعم عملاء متاح يومياً لمساعدتكِ خطوة بخطوة</span>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[#203A2B] text-white space-y-6 shadow-xl">
          <h2 className="text-2xl font-serif font-bold text-[#C9A96E]">ثقة وأصالة</h2>
          <p className="text-sm text-[#A6B39A] leading-relaxed">
            جميع منتجاتنا مسجلة ومطابقة للمواصفات القياسية المصرية. نحن لا نعد بنتائج خارقة غير واقعية، بل نعدكِ بعناية نقية تغذي بشرتكِ يومياً وتعيد إليها توازنها الصحي الطبيعي.
          </p>
          <div className="pt-2">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A96E] text-[#203A2B] font-bold text-sm shadow hover:bg-[#B39255] transition-colors"
            >
              <span>تسوقي باقة منتجاتنا الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

