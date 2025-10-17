'use client';

import { useEffect, useRef } from 'react';

interface InstagramEmbedProps {
  postUrl: string;
  className?: string;
}

/**
 * Instagram Post Embed
 *
 * Muestra un post de Instagram usando el embed oficial.
 * El post se actualiza automáticamente si el artista lo modifica o elimina.
 *
 * Para usar este componente:
 * 1. Obtén la URL de un post de Instagram (ej: https://www.instagram.com/p/ABC123/)
 * 2. Pásala como prop postUrl
 * 3. El script de Instagram se encargará de renderizar el embed
 */
export function InstagramEmbed({ postUrl, className = '' }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Instagram embed script if not already loaded
    if (!window.instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else {
      // If script already loaded, just process embeds
      window.instgrm.Embeds.process();
    }
  }, [postUrl]);

  return (
    <div ref={containerRef} className={`instagram-embed-container ${className}`}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: '3px',
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: '540px',
          minWidth: '326px',
          padding: 0,
          width: 'calc(100% - 2px)',
        }}
      >
        <div style={{ padding: '16px' }}>
          <a
            href={postUrl}
            style={{
              background: '#FFFFFF',
              lineHeight: 0,
              padding: '0 0',
              textAlign: 'center',
              textDecoration: 'none',
              width: '100%',
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver esta publicación en Instagram
          </a>
        </div>
      </blockquote>
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
