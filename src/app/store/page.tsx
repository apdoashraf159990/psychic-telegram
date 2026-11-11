'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const MOCK_PRODUCTS = [
  { id: 1, slug: 'gentle-facial-cleanser', name: 'غسول الوجه اللطيف', nameEn: 'Gentle Facial Cleanser', category: 'skincare', price: 299, originalPrice: 350, stock: 50, badge: 'الأكثر مبيعاً' },
  { id: 2, slug: 'vitamin-c-serum', name: 'سيروم فيتامين سي', nameEn: 'Vitamin C Serum', category: 'skincare', price: 549, originalPrice: null, stock: 30, badge: 'جديد' },
  { id: 3, slug: 'daily-moisturizer', name: 'كريم الترطيب اليومي', nameEn: 'Daily Moisturizer', category: 'skincare', price: 399, originalPrice: null, stock: 45, badge: null },
  { id: 4, slug: 'moisturizing-shampoo', name: 'شامبو ترطيب يومي', nameEn: 'Moisturizing Shampoo', category: 'haircare', price: 229, originalPrice: 280, stock: 60, badge: 'خصم 18%' },
  { id: 5, slug: 'keratin-hair-mask', name: 'ماسك الشعر بالكيراتين', nameEn: 'Keratin Hair Mask', category: 'haircare', price: 349, originalPrice: null, stock: 35, badge: null },
  { id: 6, slug: 'luxury-body-oil', name: 'زيت الجسم الفاخر', nameEn: 'Luxury Body Oil', category: 'bodycare', price: 449, originalPrice: null, stock: 20, badge: 'فاخر' },
  { id: 7, slug: 'body-moisturizer', name: 'كريم الجسم المرطب', nameEn: 'Body Moisturizer', category: 'bodycare', price: 269, originalPrice: null, stock: 55, badge: null },
  { id: 8, slug: 'rooh-palm-perfume', name: 'عطر رُوح النخيل', nameEn: 'Rooh Palm Perfume', category: 'perfumes', price: 799, originalPrice: null, stock: 15, badge: 'حصري' },
  { id: 9, slug: 'morning-breeze', name: 'عطر نسمة الصباح', nameEn: 'Morning Breeze', category: 'perfumes', price: 699, originalPrice: null, stock: 18, badge: null },
  { id: 10, slug: 'mens-active-wash', name: 'غسول الرجال النشط', nameEn: "Men's Active Wash", category: 'mens', price: 249, originalPrice: null, stock: 40, badge: null },
  { id: 11, slug: 'natural-lip-balm', name: 'بلسم الشفاه الطبيعي', nameEn: 'Natural Lip Balm', category: 'makeup', price: 99, originalPrice: null, stock: 100, badge: 'ضروري' },
  { id: 12, slug: 'natural-body-soap', name: 'صابون الجسم الطبيعي', nameEn: 'Natural Body Soap', category: 'bodycare', price: 149, originalPrice: null, stock: 80, badge: null },
  { id: 13, slug: 'hyaluronic-serum', name: 'سيروم الهيالورونيك', nameEn: 'Hyaluronic Serum', category: 'skincare', price: 489, originalPrice: null, stock: 25, badge: 'جديد' },
  { id: 14, slug: 'eye-cream', name: 'كريم العين المضيء', nameEn: 'Brightening Eye Cream', category: 'skincare', price: 429, originalPrice: null, stock: 22, badge: null },
  { id: 15, slug: 'complete-care-set', name: 'مجموعة العناية الكاملة', nameEn: 'Complete Care Set', category: 'gifts', price: 1299, originalPrice: 1500, stock: 10, badge: 'هدية مثالية' },
];

const CATS = [
  { id: 'all', label: 'الكل' },
  { id: 'skincare', label: 'العناية بالبشرة' },
  { id: 'haircare', label: 'الشعر' },
  { id: 'bodycare', label: 'الجسم' },
  { id: 'makeup', label: 'المكياج' },
  { id: 'perfumes', label: 'العطور' },
  { id: 'mens', label: 'الرجال' },
  { id: 'gifts', label: 'هدايا' },
];

