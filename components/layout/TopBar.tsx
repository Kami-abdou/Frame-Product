'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface TopBarProps {
  title?: string;
  transparent?: boolean;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

export default function TopBar({
  title,
  transparent = false,
  showBack = true,
  rightAction,
  className,
}: TopBarProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        transparent ? 'bg-transparent' : 'bg-frame-black/80 backdrop-blur-xl border-b border-white/[0.04]',
        className
      )}
    >
      <div className="flex items-center justify-between h-12 px-4 max-w-lg mx-auto">
        {showBack ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center text-frame-smoke hover:text-frame-white transition-colors duration-300"
            aria-label="Go back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </motion.button>
        ) : (
          <div className="w-8" />
        )}

        {title && (
          <h1 className="font-display text-label-sm uppercase tracking-luxury text-frame-smoke truncate max-w-[200px]">
            {title}
          </h1>
        )}

        {rightAction || <div className="w-8" />}
      </div>
    </header>
  );
}
