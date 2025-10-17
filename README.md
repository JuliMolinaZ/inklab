# InkLab Studio 🖤

Modern, mobile-first tattoo studio website built with Next.js 15, TypeScript, and Tailwind CSS. Optimized for performance with Lighthouse scores >95 on mobile.

## ✨ Features

- **Mobile-First Design**: 90% of traffic is mobile - every component is optimized for touch and small screens
- **Performance Optimized**:
  - Lighthouse Performance > 95 on mobile
  - LCP < 2.0s on 4G
  - Initial JS bundle < 150KB gzipped
  - AVIF/WEBP images with proper `sizes`
- **Modern Stack**: Next.js 15 App Router, TypeScript strict mode, Tailwind CSS
- **Animations**: Framer Motion + GSAP with `prefers-reduced-motion` support
- **SEO**: JSON-LD structured data, automatic sitemap, optimized metadata
- **Accessibility**: WCAG AA compliant, keyboard navigation, ARIA labels
- **Content Management**: MDX-based with option to swap for headless CMS
- **Testing**: Vitest (unit), Playwright (E2E), Storybook (UI docs)
- **CI/CD**: GitHub Actions + Vercel deployment

## 📁 Project Structure

```
inklab/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (site)/            # Main site group
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── portfolio/     # Portfolio pages
│   │   │   ├── artists/       # Artists page
│   │   │   └── booking/       # Contact/booking form
│   │   ├── api/               # API routes
│   │   │   └── contact/       # Form submission with Zod + rate-limit
│   │   ├── layout.tsx         # Root layout
│   │   ├── sitemap.ts         # Dynamic sitemap
│   │   └── robots.ts          # SEO robots.txt
│   ├── components/
│   │   ├── ui/                # Base components (Button, Card, Input...)
│   │   ├── layout/            # Header, Footer, Container
│   │   ├── media/             # ImageSmart (Next/Image wrapper)
│   │   ├── gallery/           # Masonry, Lightbox
│   │   └── fx/                # Reveal, Parallax animations
│   ├── lib/
│   │   ├── cms.ts             # Content abstraction (MDX → CMS ready)
│   │   ├── seo.ts             # SEO helpers + JSON-LD schemas
│   │   ├── analytics.ts       # Vercel Analytics + custom events
│   │   ├── images.ts          # Image optimization helpers
│   │   ├── a11y.ts            # Accessibility utilities
│   │   └── utils.ts           # Common utilities
│   └── styles/
│       ├── globals.css        # Global styles + Tailwind
│       └── tokens.css         # Design tokens (CSS variables)
├── content/
│   ├── portfolio/             # MDX portfolio pieces
│   └── artists/               # MDX artist profiles
├── public/
│   └── images/                # Static images (add your real images here)
├── e2e/                       # Playwright E2E tests
├── tests/                     # Vitest unit tests
└── .storybook/                # Storybook configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
pnpm dev            # Start dev server
pnpm build          # Build for production
pnpm start          # Start production server
pnpm lint           # Run ESLint
pnpm lint:fix       # Fix linting issues
pnpm typecheck      # TypeScript type checking
pnpm format         # Format code with Prettier
pnpm test           # Run unit tests (Vitest)
pnpm test:ui        # Vitest UI
pnpm e2e            # Run E2E tests (Playwright)
pnpm e2e:ui         # Playwright UI
pnpm storybook      # Run Storybook
```

## 🎨 Customization

### 1. Design Tokens (Colors, Spacing, Typography)

Edit `/src/styles/tokens.css`:

```css
:root {
  /* Change color palette */
  --color-bg: #0a0a0a;
  --color-fg: #f5f5f5;
  --color-accent: #dc2626;  /* Main accent color */

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', 'Inter', system-ui;

  /* Spacing, shadows, etc. */
}
```

**Alternative themes** are included:
- `[data-theme='cyberpunk']` - Neon cyberpunk aesthetic
- `[data-theme='minimal']` - Clean minimal gallery style

Apply theme by adding `data-theme` attribute to `<html>` in `src/app/layout.tsx`.

### 2. Typography

Update fonts in `src/app/layout.tsx`:

```tsx
import { YourFont } from 'next/font/google';

const yourFont = YourFont({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
```

### 3. Site Configuration

Edit `src/lib/seo.ts`:

```tsx
export const siteConfig = {
  name: 'Your Studio Name',
  title: 'Your Studio - Tagline',
  description: 'Your description',
  url: 'https://yourdomain.com',
  business: {
    name: 'Your Studio Name',
    streetAddress: 'Your Address',
    city: 'Your City',
    // ... more business info
  },
};
```

### 4. Images

