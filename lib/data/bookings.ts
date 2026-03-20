/**
 * FRAME App - Bookings Data
 */

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'checked_in';

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  eventSlug: string;
  tierId: string;
  tierLabel: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: 'TND';
  status: BookingStatus;
  qrCode: string;
  bookedAt: string;
  checkedInAt?: string;
}

export const bookings: Booking[] = [
  {
    id: 'bk-001',
    userId: 'usr-001',
    eventId: 'evt-001',
    eventSlug: 'sunset-acoustics',
    tierId: 'evt-001-vip',
    tierLabel: 'VIP Lounge',
    quantity: 2,
    unitPrice: 250,
    totalPrice: 500,
    currency: 'TND',
    status: 'confirmed',
    qrCode: 'FRAME-BK001-SA-VIP',
    bookedAt: '2026-03-12T14:22:00',
  },
  {
    id: 'bk-002',
    userId: 'usr-001',
    eventId: 'evt-004',
    eventSlug: 'fabrika-weekend',
    tierId: 'evt-004-reg',
    tierLabel: 'Weekend Pass',
    quantity: 1,
    unitPrice: 160,
    totalPrice: 160,
    currency: 'TND',
    status: 'confirmed',
    qrCode: 'FRAME-BK002-FW-REG',
    bookedAt: '2026-03-18T09:45:00',
  },
  {
    id: 'bk-003',
    userId: 'usr-001',
    eventId: 'evt-005',
    eventSlug: 'chefs-table-mediterranean',
    tierId: 'evt-005-vip',
    tierLabel: "Chef\u2019s Counter",
    quantity: 2,
    unitPrice: 420,
    totalPrice: 840,
    currency: 'TND',
    status: 'pending',
    qrCode: 'FRAME-BK003-CT-VIP',
    bookedAt: '2026-03-19T11:30:00',
  },
];

export function getBookingsByUser(userId: string): Booking[] {
  return bookings.filter((b) => b.userId === userId);
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

export function getBookingByEvent(userId: string, eventId: string): Booking | undefined {
  return bookings.find((b) => b.userId === userId && b.eventId === eventId);
}

export function getTotalSpent(userId: string): number {
  return bookings
    .filter((b) => b.userId === userId && b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalPrice, 0);
}
