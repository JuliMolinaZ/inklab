'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trapFocus } from '@/lib/a11y';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function Dialog({ open, onClose, children, title, description, className }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    // Trap focus within dialog
    const cleanup = trapFocus(dialog);

    // Close on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      cleanup();
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-modal bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'dialog-title' : undefined}
              aria-describedby={description ? 'dialog-description' : undefined}
              className={cn(
                'relative w-full max-w-lg rounded-2xl border border-border bg-bg p-6 shadow-2xl',
                className
              )}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="tap-target absolute right-4 top-4 rounded-lg p-1 text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg"
                aria-label="Cerrar diálogo"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              {(title || description) && (
                <div className="mb-6 pr-8">
                  {title && (
                    <h2 id="dialog-title" className="text-2xl font-bold">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="dialog-description" className="mt-2 text-sm text-fg-muted">
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Content */}
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
