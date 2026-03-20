/**
 * FRAME App - Event Categories
 */

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'music',
    label: 'Music',
    icon: '\uD83C\uDFB5',
    color: '#8B5CF6',
    description:
      'Live performances, acoustic sessions, and curated DJ sets in stunning Tunisian venues.',
  },
  {
    id: 'art',
    label: 'Art',
    icon: '\uD83C\uDFA8',
    color: '#F59E0B',
    description:
      'Gallery pop-ups, immersive installations, and creative workshops by local and international artists.',
  },
  {
    id: 'gastro',
    label: 'Gastro',
    icon: '\uD83C\uDF7D\uFE0F',
    color: '#FF6B6B',
    description:
      'Chef\u2019s tables, wine pairings, and culinary experiences celebrating Mediterranean flavours.',
  },
  {
    id: 'nightlife',
    label: 'Nightlife',
    icon: '\uD83C\uDF19',
    color: '#6366F1',
    description:
      'Exclusive after-dark gatherings, rooftop parties, and underground electronic nights.',
  },
  {
    id: 'wellness',
    label: 'Wellness',
    icon: '\uD83E\uDDD8',
    color: '#10B981',
    description:
      'Sunrise yoga, sound baths, and holistic retreats at coastal and countryside escapes.',
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryColor(id: string): string {
  return getCategoryById(id)?.color ?? '#8B5CF6';
}
