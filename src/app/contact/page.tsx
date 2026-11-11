"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    governorate: "الإسكندرية",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#203A2B]">
          اتصل بنا | خدمة عملاء رُوح
        </h1>
        <p className="text-base text-[#6A7265] leading-relaxed">
          يسعدنا الرد على جميع استفساراتكِ بخصوص منتجاتنا، متابعة الشحن، وتقديم الاستشارات التجميلية المجانية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#203A2B] text-white space-y-6 shadow-xl">
            <h3 className="text-xl font-serif font-bold text-[#C9A96E]">معلومات التواصل المباشر</h3>
            <div className="space-y-4 text-sm text-[#E4DCD0]">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">الهاتف وواتساب:</div>
                  <div>01098765432 / 01234567890</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">البريد الإلكتروني:</div>
                  <div>care@rooh-beauty.eg</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">ساعات العمل:</div>
                  <div>يومياً من 9:00 صباحاً حتى 10:00 مساءً</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">المقر الرئيسي:</div>
                  <div>الإسكندرية (سموحة) • القاهرة (التجمع الخامس)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white border border-[#E4DCD0] shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#203A2B]">تم استلام رسالتكِ بنجاح!</h3>
                <p className="text-sm text-[#6A7265] max-w-sm mx-auto">
                  سيتواصل معكِ أحد ممثلي خدمة العملاء هاتفياً أو عبر واتساب خلال أقل من ساعتين.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#354936] text-white text-xs font-semibold"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-[#203A2B] mb-2">أرسلي لنا استفساركِ</h3>
                <div>
                  <label className="block text-xs font-semibold text-[#30332D] mb-1">الاسم بالكامل *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E4DCD0] focus:ring-1 focus:ring-[#354936] outline-none"
                    placeholder="مثال: ياسمين أحمد"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#30332D] mb-1">رقم الهاتف (واتساب) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E4DCD0] focus:ring-1 focus:ring-[#354936] outline-none"
                      placeholder="010XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#30332D] mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E4DCD0] focus:ring-1 focus:ring-[#354936] outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#30332D] mb-1">رسالتكِ أو استفساركِ *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#E4DCD0] focus:ring-1 focus:ring-[#354936] outline-none"
                    placeholder="اكتبي تفاصيل استفساركِ هنا..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#354936] hover:bg-[#203A2B] text-white font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

