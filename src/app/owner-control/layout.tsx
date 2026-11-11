import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import '../globals.css';

const cairo = Cairo({ subsets: ['arabic', 'latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'لوحة التحكم — رُوح',
  robots: { index: false, follow: false },
};

// Owner control center has its OWN layout (no public Navbar/Footer)
export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-[#0f1a12] text-[#F6F1E7]`}>
        {children}
      </body>
    </html>
  );
}

