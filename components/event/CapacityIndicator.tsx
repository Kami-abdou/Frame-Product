'use client';

import { cn } from '@/lib/utils/cn';
import { capacityPercent, formatSpotsRemaining } from '@/lib/utils/formatters';
import ProgressBar from '@/components/ui/ProgressBar';

interface CapacityIndicatorProps {
  sold: number;
  total: number;
}

export default function CapacityIndicator({ sold, total }: CapacityIndicatorProps) {
  const pct = capacityPercent(sold, total);
  const color = pct > 80 ? 'coral' : pct > 60 ? 'gold' : 'electric';
  const isAlmostFull = pct > 90;

  return (
    <div className={cn(isAlmostFull && 'animate-pulse-slow')}>
      <ProgressBar value={pct} color={color} size="md" showLabel />
      <p className={cn('text-sm font-light mt-1.5', pct > 80 ? 'text-accent-coral' : 'text-frame-smoke/60')}>
        {formatSpotsRemaining(sold, total)}
      </p>
    </div>
  );
}
