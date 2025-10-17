import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'section' | 'div' | 'article' | 'aside';
}

export function Section({
  children,
  spacing = 'lg',
  as: Component = 'section',
  className,
  ...props
}: SectionProps) {
  const spacings = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16 md:py-20',
    lg: 'py-16 sm:py-20 md:py-24 lg:py-28',
    xl: 'py-20 sm:py-24 md:py-28 lg:py-32',
  };

  return (
    <Component className={cn(spacings[spacing], className)} {...props}>
      {children}
    </Component>
  );
}
