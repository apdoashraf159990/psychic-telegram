export interface EgyptGovernorate {
  id: string;
  nameAr: string;
  nameEn: string;
  shippingFee: number;
  estimatedDays: string;
  districts?: { id: string; nameAr: string; nameEn: string; additionalFee?: number }[];
}

export const EGYPT_GOVERNORATES: EgyptGovernorate[] = [
  {
    id: "alexandria",
    nameAr: "الإسكندرية",
    nameEn: "Alexandria",
    shippingFee: 35,
    estimatedDays: "1-2 أيام عمل",
    districts: [
      { id: "montaza_1", nameAr: "المنتزه أول (ميامي، سيدي بشر)", nameEn: "Montaza First", additionalFee: 0 },
      { id: "montaza_2", nameAr: "المنتزه ثان (المعمورة، العصافرة)", nameEn: "Montaza Second", additionalFee: 0 },
      { id: "east_alex", nameAr: "شرق الإسكندرية (سموحة، لوران، سان ستيفانو)", nameEn: "East Alexandria", additionalFee: 0 },
      { id: "central_alex", nameAr: "وسط الإسكندرية (محطة الرمل، الشاطبي)", nameEn: "Central Alexandria", additionalFee: 0 },
      { id: "west_alex", nameAr: "غرب الإسكندرية (الورديان، كرموز)", nameEn: "West Alexandria", additionalFee: 0 },
      { id: "gomrok", nameAr: "حي الجمرك (بحري، رأس التين)", nameEn: "El Gomrok", additionalFee: 0 },
      { id: "agami", nameAr: "العجمي (الدخيلة، البيطاش، الهانوفيل)", nameEn: "Agami", additionalFee: 10 },
      { id: "amreya", nameAr: "العامرية", nameEn: "Amreya", additionalFee: 15 },
      { id: "borg_el_arab", nameAr: "برج العرب", nameEn: "Borg El Arab", additionalFee: 20 },
    ],
  },
  { id: "cairo", nameAr: "القاهرة", nameEn: "Cairo", shippingFee: 45, estimatedDays: "2-3 أيام عمل" },
  { id: "giza", nameAr: "الجيزة", nameEn: "Giza", shippingFee: 45, estimatedDays: "2-3 أيام عمل" },
  { id: "qalyubia", nameAr: "القليوبية", nameEn: "Qalyubia", shippingFee: 50, estimatedDays: "2-3 أيام عمل" },
  { id: "beheira", nameAr: "البحيرة", nameEn: "Beheira", shippingFee: 40, estimatedDays: "2-3 أيام عمل" },
  { id: "kafr_el_sheikh", nameAr: "كفر الشيخ", nameEn: "Kafr El Sheikh", shippingFee: 50, estimatedDays: "2-4 أيام عمل" },
  { id: "gharbia", nameAr: "الغربية (طنطا / المحلة)", nameEn: "Gharbia", shippingFee: 50, estimatedDays: "2-3 أيام عمل" },
  { id: "monufia", nameAr: "المنوفية", nameEn: "Monufia", shippingFee: 50, estimatedDays: "2-3 أيام عمل" },
  { id: "dakahlia", nameAr: "الدقهلية (المنصورة)", nameEn: "Dakahlia", shippingFee: 50, estimatedDays: "2-3 أيام عمل" },
  { id: "damietta", nameAr: "دمياط", nameEn: "Damietta", shippingFee: 55, estimatedDays: "2-4 أيام عمل" },
  { id: "port_said", nameAr: "بورسعيد", nameEn: "Port Said", shippingFee: 55, estimatedDays: "2-4 أيام عمل" },
  { id: "ismailia", nameAr: "الإسماعيلية", nameEn: "Ismailia", shippingFee: 55, estimatedDays: "2-4 أيام عمل" },
  { id: "suez", nameAr: "السويس", nameEn: "Suez", shippingFee: 55, estimatedDays: "2-4 أيام عمل" },
  { id: "sharkia", nameAr: "الشرقية (الزقازيق)", nameEn: "Sharkia", shippingFee: 50, estimatedDays: "2-3 أيام عمل" },
  { id: "fayoum", nameAr: "الفيوم", nameEn: "Fayoum", shippingFee: 60, estimatedDays: "3-4 أيام عمل" },
  { id: "beni_suef", nameAr: "بني سويف", nameEn: "Beni Suef", shippingFee: 60, estimatedDays: "3-4 أيام عمل" },
  { id: "minya", nameAr: "المنيا", nameEn: "Minya", shippingFee: 65, estimatedDays: "3-5 أيام عمل" },
  { id: "assiut", nameAr: "أسيوط", nameEn: "Assiut", shippingFee: 70, estimatedDays: "3-5 أيام عمل" },
  { id: "sohag", nameAr: "سوهاج", nameEn: "Sohag", shippingFee: 75, estimatedDays: "3-5 أيام عمل" },
  { id: "qena", nameAr: "قنا", nameEn: "Qena", shippingFee: 80, estimatedDays: "3-5 أيام عمل" },
  { id: "luxor", nameAr: "الأقصر", nameEn: "Luxor", shippingFee: 85, estimatedDays: "3-5 أيام عمل" },
  { id: "aswan", nameAr: "أسوان", nameEn: "Aswan", shippingFee: 90, estimatedDays: "3-5 أيام عمل" },
  { id: "red_sea", nameAr: "البحر الأحمر (الغردقة)", nameEn: "Red Sea", shippingFee: 85, estimatedDays: "3-5 أيام عمل" },
  { id: "south_sinai", nameAr: "جنوب سيناء (شرم الشيخ)", nameEn: "South Sinai", shippingFee: 90, estimatedDays: "3-6 أيام عمل" },
  { id: "north_sinai", nameAr: "شمال سيناء", nameEn: "North Sinai", shippingFee: 95, estimatedDays: "4-7 أيام عمل" },
  { id: "matrouh", nameAr: "مطروح (الساحل الشمالي)", nameEn: "Matrouh", shippingFee: 75, estimatedDays: "3-5 أيام عمل" },
  { id: "new_valley", nameAr: "الوادي الجديد", nameEn: "New Valley", shippingFee: 95, estimatedDays: "4-7 أيام عمل" },
];

export const DEFAULT_SHIPPING_SETTINGS = {
  freeShippingThreshold: 600, // EGP
  defaultCodFee: 15, // EGP
  companyNameAr: "رُوح للشحن السريع (ROOH Delivery)",
  companyNameEn: "ROOH Delivery Express",
};

