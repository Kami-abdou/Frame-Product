'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/utils/constants';
import type { PricingTier } from '@/lib/data/events';
import PricingTiers from '@/components/event/PricingTiers';
import Button from '@/components/ui/Button';

interface TierSelectorProps {
  tiers: PricingTier[];
  selectedTier: PricingTier | null;
  onSelect: (tier: PricingTier) => void;
  onContinue: () => void;
}

export default function TierSelector({ tiers, selectedTier, onSelect, onContinue }: TierSelectorProps) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
        <h2 className="font-display text-display-md text-frame-white mb-1">Choose your ticket</h2>
        <p className="text-frame-smoke text-sm font-light">Select a tier to continue.</p>
      </motion.div>

      <div className="flex-1">
        <PricingTiers tiers={tiers} onSelectTier={onSelect} selectedTierId={selectedTier?.id} />
      </div>

      <div className="sticky bottom-0 pt-4 pb-6 bg-gradient-to-t from-frame-black via-frame-black to-transparent">
        <Button variant="primary" size="lg" fullWidth disabled={!selectedTier} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
