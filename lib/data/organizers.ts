/**
 * FRAME App - Organizer Data (Extended)
 */

import type { EventOrganizer } from './events';

export interface OrganizerStats {
  totalEvents: number;
  totalAttendees: number;
  avgRating: number;
  reviewCount: number;
}

export interface Organizer extends EventOrganizer {
  bio: string;
  website: string;
  instagram: string;
  city: string;
  joinedAt: string;
  stats: OrganizerStats;
}

export const organizerProfiles: Organizer[] = [
  {
    id: 'org-impressive',
    name: 'Impressive Tunisia',
    avatar: '/images/organizers/impressive.jpg',
    verified: true,
    bio: 'Tunisia\u2019s leading luxury event agency, specialising in high-profile launches, galas, and brand activations across Tunis, Gammarth, and Hammamet.',
    website: 'https://impressive.tn',
    instagram: '@impressive.tn',
    city: 'Tunis',
    joinedAt: '2025-09-01T10:00:00',
    stats: {
      totalEvents: 34,
      totalAttendees: 8420,
      avgRating: 4.8,
      reviewCount: 312,
    },
  },
  {
    id: 'org-resaprivee',
    name: 'ResaPrivee',
    avatar: '/images/organizers/resaprivee.jpg',
    verified: true,
    bio: 'A boutique concierge and events platform connecting discerning audiences with curated experiences \u2014 from jazz nights to rooftop cinema.',
    website: 'https://resaprivee.tn',
    instagram: '@resaprivee',
    city: 'La Marsa',
    joinedAt: '2025-10-15T10:00:00',
    stats: {
      totalEvents: 21,
      totalAttendees: 3150,
      avgRating: 4.7,
      reviewCount: 189,
    },
  },
  {
    id: 'org-frame',
    name: 'FRAME Studios',
    avatar: '/images/organizers/frame-studios.jpg',
    verified: true,
    bio: 'The creative engine behind FRAME Originals. We design experiences that blend music, art, and atmosphere into something you\u2019ll never forget.',
    website: 'https://frame.tn',
    instagram: '@frame.tn',
    city: 'Tunis',
    joinedAt: '2025-08-01T10:00:00',
    stats: {
      totalEvents: 12,
      totalAttendees: 4200,
      avgRating: 4.9,
      reviewCount: 276,
    },
  },
  {
    id: 'org-flo',
    name: 'fl\u014D Collective',
    avatar: '/images/organizers/flo.jpg',
    verified: true,
    bio: 'An underground music and arts collective known for warehouse parties, guerrilla events, and pushing Tunisia\u2019s electronic music scene forward.',
    website: 'https://flo-collective.com',
    instagram: '@flo.collective',
    city: 'Tunis',
    joinedAt: '2025-11-01T10:00:00',
    stats: {
      totalEvents: 18,
      totalAttendees: 5600,
      avgRating: 4.6,
      reviewCount: 410,
    },
  },
  {
    id: 'org-dar',
    name: 'Dar Cultural',
    avatar: '/images/organizers/dar-cultural.jpg',
    verified: true,
    bio: 'A cultural foundation dedicated to preserving and promoting Tunisian arts through workshops, exhibitions, and immersive dining experiences.',
    website: 'https://darcultural.org',
    instagram: '@dar.cultural',
    city: 'La Marsa',
    joinedAt: '2025-12-01T10:00:00',
    stats: {
      totalEvents: 15,
      totalAttendees: 1890,
      avgRating: 4.8,
      reviewCount: 134,
    },
  },
  {
    id: 'org-habibi',
    name: 'Habibi Events',
    avatar: '/images/organizers/habibi.jpg',
    verified: true,
    bio: 'The nightlife powerhouse behind Gammarth\u2019s hottest venue. Known for packed nights, world-class DJs, and the legendary NOIR series.',
    website: 'https://habibi.tn',
    instagram: '@habibi.gammarth',
    city: 'Gammarth',
    joinedAt: '2025-10-01T10:00:00',
    stats: {
      totalEvents: 42,
      totalAttendees: 14200,
      avgRating: 4.5,
      reviewCount: 820,
    },
  },
];

export function getOrganizerById(id: string): Organizer | undefined {
  return organizerProfiles.find((o) => o.id === id);
}

export function getVerifiedOrganizers(): Organizer[] {
  return organizerProfiles.filter((o) => o.verified);
}
