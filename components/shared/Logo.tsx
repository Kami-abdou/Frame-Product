'use client';

import { cn } from '@/lib/utils/cn';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  size?: LogoSize;
  showTagline?: boolean;
  className?: string;
}

const sizeConfig: Record<LogoSize, { frame: string; text: string; tagline: string; border: number; padding: string }> = {
  sm: { frame: 'w-7 h-7', text: 'text-[9px]', tagline: 'text-[7px]', border: 1, padding: 'p-0.5' },
  md: { frame: 'w-9 h-9', text: 'text-[10px]', tagline: 'text-[8px]', border: 1.5, padding: 'p-1' },
  lg: { frame: 'w-12 h-12', text: 'text-xs', tagline: 'text-[9px]', border: 2, padding: 'p-1.5' },
  xl: { frame: 'w-20 h-20', text: 'text-base', tagline: 'text-[11px]', border: 2, padding: 'p-2' },
};

export default function Logo({ size = 'md', showTagline = false, className }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div
        className={cn(
          'relative flex items-center justify-center',
          config.frame,
          config.padding,
        )}
        style={{ border: `${config.border}px solid currentColor` }}
      >
        <span
          className={cn(
            'font-display font-semibold uppercase tracking-[0.2em] text-current leading-none',
            config.text,
          )}
        >
          FRAME
        </span>
      </div>

      {showTagline && (
        <span
          className={cn(
            'font-body uppercase tracking-[0.2em] text-frame-smoke',
            config.tagline,
          )}
        >
          The Scene, Defined.
        </span>
      )}
    </div>
  );
}
