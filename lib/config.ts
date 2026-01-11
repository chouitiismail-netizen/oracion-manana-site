// Curated content configuration for homepage sections

export const START_HERE_SLUGS = [
  'oraciones-de-la-manana',
  'oracion-de-la-manana',
  'oracion-para-empezar-el-dia-con-fe',
  'oracion-al-despertar',
  'oracion-para-ofrecer-el-dia-a-dios',
  'oracion-de-la-manana-corta',
];

export const FEATURED_SLUGS = [
  'oracion-de-la-manana-catolica',
  'oracion-para-comenzar-el-dia-en-paz',
  'oracion-para-poner-el-dia-en-manos-de-dios',
  'oracion-de-la-manana-para-la-familia',
  'oracion-de-la-manana-para-los-hijos',
  'oracion-de-la-manana-para-el-trabajo',
];

// Primary prayer for main CTA
export const PRIMARY_PRAYER_SLUG = 'oraciones-de-la-manana';

// Quick action categories with icons and slugs
export interface QuickAction {
  id: string;
  label: string;
  icon: 'anxiety' | 'gratitude' | 'protection' | 'family' | 'trust';
  slug: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: 'fe', label: 'Fe', icon: 'protection', slug: 'oracion-para-empezar-el-dia-con-fe' },
  { id: 'gratitud', label: 'Gratitud', icon: 'gratitude', slug: 'oracion-de-la-manana-para-agradecer' },
  { id: 'paz', label: 'Paz', icon: 'trust', slug: 'oracion-para-comenzar-el-dia-en-paz' },
  { id: 'familia', label: 'Familia', icon: 'family', slug: 'oracion-de-la-manana-para-la-familia' },
  { id: 'proteccion', label: 'Protección', icon: 'anxiety', slug: 'oracion-de-la-manana-para-la-proteccion' },
];

// Daily verse for morning devotion
export const DAILY_VERSES = [
  { text: 'Este es el día que hizo el Señor; regocijémonos y alegrémonos en él.', reference: 'Salmo 118:24' },
  { text: 'Por la mañana hazme saber de tu gran amor, porque en ti he puesto mi confianza.', reference: 'Salmo 143:8' },
  { text: 'El amor del Señor nunca se acaba, y nunca faltan sus bondades. Cada mañana se renuevan.', reference: 'Lamentaciones 3:22-23' },
  { text: 'Muy de mañana, cuando todavía estaba oscuro, Jesús se levantó, salió de la casa y se fue a un lugar solitario, donde se puso a orar.', reference: 'Marcos 1:35' },
  { text: 'Pero yo cantaré de tu poder, y por la mañana alabaré tu amor; porque tú eres mi refugio en momentos de angustia.', reference: 'Salmo 59:16' },
];

export function getDailyVerse() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}
