'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { fadeUp } from '@/lib/utils/constants';
import {
  formatFullDate,
  formatTimeRange,
  formatPrice,
  getStartingPrice,
  formatCapacity,
} from '@/lib/utils/formatters';
import { FrameEvent } from '@/lib/data/events';
import TopBar from '@/components/layout/TopBar';
import EventHero from '@/components/event/EventHero';
import PricingTiers from '@/components/event/PricingTiers';
import SecretLocation from '@/components/event/SecretLocation';
import CapacityIndicator from '@/components/event/CapacityIndicator';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ShareSheet from '@/components/shared/ShareSheet';

export default function EventDetailClient({ event }: { event: FrameEvent | null }) {
  const [descExpanded, setDescExpanded] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-frame-black">
        <div className="text-center p-8">
          <div className="w-16 h-16 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
            <span className="font-display text-frame-smoke text-xl">?</span>
          </div>
          <h1 className="font-display text-display-md text-frame-white mb-2">
            Event Not Found
          </h1>
          <p className="text-frame-smoke text-sm font-light mb-8">
            This event does not exist or has been removed.
          </p>
          <Link href="/">
            <Button variant="outline">Back to Discover</Button>
          </Link>
        </div>
      </div>
    );
  }

  const startingPrice = getStartingPrice(event.tiers);
  const startTime = new Date(event.date).getTime();
  const endTime = new Date(event.endDate).getTime();
  const durationHours = Math.round((endTime - startTime) / (1000 * 60 * 60));

  const infoPills = [
    { label: 'Date', value: formatFullDate(event.date), sub: formatTimeRange(event.date, event.endDate) },
    { label: 'Location', value: event.location.isSecret ? 'Secret Location' : event.location.name, sub: event.location.isSecret ? 'Revealed after purchase' : event.location.city },
    { label: 'Capacity', value: formatCapacity(event.capacity.sold, event.capacity.total), sub: `${event.capacity.total} total spots` },
    { label: 'Duration', value: `${durationHours}h`, sub: 'Approximate' },
  ];

  return (
    <div className="min-h-screen" style={{ background: `radial-gradient(ellipse at 20% 85%, ${event.media.ambientColor}18 0%, transparent 50%), #050505` }}>
      <TopBar
        transparent
        showBack
        rightAction={
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsShareSheetOpen(true)}
            className="w-8 h-8 flex items-center justify-center text-frame-smoke hover:text-frame-white transition-colors"
            aria-label="Share"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </motion.button>
        }
      />

      <EventHero event={event} />

      {/* Info strip */}
      <div className="px-5 -mt-4 relative z-10">
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
          {infoPills.map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="min-w-[130px] flex-shrink-0 !p-3">
                <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/60 mb-1.5">
                  {pill.label}
                </p>
                <p className="text-sm font-medium text-frame-white truncate">{pill.value}</p>
                <p className="text-xs text-frame-smoke/50 truncate">{pill.sub}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-28 space-y-8">
        {/* Description */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">About</h2>
          <div className="relative">
            <p className={cn('text-frame-smoke text-sm font-light leading-relaxed', !descExpanded && 'line-clamp-3')}>
              {event.description}
            </p>
            {event.description.length > 150 && (
              <button onClick={() => setDescExpanded(!descExpanded)} className="text-frame-white text-sm font-medium mt-2 cursor-pointer">
                {descExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        </motion.section>

        {/* Capacity */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Availability</h2>
          <CapacityIndicator sold={event.capacity.sold} total={event.capacity.total} />
        </motion.section>

        {/* Pricing */}
        <section>
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Tickets</h2>
          <PricingTiers tiers={event.tiers} onSelectTier={() => {}} />
        </section>

        {/* Secret Location */}
        {event.location.isSecret && (
          <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SecretLocation locationName={event.location.name} />
          </motion.section>
        )}

        {/* Organizer */}
        <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Hosted by</h2>
          <Card className="flex items-center gap-4">
            <div
              className="w-10 h-10 flex items-center justify-center font-display font-semibold text-sm border border-white/[0.08]"
              style={{ color: event.media.ambientColor }}
            >
              {event.organizer.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display font-medium text-frame-white text-sm truncate">{event.organizer.name}</span>
                {event.organizer.verified && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-accent-gold flex-shrink-0">
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
              <p className="text-frame-smoke/60 text-xs">Event Organizer</p>
            </div>
          </Card>
        </motion.section>

        {/* Tags */}
        {event.tags.length > 0 && (
          <motion.section variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Tags</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {event.tags.map((tag) => (
                <span key={tag} className="flex-shrink-0 px-3 py-1.5 frame-border text-xs text-frame-smoke/60 font-light">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="bg-frame-black/90 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4 max-w-lg mx-auto">
            <div>
              <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/50">Starting from</p>
              <p className="font-display font-semibold text-frame-white text-lg">
                {startingPrice > 0 ? formatPrice(startingPrice) : 'Sold Out'}
              </p>
            </div>
            <Link href={`/events/${event.slug}/book`}>
              <Button variant="primary" size="lg" disabled={event.status === 'sold_out'}>
                {event.status === 'sold_out' ? 'Sold Out' : 'Book Now'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Share Sheet */}
      <ShareSheet
        event={event}
        isOpen={isShareSheetOpen}
        onClose={() => setIsShareSheetOpen(false)}
      />
    </div>
  );
}
