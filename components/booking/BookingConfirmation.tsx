'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { scaleIn, fadeUp, stagger } from '@/lib/utils/constants';
import { formatFullDate, formatTimeRange } from '@/lib/utils/formatters';
import type { FrameEvent } from '@/lib/data/events';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Logo from '@/components/shared/Logo';

interface BookingConfirmationProps {
  event: FrameEvent;
  ticketCode: string;
  quantity: number;
  tierLabel: string;
}

export default function BookingConfirmation({ event, ticketCode, quantity, tierLabel }: BookingConfirmationProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center min-h-[calc(100vh-8rem)] px-2">
      {/* Animated checkmark */}
      <motion.div
        className="mt-12 mb-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-20 h-20 border border-accent-mint/30 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
            <motion.path
              d="M18 28l7 7 13-13"
              stroke="#2FBF7B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            />
          </svg>
        </div>
      </motion.div>

      <motion.h1
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="font-display text-display-md text-frame-white text-center mb-2"
      >
        Confirmed
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-frame-smoke text-sm font-light text-center mb-8"
      >
        Your tickets are secured. See you there.
      </motion.p>

      {showContent && (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="w-full max-w-sm">
          <motion.div variants={fadeUp}>
            <Card className="relative overflow-hidden border-accent-mint/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-accent-mint to-accent-gold" />

              <div className="pt-2 space-y-4">
                <div>
                  <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/50 mb-1">Event</p>
                  <p className="font-display font-semibold text-frame-white">{event.title}</p>
                </div>

                <div>
                  <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/50 mb-1">Date &amp; Time</p>
                  <p className="text-frame-white text-sm">{formatFullDate(event.date)}</p>
                  <p className="text-frame-smoke/60 text-sm">{formatTimeRange(event.date, event.endDate)}</p>
                </div>

                <div className="flex gap-6">
                  <div>
                    <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/50 mb-1">Tier</p>
                    <p className="text-frame-white text-sm">{tierLabel}</p>
                  </div>
                  <div>
                    <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/50 mb-1">Qty</p>
                    <p className="text-frame-white text-sm">{quantity}</p>
                  </div>
                </div>

                <div className="divider" />

                <div className="text-center py-2">
                  <p className="text-label-xs uppercase tracking-luxury text-frame-smoke/50 mb-2">Ticket Code</p>
                  <p className="font-mono text-xl tracking-[0.2em] text-accent-mint font-medium">{ticketCode}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 space-y-3">
            <Link href="/profile" className="block">
              <Button variant="primary" size="lg" fullWidth>View My Tickets</Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="ghost" size="md" fullWidth>Back to Discover</Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <Logo size="sm" className="text-frame-smoke/20" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
