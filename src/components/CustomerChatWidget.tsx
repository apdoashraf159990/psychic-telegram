"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic, Square, Paperclip, Bot, User, Check, Sparkles, Headphones } from "lucide-react";
import { StoredMessage } from "@/lib/db";

export const CustomerChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<StoredMessage[]>([
    {
      id: "msg-welcome",
      conversationId: "conv-live",
      senderType: "SYSTEM",
      senderName: "رُوح بوت",
      messageText: "أهلاً بكِ في رُوح للعناية والجمال! يسعدنا مساعدتك في اختيار أفضل منتجات العناية بالبشرة والشعر المناسبة لكِ، أو الاستفسار عن الشحن لكافة محافظات مصر وطرق الدفع.",
      messageType: "TEXT",
      isRead: true,
      createdAt: new Date().toISOString(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [humanHandover, setHumanHandover] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string, audioUrl?: string, duration?: number) => {
    const text = textToSend || inputText.trim();
    if (!text && !audioUrl) return;

    const userMsg: StoredMessage = {
      id: `msg_${Date.now()}`,
      conversationId: "conv-live",
      senderType: "CUSTOMER",
      senderName: "أنتِ",
      messageText: text || "تسجيل صوتي",
      messageType: audioUrl ? "AUDIO" : "TEXT",
      mediaUrl: audioUrl,
      durationSeconds: duration,
      isRead: true,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!audioUrl) setInputText("");

    // AI or Agent automatic response
    setTimeout(() => {
      let replyText = "";
      const lower = text.toLowerCase();

      if (humanHandover) {
        replyText = "تم تحويل محادثتكِ إلى أخصائية خدمة العملاء (مروة حسن). جاري مراجعة رسالتكِ والرد خلال لحظات...";
      } else if (lower.includes("شحن") || lower.includes("توصيل") || lower.includes("محافظ")) {
        replyText = "نشحن لجميع الـ 27 محافظة مصرية عبر شركة ROOH Delivery! الشحن مجاني للطلبات فوق 600 ج.م، وللإسكندرية 35 ج.م وخلال 24-48 ساعة، وللقاهرة والجيزة 45 ج.م.";
      } else if (lower.includes("دفع") || lower.includes("كاش") || lower.includes("فودافون")) {
        replyText = "نوفر خيارات دفع متعددة في مصر: الدفع عند الاستلام (COD)، محفظة فودافون كاش، أورنج كاش، اتصالات كاش، وي باي، بالإضافة إلى بطاقات الفيزا والماستركارد وميزة.";
      } else if (lower.includes("سيروم") || lower.includes("بشرة") || lower.includes("هيالورونيك") || lower.includes("فيتامين")) {
        replyText = "أنصحكِ بتجربة سيروم الهيالورونيك أسيد المركز (380 ج.م) لترطيب عميق ونضارة فورية، أو سيروم فيتامين سي الذهبي (420 ج.م) لتفتيح وتوحيد لون البشرة وحمايتها من التأكسد.";
      } else if (lower.includes("شعر") || lower.includes("شامبو") || lower.includes("تساقط")) {
        replyText = "للعناية بالشعر، نقدم شامبو رُوح المغذي بزيت الزيتون وإكليل الجبل (280 ج.م) الخالي من السلفات، مع إكسير الزيوت السبعة الفاخر لمعالجة التقصف ومنح اللمعان الفوري.";
      } else if (lower.includes("عطر") || lower.includes("برفيوم") || lower.includes("ريحة")) {
        replyText = "عطر رُوح زهرة الزيتون الملكي (850 ج.م) هو عطرنا التوقيعي الأكثر طلباً، بفوحان استثنائي وثبات يتجاوز 24 ساعة بمزيج زهر الزيتون والعود والعنبر الدافئ.";
      } else {
        replyText = "شكراً لتواصلكِ مع رُوح! جميع منتجاتنا مصنعة بمكونات نباتية نقية وآمنة 100%. يمكنكِ سؤالي عن أي منتج أو طلب تحويلكِ لممثلة خدمة العملاء البشرية في أي وقت.";
      }

      const botMsg: StoredMessage = {
        id: `msg_bot_${Date.now()}`,
        conversationId: "conv-live",
        senderType: humanHandover ? "AGENT" : "SYSTEM",
        senderName: humanHandover ? "أخصائية رُوح" : "رُوح بوت الذكي",
        messageText: replyText,
        messageType: "TEXT",
        isRead: true,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  // Real Web Audio MediaRecorder for voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        handleSendMessage("", audioUrl, recordingDuration);
        setRecordingDuration(0);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn("Microphone access not granted or not available in this environment:", err);
      // Fallback simulated voice note if user environment restricts mic
      const duration = 5;
      handleSendMessage("تسجيل صوتي: استفسار عن منتجات العناية بالبشرة", undefined, duration);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#354936] hover:bg-[#203A2B] text-[#FFFDF7] shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-[#C9A96E]/40"
          aria-label="محادثة رُوح"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-[#FFFDF7]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C9A96E] rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C9A96E] rounded-full" />
          </div>
          <span className="font-semibold text-sm hidden sm:inline">محادثة رُوح للعناية</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="w-[360px] sm:w-[400px] h-[550px] bg-[#FFFDF7] rounded-2xl shadow-2xl border border-[#E4DCD0] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
          dir="rtl"
        >
          {/* Header */}
          <div className="bg-[#203A2B] text-[#FFFDF7] px-4 py-3.5 flex items-center justify-between border-b border-[#354936]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#354936] border border-[#C9A96E] flex items-center justify-center text-[#C9A96E] font-serif font-bold text-lg">
                  رُ
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#203A2B] rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-1.5">
                  <span>مساعد رُوح الذكي</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
                </h3>
                <p className="text-[11px] text-[#A6B39A]">متصل الآن • استشارات العناية والشحن</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setHumanHandover(!humanHandover)}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  humanHandover ? "bg-[#C9A96E] text-[#203A2B] font-bold" : "text-[#A6B39A] hover:bg-[#354936]"
                }`}
                title={humanHandover ? "مفعل: التحدث مع خدمة العملاء" : "طلب التحدث مع موظف بشري"}
              >
                <Headphones className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#A6B39A] hover:bg-[#354936] hover:text-[#FFFDF7] transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Handover Notice Banner */}
          {humanHandover && (
            <div className="bg-[#F6F1E7] border-b border-[#E4DCD0] px-4 py-1.5 text-xs text-[#354936] flex items-center justify-between">
              <span>أنتِ الآن في وضع المحادثة المباشرة مع خدمة العملاء البشرية.</span>
              <button onClick={() => setHumanHandover(false)} className="underline font-bold text-[11px]">
                العودة للذكاء الاصطناعي
              </button>
            </div>
          )}

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5]">
            {messages.map((msg) => {
              const isCustomer = msg.senderType === "CUSTOMER";
              return (
                <div key={msg.id} className={`flex items-start gap-2 ${isCustomer ? "flex-row-reverse" : "flex-row"}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                      isCustomer ? "bg-[#354936] text-[#FFFDF7]" : "bg-[#F6F1E7] text-[#203A2B] border border-[#C9A96E]"
                    }`}
                  >
                    {isCustomer ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-[#354936]" />}
                  </div>

                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      isCustomer
                        ? "bg-[#354936] text-[#FFFDF7] rounded-tr-none"
                        : "bg-[#FFFFFF] text-[#30332D] border border-[#E4DCD0] rounded-tl-none"
                    }`}
                  >
                    <div className="text-[10px] font-semibold opacity-70 mb-1 flex items-center justify-between gap-2">
                      <span>{msg.senderName}</span>
                      <span>{new Date(msg.createdAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>

                    {msg.messageType === "AUDIO" && msg.mediaUrl ? (
                      <div className="pt-1">
                        <audio src={msg.mediaUrl} controls className="w-48 h-8 rounded" />
                        {msg.durationSeconds && (
                          <div className="text-[10px] opacity-75 mt-1">المدة: {formatSeconds(msg.durationSeconds)}</div>
                        )}
                      </div>
                    ) : (
                      <p className="whitespace-pre-line">{msg.messageText}</p>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area & Voice Note Recorder */}
          <div className="p-3 bg-[#FFFFFF] border-t border-[#E4DCD0]">
            {isRecording ? (
              <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-600 animate-pulse" />
                  <span className="font-semibold text-xs">جاري التسجيل الصوتي... {formatSeconds(recordingDuration)}</span>
                </div>
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-1 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow"
                >
                  <Square className="w-3 h-3 fill-white" />
                  <span>إرسال التسجيل</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-1.5"
              >
                <button
                  type="button"
                  onClick={startRecording}
                  className="p-2 text-[#78866B] hover:text-[#354936] hover:bg-[#F6F1E7] rounded-full transition-colors"
                  title="تسجيل رسالة صوتية"
                >
                  <Mic className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="اكتبي استفسارك هنا..."
                  className="flex-1 px-3.5 py-2 text-xs bg-[#F6F1E7]/70 border border-[#E4DCD0] rounded-full focus:outline-none focus:ring-1 focus:ring-[#354936] text-[#30332D]"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2 rounded-full transition-all ${
                    inputText.trim()
                      ? "bg-[#354936] text-[#FFFDF7] hover:bg-[#203A2B] shadow-md"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label="إرسال"
                >
                  <Send className="w-4 h-4 rotate-180" />
                </button>
              </form>
            )}

            <div className="mt-2 flex items-center justify-between text-[10px] text-[#78866B] px-1">
              <span>مدعوم بنظام رُوح الذكي للعناية</span>
              <button
                onClick={() => setHumanHandover(true)}
                className="hover:text-[#354936] underline"
              >
                التحدث مع خدمة العملاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

