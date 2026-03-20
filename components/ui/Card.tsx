'use client';

import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  hover?: boolean;
}

export default function Card({
  children,
  className,
  padding = true,
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        'frame-border bg-frame-charcoal/50',
        padding && 'p-4',
        hover && 'transition-all duration-300 hover:bg-frame-charcoal/80 hover:border-white/[0.08]',
        className,
      )}
    >
      {children}
    </div>
  );
}
