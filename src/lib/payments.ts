export interface PaymentMethodConfig {
  id: string;
  nameAr: string;
  nameEn: string;
  type: "COD" | "WALLET" | "CARD" | "GATEWAY";
  walletNumber?: string;
  accountHolder?: string;
  instructionsAr: string;
  instructionsEn: string;
  iconName: string;
  isEnabled: boolean;
  requiresReceiptUpload: boolean;
}

export const EGYPT_PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: "COD",
    nameAr: "الدفع نقدًا عند الاستلام",
    nameEn: "Cash on Delivery",
    type: "COD",
    instructionsAr: "ادفع نقدًا لمندوب التوصيل عند استلام طلبك ومطابقته.",
    instructionsEn: "Pay in cash to the delivery agent upon receiving and verifying your order.",
    iconName: "Banknote",
    isEnabled: true,
    requiresReceiptUpload: false,
  },
  {
    id: "VODAFONE_CASH",
    nameAr: "فودافون كاش (Vodafone Cash)",
    nameEn: "Vodafone Cash",
    type: "WALLET",
    walletNumber: "01098765432",
    accountHolder: "رُوح لمستحضرات التجميل والعناية",
    instructionsAr: "حول إجمالي الطلب إلى محفظة فودافون كاش رقم: 01098765432 ثم ارفع صورة تأكيد التحويل.",
    instructionsEn: "Transfer the total order amount to Vodafone Cash: 01098765432 and upload the confirmation screenshot.",
    iconName: "Smartphone",
    isEnabled: true,
    requiresReceiptUpload: true,
  },
  {
    id: "ORANGE_CASH",
    nameAr: "أورنج كاش (Orange Cash)",
    nameEn: "Orange Cash",
    type: "WALLET",
    walletNumber: "01234567890",
    accountHolder: "رُوح لمستحضرات التجميل والعناية",
    instructionsAr: "حول إجمالي الطلب إلى محفظة أورنج كاش رقم: 01234567890 ثم ارفع صورة تأكيد التحويل.",
    instructionsEn: "Transfer the total order amount to Orange Cash: 01234567890 and upload the confirmation screenshot.",
    iconName: "Smartphone",
    isEnabled: true,
    requiresReceiptUpload: true,
  },
  {
    id: "ETISALAT_CASH",
    nameAr: "اتصالات كاش (Etisalat Cash)",
    nameEn: "Etisalat Cash",
    type: "WALLET",
    walletNumber: "01123456789",
    accountHolder: "رُوح لمستحضرات التجميل والعناية",
    instructionsAr: "حول إجمالي الطلب إلى محفظة اتصالات كاش رقم: 01123456789 ثم ارفع صورة تأكيد التحويل.",
    instructionsEn: "Transfer the total order amount to Etisalat Cash: 01123456789 and upload the confirmation screenshot.",
    iconName: "Smartphone",
    isEnabled: true,
    requiresReceiptUpload: true,
  },
  {
    id: "WE_PAY",
    nameAr: "وي باي (WE Pay)",
    nameEn: "WE Pay",
    type: "WALLET",
    walletNumber: "01512345678",
    accountHolder: "رُوح لمستحضرات التجميل والعناية",
    instructionsAr: "حول إجمالي الطلب إلى محفظة وي باي رقم: 01512345678 ثم ارفع صورة تأكيد التحويل.",
    instructionsEn: "Transfer the total order amount to WE Pay: 01512345678 and upload the confirmation screenshot.",
    iconName: "Smartphone",
    isEnabled: true,
    requiresReceiptUpload: true,
  },
  {
    id: "CARD",
    nameAr: "بطاقة بنكية / فيزا وماستركارد المصرية",
    nameEn: "Credit / Debit Card (Visa / Mastercard / Meeza)",
    type: "CARD",
    instructionsAr: "الدفع الآمن والمباشر بجميع البطاقات المصرفية الصادرة عن البنوك المصرية (فيزا، ماستركارد، وميزة).",
    instructionsEn: "Secure direct payment with Egyptian bank-issued cards (Visa, Mastercard, Meeza).",
    iconName: "CreditCard",
    isEnabled: true,
    requiresReceiptUpload: false,
  },
];

