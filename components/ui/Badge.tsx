'use client';

import { cn } from '@/lib/utils/cn';

type BadgeType =
  | 'invite_only'
  | 'limited_capacity'
  | 'secret_location'
  | 'frame_original'
  | 'almost_sold_out'
  | 'new';

interface BadgeProps {
  type: BadgeType;
  className?: string;
}

const badgeConfig: Record<BadgeType, { label: string; style: string }> = {
  invite_only: {
    label: 'INVITE ONLY',
    style: 'text-accent-gold border-accent-gold/20',
  },
  limited_capacity: {
    label: 'LIMITED',
    style: 'text-accent-coral border-accent-coral/20',
  },
  secret_location: {
    label: 'SECRET LOCATION',
    style: 'text-frame-white border-frame-white/10',
  },
  frame_original: {
    label: 'FRAME ORIGINAL',
    style: 'text-accent-gold border-accent-gold/30 bg-accent-gold/[0.06]',
  },
  almost_sold_out: {
    label: 'ALMOST SOLD OUT',
    style: 'text-accent-coral border-accent-coral/30 animate-pulse-slow',
  },
  new: {
    label: 'NEW',
    style: 'text-accent-mint border-accent-mint/20',
  },
};

export default function Badge({ type, className }: BadgeProps) {
  const config = badgeConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center border px-2 py-0.5',
        'text-label-xs uppercase font-display',
        'leading-none whitespace-nowrap',
        config.style,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
