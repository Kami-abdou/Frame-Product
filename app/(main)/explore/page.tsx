'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, fadeIn, stagger } from '@/lib/utils/constants';
import {
  formatShortDate,
  getStartingPrice,
  formatPrice,
} from '@/lib/utils/formatters';
import {
  events,
  getFrameOriginals,
  type FrameEvent,
  type EventCategory,
} from '@/lib/data/events';
import { categories } from '@/lib/data/categories';
import Chip from '@/components/ui/Chip';
import BadgeComponent from '@/components/ui/Badge';
import CardMediaBackground from '@/components/event/CardMediaBackground';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');

  const frameOriginals = useMemo(() => getFrameOriginals(), []);

  const filteredEvents = useMemo(() => {
    let result = events.filter((e) => e.status !== 'past' && e.status !== 'cancelled');
    if (activeCategory !== 'all') result = result.filter((e) => e.category === activeCategory);
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(query));
    }
    return result;
  }, [search, activeCategory]);

  const showOriginals = !search.trim() && activeCategory === 'all';

  return (
    <div className="min-h-screen pb-24 pt-4" style={{ background: 'radial-gradient(ellipse at 75% 0%, rgba(91,95,230,0.14) 0%, transparent 55%), #050505' }}>
      {/* Search */}
      <div className="px-5 mb-5">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-frame-smoke/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent frame-border py-3 pl-11 pr-4 text-sm text-frame-white placeholder:text-frame-smoke/40 outline-none focus:border-white/[0.12] transition-colors duration-300"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-0 px-3 mb-6 overflow-x-auto hide-scrollbar">
        <Chip label="All" active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            label={cat.label}
            active={activeCategory === cat.id}
            onClick={() => setActiveCategory(cat.id as EventCategory)}
          />
        ))}
      </div>

      {/* FRAME Originals */}
      {showOriginals && frameOriginals.length > 0 && (
        <motion.section className="mb-10" variants={fadeIn} initial="hidden" animate="visible">
          <div className="flex items-center justify-between px-5 mb-4">
            <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white">
              FRAME Originals
            </h2>
            <span className="text-label-xs text-frame-smoke/40">{frameOriginals.length} events</span>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto hide-scrollbar">
            {frameOriginals.map((event) => (
              <OriginalCard key={event.id} event={event} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Events Grid */}
      <motion.section className="px-5" variants={stagger} initial="hidden" animate="visible">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-label-lg uppercase tracking-luxury text-frame-white">
            {search.trim() ? 'Results' : 'All Events'}
          </h2>
          <span className="text-label-xs text-frame-smoke/40">{filteredEvents.length}</span>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredEvents.map((event) => (
              <GridCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center py-20">
            <div className="w-12 h-12 border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-frame-smoke/40">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p className="text-frame-smoke text-sm font-light">No events match your search.</p>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}

function OriginalCard({ event }: { event: FrameEvent }) {
  const startingPrice = getStartingPrice(event.tiers);

  return (
    <Link href={`/events/${event.slug}`} className="flex-shrink-0">
      <motion.div
        variants={fadeUp}
        className="relative w-52 h-72 overflow-hidden frame-border-gold"
      >
        <CardMediaBackground
          picsumSeed={event.slug}
          imageUrl={event.media.heroImage}
          ambientColor={event.media.ambientColor}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-frame-black/95 via-frame-black/20 to-transparent" />

        {/* The Frame inset */}
        <div className="absolute inset-3 border border-white/[0.12] pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <BadgeComponent type="frame_original" className="mb-2" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-frame-white text-shadow mb-1">
            {event.title}
          </h3>
          <p className="text-frame-smoke/60 text-label-xs uppercase tracking-luxury mb-1">
            {formatShortDate(event.date)}
          </p>
          {startingPrice > 0 && (
            <p className="text-accent-gold text-xs font-medium">
              From {formatPrice(startingPrice)}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

function GridCard({ event }: { event: FrameEvent }) {
  const startingPrice = getStartingPrice(event.tiers);

  return (
    <Link href={`/events/${event.slug}`}>
      <motion.div
        variants={fadeUp}
        className="relative h-52 overflow-hidden frame-border group"
      >
        <CardMediaBackground
          picsumSeed={event.slug}
          imageUrl={event.media.heroImage}
          ambientColor={event.media.ambientColor}
          imageClassName="transition-transform duration-[8s] ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-frame-black/90 via-frame-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-3">
          {event.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {event.badges.slice(0, 2).map((badge) => (
                <BadgeComponent key={badge} type={badge} />
              ))}
            </div>
          )}
          <h3 className="font-display text-xs font-medium uppercase tracking-wide text-frame-white leading-tight mb-1">
            {event.title}
          </h3>
          <p className="text-frame-smoke/50 text-label-xs uppercase tracking-luxury mb-1">
            {formatShortDate(event.date)}
          </p>
          {startingPrice > 0 && (
            <p className="text-frame-smoke text-[10px]">
              From {formatPrice(startingPrice)}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
