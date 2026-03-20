'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { fadeUp } from '@/lib/utils/constants';
import {
  formatPrice,
  capacityPercent,
  formatSpotsRemaining,
  getDiscountPercent,
} from '@/lib/utils/formatters';
import type { PricingTier } from '@/lib/data/events';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import Button from '@/components/ui/Button';

interface TierCardProps {
  tier: PricingTier;
  onSelect: () => void;
  isSelected: boolean;
}

const tierTypeStyles: Record<string, string> = {
  early_bird: 'text-accent-mint border-accent-mint/20',
  vip: 'text-accent-gold border-accent-gold/20',
  regular: 'text-frame-white border-white/10',
  last_minute: 'text-accent-coral border-accent-coral/20',
};

const tierTypeLabels: Record<string, string> = {
  early_bird: 'Early Bird',
  vip: 'VIP',
  regular: 'Regular',
  last_minute: 'Last Minute',
};

export default function TierCard({ tier, onSelect, isSelected }: TierCardProps) {
  const pct = capacityPercent(tier.sold, tier.totalCapacity);
  const isSoldOut = !tier.available;
  const discount = tier.originalPrice ? getDiscountPercent(tier.originalPrice, tier.price) : 0;
  const progressColor = pct > 80 ? 'coral' : pct > 60 ? 'gold' : 'electric';

  return (
    <motion.div variants={fadeUp} className="relative">
      <Card
        className={cn(
          'transition-all duration-300',
          isSelected && 'border-accent-gold/40 bg-accent-gold/[0.03]',
          isSoldOut && 'opacity-40'
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-medium text-frame-white text-sm uppercase tracking-wide">
            {tier.label}
          </h3>
          <span className={cn(
            'inline-flex items-center px-2 py-0.5 border',
            'text-label-xs uppercase font-display',
            tierTypeStyles[tier.type]
          )}>
            {tierTypeLabels[tier.type]}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-display text-display-sm text-frame-white">
            {formatPrice(tier.price)}
          </span>
          {tier.originalPrice && (
            <>
              <span className="text-frame-smoke/50 line-through text-sm">{formatPrice(tier.originalPrice)}</span>
              <span className="text-accent-mint text-label-xs">-{discount}%</span>
            </>
          )}
        </div>

        <div className="mb-3">
          <ProgressBar value={pct} color={progressColor} size="sm" />
          <p className="text-xs text-frame-smoke/50 font-light mt-1">
            {formatSpotsRemaining(tier.sold, tier.totalCapacity)}
          </p>
        </div>

        {tier.perks.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {tier.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-sm text-frame-smoke font-light">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-mint flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {perk}
              </li>
            ))}
          </ul>
        )}

        {isSoldOut ? (
          <p className="text-accent-coral font-display text-label-sm uppercase tracking-luxury text-center">Sold Out</p>
        ) : (
          <Button
            variant={isSelected ? 'gold' : 'outline'}
            size="sm"
            fullWidth
            onClick={onSelect}
          >
            {isSelected ? 'Selected' : 'Select'}
          </Button>
        )}
      </Card>

      {isSoldOut && <div className="absolute inset-0 bg-frame-black/20 pointer-events-none" />}
    </motion.div>
  );
}
