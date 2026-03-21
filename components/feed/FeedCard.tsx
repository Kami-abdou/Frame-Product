'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/utils/constants';
import {
  formatShortDate,
  formatTime,
  getStartingPrice,
  formatPrice,
} from '@/lib/utils/formatters';
import { type FrameEvent } from '@/lib/data/events';
import { getCategoryById } from '@/lib/data/categories';
import BadgeComponent from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EventMediaBackground from '@/components/event/EventMediaBackground';

interface FeedCardProps {
  event: FrameEvent;
  isActive: boolean;
}

export default function FeedCard({ event, isActive }: FeedCardProps) {
  const category = getCategoryById(event.category);
  const startingPrice = getStartingPrice(event.tiers);

  return (
    <div className="snap-item relative overflow-hidden">
      {/* Media background — picsum → heroImage → video → ambient overlay */}
      <EventMediaBackground
        picsumSeed={event.slug}
        imageUrl={event.media.heroImage}
        videoUrl={event.media.videoUrl}
        ambientColor={event.media.ambientColor}
        isActive={isActive}
      />

      {/* The Frame — thin border inset */}
      <div className="absolute inset-4 border border-white/[0.04] pointer-events-none z-20" />

      {/* Bottom gradient fade — strong enough for white text */}
      <div className="absolute inset-0 bg-gradient-to-t from-frame-black from-15% via-frame-black/80 via-45% to-transparent" />

      {/* Content — bottom-left, within the frame */}
      <motion.div
        className="absolute bottom-20 left-0 right-14 px-8 z-10"
        variants={stagger}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        {/* Category label */}
        {category && (
          <motion.div variants={fadeUp} className="mb-3">
            <span className="text-label-xs uppercase tracking-luxury" style={{ color: category.color }}>
              {category.label}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h2
          variants={fadeUp}
          className="font-display text-display-xl uppercase text-shadow text-frame-white mb-2"
        >
          {event.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-frame-smoke text-sm font-light leading-relaxed mb-4 max-w-[280px] line-clamp-2"
        >
          {event.subtitle}
        </motion.p>

        {/* Thin separator */}
        <motion.div variants={fadeUp} className="w-12 h-px bg-white/10 mb-4" />

        {/* Meta row */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 text-frame-smoke/70 text-label-sm mb-4"
        >
          <span>{event.location.isSecret ? 'Secret Location' : event.location.city}</span>
          <span className="w-px h-3 bg-white/10" />
          <span>{formatShortDate(event.date)}</span>
          <span className="w-px h-3 bg-white/10" />
          <span>{formatTime(event.date)}</span>
        </motion.div>

        {/* Badges */}
        {event.badges.length > 0 && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-4">
            {event.badges.map((badge) => (
              <BadgeComponent key={badge} type={badge} />
            ))}
          </motion.div>
        )}

        {/* Price + CTA */}
        <motion.div variants={fadeUp} className="flex items-center gap-4">
          <Link href={`/events/${event.slug}`}>
            <Button variant="primary" size="md">
              Book Now
            </Button>
          </Link>
          <span className="text-frame-smoke text-sm font-light">
            {startingPrice > 0 ? `From ${formatPrice(startingPrice)}` : 'Sold Out'}
          </span>
        </motion.div>
      </motion.div>

      {/* Right side actions — minimal */}
      <div className="absolute right-5 bottom-28 z-10 flex flex-col items-center gap-4">
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center text-frame-smoke/50 hover:text-frame-white transition-colors duration-300"
          aria-label="Save event"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center text-frame-smoke/50 hover:text-frame-white transition-colors duration-300"
          aria-label="Share event"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>

      {/* Full card link overlay */}
      <Link
        href={`/events/${event.slug}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${event.title}`}
      />
    </div>
  );
}
