import Image, { type ImageProps } from 'next/image';
import { getImageSizes, getBlurDataURL } from '@/lib/images';
import { cn } from '@/lib/utils';

export interface ImageSmartProps extends Omit<ImageProps, 'sizes'> {
  sizeType?: 'hero' | 'card' | 'gallery' | 'full' | 'thumbnail';
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide';
}

export function ImageSmart({
  sizeType = 'card',
  aspectRatio,
  className,
  alt,
  placeholder = 'blur',
  blurDataURL,
  ...props
}: ImageSmartProps) {
  const sizes = getImageSizes(sizeType);
  const defaultBlur = getBlurDataURL();

  const aspectClasses = aspectRatio
    ? {
        square: 'aspect-square',
        portrait: 'aspect-portrait',
        landscape: 'aspect-landscape',
        wide: 'aspect-wide',
      }[aspectRatio]
    : '';

  return (
    <Image
      sizes={sizes}
      placeholder={placeholder}
      blurDataURL={blurDataURL || defaultBlur}
      alt={alt}
      className={cn('object-cover', aspectClasses, className)}
      {...props}
    />
  );
}
