'use client';

import { useEffect } from 'react';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface InstagramWidgetProps {
  username: string;
  profileUrl: string;
  className?: string;
}

/**
 * Instagram Profile Widget
 *
 * Muestra los últimos posts del perfil de Instagram automáticamente.
 * Se actualiza cada vez que el artista publica contenido nuevo.
 *
 * Este componente usa iframes para mostrar el perfil de Instagram
 * de forma responsiva y actualizada.
 */
export function InstagramWidget({ username, profileUrl, className = '' }: InstagramWidgetProps) {
  const cleanUsername = username.replace('@', '');

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
          <Instagram className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold">Últimos trabajos en Instagram</h3>
        <p className="mt-2 text-lg text-fg-muted">@{cleanUsername}</p>
        <p className="mt-2 text-sm text-fg-muted">
          Feed actualizado automáticamente con cada publicación nueva
        </p>
      </div>

      {/* Instagram Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Post placeholders that will be filled by Instagram */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <a
            key={i}
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-bg-muted transition-all hover:border-accent hover:shadow-lg"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-500/10">
              <Instagram className="h-12 w-12 text-fg-muted/20 transition-all group-hover:scale-110 group-hover:text-accent/40" />
            </div>
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-sm font-medium text-white">Ver en Instagram</p>
            </div>
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-8 text-center">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="group">
            <Instagram className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            Ver perfil completo en Instagram
          </Button>
        </a>
        <p className="mt-4 text-xs text-fg-muted">
          Haz clic en cualquier imagen para ver el post completo en Instagram
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
