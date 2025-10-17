# Images Folder

Place your real images here following this structure:

```
public/images/
├── portfolio/
│   ├── koi-sleeve-cover.jpg
│   ├── koi-sleeve-1.jpg
│   ├── koi-sleeve-2.jpg
│   ├── (more portfolio images...)
├── artists/
│   ├── akira-avatar.jpg
│   ├── akira-work-1.jpg
│   ├── luna-avatar.jpg
│   ├── (more artist images...)
├── og-image.jpg           # 1200x630 for social sharing
└── logo.png               # Your studio logo
```

## Recommended Image Sizes

- **Portfolio covers**: 800x600 (or larger)
- **Portfolio gallery**: 1200x1200
- **Artist avatars**: 300x300
- **Artist work examples**: 800x600
- **OG image**: 1200x630
- **Logo**: 512x512 (transparent PNG)

## Optimization Tips

1. Export images as JPEG (quality 80-85) or WEBP
2. Next.js will automatically convert to AVIF/WEBP
3. Use descriptive filenames (no spaces)
4. Keep file sizes under 500KB for portfolio images

## Placeholder Images

For development, you can use:
- https://placeholder.com
- https://unsplash.com (free stock photos)
- https://picsum.photos (lorem ipsum for images)

Example: `https://picsum.photos/800/600` for 800x600 placeholder
