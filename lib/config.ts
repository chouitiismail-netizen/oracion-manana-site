// Curated content configuration for homepage sections

export const START_HERE_SLUGS = [
  'oraciones-por-la-familia',
  'oracion-por-la-familia-unida',
  'oracion-para-bendecir-a-mi-familia',
  'oracion-por-la-paz-en-el-hogar',
  'oracion-por-mi-familia-y-mis-hijos',
  'oracion-para-bendecir-el-hogar',
];

export const FEATURED_SLUGS = [
  'oracion-por-la-familia-en-crisis',
  'oracion-para-la-reconciliacion-familiar',
  'oracion-para-sanar-heridas-familiares',
  'oracion-por-la-unidad-familiar',
  'oracion-por-un-hijo-rebelde',
  'oracion-para-dar-gracias-por-la-familia',
];

// Primary prayer for main CTA
export const PRIMARY_PRAYER_SLUG = 'oraciones-por-la-familia';

// Quick action categories with icons and slugs
export interface QuickAction {
  id: string;
  label: string;
  icon: 'anxiety' | 'gratitude' | 'protection' | 'family' | 'trust';
  slug: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'unidad', label: 'Unidad', icon: 'family', slug: 'oracion-por-la-familia-unida' },
  { id: 'bendicion', label: 'Bendición', icon: 'gratitude', slug: 'oracion-para-bendecir-a-mi-familia' },
  { id: 'paz', label: 'Paz', icon: 'anxiety', slug: 'oracion-por-la-paz-en-el-hogar' },
  { id: 'reconciliacion', label: 'Reconciliación', icon: 'trust', slug: 'oracion-para-la-reconciliacion-familiar' },
  { id: 'proteccion', label: 'Protección', icon: 'protection', slug: 'oracion-para-proteger-a-la-familia' },
];

// Daily verse for "Santo del día" equivalent
export const DAILY_VERSES = [
  { text: 'Que el Señor te bendiga y te proteja; que el Señor te muestre su favor y tenga compasión de ti.', reference: 'Números 6:24-25' },
  { text: 'Yo y mi casa serviremos al Señor.', reference: 'Josué 24:15' },
  { text: 'Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.', reference: 'Proverbios 22:6' },
  { text: 'El amor es paciente, es bondadoso; el amor no es envidioso ni jactancioso ni orgulloso.', reference: '1 Corintios 13:4' },
  { text: 'Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos.', reference: 'Mateo 18:20' },
];

export function getDailyVerse() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}
