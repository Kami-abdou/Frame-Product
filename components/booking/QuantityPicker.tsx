'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { formatPrice } from '@/lib/utils/formatters';
import type { PricingTier } from '@/lib/data/events';
import Card from '@/components/ui/Card';
import Counter from '@/components/ui/Counter';
import Button from '@/components/ui/Button';

interface QuantityPickerProps {
  tier: PricingTier;
  quantity: number;
  onQuantityChange: (n: number) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function QuantityPicker({ tier, quantity, onQuantityChange, onContinue, onBack }: QuantityPickerProps) {
  const subtotal = tier.price * quantity;
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col min-h-[calc(100vh-8rem)]">
      <motion.div variants={fadeUp} className="mb-6">
        <h2 className="font-display text-display-md text-frame-white mb-1">How many tickets?</h2>
        <p className="text-frame-smoke text-sm font-light">Up to 6 tickets per order.</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display font-medium text-frame-white text-sm uppercase tracking-wide">{tier.label}</p>
              <p className="text-frame-smoke/60 text-sm font-light">{formatPrice(tier.price)} per ticket</p>
            </div>
            <Counter value={quantity} onChange={onQuantityChange} min={1} max={6} />
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="mb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-frame-smoke/60 font-light">{quantity} x {tier.label} @ {formatPrice(tier.price)}</span>
              <span className="text-frame-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-frame-smoke/60 font-light">Service fee (5%)</span>
              <span className="text-frame-white">{formatPrice(serviceFee)}</span>
            </div>
            <div className="divider" />
            <div className="flex items-center justify-between">
              <span className="font-display font-medium text-frame-white uppercase tracking-wide text-sm">Total</span>
              <span className="font-display font-semibold text-lg text-frame-white">{formatPrice(total)}</span>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="flex-1" />

      <motion.div variants={fadeUp} className="flex gap-3 pb-6">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1">Back</Button>
        <Button variant="primary" size="lg" onClick={onContinue} className="flex-[2]">Continue</Button>
      </motion.div>
    </motion.div>
  );
}
