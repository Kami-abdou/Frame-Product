'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { getCategoryById } from '@/lib/data/categories';
import type { FrameEvent } from '@/lib/data/events';
import BadgeComponent from '@/components/ui/Badge';
import CardMediaBackground from '@/components/event/CardMediaBackground';

interface EventHeroProps {
  event: FrameEvent;
}

export default function EventHero({ event }: EventHeroProps) {
  const category = getCategoryById(event.category);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Media background */}
      <CardMediaBackground
        picsumSeed={event.slug}
        imageUrl={event.media.heroImage}
        ambientColor={event.media.ambientColor}
      />

      {/* Top scrim — keeps TopBar legible over bright images */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />

      {/* The Frame — thin border inset */}
      <div className="absolute inset-6 border border-white/[0.12] pointer-events-none z-10" />

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-frame-black via-frame-black/30 to-transparent" />

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-8 pb-16"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badges */}
        {event.badges.length > 0 && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-4">
            {event.badges.map((badge) => (
              <BadgeComponent key={badge} type={badge} />
            ))}
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-display-hero uppercase text-shadow"
        >
          {event.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-frame-cream/80 text-lg font-light mt-3 max-w-md leading-relaxed"
        >
          {event.subtitle}
        </motion.p>

        {/* Category + City */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-4 mt-5 text-frame-smoke"
        >
          <span
            className="text-label-sm uppercase tracking-luxury"
            style={{ color: category?.color }}
          >
            {category?.label ?? event.category}
          </span>

          <span className="w-px h-3 bg-white/10" />

          <span className="text-label-sm uppercase tracking-luxury">
            {event.location.city}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
