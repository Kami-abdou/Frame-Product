'use client';

import { cn } from '@/lib/utils/cn';

type ProgressColor = 'coral' | 'gold' | 'electric' | 'mint';
type ProgressSize = 'sm' | 'md';

interface ProgressBarProps {
  value: number;
  color?: ProgressColor;
  size?: ProgressSize;
  showLabel?: boolean;
  className?: string;
}

const colorMap: Record<ProgressColor, string> = {
  coral: 'bg-accent-coral',
  gold: 'bg-accent-gold',
  electric: 'bg-accent-electric',
  mint: 'bg-accent-mint',
};

const sizeMap: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
};

export default function ProgressBar({
  value,
  color = 'coral',
  size = 'sm',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className={cn(
          'flex-1 overflow-hidden rounded-full bg-frame-steel',
          sizeMap[size],
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-700 ease-out',
            colorMap[color],
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-body text-frame-smoke tabular-nums">
          {Math.round(clampedValue)}%
        </span>
      )}
    </div>
  );
}
