'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: 'من نحن' },
    { href: '/store', label: 'المتجر' },
    { href: '/skincare', label: 'العناية بالبشرة' },
    { href: '/haircare', label: 'الشعر' },
    { href: '/perfumes', label: 'العطور' },
    { href: '/beauty-guide', label: 'دليل الجمال' },
    { href: '/contact', label: 'تواصل معنا' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF7]/95 backdrop-blur-sm border-b border-[#A6B39A]/20" dir="rtl">
      {/* Announcement Bar */}
      <div className="bg-[#354936] text-[#F6F1E7] text-center text-xs py-2 px-4">
        🎁 شحن مجاني للطلبات فوق 500 ج.م داخل الإسكندرية | 📞 +20 100 000 0000
      </div>

      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <span className="text-2xl font-bold text-[#354936] leading-none">رُوح</span>
          <span className="text-[8px] text-[#78866B] tracking-widest uppercase">ROOH Beauty</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map(l => (
            <li key={l.href}>
              <Link href={l.href} className="text-[#30332D] hover:text-[#354936] transition-colors font-medium">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/store/cart" className="relative p-2 hover:bg-[#F6F1E7] rounded-lg transition-colors" aria-label="السلة">
            <svg className="w-5 h-5 text-[#354936]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6M9 21h6" />
            </svg>
          </Link>
          <Link href="/store" className="hidden sm:flex bg-[#354936] text-[#F6F1E7] text-sm px-4 py-2 rounded-lg hover:bg-[#3f5842] transition-colors">
            تسوق الآن
          </Link>
          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(o => !o)} className="md:hidden p-2 hover:bg-[#F6F1E7] rounded-lg" aria-label="القائمة">
            <div className="space-y-1">
              <span className={`block w-5 h-0.5 bg-[#354936] transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#354936] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#354936] transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#A6B39A]/20 px-4 py-4">
          <ul className="space-y-3">
            {navLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setMenuOpen(false)} className="block text-[#30332D] hover:text-[#354936] font-medium py-1">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
