import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  children: ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors';

  const variants = {
    default: 'bg-bg-muted text-fg-muted',
    accent: 'bg-accent text-accent-fg',
    outline: 'border border-border text-fg',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded',
    md: 'px-3 py-1 text-sm rounded-md',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
