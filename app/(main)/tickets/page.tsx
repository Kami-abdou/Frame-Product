'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { formatEventDateTime } from '@/lib/utils/formatters';
import { getEventById } from '@/lib/data/events';
import { currentUser } from '@/lib/data/users';
import { getBookingsByUser } from '@/lib/data/bookings';
import { getWaitlistByUser } from '@/lib/data/waitlist';
import TopBar from '@/components/layout/TopBar';
import Card from '@/components/ui/Card';
import CardMediaBackground from '@/components/event/CardMediaBackground';

export default function TicketsPage() {
  const user = currentUser;
  const userBookings = getBookingsByUser(user.id);
  const userWaitlist = getWaitlistByUser(user.id);

  const upcomingBookings = userBookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'pending'
  );
  const pastBookings = userBookings.filter((b) => b.status === 'checked_in' || b.status === 'cancelled');

  return (
    <div
      className="min-h-screen px-5 pt-4 pb-24"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(91,95,230,0.12) 0%, transparent 50%), #050505' }}
    >
      <TopBar title="Tickets" showBack={false} />

      <div className="pt-14">
        {/* Upcoming */}
        {upcomingBookings.length > 0 ? (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-10">
            <motion.h2 variants={fadeUp} className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-4">
              Upcoming
            </motion.h2>
            <div className="space-y-3">
              {upcomingBookings.map((booking) => {
                const event = getEventById(booking.eventId);
                if (!event) return null;
                return (
                  <motion.div key={booking.id} variants={fadeUp}>
                    <Link href={`/events/${booking.eventSlug}`}>
                      <Card padding={false} hover className="overflow-hidden">
                        <div className="flex">
                          <div className="w-24 h-24 relative flex-shrink-0 overflow-hidden">
                            <CardMediaBackground
                              picsumSeed={booking.eventSlug}
                              ambientColor={event.media.ambientColor}
                            />
                          </div>
                          <div className="p-3 flex-1 min-w-0">
                            <h3 className="font-display text-sm uppercase tracking-wide text-frame-white truncate">{event.title}</h3>
                            <p className="text-frame-smoke/50 text-label-xs mt-1">{formatEventDateTime(event.date)}</p>
                            <p className="text-frame-smoke/40 text-label-xs mt-0.5">{booking.tierLabel}</p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="font-mono text-label-xs text-frame-smoke/30">{booking.qrCode}</p>
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
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center py-20"
          >
            <div className="w-12 h-12 border border-white/[0.06] flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-frame-smoke">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
              </svg>
            </div>
            <h3 className="font-display text-display-sm text-frame-white mb-2">No tickets yet</h3>
            <p className="text-frame-smoke text-sm font-light mb-8">Book an event to see your tickets here.</p>
            <Link href="/" className="text-label-sm uppercase tracking-luxury text-frame-smoke border-b border-white/[0.1] pb-0.5">
              Discover events
            </Link>
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

        {/* Past */}
        {pastBookings.length > 0 && (
          <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-10">
            <motion.h2 variants={fadeUp} className="font-display text-label-lg uppercase tracking-luxury text-frame-smoke/40 mb-4">
              Past
            </motion.h2>
            <div className="space-y-3">
              {pastBookings.map((booking) => {
                const event = getEventById(booking.eventId);
                if (!event) return null;
                return (
                  <motion.div key={booking.id} variants={fadeUp}>
                    <Card padding={false} className="overflow-hidden opacity-50">
                      <div className="flex">
                        <div className="w-16 h-16 relative flex-shrink-0 overflow-hidden">
                          <CardMediaBackground
                            picsumSeed={booking.eventSlug}
                            ambientColor={event.media.ambientColor}
                          />
                        </div>
                        <div className="p-3 flex-1 min-w-0">
                          <h3 className="font-display text-xs uppercase tracking-wide text-frame-white truncate">{event.title}</h3>
                          <p className="text-frame-smoke/50 text-label-xs mt-1">{formatEventDateTime(event.date)}</p>
                          <p className="text-frame-smoke/40 text-label-xs mt-0.5">{booking.tierLabel}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
