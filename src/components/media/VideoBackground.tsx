'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

export interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function VideoBackground({
  src,
  poster,
  className = '',
  overlay = true,
  overlayOpacity = 0.7,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    // Don't show video if user prefers reduced motion
    if (reducedMotion) {
      setShowVideo(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Handle video load
    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    video.addEventListener('canplaythrough', handleCanPlay);

    // Try to play video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play was prevented
        console.log('Video autoplay was prevented');
      });
    }

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, [reducedMotion]);

  if (!showVideo) {
    return poster ? (
      <div
        className={`absolute inset-0 ${className}`}
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {overlay && (
          <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
        )}
      </div>
    ) : null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className={`h-full w-full object-cover transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken video */}
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Grain effect */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
