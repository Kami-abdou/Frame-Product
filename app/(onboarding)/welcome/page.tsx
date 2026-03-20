'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { stagger, fadeUp } from '@/lib/utils/constants';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';

const slides = [
  {
    keyword: 'DISCOVER',
    subtitle: 'Curated events you won\'t find anywhere else. Music, art, gastro, nightlife across Tunisia.',
    accent: '#8B5CF6',
  },
  {
    keyword: 'EXPERIENCE',
    subtitle: 'Immersive, invite-only gatherings designed for those who seek the extraordinary.',
    accent: '#B8952F',
  },
  {
    keyword: 'FRAME',
    subtitle: 'Your passport to Tunisia\'s most exclusive cultural moments.',
    accent: '#E85D4A',
    isFinal: true,
  },
];

export default function WelcomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = slideRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActiveSlide(index);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );

    slideRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-screen h-[100dvh]">
      {/* Horizontal snap */}
      <div
        ref={containerRef}
        className="snap-container-x hide-scrollbar flex h-full"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.keyword}
            ref={(el) => { slideRefs.current[index] = el; }}
            className="snap-item-x w-screen h-full flex-shrink-0 relative overflow-hidden"
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${slide.accent}18 0%, transparent 60%),
                             linear-gradient(180deg, #0A0A0A 0%, #050505 100%)`,
              }}
            />

            {/* The Frame border */}
            <div className="absolute inset-8 border border-white/[0.04] pointer-events-none" />

            {/* Content */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center h-full px-10 text-center"
              variants={stagger}
              initial="hidden"
              animate={activeSlide === index ? 'visible' : 'hidden'}
            >
              {/* Logo on first slide */}
              {index === 0 && (
                <motion.div variants={fadeUp} className="mb-12">
                  <Logo size="lg" showTagline className="text-frame-white" />
                </motion.div>
              )}

              <motion.h1
                variants={fadeUp}
                className="font-display text-display-hero uppercase text-shadow text-frame-white"
              >
                {slide.keyword}
              </motion.h1>

              <motion.div variants={fadeUp} className="w-10 h-px bg-white/10 mt-6 mb-6" />

              <motion.p
                variants={fadeUp}
                className="text-frame-smoke text-sm font-light max-w-[260px] leading-relaxed"
              >
                {slide.subtitle}
              </motion.p>

              {slide.isFinal && (
                <motion.div variants={fadeUp} className="mt-10">
                  <Link href="/">
                    <Button variant="primary" size="lg">
                      Enter FRAME
                    </Button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex items-center justify-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              activeSlide === index ? 'w-8 h-px bg-frame-white' : 'w-3 h-px bg-frame-smoke/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
