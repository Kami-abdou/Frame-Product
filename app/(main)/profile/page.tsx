'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { fadeUp, stagger } from '@/lib/utils/constants';
import {
  formatPrice,
  formatShortDate,
  formatEventDateTime,
  getStartingPrice,
} from '@/lib/utils/formatters';
import { events, getEventById } from '@/lib/data/events';
import { currentUser, getUserFullName, getUserInitials } from '@/lib/data/users';
import { getBookingsByUser, getTotalSpent } from '@/lib/data/bookings';
import { getWaitlistByUser } from '@/lib/data/waitlist';
import Card from '@/components/ui/Card';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import CardMediaBackground from '@/components/event/CardMediaBackground';

export default function ProfilePage() {
  const user = currentUser;
  const userBookings = getBookingsByUser(user.id);
  const userWaitlist = getWaitlistByUser(user.id);
  const totalSpent = getTotalSpent(user.id);

  const upcomingBookings = userBookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );

  const savedEvents = events.filter((e) => user.savedEventIds.includes(e.id));

  return (
    <div className="min-h-screen px-5 pt-10 pb-24" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(184,149,47,0.12) 0%, transparent 50%), #050505' }}>
      {/* Profile Header */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center mb-10"
      >
        <motion.div
          variants={fadeUp}
          className="w-16 h-16 border border-accent-gold/30 flex items-center justify-center mb-4"
        >
          <span className="font-display text-xl text-accent-gold font-semibold">
            {getUserInitials(user)}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-display-sm uppercase text-frame-white"
        >
          {getUserFullName(user)}
        </motion.h1>

        <motion.div variants={fadeUp} className="flex items-center gap-2 mt-1.5">
          <p className="text-frame-smoke text-sm font-light">{user.city}</p>
          {user.isVerified && (
            <span className="inline-flex items-center gap-1 text-accent-mint text-label-xs uppercase tracking-luxury">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
              Verified
            </span>
          )}
        </motion.div>

        <motion.p variants={fadeUp} className="text-frame-smoke/40 text-label-xs uppercase tracking-luxury mt-1.5">
          Member since 2025
        </motion.p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-3 gap-3 mb-10"
      >
        {[
          { value: userBookings.length, label: 'Events' },
          { value: upcomingBookings.length, label: 'Upcoming' },
          { value: totalSpent, label: 'TND Spent' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <Card className="text-center py-4">
              <div className="font-display text-xl text-frame-white">
                <AnimatedCounter value={stat.value} />
              </div>
              <p className="text-frame-smoke/50 text-label-xs uppercase tracking-luxury mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Events */}
      {upcomingBookings.length > 0 && (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-10">
          <motion.h2 variants={fadeUp} className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-4">
            Upcoming
          </motion.h2>
          <motion.div variants={fadeUp} className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 hide-scrollbar">
            {upcomingBookings.map((booking) => {
              const event = getEventById(booking.eventId);
              if (!event) return null;
              return (
                <Link key={booking.id} href={`/events/${booking.eventSlug}`} className="flex-shrink-0 w-64">
                  <Card padding={false} hover className="overflow-hidden">
                    <div className="h-20 relative overflow-hidden">
                      <CardMediaBackground
                        picsumSeed={booking.eventSlug}
                        ambientColor={event.media.ambientColor}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-display text-xs uppercase tracking-wide text-frame-white truncate">{event.title}</h3>
                      <p className="text-frame-smoke/50 text-label-xs mt-1">{formatEventDateTime(event.date)}</p>
                      <p className="text-frame-smoke/40 text-label-xs mt-0.5">{booking.tierLabel}</p>
                      <p className="font-mono text-label-xs text-frame-smoke/30 mt-2">{booking.qrCode}</p>
                      <div className="mt-2">
                        <span className={cn(
                          'inline-block px-2 py-0.5 text-label-xs uppercase tracking-luxury border',
                          booking.status === 'confirmed'
                            ? 'text-accent-mint border-accent-mint/20'
                            : 'text-accent-gold border-accent-gold/20'
                        )}>
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </motion.div>
        </motion.div>
      )}

      {/* Waitlist */}
      {userWaitlist.length > 0 && (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-10">
          <motion.h2 variants={fadeUp} className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-4">
            Waitlist
          </motion.h2>
          <div className="space-y-3">
            {userWaitlist.map((entry) => {
              const event = getEventById(entry.eventId);
              if (!event) return null;
              return (
                <motion.div key={entry.id} variants={fadeUp}>
                  <Link href={`/events/${entry.eventSlug}`}>
                    <Card hover>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-display text-sm uppercase tracking-wide text-frame-white">{event.title}</h3>
                          <p className="text-frame-smoke/50 text-label-xs mt-0.5">{entry.tierLabel}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-frame-white text-sm font-medium">#{entry.position}</p>
                          <span className={cn(
                            'inline-block px-2 py-0.5 text-label-xs uppercase tracking-luxury border mt-1',
                            entry.status === 'waiting'
                              ? 'text-frame-smoke border-white/[0.06]'
                              : entry.status === 'offered'
                              ? 'text-accent-gold border-accent-gold/20'
                              : 'text-frame-smoke/40 border-white/[0.04]'
                          )}>
                            {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Saved Events */}
      {savedEvents.length > 0 && (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-10">
          <motion.h2 variants={fadeUp} className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-4">
            Saved
          </motion.h2>
          <div className="grid grid-cols-2 gap-3">
            {savedEvents.map((event) => (
              <motion.div key={event.id} variants={fadeUp}>
                <Link href={`/events/${event.slug}`}>
                  <Card padding={false} hover className="overflow-hidden">
                    <div className="h-24 relative overflow-hidden">
                      <CardMediaBackground
                        picsumSeed={event.slug}
                        ambientColor={event.media.ambientColor}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-display text-xs uppercase tracking-wide text-frame-white truncate">{event.title}</h3>
                      <p className="text-frame-smoke/40 text-label-xs mt-0.5">{formatShortDate(event.date)}</p>
                      <p className="text-frame-smoke/50 text-xs mt-0.5">From {formatPrice(getStartingPrice(event.tiers))}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Settings */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Link href="/profile/preferences">
          <Card hover className="flex items-center justify-between">
            <span className="text-frame-white text-sm font-light">Taste Preferences</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-frame-smoke/40">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
}
