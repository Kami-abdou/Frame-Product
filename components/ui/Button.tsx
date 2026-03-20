'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'gold' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children' | 'className' | 'disabled'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-frame-white text-frame-black hover:bg-frame-cream active:bg-frame-white/90',
  secondary:
    'glass text-frame-white hover:bg-white/[0.06]',
  gold:
    'bg-accent-gold text-frame-black hover:bg-accent-gold-light active:bg-accent-gold/90',
  ghost:
    'bg-transparent text-frame-smoke hover:text-frame-white hover:bg-white/[0.03]',
  outline:
    'bg-transparent text-frame-white frame-border hover:bg-white/[0.03]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-sm',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className, disabled = false, fullWidth = false, ...rest }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center font-body font-medium',
          'tracking-wide uppercase',
          'transition-all duration-300 ease-out',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-frame-white/20',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          disabled && 'opacity-30 cursor-not-allowed pointer-events-none',
          className,
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
