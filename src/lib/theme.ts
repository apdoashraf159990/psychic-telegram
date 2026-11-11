export interface RoohThemeTokens {
  deepOlive: string;
  forestGreen: string;
  softOlive: string;
  sage: string;
  warmCream: string;
  ivory: string;
  gold: string;
  charcoal: string;
  primary: string;
  primaryHover: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
  borderRadius: string;
  fontArabic: string;
  fontEnglish: string;
  botanicalOpacity: number;
  botanicalBlur: number;
  botanicalVisible: boolean;
  botanicalPattern: string; // 'olive-branch' | 'leaves' | 'clean'
}

export const THEME_PRESETS: Record<string, { nameAr: string; nameEn: string; tokens: RoohThemeTokens }> = {
  luxury_olive: {
    nameAr: "رُوح الأخضر الزيتوني الفاخر (الافتراضي)",
    nameEn: "ROOH Luxury Olive (Default)",
    tokens: {
      deepOlive: "#354936",
      forestGreen: "#203A2B",
      softOlive: "#78866B",
      sage: "#A6B39A",
      warmCream: "#F6F1E7",
      ivory: "#FFFDF7",
      gold: "#C9A96E",
      charcoal: "#30332D",
      primary: "#354936",
      primaryHover: "#203A2B",
      accent: "#C9A96E",
      background: "#FFFDF7",
      surface: "#F6F1E7",
      card: "#FFFFFF",
      border: "#E4DCD0",
      text: "#30332D",
      textMuted: "#6B7565",
      borderRadius: "0.875rem",
      fontArabic: "Tajawal",
      fontEnglish: "Inter",
      botanicalOpacity: 0.12,
      botanicalBlur: 0,
      botanicalVisible: true,
      botanicalPattern: "olive-branch",
    },
  },
  botanical_natural: {
    nameAr: "رُوح الطبيعة النباتية",
    nameEn: "ROOH Botanical Natural",
    tokens: {
      deepOlive: "#2D4030",
      forestGreen: "#1E3324",
      softOlive: "#6E8062",
      sage: "#9EB092",
      warmCream: "#F4EFE6",
      ivory: "#FDFAF2",
      gold: "#BFA065",
      charcoal: "#2C3029",
      primary: "#2D4030",
      primaryHover: "#1E3324",
      accent: "#BFA065",
      background: "#FDFAF2",
      surface: "#F4EFE6",
      card: "#FFFFFF",
      border: "#DED7C8",
      text: "#2C3029",
      textMuted: "#667060",
      borderRadius: "1rem",
      fontArabic: "Cairo",
      fontEnglish: "Playfair Display",
      botanicalOpacity: 0.18,
      botanicalBlur: 0.5,
      botanicalVisible: true,
      botanicalPattern: "leaves",
    },
  },
  soft_cream: {
    nameAr: "رُوح النعومة والكريم",
    nameEn: "ROOH Soft Cream",
    tokens: {
      deepOlive: "#4A5844",
      forestGreen: "#33402E",
      softOlive: "#88967E",
      sage: "#B8C4AF",
      warmCream: "#FAF6EF",
      ivory: "#FFFFF9",
      gold: "#D4B67D",
      charcoal: "#3A3D36",
      primary: "#4A5844",
      primaryHover: "#33402E",
      accent: "#D4B67D",
      background: "#FFFFF9",
      surface: "#FAF6EF",
      card: "#FFFFFF",
      border: "#EBE3D5",
      text: "#3A3D36",
      textMuted: "#7A8275",
      borderRadius: "0.75rem",
      fontArabic: "Tajawal",
      fontEnglish: "Inter",
      botanicalOpacity: 0.08,
      botanicalBlur: 0,
      botanicalVisible: true,
      botanicalPattern: "olive-branch",
    },
  },
  minimal_luxury: {
    nameAr: "رُوح الفخامة البسيطة (مينيمال)",
    nameEn: "ROOH Minimal Luxury",
    tokens: {
      deepOlive: "#263328",
      forestGreen: "#172419",
      softOlive: "#5A6956",
      sage: "#8E9B8B",
      warmCream: "#F8F5F0",
      ivory: "#FFFFFF",
      gold: "#A88B52",
      charcoal: "#222421",
      primary: "#263328",
      primaryHover: "#172419",
      accent: "#A88B52",
      background: "#FFFFFF",
      surface: "#F8F5F0",
      card: "#FFFFFF",
      border: "#E5E2DC",
      text: "#222421",
      textMuted: "#666B64",
      borderRadius: "0.5rem",
      fontArabic: "Tajawal",
      fontEnglish: "Inter",
      botanicalOpacity: 0.05,
      botanicalBlur: 0,
      botanicalVisible: false,
      botanicalPattern: "clean",
    },
  },
  premium_dark: {
    nameAr: "رُوح المخملي الليلي (دارك)",
    nameEn: "ROOH Premium Dark",
    tokens: {
      deepOlive: "#1B291D",
      forestGreen: "#111A13",
      softOlive: "#3E5242",
      sage: "#617A66",
      warmCream: "#243026",
      ivory: "#1A221C",
      gold: "#E0C082",
      charcoal: "#F5F3EC",
      primary: "#3E5242",
      primaryHover: "#617A66",
      accent: "#E0C082",
      background: "#141C16",
      surface: "#1E2920",
      card: "#243027",
      border: "#334436",
      text: "#F5F3EC",
      textMuted: "#A3B3A5",
      borderRadius: "0.75rem",
      fontArabic: "Cairo",
      fontEnglish: "Inter",
      botanicalOpacity: 0.08,
      botanicalBlur: 0.5,
      botanicalVisible: true,
      botanicalPattern: "leaves",
    },
  },
  modern_elegance: {
    nameAr: "رُوح الأناقة المعاصرة",
    nameEn: "ROOH Modern Elegance",
    tokens: {
      deepOlive: "#3A4F3C",
      forestGreen: "#263A28",
      softOlive: "#73876E",
      sage: "#A0B29B",
      warmCream: "#F7F3EA",
      ivory: "#FFFEFA",
      gold: "#C5A367",
      charcoal: "#2E332B",
      primary: "#3A4F3C",
      primaryHover: "#263A28",
      accent: "#C5A367",
      background: "#FFFEFA",
      surface: "#F7F3EA",
      card: "#FFFFFF",
      border: "#E2DACD",
      text: "#2E332B",
      textMuted: "#6B7366",
      borderRadius: "1rem",
      fontArabic: "Tajawal",
      fontEnglish: "Inter",
      botanicalOpacity: 0.14,
      botanicalBlur: 0,
      botanicalVisible: true,
      botanicalPattern: "olive-branch",
    },
  },
};

export function getTokensAsCssVariables(tokens: RoohThemeTokens): Record<string, string> {
  return {
    "--color-rooh-deep": tokens.deepOlive,
    "--color-rooh-forest": tokens.forestGreen,
    "--color-rooh-soft": tokens.softOlive,
    "--color-rooh-sage": tokens.sage,
    "--color-rooh-cream": tokens.warmCream,
    "--color-rooh-ivory": tokens.ivory,
    "--color-rooh-gold": tokens.gold,
    "--color-rooh-charcoal": tokens.charcoal,
    "--color-primary": tokens.primary,
    "--color-primary-hover": tokens.primaryHover,
    "--color-primary-light": tokens.softOlive,
    "--color-primary-fg": tokens.ivory,
    "--color-accent": tokens.accent,
    "--color-accent-fg": tokens.forestGreen,
    "--color-bg": tokens.background,
    "--color-surface": tokens.surface,
    "--color-card": tokens.card,
    "--color-border": tokens.border,
    "--color-text": tokens.text,
    "--color-text-muted": tokens.textMuted,
    "--border-radius": tokens.borderRadius,
  };
}

