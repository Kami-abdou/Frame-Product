'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface CardMediaBackgroundProps {
  picsumSeed: string;
  imageUrl?: string;
  /** Hex colour used for the ambient tint overlay. Expected format: `#RRGGBB` or `#RGB`. */
  ambientColor: string;
  /** Tailwind classes for the inner image wrapper — use for hover scale animations (e.g. group-hover:scale-[1.03]). Applied to the inner div only, NOT the overflow-hidden outer container. */
  imageClassName?: string;
}

export default function CardMediaBackground({
  picsumSeed,
  imageUrl,
  ambientColor,
  imageClassName,
}: CardMediaBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Inner wrapper — receives scale/transform animations, not overflow-hidden */}
      <div className={cn('absolute inset-0', imageClassName)}>
        {/* Layer 1: Picsum placeholder — always the base */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://picsum.photos/seed/${encodeURIComponent(picsumSeed)}/600/1000`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Layer 2: Real hero image — renders over picsum when available */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Layer 3: Ambient overlay — sibling of inner wrapper, never scaled */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 15%, ${ambientColor}35 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 50%, ${ambientColor}10 0%, transparent 40%),
                       linear-gradient(180deg, #0A0A0A00 0%, #050505 100%)`,
        }}
      />
    </div>
  );
}
