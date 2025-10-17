'use client';

import { InstagramEmbed } from './InstagramEmbed';
import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface InstagramGalleryProps {
  username: string;
  profileUrl: string;
  posts?: string[];
  className?: string;
}

/**
 * Instagram Gallery Component
 *
 * Muestra una galería de posts de Instagram del artista.
 * Si no se proporcionan posts específicos, muestra solo el CTA del perfil.
 *
 * Para agregar posts:
 * 1. Visita el perfil del artista en Instagram
 * 2. Abre un post que quieras mostrar
 * 3. Copia la URL (ej: https://www.instagram.com/p/ABC123/)
 * 4. Agrégala al array de posts en el archivo MDX del artista
 */
export function InstagramGallery({
  username,
  profileUrl,
  posts = [],
  className = '',
}: InstagramGalleryProps) {
  const cleanUsername = username.replace('@', '');

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
          <Instagram className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold">Sígueme en Instagram</h3>
        <p className="mt-2 text-lg text-fg-muted">@{cleanUsername}</p>
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((postUrl, index) => (
              <InstagramEmbed key={index} postUrl={postUrl} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group">
                <Instagram className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Ver más en Instagram
              </Button>
            </a>
          </div>
        </>
      ) : (
        /* CTA when no posts provided */
        <div className="rounded-2xl border border-border bg-bg-muted p-8 text-center">
          <p className="text-fg-muted">
            Visita mi perfil para ver mis últimos trabajos, proyectos en progreso y disponibilidad
            para nuevos tatuajes.
          </p>
          <div className="mt-6">
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="group">
                <Instagram className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Ver perfil de Instagram
              </Button>
            </a>
          </div>
          <p className="mt-4 text-xs text-fg-muted">
            Actualizado diariamente con nuevos diseños y trabajos terminados
          </p>
        </div>
      )}
    </div>
  );
}
