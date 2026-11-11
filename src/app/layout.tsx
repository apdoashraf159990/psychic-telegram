import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'رُوح | ROOH Beauty & Care',
  description: 'جمال طبيعي، رعاية حقيقية — منتجات عناية فاخرة من الإسكندرية',
  keywords: ['رُوح', 'ROOH', 'مستحضرات تجميل', 'عناية بشرة', 'مصر', 'الإسكندرية'],
  openGraph: {
    title: 'رُوح | ROOH Beauty & Care',
    description: 'جمال طبيعي، رعاية حقيقية',
    locale: 'ar_EG',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo bg-[#FFFDF7] text-[#30332D] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
