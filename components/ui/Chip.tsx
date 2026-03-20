'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: string;
  className?: string;
}

export default function Chip({
  label,
  active = false,
  onClick,
  icon,
  className,
}: ChipProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3.5 py-1.5',
        'text-label-sm uppercase font-display',
        'transition-all duration-300 whitespace-nowrap cursor-pointer',
        active
          ? 'text-frame-white border-b border-frame-white'
          : 'text-frame-smoke hover:text-frame-silver border-b border-transparent',
        className,
      )}
    >
      {icon && <span className="text-xs opacity-60">{icon}</span>}
      {label}
    </motion.button>
  );
}
