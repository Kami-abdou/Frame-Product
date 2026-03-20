'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { fadeUp, stagger } from '@/lib/utils/constants';
import {
  formatShortDate,
  formatPrice,
  capacityPercent,
} from '@/lib/utils/formatters';
import { events } from '@/lib/data/events';
import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';

const organizerEvents = events.slice(0, 6);

function getEventRevenue(event: (typeof events)[0]): number {
  return event.tiers.reduce((sum, tier) => sum + tier.sold * tier.price, 0);
}

export default function OrganizerEventsPage() {
  return (
    <div className="min-h-screen bg-frame-black p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-xl lg:text-2xl font-bold text-frame-white">
          My Events
        </h1>
        <Link href="/dashboard/events/new">
          <Button variant="gold" size="sm">
            Create Event
          </Button>
        </Link>
      </div>

      {/* Events List */}
      {organizerEvents.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-frame-smoke text-sm">
            No events yet. Create your first event to get started.
          </p>
          <Link href="/dashboard/events/new" className="mt-4 inline-block">
            <Button variant="gold" size="sm">
              Create Event
            </Button>
          </Link>
        </Card>
      ) : (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {organizerEvents.map((event) => {
            const revenue = getEventRevenue(event);
            const soldPercent = capacityPercent(
              event.capacity.sold,
              event.capacity.total
            );

            return (
              <motion.div key={event.id} variants={fadeUp}>
                <Link href={`/dashboard/events/${event.id}`}>
                  <Card padding={false} hover>
                    <div className="flex flex-col lg:flex-row">
                      {/* Color strip */}
                      <div
                        className="h-2 lg:h-auto lg:w-2 rounded-t-card lg:rounded-t-none lg:rounded-l-card flex-shrink-0"
                        style={{ backgroundColor: event.media.ambientColor }}
                      />

                      <div className="flex-1 p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                          {/* Left info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-display text-sm uppercase tracking-luxury text-frame-white truncate">
                                {event.title}
                              </h3>
                              <span
                                className={cn(
                                  'inline-block px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0',
                                  event.status === 'upcoming'
                                    ? 'bg-accent-mint/20 text-accent-mint'
                                    : event.status === 'sold_out'
                                    ? 'bg-accent-coral/20 text-accent-coral'
                                    : 'bg-frame-steel text-frame-smoke'
                                )}
                              >
                                {event.status === 'sold_out'
                                  ? 'Sold Out'
                                  : event.status.charAt(0).toUpperCase() +
                                    event.status.slice(1)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-frame-smoke">
                              <span>{formatShortDate(event.date)}</span>
                              <span className="text-frame-steel">|</span>
                              <Chip
                                label={event.category}
                                className="text-[10px] px-2 py-0.5"
                              />
                            </div>
                          </div>

                          {/* Tickets + Revenue */}
                          <div className="flex items-center gap-6 lg:gap-8">
                            <div className="min-w-[120px]">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-frame-smoke">
                                  {event.capacity.sold} / {event.capacity.total}
                                </span>
                                <span className="text-frame-smoke">
                                  {soldPercent}%
                                </span>
                              </div>
                              <ProgressBar
                                value={soldPercent}
                                color={soldPercent >= 90 ? 'coral' : 'gold'}
                                size="sm"
                              />
                            </div>

                            <div className="text-right flex-shrink-0">
                              <p className="text-frame-white text-sm font-medium">
                                {formatPrice(revenue)}
                              </p>
                              <p className="text-frame-smoke text-xs">Revenue</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
