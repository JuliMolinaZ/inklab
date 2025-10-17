'use client';

import { useRef, useEffect } from 'react';

interface VideoAvatarProps {
  src: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

/**
 * Video Avatar Component
 *
 * Optimized component for displaying video avatars with proper loading and playback.
 * Supports local video files with autoplay, loop, and muted options for better UX.
 */
export function VideoAvatar({
  src,
  alt,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
}: VideoAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mount if autoPlay is true
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    }
  }, [autoPlay]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        controls={controls}
        className="h-full w-full object-cover"
        aria-label={alt}
      >
        <source src={src} type="video/mp4" />
        Su navegador no soporta el elemento de video.
      </video>
    </div>
  );
}
