import type { Metadata } from 'next';

/**
 * Site configuration for SEO
 */
export const siteConfig = {
  name: 'Inklab Mastery',
  title: 'Inklab Mastery - Tatuajes de Alta Calidad',
  description:
    'Estudio de tatuajes especializado en estilo japonés, blackwork y realismo. Artistas profesionales con más de 10 años de experiencia.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://inklab-mastery.vercel.app',
  ogImage: '/og-image.jpg',
  locale: 'es-ES',
  type: 'website',
  twitter: {
    card: 'summary_large_image',
    site: '@inklabmastery',
    creator: '@inklabmastery',
  },
  business: {
    name: 'Inklab Mastery',
    streetAddress: 'Cra. 17 #11-10, Edificio Quality',
    city: 'Pereira',
    region: 'Risaralda',
    postalCode: '660003',
    country: 'CO',
    phone: '+57 324 358 2350',
    email: 'info@inklabmastery.com',
    hours: 'Mo-Fr 10:00-20:00, Sa 10:00-18:00',
    priceRange: '$$',
  },
  social: {
    instagram: 'https://instagram.com/inklabmastery',
    tiktok: 'https://tiktok.com/@inklabmastery',
    facebook: 'https://facebook.com/inklabmastery',
  },
};

/**
 * Generate metadata for pages
 */
export function generateSEO({
  title,
  description,
  image,
  url,
  noindex = false,
  type = 'website',
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}): Metadata {
  const seo = {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.title,
    description: description || siteConfig.description,
    image: image || siteConfig.ogImage,
    url: url || siteConfig.url,
  };

  return {
    metadataBase: new URL(siteConfig.url),
    title: seo.title,
    description: seo.description,
    robots: noindex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: seo.url,
      siteName: siteConfig.name,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: seo.image,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: siteConfig.twitter.card as 'summary_large_image',
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.creator,
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
    alternates: {
      canonical: seo.url,
    },
  };
}

/**
 * Generate JSON-LD structured data for Local Business
 */
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    name: siteConfig.business.name,
    image: siteConfig.ogImage,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.business.phone,
    email: siteConfig.business.email,
    priceRange: siteConfig.business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.business.streetAddress,
      addressLocality: siteConfig.business.city,
      postalCode: siteConfig.business.postalCode,
      addressCountry: siteConfig.business.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.8051338,
      longitude: -75.6891768,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok, siteConfig.social.facebook],
  };
}

/**
 * Generate JSON-LD for Article/Portfolio piece
 */
export function getArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
