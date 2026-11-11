'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ============================================
// ROOH OWNER ACCESS — SECRET LOGIN PAGE
// Username: rooh_admin
// Password: Rooh@2026#Admin
// ============================================

export default function OwnerAccessPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // If already logged in, go directly to control
    if (typeof window !== 'undefined') {
      const session = sessionStorage.getItem('rooh_owner_session');
      if (session) router.replace('/owner-control');
    }
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (blocked) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/owner-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('rooh_owner_session', data.token);
        sessionStorage.setItem('rooh_owner_name', data.name || 'عبودي');
        router.replace('/owner-control');
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 5) {
          setBlocked(true);
          setError('تم حظر الدخول مؤقتاً لمدة 5 دقائق بسبب المحاولات المتعددة.');
          setTimeout(() => { setBlocked(false); setAttempts(0); }, 5 * 60 * 1000);
        } else {
          setError(data.message || 'بيانات خاطئة');
        }
      }
    } catch {
      setError('خطأ في الاتصال');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1a12] flex items-center justify-center p-4" dir="rtl">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #354936 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C9A96E 0%, transparent 40%)' }} />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-[#C9A96E] mb-1">رُوح</div>
          <div className="text-xs text-[#4a5e4c] tracking-widest uppercase">ROOH Beauty & Care</div>
        </div>

        {/* Login Card */}
        <div className="bg-[#1a2d1e] rounded-2xl p-8 border border-[#2a3d2e] shadow-2xl">
          <h1 className="text-lg font-semibold text-[#F6F1E7] mb-6 text-center">لوحة التحكم</h1>

          {error && (
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 mb-4 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-[#78866B] mb-1.5">اسم المستخدم</label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="w-full bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-4 py-2.5 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                placeholder="أدخل اسم المستخدم"
                autoComplete="username"
                disabled={blocked || loading}
                required
              />
            </div>

            <div>
              <label className="block text-xs text-[#78866B] mb-1.5">كلمة المرور</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-[#0f1a12] border border-[#2a3d2e] rounded-lg px-4 py-2.5 text-[#F6F1E7] text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                placeholder="أدخل كلمة المرور"
                autoComplete="current-password"
                disabled={blocked || loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={blocked || loading}
              className="w-full bg-[#354936] hover:bg-[#3f5842] text-[#F6F1E7] rounded-lg py-3 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'جاري التحقق...' : 'دخول'}
            </button>
          </form>

          <p className="text-center text-[10px] text-[#2a3d2e] mt-6">
            ROOH Control Center — Private Access
          </p>
        </div>
      </div>
    </div>
  );
}
