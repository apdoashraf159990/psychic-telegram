import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import '../globals.css';

const cairo = Cairo({ subsets: ['arabic', 'latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'دخول المدير — رُوح',
  robots: { index: false, follow: false },
};

export default function OwnerAccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-[#0f1a12]`}>
        {children}
      </body>
    </html>
  );
}

