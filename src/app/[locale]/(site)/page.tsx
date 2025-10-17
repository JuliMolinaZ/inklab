import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ArtistCard } from '@/components/home/ArtistCard';
import { getFeaturedArtists, getAllPortfolioPieces } from '@/lib/cms';
import { ArrowRight, Sparkles, MapPin, Clock } from 'lucide-react';

export default async function HomePage() {
  const t = await getTranslations();
  const artists = await getFeaturedArtists();
  const portfolioPieces = await getAllPortfolioPieces();
  const featuredPieces = portfolioPieces.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="h-full w-full object-cover animate-in fade-in duration-1000"
          >
            <source src="/images/fondo.mp4" type="video/mp4" />
          </video>
          {/* Enhanced dark overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/20 px-4 py-2 text-sm font-medium text-accent backdrop-blur-md shadow-lg animate-in fade-in zoom-in-95 duration-500">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="font-semibold">{t('common.location')}</span>
            </div>

            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-white drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_80%)]">
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-accent via-accent to-accent bg-clip-text text-transparent drop-shadow-2xl [text-shadow:_0_0_20px_rgb(239_68_68_/_50%)]">
                {t('hero.titleGradient')}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 text-white/95 drop-shadow-lg [text-shadow:_0_2px_8px_rgb(0_0_0_/_60%)]">
              {t('hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button asChild size="lg" className="gap-2 group">
                <Link href="/booking">
                  {t('hero.cta.book')}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/portfolio">{t('hero.cta.portfolio')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Artists Section */}
      <Section className="bg-bg-muted">
        <Container>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
              {t('artists.badge')}
            </div>
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              {t('artists.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-fg-muted">
              {t('artists.description')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <ArtistCard
                key={artist.slug}
                artist={artist}
                yearsLabel={t('artists.yearsExperience')}
                viewProfileLabel={t('artists.viewProfile')}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/artists">{t('common.viewAll')}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Portfolio Preview Section */}
      <Section>
        <Container>
          <div className="mb-12 text-center">
            <h2 className="font-display text-4xl font-bold sm:text-5xl bg-gradient-to-r from-fg to-fg-muted bg-clip-text text-transparent">
              {t('featured.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-fg-muted">
              {t('featured.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {featuredPieces.map((piece, index) => (
              <div
                key={piece.slug}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Link
                  href={`/portfolio/${piece.slug}`}
                  className="group relative block aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <Image
                    src={piece.cover}
                    alt={piece.title}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-75"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                      <h3 className="font-display text-xl font-bold text-fg drop-shadow-lg">
                        {piece.title}
                      </h3>
                      <p className="mt-1 text-sm text-fg-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        {t('portfolio.by')} {piece.artist}
                      </p>
                    </div>
                  </div>

                  {/* Decorative border on hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/30 transition-colors duration-500" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="group">
              <Link href="/portfolio" className="gap-2">
                {t('featured.viewAll')}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Location Section */}
      <Section className="bg-bg-muted">
        <Container>
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              {t('location.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-fg-muted">
              {t('location.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Map */}
            <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5437958123456!2d-75.6891768!3d4.8051338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38878f7e207b91%3A0x93c0c476ee296a40!2sEdificio%20Quality!5e0!3m2!1ses!2sco!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Inklab Mastery Location"
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
              {/* Address Card */}
              <div className="rounded-2xl bg-bg p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-accent/30">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-fg mb-2">
                      {t('location.title')}
                    </h3>
                    <p className="text-fg-muted">
                      {t('location.address')}
                    </p>
                    <p className="text-fg-muted">
                      {t('location.city')}, {t('location.country')}
                    </p>
                    <div className="mt-4">
                      <Button asChild variant="outline" size="sm" className="group">
                        <a
                          href="https://www.google.com/maps/place/Edificio+Quality/@4.8051338,-75.6891768,17z"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          {t('location.getDirections')}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="rounded-2xl bg-bg p-6 shadow-md hover:shadow-xl transition-all duration-500 border border-border/50 hover:border-accent/30">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-fg mb-3">
                      {t('location.hours.title')}
                    </h3>
                    <div className="space-y-2 text-fg-muted">
                      <p>{t('location.hours.weekdays')}</p>
                      <p>{t('location.hours.saturday')}</p>
                      <p className="text-fg-subtle">{t('location.hours.sunday')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-bg-muted to-bg-muted">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-bold sm:text-5xl">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-fg-muted">
              {t('cta.subtitle')}
            </p>
            <div className="mt-10">
              <Button asChild size="lg" className="gap-2 group shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/booking">
                  {t('cta.button')}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
