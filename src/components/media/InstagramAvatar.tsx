'use client';

import { useEffect } from 'react';
import { VideoAvatar } from '@/components/media/VideoAvatar';

interface InstagramAvatarProps {
  url: string;
  alt: string;
  className?: string;
}

/**
 * Instagram Avatar Component
 *
 * Detecta si el avatar es una URL de Instagram, un video local, o una imagen.
 * Soporta Instagram embeds, videos locales (.mp4), e imágenes.
 */
export function InstagramAvatar({ url, alt, className = '' }: InstagramAvatarProps) {
  // Check if URL is from Instagram
  const isInstagramUrl = url.includes('instagram.com/p/');

  // Check if URL is a local video file
  const isLocalVideo = url.endsWith('.mp4') || url.endsWith('.webm');

  useEffect(() => {
    if (isInstagramUrl && !window.instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else if (isInstagramUrl && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [isInstagramUrl, url]);

  // If it's a local video file
  if (isLocalVideo) {
    return <VideoAvatar src={url} alt={alt} className={className} />;
  }

  // If it's an Instagram URL
  if (isInstagramUrl) {
    return (
      <div className={`instagram-avatar-container ${className}`}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px auto',
            maxWidth: '540px',
            minWidth: '326px',
            padding: 0,
            width: '99.375%',
          }}
        >
          <div style={{ padding: '16px' }}>
            <a
              href={url}
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
              Ver este post en Instagram
            </a>
          </div>
        </blockquote>
      </div>
    );
  }

  // If it's a regular image URL
  return (
    <img
      src={url}
      alt={alt}
      className={className}
      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
    />
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
