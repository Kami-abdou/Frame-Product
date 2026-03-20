'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger, scaleIn } from '@/lib/utils/constants';
import ProgressBar from '@/components/ui/ProgressBar';
import Card from '@/components/ui/Card';

interface WaitlistPositionProps {
  position: number;
  totalInQueue: number;
  tierLabel: string;
}

export default function WaitlistPosition({
  position,
  totalInQueue,
  tierLabel,
}: WaitlistPositionProps) {
  const progress = totalInQueue > 0 ? ((totalInQueue - position) / totalInQueue) * 100 : 0;

  const getMessage = () => {
    if (position <= 3) return "You're almost there! Stay ready.";
    if (position <= 10) return "You're getting closer!";
    return 'Hang tight, we will notify you.';
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Position Display */}
      <motion.div variants={scaleIn} className="text-center py-8">
        <p className="text-frame-smoke text-sm uppercase tracking-wider font-display mb-2">
          Your Position
        </p>
        <div className="relative inline-flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-accent-gold/10 border-2 border-accent-gold/30 flex items-center justify-center">
            <span className="font-display text-4xl font-bold text-accent-gold">
              #{position}
            </span>
          </div>
        </div>
        <p className="text-frame-white text-lg font-display font-semibold mt-4">
          You are #{position} in line
        </p>
        <p className="text-frame-smoke text-sm mt-1">
          for <span className="text-frame-white font-medium">{tierLabel}</span>
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div variants={fadeUp}>
        <Card>
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-frame-smoke text-sm">Queue progress</span>
              <span className="text-frame-smoke text-sm">
                {position} / {totalInQueue}
              </span>
            </div>
            <ProgressBar value={progress} color="gold" size="md" />
          </div>
          <p className="text-accent-gold text-sm font-medium text-center">
            {getMessage()}
          </p>
        </Card>
      </motion.div>

      {/* Info */}
      <motion.div variants={fadeUp}>
        <Card className="!bg-white/[0.03]">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-mint/20 flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-mint"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <p className="text-frame-smoke text-sm">
                You will receive a notification when a spot opens up.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-electric/20 flex items-center justify-center flex-shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-electric"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <p className="text-frame-smoke text-sm">
                You will have a limited time window to confirm your booking.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
