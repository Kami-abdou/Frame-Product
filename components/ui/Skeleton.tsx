'use client';

import { cn } from '@/lib/utils/cn';

type SkeletonRounded = 'card' | 'full' | 'md';

interface SkeletonProps {
  className?: string;
  rounded?: SkeletonRounded;
}

const roundedMap: Record<SkeletonRounded, string> = {
  card: 'rounded-card',
  full: 'rounded-full',
  md: 'rounded-md',
};

export default function Skeleton({
  className,
  rounded = 'md',
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-frame-steel animate-shimmer',
        'bg-[length:200%_100%]',
        'bg-gradient-to-r from-frame-steel via-frame-charcoal to-frame-steel',
        roundedMap[rounded],
        className,
      )}
    />
  );
}
