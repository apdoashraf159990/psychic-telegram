// ROOH Platform — Central Config
export const ROOH = {
  name: 'ROOH | رُوح',
  nameAr: 'رُوح',
  nameEn: 'ROOH',
  tagline: 'جمال طبيعي، رعاية حقيقية',
  taglineEn: 'Natural Beauty, Real Care',
  currency: 'EGP',
  locale: 'ar-EG',
  phone: '+20 100 000 0000',
  email: 'hello@rooh.beauty',
  instagram: 'https://instagram.com/rooh.beauty',
  facebook: 'https://facebook.com/rooh.beauty',
  tiktok: 'https://tiktok.com/@rooh.beauty',
} as const;

export const COLORS = {
  deepOlive: '#354936',
  forestGreen: '#203A2B',
  softOlive: '#78866B',
  sage: '#A6B39A',
  warmCream: '#F6F1E7',
  ivory: '#FFFDF7',
  gold: '#C9A96E',
  charcoal: '#30332D',
} as const;

// Owner credentials — stored server-side only, never exposed to client
export const OWNER = {
  username: 'rooh_admin',
  // Password: Rooh@2026#Admin
  // Password stored as bcrypt hash in DB
  displayName: 'عبودي',
  secret_path: '/owner-access',
  dashboard_path: '/owner-control',
} as const;

