'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface VideoBackgroundProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export default function VideoBackground({
  src,
  alt,
  className,
  overlay = true,
}: VideoBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover animate-ken-burns"
        priority
        sizes="100vw"
      />

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
      )}
    </div>
  );
}
