import React from "react";
import { CheckCircle2, AlertCircle, RefreshCw, Save, Clock } from "lucide-react";

export type SaveStatus = "idle" | "saving" | "saved" | "error" | "unsaved";

interface SaveStatusBarProps {
  status: SaveStatus;
  lastSavedAt?: Date | null;
  onManualSave?: () => void;
  errorMessage?: string;
  className?: string;
}

export const SaveStatusBar: React.FC<SaveStatusBarProps> = ({
  status,
  lastSavedAt,
  onManualSave,
  errorMessage,
  className = "",
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div
      className={`flex items-center justify-between px-4 py-2.5 rounded-lg border transition-all duration-300 ${
        status === "saving"
          ? "bg-amber-50 border-amber-200 text-amber-900"
          : status === "saved"
          ? "bg-emerald-50 border-emerald-200 text-emerald-900"
          : status === "error"
          ? "bg-rose-50 border-rose-200 text-rose-900"
          : status === "unsaved"
          ? "bg-blue-50 border-blue-200 text-blue-900"
          : "bg-[#F6F1E7] border-[#E4DCD0] text-[#30332D]"
      } ${className}`}
      dir="rtl"
    >
      <div className="flex items-center gap-2">
        {status === "saving" && (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
            <span className="font-medium text-sm">جاري الحفظ والمزامنة السحابية...</span>
          </>
        )}

        {status === "saved" && (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-sm">تم الحفظ بنجاح ومزامنة قاعدة البيانات.</span>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span className="font-medium text-sm">لم يتم الحفظ! {errorMessage || "تأكد من الاتصال وحاول ثانية."}</span>
          </>
        )}

        {status === "unsaved" && (
          <>
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-sm">توجد تعديلات غير محفوظة (المسودة جاهزة للحفظ).</span>
          </>
        )}

        {status === "idle" && (
          <>
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">النظام جاهز ومُحدث.</span>
          </>
        )}

        {lastSavedAt && (
          <span className="text-xs opacity-75 mr-2">
            (آخر حفظ: {formatTime(lastSavedAt)})
          </span>
        )}
      </div>

      {onManualSave && (
        <button
          onClick={onManualSave}
          disabled={status === "saving"}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white shadow-sm transition-all ${
            status === "saving"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#354936] hover:bg-[#203A2B] active:scale-95"
          }`}
        >
          <Save className="w-3.5 h-3.5" />
          <span>حفظ التعديلات</span>
        </button>
      )}
    </div>
  );
};

