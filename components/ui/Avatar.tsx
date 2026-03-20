'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: AvatarSize;
  verified?: boolean;
  className?: string;
}

const sizeMap: Record<AvatarSize, { container: string; text: string; badge: string }> = {
  sm: { container: 'h-8 w-8', text: 'text-xs', badge: 'h-3 w-3' },
  md: { container: 'h-10 w-10', text: 'text-sm', badge: 'h-3.5 w-3.5' },
  lg: { container: 'h-14 w-14', text: 'text-base', badge: 'h-4 w-4' },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Avatar({
  src,
  name,
  size = 'md',
  verified = false,
  className,
}: AvatarProps) {
  const s = sizeMap[size];

  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <div className={cn('relative overflow-hidden rounded-full', s.container)}>
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
      ) : (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-frame-steel',
            s.container,
          )}
        >
          <span className={cn('font-display font-medium text-frame-smoke', s.text)}>
            {getInitials(name)}
          </span>
        </div>
      )}

      {/* Verified badge */}
      {verified && (
        <span
          className={cn(
            'absolute bottom-0 right-0 flex items-center justify-center rounded-full',
            'bg-accent-mint border-2 border-frame-black',
            s.badge,
          )}
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="h-2 w-2 text-frame-black"
          >
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
