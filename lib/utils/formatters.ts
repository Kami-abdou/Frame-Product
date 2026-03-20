/**
 * FRAME App - Formatting Utilities
 * Date, price, capacity, and time helpers for the Tunisian market.
 */

// ---------------------------------------------------------------------------
// Date Formatting
// ---------------------------------------------------------------------------

const DATE_LOCALE = 'en-US';

/** e.g. "Saturday, April 18, 2026" */
export function formatFullDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(DATE_LOCALE, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** e.g. "Apr 18" */
export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(DATE_LOCALE, {
    month: 'short',
    day: 'numeric',
  });
}

/** e.g. "Apr 18, 2026" */
export function formatMediumDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(DATE_LOCALE, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** e.g. "7:00 PM" */
export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString(DATE_LOCALE, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/** e.g. "Sat, Apr 18 - 7:00 PM" */
export function formatEventDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  const day = d.toLocaleDateString(DATE_LOCALE, { weekday: 'short', month: 'short', day: 'numeric' });
  const time = formatTime(dateStr);
  return `${day} \u2013 ${time}`;
}

/** e.g. "7:00 PM - 11:00 PM" */
export function formatTimeRange(startStr: string, endStr: string): string {
  return `${formatTime(startStr)} \u2013 ${formatTime(endStr)}`;
}

// ---------------------------------------------------------------------------
// Price Formatting (Tunisian Dinar)
// ---------------------------------------------------------------------------

/** e.g. "120 TND" */
export function formatPrice(amount: number, currency = 'TND'): string {
  if (amount === 0) return 'Free';
  return `${amount.toLocaleString(DATE_LOCALE)} ${currency}`;
}

/** e.g. "From 75 TND" */
export function formatPriceRange(min: number, max: number, currency = 'TND'): string {
  if (min === max) return formatPrice(min, currency);
  return `From ${formatPrice(min, currency)}`;
}

/** Returns the lowest available tier price for an event's tiers. */
export function getStartingPrice(tiers: { price: number; available: boolean }[]): number {
  const available = tiers.filter((t) => t.available);
  if (available.length === 0) return 0;
  return Math.min(...available.map((t) => t.price));
}

/** Returns discount percentage: e.g. 25 */
export function getDiscountPercent(original: number, current: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - current) / original) * 100);
}

// ---------------------------------------------------------------------------
// Capacity Helpers
// ---------------------------------------------------------------------------

/** Returns 0-100 integer percentage of sold / total capacity. */
export function capacityPercent(sold: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((sold / total) * 100));
}

/** e.g. "87% filled" */
export function formatCapacity(sold: number, total: number): string {
  return `${capacityPercent(sold, total)}% filled`;
}

/** Returns how many spots remain. */
export function spotsRemaining(sold: number, total: number): number {
  return Math.max(0, total - sold);
}

/** e.g. "12 spots left" or "Sold out" */
export function formatSpotsRemaining(sold: number, total: number): string {
  const remaining = spotsRemaining(sold, total);
  if (remaining === 0) return 'Sold out';
  if (remaining === 1) return '1 spot left';
  return `${remaining} spots left`;
}

// ---------------------------------------------------------------------------
// Time-Until Helpers
// ---------------------------------------------------------------------------

/** Milliseconds between now and target date. Negative means in the past. */
function msUntil(dateStr: string): number {
  return new Date(dateStr).getTime() - Date.now();
}

/** e.g. "in 3 days", "in 2 hours", "starts now", "ended" */
export function timeUntil(dateStr: string): string {
  const ms = msUntil(dateStr);
  if (ms < 0) return 'ended';

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 30) {
    const months = Math.floor(days / 30);
    return months === 1 ? 'in 1 month' : `in ${months} months`;
  }
  if (days > 0) return days === 1 ? 'in 1 day' : `in ${days} days`;
  if (hours > 0) return hours === 1 ? 'in 1 hour' : `in ${hours} hours`;
  if (minutes > 0) return minutes === 1 ? 'in 1 minute' : `in ${minutes} minutes`;
  return 'starts now';
}

/** Returns true if the event date is within the next 48 hours. */
export function isHappeningSoon(dateStr: string): boolean {
  const ms = msUntil(dateStr);
  return ms > 0 && ms <= 48 * 60 * 60 * 1000;
}

/** Returns true if the event date is in the past. */
export function isPast(dateStr: string): boolean {
  return msUntil(dateStr) < 0;
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------

/** Truncate text with ellipsis. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '\u2026';
}

/** Slugify a string: "Sunset Acoustics" -> "sunset-acoustics" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
