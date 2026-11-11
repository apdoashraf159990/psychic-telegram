export function formatEGP(amount: number, locale: "ar" | "en" = "ar"): string {
  const formatted = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return locale === "ar" ? `${formatted} ج.م` : `${formatted} EGP`;
}

export function calculateProfit(sellingPrice: number, purchaseCost: number) {
  const profitAmount = Number((sellingPrice - purchaseCost).toFixed(2));
  const profitMarginPercent = sellingPrice > 0 ? Number(((profitAmount / sellingPrice) * 100).toFixed(1)) : 0;
  return {
    profitAmount,
    profitMarginPercent,
  };
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

