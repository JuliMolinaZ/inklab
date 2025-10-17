'use client';

import { useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface InstagramFeedProps {
  username: string;
  profileUrl: string;
  className?: string;
}

/**
 * Instagram Feed component
 *
 * Muestra un llamado a acción prominente para visitar el perfil de Instagram
 * del artista, donde los visitantes pueden ver sus últimos trabajos.
 *
 * Para mostrar feeds automáticos se requiere:
 * - Instagram Basic Display API (requiere app y tokens)
 * - Servicios third-party como Behold, Juicer, etc.
 */
export function InstagramFeed({ username, profileUrl, className = '' }: InstagramFeedProps) {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Extract username from URL if needed
  const cleanUsername = username.replace('@', '');

  return (
    <div className={`rounded-2xl border border-border bg-bg-muted p-8 ${className}`}>
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
          <Instagram className="h-8 w-8 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold">Sígueme en Instagram</h3>
        <p className="mt-2 text-lg text-fg-muted">@{cleanUsername}</p>
        <p className="mt-3 text-sm text-fg-muted">
          Visita mi perfil para ver mis últimos trabajos, proyectos en progreso y disponibilidad
          para nuevos tatuajes.
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <a href={profileUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="group">
              <Instagram className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Ver perfil de Instagram
            </Button>
          </a>
        </div>

        {/* Additional info */}
        <p className="mt-4 text-xs text-fg-muted">
          Actualizado diariamente con nuevos diseños y trabajos terminados
        </p>
      </div>
    </div>
  );
}

// Type augmentation for Instagram embed script
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
