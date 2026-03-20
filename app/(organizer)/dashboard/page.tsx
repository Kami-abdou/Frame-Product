'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { formatMediumDate } from '@/lib/utils/formatters';
import Card from '@/components/ui/Card';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const stats = [
  { label: 'Total Revenue', value: 15420, suffix: ' TND', trend: '+12%' },
  { label: 'Attendees', value: 847, suffix: '', trend: '+8%' },
  { label: 'Active Events', value: 6, suffix: '', trend: '+2' },
  { label: 'Avg Ticket', value: 128, suffix: ' TND', trend: '+5%' },
];

const revenueData = [
  { day: 'Mon', value: 1200 },
  { day: 'Tue', value: 1800 },
  { day: 'Wed', value: 950 },
  { day: 'Thu', value: 2400 },
  { day: 'Fri', value: 3100 },
  { day: 'Sat', value: 2800 },
  { day: 'Sun', value: 1600 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));

const ageData = [
  { label: '18-24', percent: 35, color: '#F59E0B' },
  { label: '25-34', percent: 42, color: '#FF6B6B' },
  { label: '35-44', percent: 15, color: '#8B5CF6' },
  { label: '45+', percent: 8, color: '#06B6D4' },
];

const cityData = [
  { label: 'Tunis', percent: 40, color: '#F59E0B' },
  { label: 'La Marsa', percent: 25, color: '#FF6B6B' },
  { label: 'Gammarth', percent: 20, color: '#8B5CF6' },
  { label: 'Other', percent: 15, color: '#6366F1' },
];

const recentBookings = [
  { attendee: 'Amine Khelifi', event: 'Sunset Acoustics', tier: 'VIP Lounge', date: '2026-03-18T14:30:00', status: 'confirmed' as const },
  { attendee: 'Nour Zarrouk', event: 'Fabrika Weekend', tier: 'Weekend Pass', date: '2026-03-18T11:20:00', status: 'confirmed' as const },
  { attendee: 'Sami Trabelsi', event: 'Candlelight Carthage', tier: 'Patron Circle', date: '2026-03-17T22:10:00', status: 'pending' as const },
  { attendee: 'Leila Hamdi', event: 'Sunset Acoustics', tier: 'Standard', date: '2026-03-17T19:45:00', status: 'confirmed' as const },
  { attendee: 'Rami Bouazizi', event: 'Techno-Art Brunch', tier: 'Brunch Table', date: '2026-03-17T16:00:00', status: 'confirmed' as const },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-frame-black p-4 lg:p-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-display text-xl lg:text-2xl font-bold text-frame-white">
          Welcome back, Impressive Tunisia
        </h1>
        <p className="text-frame-smoke text-sm mt-1">{today}</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <Card>
              <div className="font-display text-2xl text-frame-white">
                <AnimatedCounter value={stat.value} />
                {stat.suffix && (
                  <span className="text-sm text-frame-smoke ml-1">{stat.suffix.trim()}</span>
                )}
              </div>
              <p className="text-frame-smoke text-sm mt-1">{stat.label}</p>
              <div className="flex items-center gap-1 mt-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                <span className="text-accent-mint text-xs font-medium">{stat.trend}</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4">
          Revenue Overview
        </h2>
        <Card>
          <div className="flex items-end justify-between gap-2 h-40">
            {revenueData.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-accent-gold transition-all duration-500"
                  style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                  title={`${item.value} TND`}
                />
                <span className="text-frame-smoke text-xs">{item.day}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Demographics */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4">
          Audience
        </h2>
        <Card>
          {/* Age */}
          <p className="text-frame-smoke text-xs mb-2">Age Distribution</p>
          <div className="flex rounded-full overflow-hidden h-3 mb-1">
            {ageData.map((seg) => (
              <div
                key={seg.label}
                style={{ width: `${seg.percent}%`, backgroundColor: seg.color }}
                title={`${seg.label}: ${seg.percent}%`}
              />
            ))}
          </div>
          <div className="flex gap-3 flex-wrap mb-6">
            {ageData.map((seg) => (
              <div key={seg.label} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-frame-smoke text-xs">
                  {seg.label} ({seg.percent}%)
                </span>
              </div>
            ))}
          </div>

          {/* Cities */}
          <p className="text-frame-smoke text-xs mb-2">Top Cities</p>
          <div className="flex rounded-full overflow-hidden h-3 mb-1">
            {cityData.map((seg) => (
              <div
                key={seg.label}
                style={{ width: `${seg.percent}%`, backgroundColor: seg.color }}
                title={`${seg.label}: ${seg.percent}%`}
              />
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            {cityData.map((seg) => (
              <div key={seg.label} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-frame-smoke text-xs">
                  {seg.label} ({seg.percent}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-20"
      >
        <h2 className="font-display text-sm uppercase tracking-luxury text-frame-white mb-4">
          Latest Bookings
        </h2>

        {/* Mobile: card layout */}
        <div className="space-y-3 lg:hidden">
          {recentBookings.map((booking, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-frame-white text-sm font-medium">
                    {booking.attendee}
                  </p>
                  <p className="text-frame-smoke text-xs mt-0.5">
                    {booking.event} &middot; {booking.tier}
                  </p>
                  <p className="text-frame-smoke/60 text-xs mt-0.5">
                    {formatMediumDate(booking.date)}
                  </p>
                </div>
                <span
                  className={cn(
                    'inline-block px-2 py-0.5 rounded-full text-xs font-medium',
                    booking.status === 'confirmed'
                      ? 'bg-accent-mint/20 text-accent-mint'
                      : 'bg-accent-gold/20 text-accent-gold'
                  )}
                >
                  {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden lg:block">
          <Card padding={false}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-frame-steel/30">
                  <th className="text-left text-frame-smoke text-xs font-medium uppercase tracking-wide px-4 py-3">
                    Attendee
                  </th>
                  <th className="text-left text-frame-smoke text-xs font-medium uppercase tracking-wide px-4 py-3">
                    Event
                  </th>
                  <th className="text-left text-frame-smoke text-xs font-medium uppercase tracking-wide px-4 py-3">
                    Tier
                  </th>
                  <th className="text-left text-frame-smoke text-xs font-medium uppercase tracking-wide px-4 py-3">
                    Date
                  </th>
                  <th className="text-left text-frame-smoke text-xs font-medium uppercase tracking-wide px-4 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, i) => (
                  <tr
                    key={i}
                    className="border-b border-frame-steel/10 last:border-0"
                  >
                    <td className="px-4 py-3 text-frame-white text-sm">
                      {booking.attendee}
                    </td>
                    <td className="px-4 py-3 text-frame-smoke text-sm">
                      {booking.event}
                    </td>
                    <td className="px-4 py-3 text-frame-smoke text-sm">
                      {booking.tier}
                    </td>
                    <td className="px-4 py-3 text-frame-smoke text-sm">
                      {formatMediumDate(booking.date)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-block px-2 py-0.5 rounded-full text-xs font-medium',
                          booking.status === 'confirmed'
                            ? 'bg-accent-mint/20 text-accent-mint'
                            : 'bg-accent-gold/20 text-accent-gold'
                        )}
                      >
                        {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <Link
        href="/dashboard/events/new"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent-coral flex items-center justify-center shadow-lg shadow-accent-coral/30 hover:bg-accent-coral/90 transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </Link>
    </div>
  );
}
