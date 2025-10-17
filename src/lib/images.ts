/**
 * Image utilities for Next.js Image optimization
 */

/**
 * Generate responsive image sizes attribute
 * Mobile-first approach
 */
export function getImageSizes(type: 'hero' | 'card' | 'gallery' | 'full' | 'thumbnail'): string {
  const sizeMap = {
    hero: '100vw',
    card: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
    gallery: '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw',
    full: '100vw',
    thumbnail: '(min-width: 768px) 200px, 150px',
  };

  return sizeMap[type];
}

/**
 * Generate blur placeholder data URL
 * Low quality image placeholder (LQIP)
 */
export function getBlurDataURL(width = 10, height = 10): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <filter id="b" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="1" />
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="1 1" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" fill="#0a0a0a" filter="url(#b)" />
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Get optimal image dimensions for different contexts
 */
export function getImageDimensions(type: 'hero' | 'card' | 'gallery' | 'thumbnail') {
  const dimensionsMap = {
    hero: { width: 1920, height: 1080 },
    card: { width: 800, height: 600 },
    gallery: { width: 1200, height: 1200 },
    thumbnail: { width: 300, height: 300 },
  };

  return dimensionsMap[type];
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  basePath: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536, 1920]
): string {
  return widths.map((width) => `${basePath}?w=${width} ${width}w`).join(', ');
}

/**
 * Validate image file type
 */
export function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
  return validTypes.includes(file.type);
}

/**
 * Get image aspect ratio from dimensions
 */
export function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Calculate dimensions to fit within bounds while maintaining aspect ratio
 */
export function calculateFitDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;

  let width = originalWidth;
  let height = originalHeight;

  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}

/**
 * Generate image URL with Vercel Image Optimization parameters
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif';
  } = {}
): string {
  const { width, quality = 75, format = 'auto' } = options;

  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  params.set('q', quality.toString());
  if (format !== 'auto') params.set('fm', format);

  return `${src}?${params.toString()}`;
}
