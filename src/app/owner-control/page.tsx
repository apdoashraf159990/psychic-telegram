'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ============================================================
// ROOH OWNER CONTROL CENTER
// All sections in one file for reliability
// ============================================================

type Section =
  | 'overview' | 'products' | 'orders' | 'customers'
  | 'inventory' | 'shipping' | 'payments' | 'accounting'
  | 'employees' | 'marketing' | 'media' | 'design'
  | 'ai' | 'settings' | 'audit';

const MENU: { id: Section; label: string; icon: string }[] = [
  { id: 'overview', label: 'الرئيسية', icon: '📊' },
  { id: 'products', label: 'المنتجات', icon: '📦' },
  { id: 'orders', label: 'الطلبات', icon: '🛒' },
  { id: 'customers', label: 'العملاء', icon: '👥' },
  { id: 'inventory', label: 'المخزون', icon: '🏭' },
  { id: 'shipping', label: 'الشحن', icon: '🚚' },
  { id: 'payments', label: 'المدفوعات', icon: '💳' },
  { id: 'accounting', label: 'الحسابات', icon: '📒' },
  { id: 'employees', label: 'الموظفون', icon: '👔' },
  { id: 'marketing', label: 'التسويق', icon: '📢' },
  { id: 'media', label: 'الوسائط', icon: '🖼️' },
  { id: 'design', label: 'تصميم الموقع', icon: '🎨' },
  { id: 'ai', label: 'مساعد الذكاء', icon: '🤖' },
  { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
  { id: 'audit', label: 'سجل النشاط', icon: '🔍' },
];

// ---- Starter data ----
const STARTER_PRODUCTS = [
  { id: 1, name: 'غسول الوجه اللطيف', nameEn: 'Gentle Facial Cleanser', category: 'العناية بالبشرة', price: 299, cost: 120, stock: 50, status: 'active' },
  { id: 2, name: 'سيروم فيتامين سي', nameEn: 'Vitamin C Serum', category: 'العناية بالبشرة', price: 549, cost: 200, stock: 30, status: 'active' },
  { id: 3, name: 'كريم الترطيب اليومي', nameEn: 'Daily Moisturizer', category: 'العناية بالبشرة', price: 399, cost: 150, stock: 45, status: 'active' },
  { id: 4, name: 'سيروم الهيالورونيك', nameEn: 'Hyaluronic Serum', category: 'العناية بالبشرة', price: 489, cost: 180, stock: 25, status: 'draft' },
  { id: 5, name: 'شامبو ترطيب يومي', nameEn: 'Moisturizing Shampoo', category: 'العناية بالشعر', price: 229, cost: 90, stock: 60, status: 'active' },
  { id: 6, name: 'ماسك الشعر بالكيراتين', nameEn: 'Keratin Hair Mask', category: 'العناية بالشعر', price: 349, cost: 130, stock: 35, status: 'active' },
  { id: 7, name: 'زيت الجسم الفاخر', nameEn: 'Luxury Body Oil', category: 'العناية بالجسم', price: 449, cost: 160, stock: 20, status: 'active' },
  { id: 8, name: 'كريم الجسم المرطب', nameEn: 'Body Moisturizer', category: 'العناية بالجسم', price: 269, cost: 100, stock: 55, status: 'active' },
  { id: 9, name: 'عطر رُوح النخيل', nameEn: 'Rooh Palm Perfume', category: 'العطور', price: 799, cost: 300, stock: 15, status: 'active' },
  { id: 10, name: 'عطر نسمة الصباح', nameEn: 'Morning Breeze', category: 'العطور', price: 699, cost: 260, stock: 18, status: 'active' },
  { id: 11, name: 'كريم العين المضيء', nameEn: 'Brightening Eye Cream', category: 'العناية بالبشرة', price: 429, cost: 165, stock: 22, status: 'draft' },
  { id: 12, name: 'صابون الجسم الطبيعي', nameEn: 'Natural Body Soap', category: 'العناية بالجسم', price: 149, cost: 55, stock: 80, status: 'active' },
  { id: 13, name: 'غسول الرجال النشط', nameEn: "Men's Active Wash", category: 'العناية بالرجال', price: 249, cost: 95, stock: 40, status: 'active' },
  { id: 14, name: 'بلسم الشفاه الطبيعي', nameEn: 'Natural Lip Balm', category: 'المكياج', price: 99, cost: 35, stock: 100, status: 'active' },
  { id: 15, name: 'مجموعة العناية الكاملة', nameEn: 'Complete Care Set', category: 'مجموعات الهدايا', price: 1299, cost: 500, stock: 10, status: 'active' },
];

const EG_GOVS = [
  { name: 'الإسكندرية', fee: 35 }, { name: 'القاهرة', fee: 40 },
  { name: 'الجيزة', fee: 40 }, { name: 'الإسماعيلية', fee: 50 },
  { name: 'السويس', fee: 55 }, { name: 'بورسعيد', fee: 55 },
  { name: 'المنصورة / الدقهلية', fee: 50 }, { name: 'الغربية / طنطا', fee: 50 },
  { name: 'الشرقية', fee: 55 }, { name: 'المنوفية', fee: 55 },
  { name: 'القليوبية', fee: 45 }, { name: 'البحيرة', fee: 55 },
  { name: 'كفر الشيخ', fee: 60 }, { name: 'دمياط', fee: 60 },
  { name: 'أسيوط', fee: 70 }, { name: 'سوهاج', fee: 70 },
  { name: 'قنا', fee: 75 }, { name: 'الأقصر', fee: 80 },
  { name: 'أسوان', fee: 85 }, { name: 'المنيا', fee: 70 },
  { name: 'بني سويف', fee: 65 }, { name: 'الفيوم', fee: 65 },
  { name: 'شمال سيناء', fee: 90 }, { name: 'جنوب سيناء', fee: 95 },
  { name: 'البحر الأحمر', fee: 90 }, { name: 'مطروح', fee: 90 },
  { name: 'الوادي الجديد', fee: 100 },
];

export default function OwnerControlPage() {
  const router = useRouter();
  const [section, setSection] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ownerName, setOwnerName] = useState('عبودي');
  const [products, setProducts] = useState(STARTER_PRODUCTS);
  const [orders, setOrders] = useState<any[]>([]);
  const [aiMessages, setAiMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'مرحباً! أنا مساعدك الذكي لإدارة رُوح. كيف أقدر أساعدك؟' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState({ name: '', nameEn: '', category: 'العناية بالبشرة', price: '', cost: '', stock: '', status: 'draft' });

  // Auth guard
  useEffect(() => {
    const session = sessionStorage.getItem('rooh_owner_session');
    if (!session) { router.replace('/owner-access'); return; }
    const name = sessionStorage.getItem('rooh_owner_name');
    if (name) setOwnerName(name);
    // Load orders from localStorage
    try {
      const stored = localStorage.getItem('rooh_orders');
      if (stored) setOrders(JSON.parse(stored));
    } catch {}
  }, [router]);

  const logout = useCallback(() => {
    sessionStorage.removeItem('rooh_owner_session');
    sessionStorage.removeItem('rooh_owner_name');
    router.replace('/owner-access');
  }, [router]);

  // Stats
  const totalRevenue = orders.reduce((s: number, o: any) => s + (o.total || 0), 0);
  const activeProducts = products.filter(p => p.status === 'active').length;
  const totalOrders = orders.length;
  const lowStock = products.filter(p => p.stock < 10).length;

  // AI Assistant
  function sendAiMessage() {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiInput('');
    setAiMessages(m => [...m, { role: 'user', content: userMsg }]);
    setTimeout(() => {
      let reply = 'سؤالك وصلني! ';
      if (userMsg.includes('مبيع') || userMsg.includes('إيراد') || userMsg.includes('ربح')) {
        reply = `إجمالي الإيرادات: ${totalRevenue.toLocaleString('ar-EG')} ج.م من ${totalOrders} طلب.`;
      } else if (userMsg.includes('منتج') || userMsg.includes('stock') || userMsg.includes('مخزون')) {
        reply = `عندك ${activeProducts} منتج نشط. ${lowStock > 0 ? `⚠️ ${lowStock} منتجات مخزونها منخفض.` : 'المخزون ممتاز!'}`;
      } else if (userMsg.includes('طلب') || userMsg.includes('order')) {
        reply = `إجمالي الطلبات: ${totalOrders} طلب. ${totalOrders === 0 ? 'لا توجد طلبات بعد.' : 'شاهد قسم الطلبات للتفاصيل.'}`;
      } else {
        reply = 'بإمكاني مساعدتك في: المبيعات والإيرادات، المخزون، الطلبات، المنتجات. ماذا تريد تعرف؟';
      }
      setAiMessages(m => [...m, { role: 'assistant', content: reply }]);
    }, 600);
  }

  // Product CRUD
  function openAddProduct() {
    setEditProduct(null);
    setProductForm({ name: '', nameEn: '', category: 'العناية بالبشرة', price: '', cost: '', stock: '', status: 'draft' });
    setShowProductForm(true);
  }
  function openEditProduct(p: any) {
    setEditProduct(p);
    setProductForm({ name: p.name, nameEn: p.nameEn, category: p.category, price: String(p.price), cost: String(p.cost), stock: String(p.stock), status: p.status });
    setShowProductForm(true);
  }
  function saveProduct() {
    const p = { ...productForm, price: Number(productForm.price), cost: Number(productForm.cost), stock: Number(productForm.stock) };
    if (editProduct) {
      setProducts(ps => ps.map(x => x.id === editProduct.id ? { ...x, ...p } : x));
    } else {
      setProducts(ps => [...ps, { ...p, id: Date.now() }]);
    }
    setShowProductForm(false);
  }
  function deleteProduct(id: number) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(ps => ps.filter(x => x.id !== id));
    }
  }
  function toggleStatus(id: number) {
    setProducts(ps => ps.map(x => x.id === id ? { ...x, status: x.status === 'active' ? 'draft' : 'active' } : x));
  }

  // =========== SECTION RENDERS ===========

  function renderOverview() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#F6F1E7]">لوحة التحكم الرئيسية</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'إجمالي الإيرادات', value: `${totalRevenue.toLocaleString('ar-EG')} ج.م`, icon: '💰', color: 'from-emerald-900/40 to-emerald-800/20' },
            { label: 'إجمالي الطلبات', value: totalOrders, icon: '📦', color: 'from-blue-900/40 to-blue-800/20' },
            { label: 'المنتجات النشطة', value: activeProducts, icon: '✅', color: 'from-purple-900/40 to-purple-800/20' },
            { label: 'مخزون منخفض', value: lowStock, icon: '⚠️', color: 'from-orange-900/40 to-orange-800/20' },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-xl p-4 border border-white/5`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-[#F6F1E7]">{s.value}</div>
              <div className="text-xs text-[#78866B] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#1a2d1e] rounded-xl p-5 border border-[#2a3d2e]">
          <h3 className="text-[#C9A96E] font-semibold mb-3">إشعارات سريعة</h3>
          <div className="space-y-2 text-sm text-[#A6B39A]">
            {lowStock > 0 && <div className="flex items-center gap-2"><span className="text-orange-400">⚠️</span> {lowStock} منتجات تحتاج إعادة تخزين</div>}
            <div className="flex items-center gap-2"><span className="text-green-400">✅</span> النظام يعمل بشكل طبيعي</div>
            <div className="flex items-center gap-2"><span className="text-blue-400">ℹ️</span> إجمالي المنتجات: {products.length} منتج</div>
            {totalOrders === 0 && <div className="flex items-center gap-2"><span className="text-[#C9A96E]">🛒</span> لا توجد طلبات بعد — ابدأ بمشاركة رابط المتجر</div>}
          </div>
        </div>
      </div>
    );
  }

  function renderProducts() {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#F6F1E7]">إدارة المنتجات ({products.length})</h2>
          <button onClick={openAddProduct} className="bg-[#354936] hover:bg-[#3f5842] text-[#F6F1E7] px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            + إضافة منتج
          </button>
        </div>

        {showProductForm && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" dir="rtl">
            <div className="bg-[#1a2d1e] rounded-2xl p-6 w-full max-w-md border border-[#2a3d2e]">
              <h3 className="text-lg font-bold text-[#F6F1E7] mb-4">{editProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
              <div className="space-y-3">
                <input value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} placeholder="اسم المنتج (عربي)" className="w-full bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]" />
                <input value={productForm.nameEn} onChange={e => setProductForm(f => ({ ...f, nameEn: e.target.value }))} placeholder="Product Name (English)" className="w-full bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]" />
                <select value={productForm.category} onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]">
                  {['العناية بالبشرة','العناية بالشعر','العناية بالجسم','المكياج','العطور','العناية بالرجال','مجموعات الهدايا'].map(c => <option key={c}>{c}</option>)}
                </select>
                <div className="grid grid-cols-3 gap-3">
                  <input value={productForm.price} onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))} placeholder="السعر (ج.م)" type="number" className="bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]" />
                  <input value={productForm.cost} onChange={e => setProductForm(f => ({ ...f, cost: e.target.value }))} placeholder="التكلفة" type="number" className="bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]" />
                  <input value={productForm.stock} onChange={e => setProductForm(f => ({ ...f, stock: e.target.value }))} placeholder="المخزون" type="number" className="bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]" />
                </div>
                <select value={productForm.status} onChange={e => setProductForm(f => ({ ...f, status: e.target.value }))} className="w-full bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]">
                  <option value="active">نشط — يظهر في المتجر</option>
                  <option value="draft">مسودة — مخفي</option>
                </select>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={saveProduct} className="flex-1 bg-[#354936] hover:bg-[#3f5842] text-[#F6F1E7] rounded-lg py-2.5 text-sm font-medium transition-colors">حفظ</button>
                <button onClick={() => setShowProductForm(false)} className="flex-1 bg-[#2a3d2e] hover:bg-[#334a37] text-[#A6B39A] rounded-lg py-2.5 text-sm transition-colors">إلغاء</button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[#1a2d1e] rounded-xl border border-[#2a3d2e] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#203A2B] text-[#78866B] text-xs">
                <tr>
                  <th className="px-4 py-3 text-right">المنتج</th>
                  <th className="px-4 py-3 text-right">التصنيف</th>
                  <th className="px-4 py-3 text-right">السعر</th>
                  <th className="px-4 py-3 text-right">التكلفة</th>
                  <th className="px-4 py-3 text-right">المخزون</th>
                  <th className="px-4 py-3 text-right">الحالة</th>
                  <th className="px-4 py-3 text-right">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a3d2e]">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-[#203A2B]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-[#F6F1E7] font-medium">{p.name}</div>
                      <div className="text-[#78866B] text-xs">{p.nameEn}</div>
                    </td>
                    <td className="px-4 py-3 text-[#A6B39A]">{p.category}</td>
                    <td className="px-4 py-3 text-[#C9A96E]">{p.price.toLocaleString('ar-EG')} ج.م</td>
                    <td className="px-4 py-3 text-[#78866B]">{p.cost.toLocaleString('ar-EG')} ج.م</td>
                    <td className={`px-4 py-3 font-medium ${p.stock < 10 ? 'text-orange-400' : 'text-[#A6B39A]'}`}>{p.stock}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleStatus(p.id)} className={`text-xs px-2 py-1 rounded-full transition-colors ${p.status === 'active' ? 'bg-green-900/40 text-green-400 hover:bg-red-900/40 hover:text-red-400' : 'bg-gray-700/40 text-gray-400 hover:bg-green-900/40 hover:text-green-400'}`}>
                        {p.status === 'active' ? 'نشط' : 'مسودة'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEditProduct(p)} className="text-xs text-blue-400 hover:text-blue-300">تعديل</button>
                        <button onClick={() => deleteProduct(p.id)} className="text-xs text-red-400 hover:text-red-300">حذف</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  function renderOrders() {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#F6F1E7]">إدارة الطلبات ({orders.length})</h2>
        {orders.length === 0 ? (
          <div className="bg-[#1a2d1e] rounded-xl p-10 border border-[#2a3d2e] text-center">
            <div className="text-4xl mb-3">🛒</div>
            <p className="text-[#A6B39A]">لا توجد طلبات بعد</p>
            <p className="text-xs text-[#78866B] mt-1">الطلبات ستظهر هنا فور إتمام العملاء للشراء</p>
          </div>
        ) : (
          <div className="bg-[#1a2d1e] rounded-xl border border-[#2a3d2e] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#203A2B] text-[#78866B] text-xs">
                <tr>
                  <th className="px-4 py-3 text-right">رقم الطلب</th>
                  <th className="px-4 py-3 text-right">العميل</th>
                  <th className="px-4 py-3 text-right">المبلغ</th>
                  <th className="px-4 py-3 text-right">الحالة</th>
                  <th className="px-4 py-3 text-right">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a3d2e]">
                {orders.map((o: any, i: number) => (
                  <tr key={i} className="hover:bg-[#203A2B]/50">
                    <td className="px-4 py-3 text-[#C9A96E] font-mono text-xs">{o.id || `#${1000 + i}`}</td>
                    <td className="px-4 py-3 text-[#F6F1E7]">{o.customerName || 'عميل'}</td>
                    <td className="px-4 py-3 text-[#A6B39A]">{(o.total || 0).toLocaleString('ar-EG')} ج.م</td>
                    <td className="px-4 py-3"><span className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-0.5 rounded-full">{o.status || 'جديد'}</span></td>
                    <td className="px-4 py-3 text-[#78866B] text-xs">{o.date || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  function renderShipping() {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#F6F1E7]">إدارة الشحن — 27 محافظة مصرية</h2>
        <div className="bg-[#1a2d1e] rounded-xl border border-[#2a3d2e] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#203A2B] text-[#78866B] text-xs">
              <tr>
                <th className="px-4 py-3 text-right">#</th>
                <th className="px-4 py-3 text-right">المحافظة</th>
                <th className="px-4 py-3 text-right">رسوم الشحن</th>
                <th className="px-4 py-3 text-right">وقت التوصيل</th>
                <th className="px-4 py-3 text-right">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a3d2e]">
              {EG_GOVS.map((g, i) => (
                <tr key={g.name} className="hover:bg-[#203A2B]/50">
                  <td className="px-4 py-3 text-[#4a5e4c]">{i + 1}</td>
                  <td className="px-4 py-3 text-[#F6F1E7]">{g.name}</td>
                  <td className="px-4 py-3 text-[#C9A96E]">{g.fee} ج.م</td>
                  <td className="px-4 py-3 text-[#A6B39A]">{g.fee <= 40 ? '1-2 يوم' : g.fee <= 65 ? '2-3 أيام' : '3-5 أيام'}</td>
                  <td className="px-4 py-3"><span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full">نشط</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-[#1a2d1e] rounded-xl p-4 border border-[#2a3d2e]">
          <p className="text-sm text-[#A6B39A]">🎁 الشحن المجاني للطلبات فوق: <span className="text-[#C9A96E] font-bold">500 ج.م</span></p>
        </div>
      </div>
    );
  }

  function renderPayments() {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#F6F1E7]">طرق الدفع المصرية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'الدفع عند الاستلام', nameEn: 'Cash on Delivery (COD)', icon: '💵', enabled: true, note: 'الأكثر شيوعاً في مصر' },
            { name: 'فودافون كاش', nameEn: 'Vodafone Cash', icon: '🔴', enabled: true, note: 'تحويل فوري للمحفظة' },
            { name: 'أورنچ كاش', nameEn: 'Orange Cash', icon: '🟠', enabled: true, note: 'تحويل فوري للمحفظة' },
            { name: 'اتصالات كاش', nameEn: 'Etisalat Cash', icon: '🟢', enabled: true, note: 'تحويل فوري للمحفظة' },
            { name: 'WE Pay', nameEn: 'WE Pay', icon: '🔵', enabled: true, note: 'المصرية للاتصالات' },
            { name: 'بطاقة ائتمانية', nameEn: 'Credit/Debit Card', icon: '💳', enabled: false, note: 'قريباً — يتطلب بوابة دفع' },
          ].map(m => (
            <div key={m.name} className={`bg-[#1a2d1e] rounded-xl p-4 border ${m.enabled ? 'border-[#2a3d2e]' : 'border-[#2a3d2e] opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.icon}</span>
                  <div>
                    <div className="text-[#F6F1E7] font-medium text-sm">{m.name}</div>
                    <div className="text-[#78866B] text-xs">{m.nameEn}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${m.enabled ? 'bg-green-900/30 text-green-400' : 'bg-gray-700/30 text-gray-400'}`}>
                  {m.enabled ? 'مفعل' : 'غير مفعل'}
                </span>
              </div>
              <p className="text-xs text-[#78866B]">{m.note}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderAccounting() {
    const totalCost = orders.reduce((s: number, o: any) => s + ((o.items || []).reduce((cs: number, i: any) => {
      const p = products.find(p => p.name === i.name);
      return cs + (p ? p.cost * i.qty : 0);
    }, 0)), 0);
    const profit = totalRevenue - totalCost;
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#F6F1E7]">الحسابات والأرباح</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'إجمالي الإيرادات', value: totalRevenue, color: 'text-green-400', icon: '💰' },
            { label: 'إجمالي التكاليف', value: totalCost, color: 'text-red-400', icon: '📉' },
            { label: 'صافي الربح', value: profit, color: profit >= 0 ? 'text-[#C9A96E]' : 'text-red-400', icon: '📈' },
          ].map(s => (
            <div key={s.label} className="bg-[#1a2d1e] rounded-xl p-5 border border-[#2a3d2e]">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value.toLocaleString('ar-EG')} ج.م</div>
              <div className="text-xs text-[#78866B] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-[#1a2d1e] rounded-xl p-5 border border-[#2a3d2e]">
          <p className="text-sm text-[#A6B39A]">📊 يتم احتساب الأرباح تلقائياً من الطلبات المكتملة.</p>
          <p className="text-xs text-[#78866B] mt-1">الحالة الحالية: مشروع جديد — 0 مبيعات — سيتحدث تلقائياً مع أول طلب.</p>
        </div>
      </div>
    );
  }

  function renderAI() {
    return (
      <div className="space-y-4 h-full flex flex-col">
        <h2 className="text-xl font-bold text-[#F6F1E7]">🤖 مساعد الذكاء الاصطناعي</h2>
        <div className="bg-[#1a2d1e] rounded-xl border border-[#2a3d2e] flex flex-col" style={{ height: '500px' }}>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {aiMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-[#203A2B] text-[#F6F1E7]' : 'bg-[#354936] text-[#F6F1E7]'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-[#2a3d2e] flex gap-2">
            <input
              value={aiInput}
              onChange={e => setAiInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendAiMessage()}
              placeholder="اسأل عن المبيعات، المخزون، الطلبات..."
              className="flex-1 bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]"
            />
            <button onClick={sendAiMessage} className="bg-[#354936] hover:bg-[#3f5842] text-[#F6F1E7] px-4 py-2 rounded-lg text-sm transition-colors">
              إرسال
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderDesign() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#F6F1E7]">🎨 استوديو تصميم رُوح</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a2d1e] rounded-xl p-5 border border-[#2a3d2e]">
            <h3 className="text-[#C9A96E] font-semibold mb-4">ألوان العلامة التجارية</h3>
            <div className="space-y-3">
              {[
                { label: 'اللون الرئيسي', varName: '--color-primary', defaultVal: '#354936' },
                { label: 'الذهبي', varName: '--color-gold', defaultVal: '#C9A96E' },
                { label: 'خلفية الصفحة', varName: '--color-bg', defaultVal: '#FFFDF7' },
                { label: 'النصوص', varName: '--color-text', defaultVal: '#30332D' },
              ].map(c => (
                <div key={c.varName} className="flex items-center justify-between gap-3">
                  <label className="text-sm text-[#A6B39A]">{c.label}</label>
                  <div className="flex items-center gap-2">
                    <input type="color" defaultValue={c.defaultVal}
                      onChange={e => document.documentElement.style.setProperty(c.varName, e.target.value)}
                      className="w-10 h-8 rounded cursor-pointer border border-[#2a3d2e] bg-transparent" />
                    <span className="text-xs text-[#78866B] font-mono">{c.defaultVal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#1a2d1e] rounded-xl p-5 border border-[#2a3d2e]">
            <h3 className="text-[#C9A96E] font-semibold mb-4">قوالب جاهزة</h3>
            <div className="space-y-2">
              {[
                { name: 'رُوح الفاخرة (الافتراضي)', desc: 'زيتي داكن + ذهبي' },
                { name: 'النباتي الطبيعي', desc: 'أخضر مريمية + كريمي' },
                { name: 'الفاخر الداكن', desc: 'أسود غامق + ذهبي' },
                { name: 'النقي المنيمالي', desc: 'أبيض + زيتي' },
              ].map(t => (
                <button key={t.name} className="w-full text-right bg-[#203A2B] hover:bg-[#2a4a30] rounded-lg px-4 py-3 transition-colors">
                  <div className="text-sm text-[#F6F1E7]">{t.name}</div>
                  <div className="text-xs text-[#78866B]">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-[#4a5e4c]">ملاحظة: تغييرات الألوان تُطبق فورياً على CSS variables. الحفظ الدائم قيد التطوير.</p>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-[#F6F1E7]">⚙️ إعدادات النظام</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#1a2d1e] rounded-xl p-5 border border-[#2a3d2e]">
            <h3 className="text-[#C9A96E] font-semibold mb-4">معلومات المتجر</h3>
            <div className="space-y-3">
              {[
                { label: 'اسم المتجر', placeholder: 'رُوح للعناية والجمال' },
                { label: 'رقم الهاتف', placeholder: '+20 100 000 0000' },
                { label: 'البريد الإلكتروني', placeholder: 'hello@rooh.beauty' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs text-[#78866B] mb-1">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]" />
                </div>
              ))}
              <button className="w-full bg-[#354936] hover:bg-[#3f5842] text-[#F6F1E7] rounded-lg py-2 text-sm transition-colors mt-2">حفظ</button>
            </div>
          </div>
          <div className="bg-[#1a2d1e] rounded-xl p-5 border border-[#2a3d2e]">
            <h3 className="text-[#C9A96E] font-semibold mb-4">تغيير كلمة المرور</h3>
            <div className="space-y-3">
              {['كلمة المرور الحالية', 'كلمة المرور الجديدة', 'تأكيد كلمة المرور'].map(f => (
                <div key={f}>
                  <label className="block text-xs text-[#78866B] mb-1">{f}</label>
                  <input type="password" className="w-full bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-3 py-2 text-sm text-[#F6F1E7] focus:outline-none focus:border-[#C9A96E]" />
                </div>
              ))}
              <button className="w-full bg-[#354936] hover:bg-[#3f5842] text-[#F6F1E7] rounded-lg py-2 text-sm transition-colors mt-2">تغيير</button>
            </div>
            <div className="mt-4 p-3 bg-[#0f1a12] rounded-lg">
              <p className="text-xs text-[#78866B]">بيانات الدخول الحالية:</p>
              <p className="text-xs text-[#A6B39A] mt-1">المستخدم: <span className="text-[#C9A96E] font-mono">rooh_admin</span></p>
              <p className="text-xs text-[#A6B39A]">الباسورد: <span className="text-[#C9A96E] font-mono">Rooh@2026#Admin</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPlaceholder(title: string, icon: string, desc: string) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#F6F1E7]">{icon} {title}</h2>
        <div className="bg-[#1a2d1e] rounded-xl p-10 border border-[#2a3d2e] text-center">
          <div className="text-5xl mb-4">{icon}</div>
          <p className="text-[#A6B39A]">{desc}</p>
          <p className="text-xs text-[#78866B] mt-2">قيد التطوير — قريباً</p>
        </div>
      </div>
    );
  }

  const sectionContent: Record<Section, React.ReactNode> = {
    overview: renderOverview(),
    products: renderProducts(),
    orders: renderOrders(),
    customers: renderPlaceholder('العملاء', '👥', 'إدارة بيانات العملاء وسجل مشترياتهم'),
    inventory: renderPlaceholder('المخزون', '🏭', 'متابعة حركة المخزون والتنبيهات'),
    shipping: renderShipping(),
    payments: renderPayments(),
    accounting: renderAccounting(),
    employees: renderPlaceholder('الموظفون', '👔', 'إدارة الموظفين والرواتب'),
    marketing: renderPlaceholder('التسويق', '📢', 'الحملات والكوبونات والخصومات'),
    media: renderPlaceholder('مكتبة الوسائط', '🖼️', 'رفع وإدارة الصور ومقاطع الفيديو'),
    design: renderDesign(),
    ai: renderAI(),
    settings: renderSettings(),
    audit: renderPlaceholder('سجل النشاط', '🔍', 'تتبع كل العمليات والتغييرات'),
  };

  return (
    <div className="min-h-screen bg-[#0f1a12] flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-14'} flex-shrink-0 bg-[#1a2d1e] border-l border-[#2a3d2e] flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b border-[#2a3d2e] flex items-center justify-between">
          {sidebarOpen && <span className="text-[#C9A96E] font-bold text-lg">رُوح</span>}
          <button onClick={() => setSidebarOpen(o => !o)} className="text-[#78866B] hover:text-[#A6B39A] text-lg p-1">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {MENU.map(item => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${section === item.id ? 'bg-[#354936] text-[#F6F1E7]' : 'text-[#78866B] hover:bg-[#203A2B] hover:text-[#A6B39A]'}`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#2a3d2e]">
          <button onClick={logout} className={`w-full flex items-center gap-3 text-red-400 hover:text-red-300 text-sm transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}>
            <span>🚪</span>
            {sidebarOpen && <span>خروج</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-[#1a2d1e] border-b border-[#2a3d2e] px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-[#F6F1E7]">مرحباً {ownerName} 👋</h1>
            <p className="text-xs text-[#4a5e4c]">لوحة تحكم رُوح للعناية والجمال</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-xs text-[#78866B] hover:text-[#A6B39A] transition-colors">عرض الموقع ↗</a>
            <a href="/store" target="_blank" className="text-xs text-[#78866B] hover:text-[#A6B39A] transition-colors">عرض المتجر ↗</a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {sectionContent[section]}
        </div>
      </main>
    </div>
  );
}
