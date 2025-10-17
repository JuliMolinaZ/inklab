import Link from 'next/link';
import { Instagram, Award, ArrowRight, Sparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageSmart } from '@/components/media/ImageSmart';
import { InstagramAvatar } from '@/components/media/InstagramAvatar';
import { Reveal } from '@/components/fx/Reveal';
import { generateSEO } from '@/lib/seo';
import { getAllArtists } from '@/lib/cms';

export const metadata = generateSEO({
  title: 'Nuestros Artistas - Maestros del Tatuaje',
  description:
    'Conoce al talentoso equipo de artistas profesionales de Inklab Mastery. Cada uno con su estilo único y años de experiencia en el arte del tatuaje.',
  url: '/artists',
});

export const revalidate = 3600;

export default async function ArtistsPage() {
  const t = await getTranslations();
  const artists = await getAllArtists();

  return (
    <>
      {/* Hero Section */}
      <Section
        spacing="xl"
        className="relative overflow-hidden bg-gradient-to-b from-bg to-bg-muted"
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <div className="bg-accent/10 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" />
                {t('artists.badge')}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">
                {t('artists.title')}
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-fg-muted sm:text-xl lg:text-2xl">
                {t('artists.description')}
              </p>
            </Reveal>
          </div>
        </Container>

        {/* Decorative elements */}
        <div className="bg-accent/5 pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/5 pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full blur-3xl" />
      </Section>

      {/* Artists Grid */}
      <Section spacing="xl">
        <Container>
          <div className="space-y-24">
            {artists.map((artist, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={artist.slug}
                  className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${
                    !isEven ? 'lg:direction-reverse' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                    <Reveal direction={isEven ? 'left' : 'right'}>
                      <Link href={`/artists/${artist.slug}`} className="group block">
                        <div className="border-accent/20 group-hover:border-accent/40 group-hover:shadow-3xl relative overflow-hidden rounded-3xl border-2 shadow-2xl transition-all duration-300">
                          {/* Main Image */}
                          <div className="relative aspect-square overflow-hidden">
                            <InstagramAvatar
                              url={artist.avatar}
                              alt={artist.name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          </div>

                          {/* Gallery Preview */}
                          {artist.gallery.length > 0 && (
                            <div className="grid grid-cols-3 gap-1">
                              {artist.gallery.slice(0, 3).map((image, idx) => (
                                <div key={idx} className="relative aspect-square">
                                  <ImageSmart
                                    src={image}
                                    alt={`${artist.name} work ${idx + 1}`}
                                    fill
                                    sizeType="thumbnail"
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="rounded-full bg-accent px-6 py-3 font-medium text-accent-fg">
                              {t('artists.viewProfile')}
                              <ArrowRight className="ml-2 inline-block h-5 w-5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  </div>

                  {/* Content Column */}
                  <div className={`flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                    <Reveal direction={isEven ? 'right' : 'left'} delay={0.1}>
                      <div className="inline-flex items-center gap-2 text-accent">
                        <Award className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {artist.yearsExperience}+ {t('artists.yearsExperience')}
                        </span>
                      </div>
                    </Reveal>

                    <Reveal direction={isEven ? 'right' : 'left'} delay={0.2}>
                      <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                        <Link
                          href={`/artists/${artist.slug}`}
                          className="transition-colors hover:text-accent"
                        >
                          {artist.name}
                        </Link>
                      </h2>
                    </Reveal>

                    <Reveal direction={isEven ? 'right' : 'left'} delay={0.3}>
                      <p className="mt-4 text-lg text-fg-muted">{artist.bio}</p>
                    </Reveal>

                    {artist.heroQuote && (
                      <Reveal direction={isEven ? 'right' : 'left'} delay={0.4}>
                        <blockquote className="mt-6 border-l-4 border-accent pl-6 text-lg italic text-fg-muted">
                          "{artist.heroQuote}"
                        </blockquote>
                      </Reveal>
                    )}

                    <Reveal direction={isEven ? 'right' : 'left'} delay={0.5}>
                      <div className="mt-6">
                        <p className="mb-3 text-sm font-medium text-fg-subtle">{t('artists.specialties')}</p>
                        <div className="flex flex-wrap gap-2">
                          {artist.specialties.map((specialty) => (
                            <Badge key={specialty} variant="accent" size="md">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Reveal>

                    <Reveal direction={isEven ? 'right' : 'left'} delay={0.6}>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <Link href={`/artists/${artist.slug}`}>
                          <Button size="lg">
                            {t('artists.viewProfile')}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>

                        {artist.instagram && (
                          <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline">
                              <Instagram className="mr-2 h-5 w-5" />
                              {t('artists.instagram')}
                            </Button>
                          </a>
                        )}
                      </div>
                    </Reveal>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" className="bg-accent text-accent-fg">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                {t('artists.cta.title')}
              </h2>
              <p className="mt-4 text-lg opacity-90">
                {t('artists.cta.subtitle')}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/booking">
                  <Button size="lg" variant="secondary">
                    {t('artists.cta.button')}
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent-fg/20 hover:bg-accent-fg/10 text-accent-fg"
                  >
                    {t('artists.cta.portfolio')}
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
