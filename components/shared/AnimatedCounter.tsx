'use client';

import { useEffect, useRef } from 'react';
import {
  useMotionValue,
  useTransform,
  animate,
  motion,
} from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString(),
  );
  const prevValue = useRef(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
    });

    prevValue.current = value;

    return () => controls.stop();
  }, [value, duration, motionValue]);

  return (
    <motion.span className={cn('tabular-nums', className)}>
      {rounded}
    </motion.span>
  );
}
