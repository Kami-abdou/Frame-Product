'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { getFrameOriginals } from '@/lib/data/events';
import { formatShortDate, formatPrice, getStartingPrice } from '@/lib/utils/formatters';
import TopBar from '@/components/layout/TopBar';
import Logo from '@/components/shared/Logo';

export default function OriginalsPage() {
  const originals = getFrameOriginals();

  return (
    <div className="min-h-screen bg-frame-black pb-24">
      <TopBar title="Originals" showBack={false} />

      {/* Hero */}
      <div className="relative pt-14">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(184,149,47,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative px-5 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo size="lg" className="text-accent-gold mx-auto mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display-lg uppercase text-frame-white"
          >
            Originals
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-10 h-px bg-accent-gold/40 mx-auto mt-4 mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-frame-smoke text-sm font-light max-w-[260px] mx-auto"
          >
            Events we create, curate, and live.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="px-5 grid grid-cols-1 gap-4 mt-2"
      >
        {originals.map((event) => (
          <motion.div key={event.id} variants={fadeUp}>
            <Link href={`/events/${event.slug}`}>
              <div
                className="relative aspect-[4/5] overflow-hidden frame-border-gold group"
              >
                <div
                  className="absolute inset-0 transition-transform duration-[12s] ease-out group-hover:scale-[1.04]"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${event.media.ambientColor}35 0%, transparent 50%),
                                 linear-gradient(180deg, #0A0A0A 0%, #050505 100%)`,
                  }}
                />

                {/* The Frame — inner border */}
                <div className="absolute inset-4 border border-accent-gold/[0.08] pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-t from-frame-black via-frame-black/20 to-transparent" />

                {/* FRAME ORIGINAL badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-2 py-0.5 text-label-xs uppercase tracking-luxury font-display text-accent-gold border border-accent-gold/30">
                    FRAME Original
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-display-md uppercase text-frame-white text-shadow">
                    {event.title}
                  </h3>
                  <div className="w-8 h-px bg-accent-gold/30 mt-3 mb-3" />
                  <div className="flex items-center gap-3 text-label-xs uppercase tracking-luxury text-frame-smoke/60">
                    <span>{formatShortDate(event.date)}</span>
                    <span className="w-px h-3 bg-white/[0.06]" />
                    <span>{event.location.name}</span>
                  </div>
                  <p className="text-accent-gold text-sm font-medium mt-2">
                    From {formatPrice(getStartingPrice(event.tiers))}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
