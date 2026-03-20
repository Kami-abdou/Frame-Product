'use client';

import { motion } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/utils/constants';
import { formatPrice, formatFullDate, formatTimeRange } from '@/lib/utils/formatters';
import type { FrameEvent, PricingTier } from '@/lib/data/events';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface CheckoutSummaryProps {
  event: FrameEvent;
  tier: PricingTier;
  quantity: number;
  totalPrice: number;
  serviceFee: number;
  grandTotal: number;
  onConfirm: () => void;
  onBack: () => void;
}

export default function CheckoutSummary({ event, tier, quantity, totalPrice, serviceFee, grandTotal, onConfirm, onBack }: CheckoutSummaryProps) {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col min-h-[calc(100vh-8rem)]">
      <motion.div variants={fadeUp} className="mb-6">
        <h2 className="font-display text-display-md text-frame-white mb-1">Review &amp; Pay</h2>
        <p className="text-frame-smoke text-sm font-light">Confirm your order details.</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="mb-4">
          <h3 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Order</h3>
          <div className="space-y-2.5">
            {[
              { label: 'Event', value: event.title },
              { label: 'Date', value: formatFullDate(event.date) },
              { label: 'Time', value: formatTimeRange(event.date, event.endDate) },
              { label: 'Tier', value: tier.label },
              { label: 'Quantity', value: String(quantity) },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-frame-smoke/50 text-sm font-light">{row.label}</span>
                <span className="text-frame-white text-sm text-right max-w-[60%] truncate">{row.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Card className="mb-6">
          <h3 className="font-display text-label-lg uppercase tracking-luxury text-frame-white mb-3">Price</h3>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-frame-smoke/50 font-light">{quantity} x {tier.label}</span>
              <span className="text-frame-white">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-frame-smoke/50 font-light">Service fee (5%)</span>
              <span className="text-frame-white">{formatPrice(serviceFee)}</span>
            </div>
            <div className="divider" />
            <div className="flex items-center justify-between">
              <span className="font-display font-medium text-frame-white uppercase tracking-wide text-sm">Grand Total</span>
              <span className="font-display font-semibold text-lg text-accent-gold">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="flex-1" />

      <motion.div variants={fadeUp} className="pb-6 space-y-3">
        <Button variant="gold" size="lg" fullWidth onClick={onConfirm}>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Pay with Card
          </span>
        </Button>
        <Button variant="outline" size="md" fullWidth onClick={onBack}>Back</Button>
        <p className="text-label-xs text-frame-smoke/30 text-center leading-relaxed uppercase tracking-wider">
          By completing this purchase, you agree to FRAME&apos;s Terms of Service. All sales are final.
        </p>
      </motion.div>
    </motion.div>
  );
}
