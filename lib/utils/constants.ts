/**
 * FRAME — The Scene, Defined.
 * Animation Presets & App Constants
 */

import type { Variants, Transition } from 'framer-motion';

const springSmooth: Transition = { type: 'spring', stiffness: 200, damping: 24 };
const springGentle: Transition = { type: 'spring', stiffness: 150, damping: 20 };
const easeOutExpo: Transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };
const easeOutSoft: Transition = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: easeOutExpo },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: springGentle },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const scale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: springSmooth },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: easeOutExpo },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: easeOutExpo },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: easeOutSoft },
};

export const APP_NAME = 'FRAME';
export const APP_TAGLINE = 'The Scene, Defined.';
export const APP_DESCRIPTION =
  'Curated cultural experiences across Tunisia. From candlelit concerts in Carthage to underground art in La Marsa.';

export const CURRENCY = 'TND';
export const DEFAULT_LOCALE = 'en-US';

export const ACCENT_COLORS = {
  coral: '#E85D4A',
  amber: '#D4B156',
  violet: '#8B5CF6',
  cyan: '#06B6D4',
  emerald: '#2FBF7B',
  rose: '#F43F5E',
  indigo: '#5B5FE6',
  sky: '#0EA5E9',
} as const;

export const CATEGORY_COLORS: Record<string, string> = {
  music: ACCENT_COLORS.violet,
  art: ACCENT_COLORS.amber,
  gastro: ACCENT_COLORS.coral,
  nightlife: ACCENT_COLORS.indigo,
  wellness: ACCENT_COLORS.emerald,
};

export const HOME_FEED_LIMIT = 8;
export const VISIBLE_TIERS = 3;

export const BREAKPOINTS = {
  sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536,
} as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/frame.tn',
  tiktok: 'https://tiktok.com/@frame.tn',
  website: 'https://frame.tn',
} as const;

export const ANIM = {
  fadeUp, fadeIn, slideUp, stagger, scale, scaleIn, slideLeft, slideRight, letterReveal,
} as const;
