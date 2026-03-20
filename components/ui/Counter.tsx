'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function Counter({
  value,
  onChange,
  min = 1,
  max = 6,
}: CounterProps) {
  const isMin = value <= min;
  const isMax = value >= max;

  return (
    <div className="glass inline-flex items-center gap-4 rounded-pill px-3 py-2">
      {/* Minus */}
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={isMin}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full text-lg font-body',
          'transition-colors duration-150',
          isMin
            ? 'text-frame-smoke/30 cursor-not-allowed'
            : 'text-frame-white hover:bg-white/10 active:bg-white/20',
        )}
        aria-label="Decrease"
      >
        &minus;
      </button>

      {/* Animated Number */}
      <div className="relative flex h-8 w-6 items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute text-base font-body font-medium text-frame-white"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Plus */}
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={isMax}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full text-lg font-body',
          'transition-colors duration-150',
          isMax
            ? 'text-frame-smoke/30 cursor-not-allowed'
            : 'text-frame-white hover:bg-white/10 active:bg-white/20',
        )}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}
