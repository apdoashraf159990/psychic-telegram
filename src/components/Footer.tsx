'use client';
import Link from 'next/link';
import { ROOH } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-[#203A2B] text-[#F6F1E7]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="text-3xl font-bold text-[#C9A96E] mb-2">{ROOH.nameAr}</div>
          <div className="text-sm text-[#A6B39A] mb-4">{ROOH.tagline}</div>
          <div className="flex gap-4 mt-4">
            {[
              { href: ROOH.instagram, label: 'Instagram', icon: 'IG' },
              { href: ROOH.facebook, label: 'Facebook', icon: 'FB' },
              { href: ROOH.tiktok, label: 'TikTok', icon: 'TT' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#78866B] flex items-center justify-center text-xs hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-[#C9A96E] font-semibold mb-4">التصنيفات</h3>
          <ul className="space-y-2 text-sm text-[#A6B39A]">
            {[
              ['العناية بالبشرة', '/skincare'],
              ['العناية بالشعر', '/haircare'],
              ['العناية بالجسم', '/bodycare'],
              ['المكياج', '/makeup'],
              ['العطور', '/perfumes'],
              ['العناية بالرجال', '/mens-care'],
            ].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-[#C9A96E] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-[#C9A96E] font-semibold mb-4">المساعدة</h3>
          <ul className="space-y-2 text-sm text-[#A6B39A]">
            {[
              ['تتبع طلبك', '/store/account'],
              ['سياسة الشحن', '/shipping-policy'],
              ['الإرجاع والاستبدال', '/returns-refunds-policy'],
              ['الأسئلة الشائعة', '/faqs'],
              ['تواصل معنا', '/contact'],
            ].map(([label, href]) => (
              <li key={href}><Link href={href} className="hover:text-[#C9A96E] transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#C9A96E] font-semibold mb-4">تواصل معنا</h3>
          <div className="space-y-2 text-sm text-[#A6B39A]">
            <p>{ROOH.phone}</p>
            <p>{ROOH.email}</p>
            <p>الإسكندرية، مصر</p>
          </div>
          <div className="mt-6">
            <p className="text-xs text-[#78866B] mb-2">طرق الدفع</p>
            <div className="flex flex-wrap gap-2">
              {['فودافون كاش', 'أورنچ كاش', 'الدفع عند الاستلام', 'فيزا/ماستر'].map(m => (
                <span key={m} className="text-[10px] border border-[#354936] rounded px-2 py-0.5 text-[#A6B39A]">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#354936]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* SECRET OWNER LINK — very small, hidden left */}
          <Link
            href="/owner-access"
            className="text-[9px] text-[#2a3d2e] hover:text-[#78866B] transition-colors select-none"
            title=""
            tabIndex={-1}
          >
            ⬡
          </Link>

          <p className="text-xs text-[#4a5e4c]">
            © {new Date().getFullYear()} {ROOH.nameAr} — جميع الحقوق محفوظة
          </p>

          <div className="flex gap-4 text-xs text-[#4a5e4c]">
            <Link href="/privacy-policy" className="hover:text-[#A6B39A] transition-colors">الخصوصية</Link>
            <Link href="/terms" className="hover:text-[#A6B39A] transition-colors">الشروط</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
