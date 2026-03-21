'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

interface EventMediaBackgroundProps {
  picsumSeed: string;
  imageUrl?: string;
  videoUrl?: string;
  /** Hex colour used for the ambient tint overlay. Expected format: `#RRGGBB` or `#RGB`. */
  ambientColor: string;
  isActive: boolean;
}

export default function EventMediaBackground({
  picsumSeed,
  imageUrl,
  videoUrl,
  ambientColor,
  isActive,
}: EventMediaBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoUrl) return;
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // interrupted by fast scroll — safe to ignore
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, videoUrl]);

  const showKenBurns = !(videoUrl && isActive);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 1: Picsum placeholder — always the base */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://picsum.photos/seed/${encodeURIComponent(picsumSeed)}/600/1000`}
        alt=""
        className={cn('absolute inset-0 w-full h-full object-cover', showKenBurns && 'animate-ken-burns')}
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

      {/* Layer 3: Video teaser — renders over image when available */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Layer 4: Ambient color overlay — always on top of media */}
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
