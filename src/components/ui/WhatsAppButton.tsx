'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber,
  message = 'Hola! Me gustaría consultar sobre hacer un tatuaje'
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <div className="relative">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-full top-1/2 -translate-y-1/2 mr-4 whitespace-nowrap"
              >
                <div className="bg-bg border border-border rounded-xl px-4 py-2 shadow-lg">
                  <p className="text-sm font-medium">¿Necesitas ayuda?</p>
                  <p className="text-xs text-fg-muted">Chatea con nosotros</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <button
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 tap-target"
            aria-label="Contactar por WhatsApp"
          >
            {/* Pulse Animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

            {/* Icon */}
            <MessageCircle className="h-7 w-7 relative z-10" />
          </button>
        </div>
      </motion.div>
    </>
  );
}
