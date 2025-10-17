import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { generateSEO } from '@/lib/seo';
import { getAllPortfolioPieces } from '@/lib/cms';

export const metadata = generateSEO({
  title: 'Portfolio',
  description: 'Explora nuestra colección de tatuajes únicos y diseños personalizados.',
  url: '/portfolio',
});

export const revalidate = 3600;

export default async function PortfolioPage() {
  const t = await getTranslations();
  const pieces = await getAllPortfolioPieces();

  return (
    <Section spacing="lg" className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      </div>

      <Container>
        {/* Header - Matching Artists Style */}
        <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent backdrop-blur-sm shadow-sm">
            {t('portfolio.badge')}
          </div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            {t('portfolio.title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-fg-muted">
            {t('portfolio.subtitle')}
          </p>
          <p className="mt-2 text-sm font-medium text-accent">
            <span className="text-2xl font-bold">{pieces.length}</span> {t('portfolio.pieces')}
          </p>
        </div>

        {/* Brutal Masonry Grid */}
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
          {pieces.map((piece, index) => (
            <Link
              key={piece.slug}
              href={`/portfolio/${piece.slug}`}
              className="group relative block break-inside-avoid overflow-hidden rounded-2xl animate-in fade-in zoom-in-95 duration-700 shadow-lg hover:shadow-2xl transition-shadow"
              style={{ animationDelay: `${(index % 9) * 80}ms` }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={piece.cover}
                  alt={piece.title}
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover transition-all duration-1000 ease-out md:group-hover:scale-125 md:group-hover:rotate-2"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Mobile: Always visible overlay | Desktop: Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />

                {/* Glow effect - Desktop only */}
                <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent" />
                </div>

                {/* Content overlay - Mobile: always visible | Desktop: slides up on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-2xl [text-shadow:_0_2px_8px_rgb(0_0_0_/_90%)]">
                      {piece.title}
                    </h3>

                    {/* Style badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {piece.styles.slice(0, 3).map((style, idx) => (
                        <span
                          key={style}
                          className="rounded-full bg-accent/90 backdrop-blur-sm px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-bold text-accent-fg uppercase tracking-wider shadow-lg transform transition-all duration-500 md:hover:scale-110"
                          style={{
                            transitionDelay: `${idx * 100}ms`,
                            animationDelay: `${idx * 100}ms`
                          }}
                        >
                          {style}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-lg">
                      {t('portfolio.by')} <span className="text-accent font-bold">{piece.artist}</span>
                    </p>
                  </div>
                </div>

                {/* Accent border - Desktop only on hover */}
                <div className="absolute inset-0 border-4 border-accent/0 md:group-hover:border-accent/60 transition-all duration-700 rounded-2xl pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
