import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Leaf, ArrowLeft, Award, Eye, Compass } from "lucide-react";
import { BotanicalDecoration } from "@/components/BotanicalDecoration";

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#354936]/10 text-[#354936] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>حكاية رُوح | ROOH Story</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          فخامة مستوحاة من أعماق الطبيعة
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          انطلقت رُوح من رؤية مصرية واعدة لتقديم مستحضرات تجميل وعناية فاخرة تضاهي أرقى المعايير العالمية، دون أي تنازل عن النقاء الطبيعي والسلامة الصحية.
        </p>
      </div>

      {/* Grid: Vision, Mission, Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E4DCD0] shadow-sm hover:shadow-lg transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F6F1E7] text-[#354936] flex items-center justify-center">
            <Eye className="w-6 h-6 text-[#C9A96E]" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#203A2B]">رؤيتنا</h3>
          <p className="text-sm text-[#6A7265] leading-relaxed">
            أن نكون العلامة الرائدة في الشرق الأوسط في مجال العناية النباتية النقية، ونعيد تعريف معنى الجمال الطبيعي الهادئ الموثوق.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E4DCD0] shadow-sm hover:shadow-lg transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F6F1E7] text-[#354936] flex items-center justify-center">
            <Compass className="w-6 h-6 text-[#C9A96E]" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#203A2B]">رسالتنا</h3>
          <p className="text-sm text-[#6A7265] leading-relaxed">
            تسخير خيرات شجرة الزيتون المباركة والنباتات الطبيعية في تركيبات علمية متطورة تمنح المرأة والرجل عناية حقيقية تدوم طويلاً.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E4DCD0] shadow-sm hover:shadow-lg transition-all space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F6F1E7] text-[#354936] flex items-center justify-center">
            <Award className="w-6 h-6 text-[#C9A96E]" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#203A2B]">قيمنا</h3>
          <p className="text-sm text-[#6A7265] leading-relaxed">
            الشفافية التامة في المكونات، احترام البيئة، الأناقة والرفاهية في التجربة، وتقديم أعلى مستويات الخدمة لعملائنا في كل شبر بمصر.
          </p>
        </div>
      </div>

      {/* Philosophy section with olive badge */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#F6F1E7] border border-[#E4DCD0] flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#203A2B]">
            الزيتون الأخضر.. سر خلود الجمال
          </h2>
          <p className="text-sm sm:text-base text-[#6A7265] leading-relaxed">
            اختارت رُوح زيت الزيتون البكر ومستخلصات أوراقه كعنصر محوري في منتجاتها، نظراً لغناه الاستثنائي بمضادات الأكسدة مثل البوليفينول وفيتامين E، التي تحمي خلايا الجلد من علامات التقدم بالسن وتمنحه ترطيباً عميقاً لا مثيل له.
          </p>
        </div>
        <Link
          href="/store"
          className="px-8 py-4 rounded-full bg-[#354936] hover:bg-[#203A2B] text-[#FFFDF7] font-bold text-sm shrink-0 shadow-md transition-all"
        >
          تسوق الآن مع رُوح
        </Link>
      </div>
    </div>
  );
}

