'use client';

import Link from 'next/link';
import { Instagram } from 'lucide-react';
import type { Artist } from '@/lib/cms';

interface ArtistCardProps {
  artist: Artist;
  yearsLabel: string;
  viewProfileLabel: string;
}

export function ArtistCard({ artist, yearsLabel, viewProfileLabel }: ArtistCardProps) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-bg shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Artist Video */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
        >
          <source src={artist.avatar} type="video/mp4" />
        </video>
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          <h3 className="font-display text-2xl font-bold text-fg drop-shadow-lg">
            {artist.name}
          </h3>
          <p className="mt-2 text-sm text-fg-muted line-clamp-2 transition-all duration-300 group-hover:text-fg">
            {artist.bio}
          </p>

          {/* Specialties */}
          <div className="mt-4 flex flex-wrap gap-2">
            {artist.specialties.slice(0, 3).map((specialty, idx) => (
              <span
                key={specialty}
                className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent backdrop-blur-sm transition-all duration-300 group-hover:bg-accent/30 group-hover:scale-105"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Years of experience */}
          <div className="mt-4 flex items-center gap-2 text-sm text-fg-muted transition-colors duration-300 group-hover:text-accent">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>
              {artist.yearsExperience} {yearsLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Instagram link with enhanced styling */}
      <div className="flex items-center justify-between border-t border-border/50 bg-bg/50 backdrop-blur-sm p-4 transition-colors duration-300 group-hover:bg-accent/5 group-hover:border-accent/20">
        <span className="text-sm font-medium text-fg transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">
          {viewProfileLabel}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(artist.instagram, '_blank', 'noopener,noreferrer');
          }}
          className="flex items-center gap-2 text-sm text-fg-muted transition-all duration-300 hover:text-accent hover:scale-110"
          aria-label="Ver perfil de Instagram"
        >
          <Instagram className="h-4 w-4" />
        </button>
      </div>
    </Link>
  );
}
