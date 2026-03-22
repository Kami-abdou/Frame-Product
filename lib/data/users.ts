/**
 * FRAME App - User Data
 */

import type { EventCategory } from './events';

export interface UserPreferences {
  favoriteCategories: EventCategory[];
  notificationsEnabled: boolean;
  marketingOptIn: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  joinedAt: string;
  preferences: UserPreferences;
  bookingIds: string[];
  waitlistIds: string[];
  savedEventIds: string[];
  isVerified: boolean;
}

export const currentUser: User = {
  id: 'usr-001',
  firstName: 'Molka',
  lastName: 'Hammemi',
  email: 'molka.hammemi@gmail.com',
  phone: '+216 55 123 456',
  avatar: '/images/users/yasmine.jpg',
  city: 'La Marsa',
  joinedAt: '2025-11-15T10:00:00',
  preferences: {
    favoriteCategories: ['music', 'nightlife', 'gastro'],
    notificationsEnabled: true,
    marketingOptIn: true,
  },
  bookingIds: ['bk-001', 'bk-002', 'bk-003'],
  waitlistIds: ['wl-001', 'wl-002'],
  savedEventIds: ['evt-002', 'evt-005', 'evt-010', 'evt-014'],
  isVerified: true,
};

export function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

export function getUserInitials(user: User): string {
  return `${user.firstName[0]}${user.lastName[0]}`;
}