export default function StorePage() {
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    try {
      const c = localStorage.getItem('rooh_cart');
      if (c) setCart(JSON.parse(c));
      const w = localStorage.getItem('rooh_wishlist');
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);

  function saveCart(newCart: Record<number, number>) {
    setCart(newCart);
    localStorage.setItem('rooh_cart', JSON.stringify(newCart));
  }

  function addToCart(id: number, name: string) {
    const newCart = { ...cart, [id]: (cart[id] || 0) + 1 };
    saveCart(newCart);
    setNotification(`✅ تمت إضافة "${name}" للسلة`);
    setTimeout(() => setNotification(''), 2500);
  }

  function toggleWishlist(id: number) {
    const updated = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem('rooh_wishlist', JSON.stringify(updated));
  }

  let filtered = MOCK_PRODUCTS.filter(p => {
    const matchCat = cat === 'all' || p.category === cat;
    const matchSearch = !search || p.name.includes(search) || p.nameEn.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);

  const totalCartItems = Object.values(cart).reduce((s, v) => s + v, 0);

  return (
    <div dir="rtl" className="min-h-screen bg-[#FFFDF7]">
      {/* Header */}
      <div className="bg-[#354936] text-[#F6F1E7] py-10 px-6 text-center">
        <h1 className="text-3xl font-bold mb-1">متجر رُوح للعناية والجمال</h1>
        <p className="text-[#A6B39A] text-sm">اكتشفي {MOCK_PRODUCTS.length} منتج فاخر</p>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-[#354936] text-[#F6F1E7] px-5 py-3 rounded-xl shadow-xl text-sm animate-bounce">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="🔍 ابحث عن منتج..."
            className="bg-white border border-[#A6B39A]/30 rounded-xl px-4 py-2.5 text-sm text-[#30332D] focus:outline-none focus:border-[#354936] w-full sm:w-72"
          />
          <div className="flex items-center gap-3">
            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-white border border-[#A6B39A]/30 rounded-xl px-3 py-2.5 text-sm text-[#30332D] focus:outline-none">
              <option value="default">الترتيب الافتراضي</option>
              <option value="price_asc">السعر: الأقل أولاً</option>
              <option value="price_desc">السعر: الأعلى أولاً</option>
            </select>
            <Link href="/store/cart" className="relative bg-[#354936] text-[#F6F1E7] px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 hover:bg-[#3f5842] transition-colors">
              🛒 السلة
              {totalCartItems > 0 && <span className="bg-[#C9A96E] text-[#203A2B] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{totalCartItems}</span>}
            </Link>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {CATS.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c.id ? 'bg-[#354936] text-[#F6F1E7]' : 'bg-white text-[#78866B] border border-[#A6B39A]/30 hover:border-[#354936]'}`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#A6B39A]/20 overflow-hidden hover:shadow-md transition-shadow group">
              {/* Product Image Area */}
              <div className="relative bg-gradient-to-br from-[#F6F1E7] to-[#e8e3d9] h-40 flex items-center justify-center">
                {p.badge && <span className="absolute top-2 right-2 bg-[#354936] text-[#F6F1E7] text-[10px] px-2 py-0.5 rounded-full z-10">{p.badge}</span>}
                <button onClick={() => toggleWishlist(p.id)} className="absolute top-2 left-2 text-lg z-10">
                  {wishlist.includes(p.id) ? '❤️' : '🤍'}
                </button>
                {/* SVG Packaging Mockup */}
                <div className="w-20 h-28 bg-gradient-to-b from-[#2d4030] to-[#1a2a1d] rounded-2xl border border-[#C9A96E]/30 flex flex-col items-center justify-center shadow-md">
                  <div className="text-[#C9A96E] font-bold text-lg">ر</div>
                  <div className="text-[8px] text-[#78866B] mt-1">ROOH</div>
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <Link href={`/store/product/${p.slug}`}>
                  <h3 className="text-xs font-semibold text-[#30332D] mb-0.5 leading-tight hover:text-[#354936] transition-colors line-clamp-2">{p.name}</h3>
                  <p className="text-[10px] text-[#78866B] mb-2 line-clamp-1">{p.nameEn}</p>
                </Link>
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-sm font-bold text-[#354936]">{p.price.toLocaleString('ar-EG')} ج.م</span>
                  {p.originalPrice && <span className="text-[10px] text-[#A6B39A] line-through">{p.originalPrice.toLocaleString('ar-EG')}</span>}
                </div>
                <button
                  onClick={() => addToCart(p.id, p.name)}
                  disabled={p.stock === 0}
                  className="w-full bg-[#354936] hover:bg-[#3f5842] text-[#F6F1E7] py-2 rounded-xl text-xs font-medium transition-colors disabled:opacity-40"
                >
                  {p.stock === 0 ? 'نفد المخزون' : 'أضف للسلة +'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#78866B]">
            <div className="text-5xl mb-4">🔍</div>
            <p>لم يتم العثور على منتجات</p>
          </div>
        )}
      </div>
    </div>
  );
}
