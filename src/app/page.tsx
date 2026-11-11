import Link from 'next/link';

export default function HomePage() {
  const categories = [
    { icon: '🌿', name: 'العناية بالبشرة', href: '/skincare', count: '14 منتج' },
    { icon: '💆', name: 'العناية بالشعر', href: '/haircare', count: '12 منتج' },
    { icon: '🧴', name: 'العناية بالجسم', href: '/bodycare', count: '8 منتجات' },
    { icon: '💄', name: 'المكياج', href: '/makeup', count: '10 منتجات' },
    { icon: '🌸', name: 'العطور', href: '/perfumes', count: '6 عطور' },
    { icon: '🧔', name: 'العناية بالرجال', href: '/mens-care', count: '5 منتجات' },
    { icon: '🎁', name: 'مجموعات الهدايا', href: '/store', count: 'مجموعات مختارة' },
  ];

  const features = [
    { icon: '🌿', title: 'مكونات طبيعية', desc: 'نختار أجود المكونات الطبيعية لبشرتك' },
    { icon: '🔬', title: 'مختبر معتمد', desc: 'منتجاتنا مختبرة ومعتمدة بأعلى المعايير' },
    { icon: '🚚', title: 'توصيل لكل مصر', desc: 'نوصل لجميع المحافظات المصرية الـ 27' },
    { icon: '↩️', title: 'إرجاع سهل', desc: 'ضمان استرداد كامل خلال 14 يوم' },
  ];

  return (
    <div dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-[#203A2B] via-[#354936] to-[#2d4030] min-h-[85vh] flex items-center overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#C9A96E] blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-[#A6B39A] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#C9A96E]/20 border border-[#C9A96E]/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-xs font-medium">جمال طبيعي، رعاية حقيقية</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#F6F1E7] leading-tight mb-4">
              رُوح
              <br />
              <span className="text-[#C9A96E]">Beauty</span>
            </h1>
            <p className="text-lg text-[#A6B39A] max-w-md leading-relaxed mb-8">
              اكتشفي عالماً من العناية الفاخرة بمكونات طبيعية مختارة بعناية لبشرة تشعرين بها
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/store" className="bg-[#C9A96E] hover:bg-[#b8955e] text-[#203A2B] font-bold px-8 py-3.5 rounded-xl text-base transition-colors shadow-lg">
                تسوق الآن مع رُوح
              </Link>
              <Link href="/about" className="border border-[#A6B39A]/40 text-[#A6B39A] hover:border-[#C9A96E] hover:text-[#C9A96E] px-8 py-3.5 rounded-xl text-base transition-colors">
                من نحن
              </Link>
            </div>
            <div className="flex gap-8 mt-10 text-center">
              {[['100%', 'طبيعي'], ['27', 'محافظة'], ['14', 'يوم ضمان']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-[#C9A96E]">{val}</div>
                  <div className="text-xs text-[#78866B]">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-[#C9A96E]/20 blur-3xl rounded-full scale-150" />
              {/* Main product mockup */}
              <div className="relative w-56 h-80 bg-gradient-to-b from-[#2d4030] to-[#1a2a1d] rounded-3xl border border-[#C9A96E]/30 shadow-2xl flex flex-col items-center justify-center">
                <div className="w-20 h-5 bg-[#C9A96E] rounded-full mb-4" />
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#C9A96E]/30 to-[#354936] border border-[#C9A96E]/40 flex items-center justify-center">
                  <span className="text-3xl font-black text-[#C9A96E]">ر</span>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-[#C9A96E] font-bold text-sm">رُوح</div>
                  <div className="text-[#78866B] text-xs">ROOH Beauty</div>
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute -right-16 top-10 bg-[#1a2d1e] border border-[#2a3d2e] rounded-xl p-3 text-xs shadow-lg">
                <div className="text-[#C9A96E] font-bold">سيروم فيتامين سي</div>
                <div className="text-[#78866B]">549 ج.م</div>
              </div>
              <div className="absolute -left-16 bottom-10 bg-[#1a2d1e] border border-[#2a3d2e] rounded-xl p-3 text-xs shadow-lg">
                <div className="text-green-400 text-xs">✅ شحن مجاني</div>
                <div className="text-[#78866B] text-xs">فوق 500 ج.م</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#FFFDF7] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#30332D]">تصنيفاتنا</h2>
            <p className="text-[#78866B] mt-2">اختاري ما يناسبك من مجموعتنا المتكاملة</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {categories.map(cat => (
              <Link key={cat.href} href={cat.href} className="group bg-white hover:bg-[#354936] border border-[#A6B39A]/20 hover:border-[#354936] rounded-2xl p-5 text-center transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="text-sm font-semibold text-[#30332D] group-hover:text-[#F6F1E7] transition-colors">{cat.name}</div>
                <div className="text-xs text-[#78866B] group-hover:text-[#A6B39A] mt-1 transition-colors">{cat.count}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-[#F6F1E7] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl font-black text-[#354936] mb-4">رُوح</div>
          <h2 className="text-2xl font-bold text-[#30332D] mb-4">قصة وُلدت من الطبيعة</h2>
          <p className="text-[#78866B] leading-relaxed text-base max-w-2xl mx-auto">
            رُوح ليست مجرد علامة تجارية — هي فلسفة عناية. نؤمن بأن الجمال الحقيقي يبدأ من الداخل،
            وينعكس على بشرتك بمكونات طبيعية نقية. كل منتج نصنعه يحمل روحاً، وكل قطرة قصة.
          </p>
          <Link href="/about" className="inline-flex mt-6 items-center gap-2 text-[#354936] font-semibold hover:text-[#C9A96E] transition-colors">
            اعرفي أكثر عن رُوح ←
          </Link>
        </div>
      </section>

      {/* Why ROOH */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#30332D]">لماذا رُوح؟</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(f => (
              <div key={f.title} className="text-center p-6 bg-[#FFFDF7] rounded-2xl border border-[#A6B39A]/20">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-[#30332D] mb-2">{f.title}</h3>
                <p className="text-sm text-[#78866B]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#354936] py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#F6F1E7] mb-3">ابدأي رحلتك مع رُوح</h2>
          <p className="text-[#A6B39A] mb-8">اكتشفي مجموعتنا الكاملة من منتجات العناية الفاخرة</p>
          <Link href="/store" className="bg-[#C9A96E] hover:bg-[#b8955e] text-[#203A2B] font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg inline-block">
            تسوق الآن مع رُوح 🛒
          </Link>
        </div>
      </section>
    </div>
  );
}
