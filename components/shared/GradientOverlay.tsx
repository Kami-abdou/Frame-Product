'use client';

import { cn } from '@/lib/utils/cn';

type Direction = 'to-t' | 'to-b' | 'to-l' | 'to-r';

interface GradientOverlayProps {
  direction?: Direction;
  from?: string;
  via?: string;
  to?: string;
  className?: string;
}

const directionMap: Record<Direction, string> = {
  'to-t': 'bg-gradient-to-t',
  'to-b': 'bg-gradient-to-b',
  'to-l': 'bg-gradient-to-l',
  'to-r': 'bg-gradient-to-r',
};

export default function GradientOverlay({
  direction = 'to-t',
  from = 'frame-black',
  via,
  to = 'transparent',
  className,
}: GradientOverlayProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        directionMap[direction],
        `from-${from}`,
        via && `via-${via}`,
        `to-${to}`,
        className,
      )}
    />
  );
}
