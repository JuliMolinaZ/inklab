import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ImageSmart } from '@/components/media/ImageSmart';
import { getPortfolioPiece, getAllPortfolioPieces } from '@/lib/cms';
import { generateSEO, getArticleSchema, getBreadcrumbSchema } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  const pieces = await getAllPortfolioPieces();
  return pieces.map((piece) => ({
    slug: piece.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = await getPortfolioPiece(slug);

  if (!piece) {
    return {};
  }

  return generateSEO({
    title: piece.title,
    description: piece.description,
    image: piece.cover,
    url: `/portfolio/${piece.slug}`,
    type: 'article',
  });
}

export default async function PortfolioPiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = await getPortfolioPiece(slug);

  if (!piece) {
    notFound();
  }

  const articleSchema = getArticleSchema({
    title: piece.title,
    description: piece.description,
    image: piece.cover,
    datePublished: piece.date,
    author: piece.artist,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
    { name: piece.title, url: `/portfolio/${piece.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />

      <Section spacing="lg">
        <Container size="lg">
          {/* Hero Image */}
          <div className="aspect-wide relative overflow-hidden rounded-2xl">
            <ImageSmart src={piece.cover} alt={piece.title} fill sizeType="hero" priority />
          </div>

          {/* Content */}
          <div className="mx-auto mt-12 max-w-3xl">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{piece.title}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-fg-muted">
                <span>Por {piece.artist}</span>
                <span>•</span>
                <time dateTime={piece.date}>{formatDate(piece.date)}</time>
                <span>•</span>
                <span>{piece.durationHours} horas</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {piece.styles.map((style) => (
                  <Badge key={style}>{style}</Badge>
                ))}
                <Badge variant="outline">{piece.bodyArea}</Badge>
              </div>
            </div>

            {/* Description */}
            <div className="prose mt-8">
              <p className="text-lg">{piece.description}</p>
              {piece.content && <div dangerouslySetInnerHTML={{ __html: piece.content }} />}
            </div>

            {/* Gallery */}
            {piece.gallery.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold">Galería</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {piece.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-xl">
                      <ImageSmart
                        src={image}
                        alt={`${piece.title} - ${index + 1}`}
                        fill
                        sizeType="gallery"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 rounded-2xl border border-border bg-bg-muted p-8 text-center">
              <h3 className="text-2xl font-bold">¿Te gustó este diseño?</h3>
              <p className="mt-2 text-fg-muted">
                Agenda una consulta y crea tu propio tatuaje personalizado
              </p>
              <div className="mt-6">
                <Link href="/booking">
                  <Button size="lg">Reservar cita</Button>
                </Link>
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-8 text-center">
              <Link href="/portfolio" className="text-accent hover:underline">
                ← Volver al portfolio
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
