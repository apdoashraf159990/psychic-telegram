'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Record<number, number>>({});
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  const COUPONS: Record<string, number> = { 'ROOH10': 10, 'ROOH20': 20, 'WELCOME': 15 };

  const PRODUCTS: Record<number, { name: string; price: number }> = {
    1: { name: 'غسول الوجه اللطيف', price: 299 },
    2: { name: 'سيروم فيتامين سي', price: 549 },
    3: { name: 'كريم الترطيب اليومي', price: 399 },
    4: { name: 'شامبو ترطيب يومي', price: 229 },
    5: { name: 'ماسك الشعر بالكيراتين', price: 349 },
    6: { name: 'زيت الجسم الفاخر', price: 449 },
    7: { name: 'كريم الجسم المرطب', price: 269 },
    8: { name: 'عطر رُوح النخيل', price: 799 },
    9: { name: 'عطر نسمة الصباح', price: 699 },
    10: { name: 'غسول الرجال النشط', price: 249 },
    11: { name: 'بلسم الشفاه الطبيعي', price: 99 },
    12: { name: 'صابون الجسم الطبيعي', price: 149 },
    13: { name: 'سيروم الهيالورونيك', price: 489 },
    14: { name: 'كريم العين المضيء', price: 429 },
    15: { name: 'مجموعة العناية الكاملة', price: 1299 },
  };

  useEffect(() => {
    try {
      const c = localStorage.getItem('rooh_cart');
      if (c) setCart(JSON.parse(c));
    } catch {}
  }, []);

  const items = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ id: Number(id), qty, ...PRODUCTS[Number(id)] }))
    .filter(i => i.name);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 500 ? 0 : 40;
  const discountAmt = Math.round(subtotal * discount / 100);
  const total = subtotal + shipping - discountAmt;
  const freeShippingLeft = Math.max(0, 500 - subtotal);

  function updateQty(id: number, qty: number) {
    const newCart = { ...cart };
    if (qty <= 0) delete newCart[id];
    else newCart[id] = qty;
    setCart(newCart);
    localStorage.setItem('rooh_cart', JSON.stringify(newCart));
  }

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscount(COUPONS[code]);
      setCouponMsg(`✅ تم تطبيق كود الخصم — خصم ${COUPONS[code]}%`);
    } else {
      setDiscount(0);
      setCouponMsg('❌ كود الخصم غير صحيح');
    }
  }

  if (items.length === 0) return (
    <div dir="rtl" className="min-h-screen bg-[#FFFDF7] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-[#30332D] mb-2">سلتك فارغة</h1>
        <p className="text-[#78866B] mb-6">أضيفي منتجات من المتجر</p>
        <Link href="/store" className="bg-[#354936] text-[#F6F1E7] px-8 py-3 rounded-xl hover:bg-[#3f5842] transition-colors">
          تصفحي المتجر
        </Link>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen bg-[#FFFDF7]">
      <div className="bg-[#354936] text-[#F6F1E7] py-8 px-6 text-center">
        <h1 className="text-2xl font-bold">سلة التسوق</h1>
        <p className="text-[#A6B39A] text-sm mt-1">{items.length} منتجات</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Free shipping bar */}
          {freeShippingLeft > 0 && (
            <div className="bg-[#F6F1E7] rounded-xl p-4 border border-[#A6B39A]/20">
              <p className="text-sm text-[#354936] mb-2">🚚 أضيفي <strong>{freeShippingLeft.toLocaleString('ar-EG')} ج.م</strong> للحصول على شحن مجاني!</p>
              <div className="bg-[#A6B39A]/30 rounded-full h-2">
                <div className="bg-[#354936] h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }} />
              </div>
            </div>
          )}
          {shipping === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center text-sm text-green-700">
              🎉 مبروك! حصلتِ على شحن مجاني
            </div>
          )}

          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-[#A6B39A]/20 p-4 flex gap-4 items-center">
              {/* Product icon */}
              <div className="w-16 h-20 bg-gradient-to-b from-[#2d4030] to-[#1a2a1d] rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-[#C9A96E] font-bold text-lg">ر</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#30332D] text-sm mb-1">{item.name}</h3>
                <p className="text-[#354936] font-bold">{item.price.toLocaleString('ar-EG')} ج.م</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-full bg-[#F6F1E7] border border-[#A6B39A]/30 text-[#354936] font-bold flex items-center justify-center hover:bg-[#354936] hover:text-[#F6F1E7] transition-colors">-</button>
                <span className="w-8 text-center text-sm font-medium text-[#30332D]">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-full bg-[#F6F1E7] border border-[#A6B39A]/30 text-[#354936] font-bold flex items-center justify-center hover:bg-[#354936] hover:text-[#F6F1E7] transition-colors">+</button>
              </div>
              <div className="text-left min-w-16">
                <p className="font-bold text-[#354936] text-sm">{(item.price * item.qty).toLocaleString('ar-EG')} ج.م</p>
                <button onClick={() => updateQty(item.id, 0)} className="text-xs text-red-400 hover:text-red-600 mt-1">حذف</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Coupon */}
          <div className="bg-white rounded-2xl border border-[#A6B39A]/20 p-4">
            <h3 className="font-semibold text-[#30332D] mb-3 text-sm">كود الخصم</h3>
            <div className="flex gap-2">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="أدخل الكود" className="flex-1 border border-[#A6B39A]/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#354936]" />
              <button onClick={applyCoupon} className="bg-[#354936] text-[#F6F1E7] px-3 py-2 rounded-lg text-sm hover:bg-[#3f5842] transition-colors">تطبيق</button>
            </div>
            {couponMsg && <p className={`text-xs mt-2 ${couponMsg.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>{couponMsg}</p>}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl border border-[#A6B39A]/20 p-5">
            <h3 className="font-semibold text-[#30332D] mb-4">ملخص الطلب</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[#30332D]">
                <span>المجموع الفرعي</span>
                <span>{subtotal.toLocaleString('ar-EG')} ج.م</span>
              </div>
              <div className="flex justify-between text-[#30332D]">
                <span>الشحن</span>
                <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>{shipping === 0 ? 'مجاني 🎉' : `${shipping} ج.م`}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>خصم ({discount}%)</span>
                  <span>-{discountAmt.toLocaleString('ar-EG')} ج.م</span>
                </div>
              )}
              <div className="border-t border-[#A6B39A]/20 pt-3 flex justify-between font-bold text-[#354936] text-base">
                <span>الإجمالي</span>
                <span>{total.toLocaleString('ar-EG')} ج.م</span>
              </div>
            </div>
            <Link href="/store/checkout" className="mt-5 w-full bg-[#354936] hover:bg-[#3f5842] text-[#F6F1E7] py-3.5 rounded-xl text-center font-bold text-base transition-colors block">
              إتمام الطلب ←
            </Link>
            <Link href="/store" className="mt-2 w-full text-center text-sm text-[#78866B] hover:text-[#354936] block py-2 transition-colors">
              مواصلة التسوق
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
