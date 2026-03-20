/**
 * FRAME App - Waitlist Data
 */

export type WaitlistStatus = 'waiting' | 'offered' | 'expired' | 'converted';

export interface WaitlistEntry {
  id: string;
  userId: string;
  eventId: string;
  eventSlug: string;
  tierId: string;
  tierLabel: string;
  position: number;
  status: WaitlistStatus;
  joinedAt: string;
  notifiedAt?: string;
  expiresAt?: string;
}

export const waitlistEntries: WaitlistEntry[] = [
  {
    id: 'wl-001',
    userId: 'usr-001',
    eventId: 'evt-003',
    eventSlug: 'noir',
    tierId: 'evt-003-reg',
    tierLabel: 'General Admission',
    position: 14,
    status: 'waiting',
    joinedAt: '2026-03-16T20:15:00',
  },
  {
    id: 'wl-002',
    userId: 'usr-001',
    eventId: 'evt-005',
    eventSlug: 'chefs-table-mediterranean',
    tierId: 'evt-005-reg',
    tierLabel: 'Tasting Seat',
    position: 3,
    status: 'offered',
    joinedAt: '2026-03-14T11:00:00',
    notifiedAt: '2026-03-19T08:00:00',
    expiresAt: '2026-03-20T08:00:00',
  },
];

export function getWaitlistByUser(userId: string): WaitlistEntry[] {
  return waitlistEntries.filter((w) => w.userId === userId);
}

export function getWaitlistByEvent(eventId: string): WaitlistEntry[] {
  return waitlistEntries.filter((w) => w.eventId === eventId);
}

export function getWaitlistPosition(userId: string, eventId: string): number | undefined {
  const entry = waitlistEntries.find((w) => w.userId === userId && w.eventId === eventId);
  return entry?.position;
}
