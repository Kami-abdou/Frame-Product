/**
 * FRAME App - Events Data Layer
 *
 * 16 rich mock events set across real Tunisia venues.
 * This is the core data file powering the entire FRAME demo.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type EventCategory = 'music' | 'art' | 'gastro' | 'nightlife' | 'wellness';
export type TierType = 'early_bird' | 'regular' | 'vip' | 'last_minute';
export type EventStatus = 'upcoming' | 'sold_out' | 'cancelled' | 'past';
export type Badge =
  | 'invite_only'
  | 'limited_capacity'
  | 'secret_location'
  | 'frame_original'
  | 'almost_sold_out'
  | 'new';

export interface PricingTier {
  id: string;
  type: TierType;
  label: string;
  price: number;
  originalPrice?: number;
  currency: 'TND';
  totalCapacity: number;
  sold: number;
  perks: string[];
  available: boolean;
  salesEndDate: string;
}

export interface EventOrganizer {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
}

export interface FrameEvent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: EventCategory;
  date: string;
  endDate: string;
  location: {
    name: string;
    address: string;
    city: string;
    isSecret: boolean;
  };
  media: {
    heroImage: string;
    teaserImages: string[];
    videoUrl?: string;
    ambientColor: string;
  };
  organizer: EventOrganizer;
  tiers: PricingTier[];
  capacity: {
    total: number;
    sold: number;
  };
  tags: string[];
  badges: Badge[];
  isFrameOriginal: boolean;
  status: EventStatus;
  waitlistEnabled: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Organizer References
// ---------------------------------------------------------------------------

const organizers: Record<string, EventOrganizer> = {
  impressive: {
    id: 'org-impressive',
    name: 'Impressive Tunisia',
    avatar: '/images/organizers/impressive.jpg',
    verified: true,
  },
  resaprivee: {
    id: 'org-resaprivee',
    name: 'ResaPrivee',
    avatar: '/images/organizers/resaprivee.jpg',
    verified: true,
  },
  frame: {
    id: 'org-frame',
    name: 'FRAME Studios',
    avatar: '/images/organizers/frame-studios.jpg',
    verified: true,
  },
  flo: {
    id: 'org-flo',
    name: 'fl\u014D Collective',
    avatar: '/images/organizers/flo.jpg',
    verified: true,
  },
  dar: {
    id: 'org-dar',
    name: 'Dar Cultural',
    avatar: '/images/organizers/dar-cultural.jpg',
    verified: true,
  },
  habibi: {
    id: 'org-habibi',
    name: 'Habibi Events',
    avatar: '/images/organizers/habibi.jpg',
    verified: true,
  },
};

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export const events: FrameEvent[] = [
  // 1 - Sunset Acoustics
  {
    id: 'evt-001',
    slug: 'sunset-acoustics',
    title: 'Sunset Acoustics',
    subtitle: 'An evening of live acoustic sessions on the Mediterranean terrace.',
    description:
      'As the sun dips below the Gulf of Tunis, three acclaimed acoustic acts take the M\u00F6venpick terrace stage. Expect stripped-back performances, curated cocktails, and the kind of golden-hour atmosphere that only the Gammarth coastline can deliver. Doors open at 6 PM; music begins at 7 PM sharp.',
    category: 'music',
    date: '2026-04-18T19:00:00',
    endDate: '2026-04-18T23:00:00',
    location: {
      name: 'M\u00F6venpick Hotel Gammarth',
      address: 'Avenue Taieb Mhiri, Gammarth',
      city: 'Gammarth',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/sunset-acoustics.jpg',
      teaserImages: [
        '/images/events/sunset-acoustics-2.jpg',
        '/images/events/sunset-acoustics-3.jpg',
      ],
      ambientColor: '#F59E0B',
    },
    organizer: organizers.frame,
    tiers: [
      {
        id: 'evt-001-eb',
        type: 'early_bird',
        label: 'Early Bird',
        price: 75,
        originalPrice: 120,
        currency: 'TND',
        totalCapacity: 60,
        sold: 60,
        perks: ['Priority entry', 'Welcome drink'],
        available: false,
        salesEndDate: '2026-04-10T23:59:00',
      },
      {
        id: 'evt-001-reg',
        type: 'regular',
        label: 'Standard',
        price: 120,
        currency: 'TND',
        totalCapacity: 120,
        sold: 88,
        perks: ['General entry'],
        available: true,
        salesEndDate: '2026-04-18T17:00:00',
      },
      {
        id: 'evt-001-vip',
        type: 'vip',
        label: 'VIP Lounge',
        price: 250,
        currency: 'TND',
        totalCapacity: 40,
        sold: 29,
        perks: ['Front-row seating', 'Open bar', 'Meet & greet'],
        available: true,
        salesEndDate: '2026-04-18T17:00:00',
      },
    ],
    capacity: { total: 220, sold: 177 },
    tags: ['acoustic', 'live music', 'sunset', 'terrace', 'cocktails'],
    badges: ['frame_original'],
    isFrameOriginal: true,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-03-01T10:00:00',
  },

  // 2 - Candlelight Carthage
  {
    id: 'evt-002',
    slug: 'candlelight-carthage',
    title: 'Candlelight Carthage',
    subtitle: 'A classical ensemble performance among ancient ruins, by candlelight.',
    description:
      'Imagine two thousand candles flickering between Roman columns as a 12-piece string ensemble performs Vivaldi and contemporary Arabic arrangements. Candlelight Carthage is an invite-only evening that transforms one of the world\u2019s oldest archaeological sites into an open-air concert hall. Formal attire suggested.',
    category: 'music',
    date: '2026-04-25T20:30:00',
    endDate: '2026-04-25T23:30:00',
    location: {
      name: 'Ruins of Carthage',
      address: 'Archaeological Site, Carthage',
      city: 'Carthage',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/candlelight-carthage.jpg',
      teaserImages: [
        '/images/events/candlelight-carthage-2.jpg',
        '/images/events/candlelight-carthage-3.jpg',
      ],
      ambientColor: '#F43F5E',
    },
    organizer: organizers.frame,
    tiers: [
      {
        id: 'evt-002-reg',
        type: 'regular',
        label: 'Invitation',
        price: 200,
        currency: 'TND',
        totalCapacity: 100,
        sold: 72,
        perks: ['Reserved seating', 'Champagne on arrival'],
        available: true,
        salesEndDate: '2026-04-23T23:59:00',
      },
      {
        id: 'evt-002-vip',
        type: 'vip',
        label: 'Patron Circle',
        price: 450,
        currency: 'TND',
        totalCapacity: 30,
        sold: 26,
        perks: ['Front-row seats', 'Private reception with artists', 'Gift box', 'Valet parking'],
        available: true,
        salesEndDate: '2026-04-23T23:59:00',
      },
    ],
    capacity: { total: 130, sold: 98 },
    tags: ['classical', 'candlelight', 'ruins', 'heritage', 'formal'],
    badges: ['frame_original', 'invite_only'],
    isFrameOriginal: true,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-02-20T10:00:00',
  },

  // 3 - NOIR
  {
    id: 'evt-003',
    slug: 'noir',
    title: 'NOIR',
    subtitle: 'The most sought-after nightlife experience on the Gammarth coast.',
    description:
      'NOIR returns for its fifth edition at Habibi \u2014 an all-black dress-code affair featuring three international DJs, immersive light design by Studio Volta, and a bespoke cocktail menu. Previous editions sold out within hours. This one already has.',
    category: 'nightlife',
    date: '2026-05-02T22:00:00',
    endDate: '2026-05-03T04:00:00',
    location: {
      name: 'Habibi Gammarth',
      address: 'Route de la Marsa, Gammarth',
      city: 'Gammarth',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/noir.jpg',
      teaserImages: ['/images/events/noir-2.jpg', '/images/events/noir-3.jpg'],
      ambientColor: '#6366F1',
    },
    organizer: organizers.habibi,
    tiers: [
      {
        id: 'evt-003-reg',
        type: 'regular',
        label: 'General Admission',
        price: 150,
        currency: 'TND',
        totalCapacity: 250,
        sold: 250,
        perks: ['Entry after 10 PM'],
        available: false,
        salesEndDate: '2026-04-28T23:59:00',
      },
      {
        id: 'evt-003-vip',
        type: 'vip',
        label: 'VIP Table',
        price: 500,
        currency: 'TND',
        totalCapacity: 50,
        sold: 50,
        perks: ['Reserved table for 4', 'Bottle service', 'Fast-track entry'],
        available: false,
        salesEndDate: '2026-04-28T23:59:00',
      },
    ],
    capacity: { total: 300, sold: 300 },
    tags: ['nightlife', 'dj', 'electronic', 'all-black', 'immersive'],
    badges: ['almost_sold_out'],
    isFrameOriginal: false,
    status: 'sold_out',
    waitlistEnabled: true,
    createdAt: '2026-03-05T10:00:00',
  },

  // 4 - Fabrika Weekend
  {
    id: 'evt-004',
    slug: 'fabrika-weekend',
    title: 'Fabrika Weekend',
    subtitle: 'A two-night industrial warehouse party curated by fl\u014D.',
    description:
      'fl\u014D takes over their iconic Tunis space for 48 hours of non-stop music, art, and culture. Friday is deep house and afro-beats; Saturday pivots to techno and experimental sets. Expect live visuals, pop-up food stalls, and a merch drop.',
    category: 'nightlife',
    date: '2026-05-08T21:00:00',
    endDate: '2026-05-10T03:00:00',
    location: {
      name: 'fl\u014D Tunis',
      address: 'Zone Industrielle, La Charguia',
      city: 'Tunis',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/fabrika-weekend.jpg',
      teaserImages: [
        '/images/events/fabrika-weekend-2.jpg',
        '/images/events/fabrika-weekend-3.jpg',
      ],
      ambientColor: '#8B5CF6',
    },
    organizer: organizers.flo,
    tiers: [
      {
        id: 'evt-004-eb',
        type: 'early_bird',
        label: 'Early Bird (2 Nights)',
        price: 100,
        originalPrice: 160,
        currency: 'TND',
        totalCapacity: 80,
        sold: 80,
        perks: ['Access to both nights', 'Priority entry'],
        available: false,
        salesEndDate: '2026-04-25T23:59:00',
      },
      {
        id: 'evt-004-reg',
        type: 'regular',
        label: 'Weekend Pass',
        price: 160,
        currency: 'TND',
        totalCapacity: 200,
        sold: 188,
        perks: ['Access to both nights'],
        available: true,
        salesEndDate: '2026-05-08T18:00:00',
      },
      {
        id: 'evt-004-vip',
        type: 'vip',
        label: 'Backstage VIP',
        price: 350,
        currency: 'TND',
        totalCapacity: 40,
        sold: 35,
        perks: ['Backstage access', 'Open bar', 'Artist meet & greet', 'Merch pack'],
        available: true,
        salesEndDate: '2026-05-08T18:00:00',
      },
    ],
    capacity: { total: 320, sold: 303 },
    tags: ['electronic', 'warehouse', 'two-night', 'afro-beats', 'techno'],
    badges: ['almost_sold_out'],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-03-10T10:00:00',
  },

  // 5 - Chef's Table: Mediterranean
  {
    id: 'evt-005',
    slug: 'chefs-table-mediterranean',
    title: "Chef\u2019s Table: Mediterranean",
    subtitle: 'A 7-course tasting menu in a secret garden overlooking the bay.',
    description:
      'Chef Anis Bouabsa presents a seven-course Mediterranean journey \u2014 from harissa-cured hamachi to saffron-laced risotto and orange-blossom panna cotta. Each course is paired with a curated Tunisian or Southern French wine. Only 24 seats, served family-style in Dar El Marsa\u2019s candlelit courtyard.',
    category: 'gastro',
    date: '2026-04-20T20:00:00',
    endDate: '2026-04-20T23:30:00',
    location: {
      name: 'Dar El Marsa',
      address: 'Disclosed 24h before event',
      city: 'La Marsa',
      isSecret: true,
    },
    media: {
      heroImage: '/images/events/chefs-table.jpg',
      teaserImages: ['/images/events/chefs-table-2.jpg', '/images/events/chefs-table-3.jpg'],
      ambientColor: '#FF6B6B',
    },
    organizer: organizers.dar,
    tiers: [
      {
        id: 'evt-005-reg',
        type: 'regular',
        label: 'Tasting Seat',
        price: 280,
        currency: 'TND',
        totalCapacity: 18,
        sold: 14,
        perks: ['7-course menu', 'Wine pairing'],
        available: true,
        salesEndDate: '2026-04-19T12:00:00',
      },
      {
        id: 'evt-005-vip',
        type: 'vip',
        label: "Chef\u2019s Counter",
        price: 420,
        currency: 'TND',
        totalCapacity: 6,
        sold: 5,
        perks: ['Front-row at the kitchen', '7-course menu', 'Wine pairing', 'Signed cookbook'],
        available: true,
        salesEndDate: '2026-04-19T12:00:00',
      },
    ],
    capacity: { total: 24, sold: 19 },
    tags: ['fine dining', 'mediterranean', 'wine pairing', 'intimate', 'chef'],
    badges: ['secret_location', 'limited_capacity'],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: true,
    createdAt: '2026-03-08T10:00:00',
  },

  // 6 - Silent Auction Soirée
  {
    id: 'evt-006',
    slug: 'silent-auction-soiree',
    title: 'Silent Auction Soir\u00E9e',
    subtitle: 'Bid on contemporary North African art in the Jasmin Ballroom.',
    description:
      'An invite-only evening where 40 works by emerging Tunisian, Algerian, and Moroccan artists go under the silent hammer. The Four Seasons Jasmin Ballroom is transformed into a gallery space with champagne service, live jazz, and guided art talks. A portion of proceeds supports the Tunis Art Fund.',
    category: 'art',
    date: '2026-05-15T19:30:00',
    endDate: '2026-05-15T23:00:00',
    location: {
      name: 'Four Seasons Hotel Tunis \u2013 Jasmin Ballroom',
      address: 'Zone Touristique, Gammarth',
      city: 'Gammarth',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/silent-auction.jpg',
      teaserImages: ['/images/events/silent-auction-2.jpg', '/images/events/silent-auction-3.jpg'],
      ambientColor: '#F59E0B',
    },
    organizer: organizers.impressive,
    tiers: [
      {
        id: 'evt-006-reg',
        type: 'regular',
        label: 'Gallery Access',
        price: 180,
        currency: 'TND',
        totalCapacity: 100,
        sold: 61,
        perks: ['Auction paddle', 'Champagne reception', 'Art catalogue'],
        available: true,
        salesEndDate: '2026-05-13T23:59:00',
      },
      {
        id: 'evt-006-vip',
        type: 'vip',
        label: 'Collector\u2019s Preview',
        price: 400,
        currency: 'TND',
        totalCapacity: 30,
        sold: 22,
        perks: ['1-hour early preview', 'Private curator tour', 'Seated dinner', 'Auction paddle'],
        available: true,
        salesEndDate: '2026-05-13T23:59:00',
      },
    ],
    capacity: { total: 130, sold: 83 },
    tags: ['art', 'auction', 'gallery', 'contemporary', 'charity'],
    badges: ['invite_only'],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-03-12T10:00:00',
  },

  // 7 - Techno-Art Brunch
  {
    id: 'evt-007',
    slug: 'techno-art-brunch',
    title: 'Techno-Art Brunch',
    subtitle: 'Where beats meet brushstrokes every Sunday morning.',
    description:
      'FRAME Studios\u2019 signature daytime format: a warehouse brunch fusing live techno DJs with a rotating roster of visual artists painting in real time. Expect bottomless mimosas, artisan food trucks, and a merch market. Not your average Sunday.',
    category: 'nightlife',
    date: '2026-05-17T11:00:00',
    endDate: '2026-05-17T17:00:00',
    location: {
      name: 'Warehouse Megrine',
      address: 'Rue de l\u2019Industrie, Megrine',
      city: 'Megrine',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/techno-art-brunch.jpg',
      teaserImages: [
        '/images/events/techno-art-brunch-2.jpg',
        '/images/events/techno-art-brunch-3.jpg',
      ],
      ambientColor: '#06B6D4',
    },
    organizer: organizers.frame,
    tiers: [
      {
        id: 'evt-007-eb',
        type: 'early_bird',
        label: 'Early Riser',
        price: 60,
        originalPrice: 90,
        currency: 'TND',
        totalCapacity: 50,
        sold: 50,
        perks: ['Entry + welcome mimosa'],
        available: false,
        salesEndDate: '2026-05-10T23:59:00',
      },
      {
        id: 'evt-007-reg',
        type: 'regular',
        label: 'Standard',
        price: 90,
        currency: 'TND',
        totalCapacity: 150,
        sold: 97,
        perks: ['Entry'],
        available: true,
        salesEndDate: '2026-05-17T09:00:00',
      },
      {
        id: 'evt-007-vip',
        type: 'vip',
        label: 'Brunch Table',
        price: 200,
        currency: 'TND',
        totalCapacity: 40,
        sold: 28,
        perks: ['Reserved table for 4', 'Bottomless brunch', 'Art print gift'],
        available: true,
        salesEndDate: '2026-05-17T09:00:00',
      },
    ],
    capacity: { total: 240, sold: 175 },
    tags: ['brunch', 'techno', 'art', 'daytime', 'warehouse'],
    badges: ['frame_original'],
    isFrameOriginal: true,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-03-15T10:00:00',
  },

  // 8 - Villa Didon Gallery Pop-Up
  {
    id: 'evt-008',
    slug: 'villa-didon-gallery-pop-up',
    title: 'Villa Didon Gallery Pop-Up',
    subtitle: 'A three-day contemporary art exhibition in Carthage\u2019s most iconic villa.',
    description:
      'Villa Didon opens its doors for a curated pop-up featuring 15 emerging North African photographers and mixed-media artists. The exhibition spans the villa\u2019s salons, terraces, and infinity pool deck. Opening night includes a guided tour with the curator and a sunset cocktail hour.',
    category: 'art',
    date: '2026-05-22T18:00:00',
    endDate: '2026-05-24T21:00:00',
    location: {
      name: 'Villa Didon',
      address: 'Rue Mendes France, Carthage',
      city: 'Carthage',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/villa-didon.jpg',
      teaserImages: ['/images/events/villa-didon-2.jpg', '/images/events/villa-didon-3.jpg'],
      ambientColor: '#F59E0B',
    },
    organizer: organizers.dar,
    tiers: [
      {
        id: 'evt-008-reg',
        type: 'regular',
        label: 'Day Pass',
        price: 50,
        currency: 'TND',
        totalCapacity: 80,
        sold: 42,
        perks: ['Exhibition access', 'Catalogue'],
        available: true,
        salesEndDate: '2026-05-24T15:00:00',
      },
      {
        id: 'evt-008-vip',
        type: 'vip',
        label: 'Opening Night',
        price: 150,
        currency: 'TND',
        totalCapacity: 50,
        sold: 41,
        perks: ['Opening night access', 'Curator tour', 'Cocktail reception', 'Signed print'],
        available: true,
        salesEndDate: '2026-05-21T23:59:00',
      },
    ],
    capacity: { total: 130, sold: 83 },
    tags: ['photography', 'mixed media', 'gallery', 'pop-up', 'villa'],
    badges: ['limited_capacity'],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-03-18T10:00:00',
  },

  // 9 - Consumer Elite Show
  {
    id: 'evt-009',
    slug: 'consumer-elite-show',
    title: 'Consumer Elite Show',
    subtitle: 'An ultra-premium tasting experience for discerning palates.',
    description:
      'The Residence Tunis hosts an invite-only evening of rare spirits, artisanal cheeses, and luxury brand showcases. Expect masterclasses from Tunisian sommeliers, whisky flights curated by international distillers, and a VIP lounge with live piano. Dress code: smart elegant.',
    category: 'gastro',
    date: '2026-05-29T19:00:00',
    endDate: '2026-05-29T23:00:00',
    location: {
      name: 'The Residence Tunis',
      address: 'Les C\u00F4tes de Carthage, Gammarth',
      city: 'Gammarth',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/consumer-elite.jpg',
      teaserImages: ['/images/events/consumer-elite-2.jpg', '/images/events/consumer-elite-3.jpg'],
      ambientColor: '#FF6B6B',
    },
    organizer: organizers.impressive,
    tiers: [
      {
        id: 'evt-009-reg',
        type: 'regular',
        label: 'Tasting Pass',
        price: 220,
        currency: 'TND',
        totalCapacity: 120,
        sold: 64,
        perks: ['All tastings', 'Masterclass access', 'Gift bag'],
        available: true,
        salesEndDate: '2026-05-27T23:59:00',
      },
      {
        id: 'evt-009-vip',
        type: 'vip',
        label: 'Elite Lounge',
        price: 480,
        currency: 'TND',
        totalCapacity: 30,
        sold: 18,
        perks: ['Private lounge', 'Rare tastings only', 'Seated dinner', 'Concierge service'],
        available: true,
        salesEndDate: '2026-05-27T23:59:00',
      },
    ],
    capacity: { total: 150, sold: 82 },
    tags: ['tasting', 'luxury', 'spirits', 'fine dining', 'premium'],
    badges: ['invite_only'],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-03-20T10:00:00',
  },

  // 10 - Jazz & Jasmine Nights
  {
    id: 'evt-010',
    slug: 'jazz-and-jasmine-nights',
    title: 'Jazz & Jasmine Nights',
    subtitle: 'Live jazz in the jasmine-scented streets of Sidi Bou Said.',
    description:
      'A intimate trio of Tunisian jazz musicians performs in the courtyard of a converted boutique hotel overlooking the Mediterranean. The evening features three sets interspersed with jasmine tea service and local pastry pairings. Limited to 60 guests for maximum intimacy.',
    category: 'music',
    date: '2026-06-05T20:00:00',
    endDate: '2026-06-05T23:30:00',
    location: {
      name: 'Dar Said',
      address: 'Rue Toumi, Sidi Bou Said',
      city: 'Sidi Bou Said',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/jazz-jasmine.jpg',
      teaserImages: ['/images/events/jazz-jasmine-2.jpg', '/images/events/jazz-jasmine-3.jpg'],
      ambientColor: '#8B5CF6',
    },
    organizer: organizers.resaprivee,
    tiers: [
      {
        id: 'evt-010-reg',
        type: 'regular',
        label: 'Courtyard Seat',
        price: 95,
        currency: 'TND',
        totalCapacity: 40,
        sold: 22,
        perks: ['Seated entry', 'Jasmine tea & pastries'],
        available: true,
        salesEndDate: '2026-06-04T23:59:00',
      },
      {
        id: 'evt-010-vip',
        type: 'vip',
        label: 'Rooftop Terrace',
        price: 180,
        currency: 'TND',
        totalCapacity: 20,
        sold: 11,
        perks: ['Rooftop seating', 'Full dinner', 'Cocktails', 'Artist meet & greet'],
        available: true,
        salesEndDate: '2026-06-04T23:59:00',
      },
    ],
    capacity: { total: 60, sold: 33 },
    tags: ['jazz', 'live music', 'intimate', 'sidi bou said', 'jasmine'],
    badges: [],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-04-01T10:00:00',
  },

  // 11 - Wellness Retreat: Dawn
  {
    id: 'evt-011',
    slug: 'wellness-retreat-dawn',
    title: 'Wellness Retreat: Dawn',
    subtitle: 'A sunrise-to-noon holistic experience on the Hammamet shore.',
    description:
      'Begin at 5:30 AM with a guided sunrise meditation on the beach, followed by vinyasa yoga, a sound bath with Tunisian percussion, and a plant-based brunch prepared by a raw-food chef. FRAME\u2019s first wellness format \u2014 designed for those who seek stillness before the world wakes up.',
    category: 'wellness',
    date: '2026-05-10T05:30:00',
    endDate: '2026-05-10T12:00:00',
    location: {
      name: 'The Sindbad',
      address: 'Zone Touristique, Hammamet',
      city: 'Hammamet',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/wellness-dawn.jpg',
      teaserImages: ['/images/events/wellness-dawn-2.jpg', '/images/events/wellness-dawn-3.jpg'],
      ambientColor: '#10B981',
    },
    organizer: organizers.frame,
    tiers: [
      {
        id: 'evt-011-reg',
        type: 'regular',
        label: 'Retreat Pass',
        price: 130,
        currency: 'TND',
        totalCapacity: 50,
        sold: 31,
        perks: ['All sessions', 'Yoga mat provided', 'Plant-based brunch'],
        available: true,
        salesEndDate: '2026-05-09T18:00:00',
      },
      {
        id: 'evt-011-vip',
        type: 'vip',
        label: 'Premium Wellness',
        price: 250,
        currency: 'TND',
        totalCapacity: 15,
        sold: 9,
        perks: ['All sessions', 'Private massage (30 min)', 'Spa access', 'Wellness goodie bag'],
        available: true,
        salesEndDate: '2026-05-09T18:00:00',
      },
    ],
    capacity: { total: 65, sold: 40 },
    tags: ['yoga', 'meditation', 'sound bath', 'wellness', 'beach'],
    badges: ['frame_original'],
    isFrameOriginal: true,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-03-22T10:00:00',
  },

  // 12 - Underground Frequencies
  {
    id: 'evt-012',
    slug: 'underground-frequencies',
    title: 'Underground Frequencies',
    subtitle: 'Location revealed 3 hours before. Bring only your ears.',
    description:
      'A guerrilla-style electronic music night hidden somewhere in the Tunis Medina. The exact address is sent via encrypted link 3 hours before the event. Expect raw concrete, minimal lighting, and a stacked lineup of local and Berlin-based techno producers. Strictly limited.',
    category: 'nightlife',
    date: '2026-06-07T23:00:00',
    endDate: '2026-06-08T05:00:00',
    location: {
      name: 'Secret Venue \u2013 Tunis Medina',
      address: 'Revealed 3 hours before event',
      city: 'Tunis',
      isSecret: true,
    },
    media: {
      heroImage: '/images/events/underground-frequencies.jpg',
      teaserImages: [
        '/images/events/underground-frequencies-2.jpg',
        '/images/events/underground-frequencies-3.jpg',
      ],
      ambientColor: '#6366F1',
    },
    organizer: organizers.flo,
    tiers: [
      {
        id: 'evt-012-eb',
        type: 'early_bird',
        label: 'Blind Ticket',
        price: 55,
        originalPrice: 85,
        currency: 'TND',
        totalCapacity: 40,
        sold: 40,
        perks: ['Entry'],
        available: false,
        salesEndDate: '2026-05-30T23:59:00',
      },
      {
        id: 'evt-012-reg',
        type: 'regular',
        label: 'Standard',
        price: 85,
        currency: 'TND',
        totalCapacity: 80,
        sold: 56,
        perks: ['Entry'],
        available: true,
        salesEndDate: '2026-06-07T20:00:00',
      },
      {
        id: 'evt-012-lm',
        type: 'last_minute',
        label: 'Door',
        price: 110,
        currency: 'TND',
        totalCapacity: 30,
        sold: 0,
        perks: ['Entry (subject to capacity)'],
        available: true,
        salesEndDate: '2026-06-08T01:00:00',
      },
    ],
    capacity: { total: 150, sold: 96 },
    tags: ['techno', 'underground', 'electronic', 'secret', 'medina'],
    badges: ['secret_location'],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-04-05T10:00:00',
  },

  // 13 - Ceramic Arts Workshop
  {
    id: 'evt-013',
    slug: 'ceramic-arts-workshop',
    title: 'Ceramic Arts Workshop',
    subtitle: 'Hands-on pottery with a master ceramicist in La Marsa.',
    description:
      'Spend an afternoon learning traditional Tunisian ceramic techniques from master artisan Khalil Bouzid. The workshop covers hand-building, glazing, and traditional motif painting. Participants take home their fired pieces two weeks later. All materials and a light lunch are included.',
    category: 'art',
    date: '2026-05-24T10:00:00',
    endDate: '2026-05-24T15:00:00',
    location: {
      name: 'Galerie Kalligraphy',
      address: 'Avenue Habib Bourguiba, La Marsa',
      city: 'La Marsa',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/ceramic-workshop.jpg',
      teaserImages: [
        '/images/events/ceramic-workshop-2.jpg',
        '/images/events/ceramic-workshop-3.jpg',
      ],
      ambientColor: '#F59E0B',
    },
    organizer: organizers.dar,
    tiers: [
      {
        id: 'evt-013-reg',
        type: 'regular',
        label: 'Workshop Seat',
        price: 85,
        currency: 'TND',
        totalCapacity: 16,
        sold: 9,
        perks: ['All materials', 'Light lunch', 'Fired piece shipped to you'],
        available: true,
        salesEndDate: '2026-05-23T18:00:00',
      },
    ],
    capacity: { total: 16, sold: 9 },
    tags: ['workshop', 'ceramics', 'pottery', 'artisan', 'hands-on'],
    badges: [],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-04-08T10:00:00',
  },

  // 14 - Djerba Sound Festival
  {
    id: 'evt-014',
    slug: 'djerba-sound-festival',
    title: 'Djerba Sound Festival',
    subtitle: 'A three-day beachside music festival on the island of Djerba.',
    description:
      'Sun, sand, and sound collide as Djerba\u2019s newest festival brings together 20+ artists across two stages. From Tunisian folk fusion to international electronic acts, this is the island\u2019s biggest cultural event of the summer. Camping, glamping, and hotel packages available.',
    category: 'music',
    date: '2026-06-19T16:00:00',
    endDate: '2026-06-21T23:00:00',
    location: {
      name: 'Seguia Beach',
      address: 'Zone Touristique, Djerba',
      city: 'Djerba',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/djerba-sound.jpg',
      teaserImages: ['/images/events/djerba-sound-2.jpg', '/images/events/djerba-sound-3.jpg'],
      ambientColor: '#0EA5E9',
    },
    organizer: organizers.impressive,
    tiers: [
      {
        id: 'evt-014-eb',
        type: 'early_bird',
        label: 'Early Bird (3-Day)',
        price: 120,
        originalPrice: 200,
        currency: 'TND',
        totalCapacity: 100,
        sold: 67,
        perks: ['3-day festival pass', 'Welcome kit'],
        available: true,
        salesEndDate: '2026-05-31T23:59:00',
      },
      {
        id: 'evt-014-reg',
        type: 'regular',
        label: 'Festival Pass',
        price: 200,
        currency: 'TND',
        totalCapacity: 300,
        sold: 89,
        perks: ['3-day festival pass'],
        available: true,
        salesEndDate: '2026-06-19T12:00:00',
      },
      {
        id: 'evt-014-vip',
        type: 'vip',
        label: 'Island VIP',
        price: 450,
        currency: 'TND',
        totalCapacity: 50,
        sold: 19,
        perks: ['VIP area', 'Glamping tent', 'Open bar', 'Artist area access'],
        available: true,
        salesEndDate: '2026-06-15T23:59:00',
      },
    ],
    capacity: { total: 450, sold: 175 },
    tags: ['festival', 'beach', 'island', 'camping', 'multi-day'],
    badges: ['new'],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-04-10T10:00:00',
  },

  // 15 - Rooftop Cinema
  {
    id: 'evt-015',
    slug: 'rooftop-cinema',
    title: 'Rooftop Cinema',
    subtitle: 'Independent films under the stars on a La Marsa rooftop.',
    description:
      'A curated double-feature of Tunisian independent cinema screened on a rooftop with views of the sea. Popcorn, craft beer, and blankets provided. The evening opens with a short Q&A with the directors, followed by the two screenings with an intermission.',
    category: 'art',
    date: '2026-06-12T20:30:00',
    endDate: '2026-06-13T00:30:00',
    location: {
      name: 'Le Rooftop La Marsa',
      address: 'Rue du Lac, La Marsa',
      city: 'La Marsa',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/rooftop-cinema.jpg',
      teaserImages: [
        '/images/events/rooftop-cinema-2.jpg',
        '/images/events/rooftop-cinema-3.jpg',
      ],
      ambientColor: '#6366F1',
    },
    organizer: organizers.resaprivee,
    tiers: [
      {
        id: 'evt-015-reg',
        type: 'regular',
        label: 'Standard',
        price: 55,
        currency: 'TND',
        totalCapacity: 70,
        sold: 28,
        perks: ['Both screenings', 'Popcorn & drink'],
        available: true,
        salesEndDate: '2026-06-12T18:00:00',
      },
      {
        id: 'evt-015-vip',
        type: 'vip',
        label: 'Daybed',
        price: 120,
        currency: 'TND',
        totalCapacity: 20,
        sold: 12,
        perks: ['Private daybed for 2', 'Both screenings', 'Snack board & drinks'],
        available: true,
        salesEndDate: '2026-06-12T18:00:00',
      },
    ],
    capacity: { total: 90, sold: 40 },
    tags: ['cinema', 'rooftop', 'independent film', 'outdoor', 'director q&a'],
    badges: [],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-04-12T10:00:00',
  },

  // 16 - Wine & Canvas Night
  {
    id: 'evt-016',
    slug: 'wine-and-canvas-night',
    title: 'Wine & Canvas Night',
    subtitle: 'Sip, paint, and socialise at a Gammarth villa.',
    description:
      'A relaxed evening of guided painting in a private Gammarth villa. No experience needed \u2014 a professional artist walks you through creating your own canvas while you enjoy Tunisian wines and artisanal cheese boards. Take your masterpiece home at the end of the night.',
    category: 'gastro',
    date: '2026-06-14T19:00:00',
    endDate: '2026-06-14T22:30:00',
    location: {
      name: 'Villa Les Oliviers',
      address: 'Rue des Oliviers, Gammarth',
      city: 'Gammarth',
      isSecret: false,
    },
    media: {
      heroImage: '/images/events/wine-canvas.jpg',
      teaserImages: ['/images/events/wine-canvas-2.jpg', '/images/events/wine-canvas-3.jpg'],
      ambientColor: '#F43F5E',
    },
    organizer: organizers.resaprivee,
    tiers: [
      {
        id: 'evt-016-reg',
        type: 'regular',
        label: 'Easel Seat',
        price: 95,
        currency: 'TND',
        totalCapacity: 35,
        sold: 14,
        perks: ['All materials', '2 glasses of wine', 'Cheese board'],
        available: true,
        salesEndDate: '2026-06-13T23:59:00',
      },
      {
        id: 'evt-016-vip',
        type: 'vip',
        label: 'Artist\u2019s Lounge',
        price: 170,
        currency: 'TND',
        totalCapacity: 10,
        sold: 4,
        perks: ['All materials', 'Unlimited wine', 'Full dinner', 'Private instruction'],
        available: true,
        salesEndDate: '2026-06-13T23:59:00',
      },
    ],
    capacity: { total: 45, sold: 18 },
    tags: ['wine', 'painting', 'social', 'villa', 'creative'],
    badges: ['new'],
    isFrameOriginal: false,
    status: 'upcoming',
    waitlistEnabled: false,
    createdAt: '2026-04-15T10:00:00',
  },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getEventBySlug(slug: string): FrameEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventsByCategory(category: EventCategory): FrameEvent[] {
  return events.filter((e) => e.category === category);
}

export function getFrameOriginals(): FrameEvent[] {
  return events.filter((e) => e.isFrameOriginal);
}

export function getFeaturedEvents(): FrameEvent[] {
  return events.slice(0, 8);
}

export function getUpcomingEvents(): FrameEvent[] {
  return events.filter((e) => e.status === 'upcoming');
}

export function getEventById(id: string): FrameEvent | undefined {
  return events.find((e) => e.id === id);
}