Replace placeholder image URLs in:
- `/content/portfolio/*.mdx` - Portfolio piece images
- `/content/artists/*.mdx` - Artist avatars and galleries
- `/public/images/` - Add your actual images here

**Recommended image sizes**:
- Hero: 1920x1080
- Portfolio cards: 800x600
- Thumbnails: 300x300
- OG image: 1200x630

## 📝 Content Management

### Adding Portfolio Pieces

Create `/content/portfolio/your-piece.mdx`:

```mdx
---
title: "Your Tattoo Title"
slug: "your-piece-slug"
artist: "artist-slug"
styles: ["japanese", "blackwork"]
bodyArea: "brazo"
durationHours: 5
date: "2025-10-15"
cover: "/images/portfolio/your-cover.jpg"
gallery:
  - "/images/portfolio/your-1.jpg"
  - "/images/portfolio/your-2.jpg"
description: "Short description"
---

Full story and details about the tattoo...
```

### Adding Artists

Create `/content/artists/artist-name.mdx`:

```mdx
---
name: "Artist Name"
slug: "artist-slug"
bio: "Short bio"
avatar: "/images/artists/avatar.jpg"
specialties: ["Japanese", "Realism"]
instagram: "https://instagram.com/handle"
yearsExperience: 10
featured: true
gallery:
  - "/images/artists/work-1.jpg"
---

Longer artist bio and information...
```

### Switching to Headless CMS

The content layer is abstracted in `src/lib/cms.ts`. To switch to Sanity/Hygraph:

1. Install CMS SDK: `pnpm add @sanity/client` (or `graphql-request`)
2. Update functions in `src/lib/cms.ts` to fetch from CMS instead of MDX
3. Keep the same TypeScript interfaces - no changes needed in components!

## 🧪 Testing

### Unit Tests (Vitest)

```bash
pnpm test              # Run tests
pnpm test:ui           # Open UI
pnpm test:coverage     # Coverage report
```

Example test location: `/tests/`

### E2E Tests (Playwright)

```bash
pnpm e2e               # Run all E2E tests
pnpm e2e:ui            # Open Playwright UI
pnpm e2e:headed        # Run in headed mode
```

Tests location: `/e2e/home.spec.ts`

### Storybook

```bash
pnpm storybook         # Run Storybook on port 6006
pnpm build-storybook   # Build static Storybook
```

Stories location: `/src/components/**/*.stories.tsx`

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Vercel auto-detects Next.js and deploys
4. Add environment variables if needed:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX (optional)
```

### Manual Deployment

```bash
pnpm build
pnpm start
```

Or use Docker, AWS, Railway, etc.

## ⚡ Performance Optimizations

### Reducing JavaScript Bundle (Mobile)

1. **Disable heavy animations**:
   - Remove GSAP if not needed
   - Use only Framer Motion for simple animations

2. **Code splitting**:
   - Components already use `dynamic()` where appropriate
   - Consider lazy loading 3D components (not included by default)

3. **Image optimization**:
   - Use AVIF format for 30% smaller sizes
   - Check `sizes` attribute in `ImageSmart` component
   - Enable blur placeholders

### Monitoring

- Vercel Analytics: Built-in
- Custom analytics: Edit `src/lib/analytics.ts`
- Web Vitals: Automatically tracked and sent to Vercel

## 🔒 Security

- **CSP Headers**: Configured in `next.config.js`
- **Rate Limiting**: Contact form has IP-based rate limiting
- **Input Validation**: Zod schemas in `/api/contact`
- **HTTPS Only**: Enforced via HSTS headers
- **No sensitive data**: Keep API keys in environment variables

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation
- Screen reader tested
- `prefers-reduced-motion` support
- Focus visible states
- ARIA labels on interactive elements

## 📚 Key Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion + GSAP
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + Playwright + Storybook
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics + Speed Insights

## 🔧 Troubleshooting

### Build Errors

1. **Missing images**: Add placeholder images or update image paths in MDX files
2. **Type errors**: Run `pnpm typecheck` to identify issues
3. **Module not found**: Run `pnpm install` to ensure all dependencies are installed

### Development Issues

1. **Port already in use**: Kill process on port 3000 or change port in `package.json`
2. **Slow HMR**: Disable source maps in dev or reduce file watchers
3. **Animation lag on mobile**: Reduce animation complexity or disable on mobile

## 📄 License

MIT License - feel free to use for commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🆘 Support

For issues or questions:
- Open an issue on GitHub
- Check `/docs` folder for additional documentation
- Review component stories in Storybook

---

**Built with ❤️ for modern tattoo studios. Optimized for mobile, designed for impact.**
