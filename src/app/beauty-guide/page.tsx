import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, CheckCircle2, Droplets, Sun, Moon, ArrowLeft, Heart, Shield } from "lucide-react";

export default function BeautyGuidePage() {
  const chapters = [
    {
      id: "skincare-types",
      title: "الفصل الأول: كيف تحددين نوع بشرتك بدقة؟",
      desc: "دليل عملي للتعرف على الفرق بين البشرة الجافة، الدهنية، المختلطة، والعادية، وكيفية العناية بكل نوع.",
      content: [
        "البشرة الجافة: تشعر بالشد بعد الغسول وتحتاج لمرطبات كثيفة غنية بالسيراميد وزيت الزيتون المعصور على البارد.",
        "البشرة الدهنية: تفرز زيوتاً في منطقة T-Zone والخدين، وتحتاج لمكونات موازنة للإفرازات مثل النياسيناميد وحمض الهيالورونيك.",
        "البشرة المختلطة: دهنية في الجبين والأنف وجافة أو عادية في الخدين، يناسبها روتين متعدد الطبقات الخفيفة.",
        "البشرة الحساسة: سريعة الاحمرار والتهيج، وتتطلب مستحضرات خالية تماماً من العطور الاصطناعية والكحول.",
      ],
    },
    {
      id: "active-ingredients",
      title: "الفصل الثاني: المكونات الفعالة واستخداماتها الآمنة",
      desc: "شرح مفصل لمكونات مثل الهيالورونيك، فيتامين سي، وزيت الزيتون، وأفضل أوقات تطبيقها صباحاً ومساءً.",
      content: [
        "فيتامين سي (Vitamin C): مضاد أكسدة قوي يُفضل تطبيقه صباحاً قبل واقي الشمس لحماية البشرة من التصبغات وأشعة الشمس الضارة.",
        "حمض الهيالورونيك (Hyaluronic Acid): مغناطيس الترطيب، يُوضع دائماً على بشرة ندية بالماء ليجذب الرطوبة لداخل الخلايا.",
        "زيت الزيتون البكر (Virgin Olive Oil): مصدر غني بالسكوالين النباتي وأحماض أوميغا الدهنية لترميم الحاجز الجلدي ليلاً.",
        "إكليل الجبل (Rosemary Oil): محفز استثنائي للدورة الدموية في فروة الرأس، يساعد على تنشيط بصيلات الشعر والحد من التساقط.",
      ],
    },
    {
      id: "daily-haircare",
      title: "الفصل الثالث: أسرار العناية بالشعر في المناخ المصري",
      desc: "كيف تحمين شعرك من عوامل الرطوبة والحرارة والماء العسر، وخطوات الترميم الأسبوعية.",
      content: [
        "تجنبي الشامبوهات التي تحتوي على سلفات الصوديوم لأنها تجرد الشعر من زيوته الطبيعية وتزيد التقصف.",
        "استخدمي ماسك الترميم بالأرجان مرة أسبوعياً واتركيه لمدة 15 دقيقة تحت منشفة دافئة.",
        "احرصي على وضع قطرات من إكسير الزيوت الطبيعية على أطراف الشعر المبلل قبل التجفيف لتكوين طبقة عازلة تحمي من الحرارة.",
      ],
    },
    {
      id: "perfume-longevity",
      title: "الفصل الرابع: كيف تجعلين عطرك يدوم لأكثر من 24 ساعة؟",
      desc: "أماكن النبض، ترطيب البشرة قبل الرش، وقواعد تثبيت العطور الشرقية والزهرية.",
      content: [
        "الترطيب أولاً: العطر يتبخر أسرع على البشرة الجافة، ضعي طبقة خفيفة من لوشن الجسم غير المعطر قبل رش العطر.",
        "أماكن النبض: المعصمين، الرقبة، خلف شحمة الأذن، وثنية الكوع.",
        "لا تفركي معصميكِ بعد الرش حتى لا تتفكك الجزيئات العطرية العليا.",
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#354936]/10 text-[#354936] text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span>الموسوعة التعليمية | ROOH Beauty Guide</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          دليل رُوح الشامل للجمال والعناية
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          مرجعكِ الموثوق لفهم احتياجات بشرتكِ وشعركِ، والتعرف على أسرار العناية الطبيعية السليمة المعتمدة على أسس علمية ونباتية موثقة.
        </p>
      </div>

      {/* Chapters list */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {chapters.map((ch, idx) => (
          <div key={ch.id} className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E4DCD0] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DCD0]">
              <h2 className="text-xl font-serif font-bold text-[#203A2B]">{ch.title}</h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#F6F1E7] text-[#354936] font-bold">
                مقال {idx + 1}
              </span>
            </div>
            <p className="text-sm text-[#78866B] font-medium leading-relaxed">
              {ch.desc}
            </p>
            <div className="space-y-2.5 pt-2">
              {ch.content.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#30332D] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#354936] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Link to store */}
      <div className="text-center pt-8">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#354936] hover:bg-[#203A2B] text-white font-bold text-sm shadow-lg transition-all"
        >
          <span>تصفحي المنتجات المتوافقة مع نوع بشرتكِ في المتجر</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

