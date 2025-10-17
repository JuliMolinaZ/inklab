'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface MasonryProps {
  children: ReactNode[];
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Masonry({ children, columns = 3, gap = 'md', className }: MasonryProps) {
  const gaps = {
    sm: 'gap-2 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
  };

  const columnClasses = {
    2: 'sm:columns-2',
    3: 'sm:columns-2 lg:columns-3',
    4: 'sm:columns-2 lg:columns-3 xl:columns-4',
  };

  return (
    <div className={cn('columns-1', columnClasses[columns], gaps[gap], className)}>
      {children.map((child, index) => (
        <div key={index} className="mb-4 break-inside-avoid sm:mb-6">
          {child}
        </div>
      ))}
    </div>
  );
}
