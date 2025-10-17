import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Instagram, Award, Calendar, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ImageSmart } from '@/components/media/ImageSmart';
import { Reveal } from '@/components/fx/Reveal';
import { Masonry } from '@/components/gallery/Masonry';
import { InstagramGallery } from '@/components/social/InstagramGallery';
import { InstagramAvatar } from '@/components/media/InstagramAvatar';
import { getArtist, getAllArtists, getPortfolioPiecesByArtist } from '@/lib/cms';
import { generateSEO, getBreadcrumbSchema } from '@/lib/seo';

export async function generateStaticParams() {
  const artists = await getAllArtists();
  return artists.map((artist) => ({
    slug: artist.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtist(slug);

  if (!artist) {
    return {};
  }

  return generateSEO({
    title: `${artist.name} - Artista de Tatuajes`,
    description: artist.bio,
    image: artist.avatar,
    url: `/artists/${artist.slug}`,
  });
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = await getArtist(slug);

  if (!artist) {
    notFound();
  }

  const artistWork = await getPortfolioPiecesByArtist(artist.slug);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Artistas', url: '/artists' },
    { name: artist.name, url: `/artists/${artist.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <Section
        spacing="xl"
        className="relative overflow-hidden bg-gradient-to-b from-bg to-bg-muted"
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Artist Image/Video */}
            <Reveal direction="left">
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-3xl border-2 border-accent/20 shadow-2xl">
                  <InstagramAvatar
                    url={artist.avatar}
                    alt={artist.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
              </div>
            </Reveal>

            {/* Artist Info */}
            <div className="flex flex-col justify-center">
              <Reveal direction="right">
                <div className="bg-accent/10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-accent">
                  <Sparkles className="h-4 w-4" />
                  Artista Destacado
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.1}>
                <h1 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">{artist.name}</h1>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <p className="mt-4 text-xl text-fg-muted">{artist.bio}</p>
              </Reveal>

              {artist.heroQuote && (
                <Reveal direction="right" delay={0.3}>
                  <blockquote className="mt-6 border-l-4 border-accent pl-6 text-lg italic text-fg-muted">
                    "{artist.heroQuote}"
                  </blockquote>
                </Reveal>
              )}

              <Reveal direction="right" delay={0.4}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {artist.specialties.map((specialty) => (
                    <Badge key={specialty} variant="accent" size="md">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.5}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-fg-muted">
                    <Award className="h-5 w-5 text-accent" />
                    <span>{artist.yearsExperience}+ años de experiencia</span>
                  </div>
                  {artist.instagram && (
                    <a
                      href={artist.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-fg-muted transition-colors hover:text-accent"
                    >
                      <Instagram className="h-5 w-5" />
                      <span>Sígueme en Instagram</span>
                    </a>
                  )}
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.6}>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link href="/booking">
                    <Button size="lg" className="w-full sm:w-auto">
                      <Calendar className="mr-2 h-5 w-5" />
                      Reservar con {artist.name.split(' ')[0]}
                    </Button>
                  </Link>
                  {artist.instagram && (
                    <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        <Instagram className="mr-2 h-5 w-5" />
                        Instagram
                      </Button>
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content Section */}
      {artist.content && (
        <Section spacing="lg">
          <Container size="md">
            <Reveal>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: artist.content }}
              />
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Gallery Section */}
      {artist.gallery.length > 0 && (
        <Section spacing="lg" className="bg-bg-muted">
          <Container>
            <Reveal>
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">Galería de Trabajos</h2>
                <p className="mt-4 text-lg text-fg-muted">
                  Explora algunos de los trabajos más destacados de {artist.name.split(' ')[0]}
                </p>
              </div>
            </Reveal>

            <Masonry columns={3} gap="lg">
              {artist.gallery.map((image, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <Card hover className="group overflow-hidden p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <ImageSmart
                        src={image}
                        alt={`${artist.name} work ${index + 1}`}
                        fill
                        sizeType="gallery"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Card>
                </Reveal>
              ))}
            </Masonry>
          </Container>
        </Section>
      )}

      {/* Instagram Gallery Section */}
      {artist.instagram && (
        <Section spacing="lg" className="bg-bg-muted">
          <Container>
            <Reveal>
              <InstagramGallery
                username={(artist.name.split(' ')[0] || '')}
                profileUrl={artist.instagram}
                posts={artist.instagramPosts}
              />
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Portfolio Section */}
      {artistWork.length > 0 && (
        <Section spacing="lg">
          <Container>
            <Reveal>
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">Portfolio Completo</h2>
                <p className="mt-4 text-lg text-fg-muted">
                  {artistWork.length} tatuajes realizados por {artist.name.split(' ')[0]}
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artistWork.map((piece, index) => (
                <Reveal key={piece.slug} delay={index * 0.1}>
                  <Link href={`/portfolio/${piece.slug}`}>
                    <Card hover className="group overflow-hidden p-0">
                      <div className="relative aspect-square overflow-hidden">
                        <ImageSmart
                          src={piece.cover}
                          alt={piece.title}
                          fill
                          sizeType="card"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold">{piece.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {piece.styles.map((style) => (
                            <Badge key={style} size="sm">
                              {style}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      <Section spacing="lg" className="bg-accent text-accent-fg">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                ¿Listo para trabajar con {artist.name.split(' ')[0]}?
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Agenda tu consulta gratuita y comienza a crear tu tatuaje soñado
              </p>
              <div className="mt-8">
                <Link href="/booking">
                  <Button size="lg" variant="secondary">
                    <Calendar className="mr-2 h-5 w-5" />
                    Reservar Cita
                  </Button>
                </Link>
              </div>
              <div className="mt-6">
                <Link href="/artists" className="text-sm opacity-75 hover:opacity-100">
                  ← Ver todos los artistas
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
