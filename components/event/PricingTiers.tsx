'use client';

import { motion } from 'framer-motion';
import { stagger } from '@/lib/utils/constants';
import type { PricingTier } from '@/lib/data/events';
import TierCard from '@/components/event/TierCard';

interface PricingTiersProps {
  tiers: PricingTier[];
  onSelectTier: (tier: PricingTier) => void;
  selectedTierId?: string;
}

export default function PricingTiers({
  tiers,
  onSelectTier,
  selectedTierId,
}: PricingTiersProps) {
  return (
    <motion.div
      className="flex flex-col gap-3"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {tiers.map((tier) => (
        <TierCard
          key={tier.id}
          tier={tier}
          onSelect={() => onSelectTier(tier)}
          isSelected={tier.id === selectedTierId}
        />
      ))}
    </motion.div>
  );
}
