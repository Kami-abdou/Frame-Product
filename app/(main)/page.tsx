'use client';

import { useFeed } from '@/lib/context/FeedContext';
import { events, getEventsByCategory } from '@/lib/data/events';
import CategoryBar from '@/components/feed/CategoryBar';
import FeedContainer from '@/components/feed/FeedContainer';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/utils/constants';

export default function DiscoveryFeedPage() {
  const { activeCategory } = useFeed();

  const filteredEvents = (
    activeCategory === 'all' ? events : getEventsByCategory(activeCategory)
  ).filter((e) => e.status !== 'past' && e.status !== 'cancelled');

  return (
    <div className="relative">
      <CategoryBar />

      {filteredEvents.length > 0 ? (
        <FeedContainer events={filteredEvents} />
      ) : (
        <div className="snap-container flex items-center justify-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="text-center px-8"
          >
            <div className="w-12 h-12 border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-frame-smoke">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="font-display text-display-sm text-frame-white mb-2">
              No events found
            </h3>
            <p className="text-frame-smoke text-sm font-light">
              There are no upcoming events in this category yet.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
