'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { formatFullDate } from '@/lib/utils/formatters';
import type { FrameEvent } from '@/lib/data/events';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import BadgeComponent from '@/components/ui/Badge';

interface WaitlistFormProps {
  event: FrameEvent;
  onJoin: (tierId: string) => void;
}

export default function WaitlistForm({ event, onJoin }: WaitlistFormProps) {
  const soldOutTiers = event.tiers.filter((t) => !t.available);
  const [selectedTierId, setSelectedTierId] = useState<string>(
    soldOutTiers[0]?.id ?? ''
  );

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Event Mini Card */}
      <motion.div variants={fadeUp}>
        <Card>
          <div className="flex items-start gap-3">
            {/* Color accent */}
            <div
              className="w-12 h-12 rounded-card flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${event.media.ambientColor}80, ${event.media.ambientColor}30)`,
              }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-semibold text-frame-white truncate">
                {event.title}
              </h3>
              <p className="text-frame-smoke text-sm">
                {formatFullDate(event.date)}
              </p>
              <div className="mt-2">
                <BadgeComponent type="almost_sold_out" />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tier Preference */}
      <motion.div variants={fadeUp}>
        <h3 className="font-display font-semibold text-frame-white text-base mb-3">
          Preferred Tier
        </h3>
        {soldOutTiers.length > 0 ? (
          <div className="space-y-2">
            {soldOutTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`w-full text-left p-4 rounded-card transition-all duration-200 ${
                  selectedTierId === tier.id
                    ? 'glass ring-2 ring-accent-gold'
                    : 'glass'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-medium text-frame-white">
                    {tier.label}
                  </span>
                  <span className="text-frame-smoke text-sm">
                    {tier.price} TND
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-frame-smoke text-sm">
            No sold-out tiers available for waitlist.
          </p>
        )}
      </motion.div>

      {/* Explanation */}
      <motion.div variants={fadeUp}>
        <Card className="!bg-accent-gold/5 border border-accent-gold/20">
          <div className="flex gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent-gold flex-shrink-0 mt-0.5"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <div>
              <p className="text-frame-white text-sm font-medium mb-1">
                How the waitlist works
              </p>
              <p className="text-frame-smoke text-xs leading-relaxed">
                When a spot opens up, you will be notified and given a limited
                time window to complete your purchase. Your position in the queue
                determines priority. You will not be charged unless you confirm
                your booking.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Join Button */}
      <motion.div variants={fadeUp}>
        <Button
          variant="gold"
          size="lg"
          fullWidth
          disabled={!selectedTierId}
          onClick={() => onJoin(selectedTierId)}
        >
          Join Waitlist
        </Button>
      </motion.div>
    </motion.div>
  );
}
