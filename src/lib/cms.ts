import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import 'server-only';

/**
 * CMS abstraction layer
 *
 * Currently uses MDX files from /content
 * Can be swapped for Sanity, Hygraph, or any headless CMS
 */

const contentDir = join(process.cwd(), 'content');

/**
 * Portfolio piece metadata
 */
export interface PortfolioPiece {
  slug: string;
  title: string;
  artist: string;
  styles: string[];
  bodyArea: string;
  durationHours: number;
  date: string;
  cover: string;
  gallery: string[];
  description: string;
  content?: string;
}

/**
 * Artist metadata
 */
export interface Artist {
  slug: string;
  name: string;
  bio: string;
  avatar: string;
  specialties: string[];
  instagram: string;
  instagramPosts?: string[];
  yearsExperience: number;
  featured: boolean;
  order: number;
  gallery: string[];
  heroQuote?: string;
  content?: string;
}

/**
 * Get all portfolio pieces
 */
export async function getAllPortfolioPieces(): Promise<PortfolioPiece[]> {
  try {
    const portfolioDir = join(contentDir, 'portfolio');
    const files = await readdir(portfolioDir);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const pieces = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace('.mdx', '');
        const piece = await getPortfolioPiece(slug);
        return piece;
      })
    );

    // Sort by date (newest first)
    return pieces
      .filter((p): p is PortfolioPiece => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading portfolio pieces:', error);
    return [];
  }
}

/**
 * Get single portfolio piece by slug
 */
export async function getPortfolioPiece(slug: string): Promise<PortfolioPiece | null> {
  try {
    const filePath = join(contentDir, 'portfolio', `${slug}.mdx`);
    const fileContent = await readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title,
      artist: data.artist,
      styles: data.styles || [],
      bodyArea: data.bodyArea,
      durationHours: data.durationHours,
      date: data.date,
      cover: data.cover,
      gallery: data.gallery || [],
      description: data.description,
      content,
    };
  } catch (error) {
    console.error(`Error loading portfolio piece ${slug}:`, error);
    return null;
  }
}

/**
 * Get portfolio pieces by style
 */
export async function getPortfolioPiecesByStyle(style: string): Promise<PortfolioPiece[]> {
  const allPieces = await getAllPortfolioPieces();
  return allPieces.filter((piece) =>
    piece.styles.some((s) => s.toLowerCase() === style.toLowerCase())
  );
}

/**
 * Get portfolio pieces by artist
 */
export async function getPortfolioPiecesByArtist(artistSlug: string): Promise<PortfolioPiece[]> {
  const allPieces = await getAllPortfolioPieces();
  return allPieces.filter((piece) => piece.artist.toLowerCase() === artistSlug.toLowerCase());
}

/**
 * Get all artists
 */
export async function getAllArtists(): Promise<Artist[]> {
  try {
    const artistsDir = join(contentDir, 'artists');
    const files = await readdir(artistsDir);
    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const artists = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace('.mdx', '');
        const artist = await getArtist(slug);
        return artist;
      })
    );

    // Sort by order field (ascending)
    return artists
      .filter((a): a is Artist => a !== null)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading artists:', error);
    return [];
  }
}

/**
 * Get single artist by slug
 */
export async function getArtist(slug: string): Promise<Artist | null> {
  try {
    const filePath = join(contentDir, 'artists', `${slug}.mdx`);
    const fileContent = await readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      name: data.name,
      bio: data.bio,
      avatar: data.avatar,
      specialties: data.specialties || [],
      instagram: data.instagram,
      instagramPosts: data.instagramPosts || [],
      yearsExperience: data.yearsExperience,
      featured: data.featured || false,
      order: data.order || 999,
      gallery: data.gallery || [],
      heroQuote: data.heroQuote,
      content,
    };
  } catch (error) {
    console.error(`Error loading artist ${slug}:`, error);
    return null;
  }
}

/**
 * Get featured artists
 */
export async function getFeaturedArtists(): Promise<Artist[]> {
  const allArtists = await getAllArtists();
  return allArtists.filter((artist) => artist.featured);
}

/**
 * Get all unique styles from portfolio
 */
export async function getAllStyles(): Promise<string[]> {
  const pieces = await getAllPortfolioPieces();
  const styles = new Set<string>();

  pieces.forEach((piece) => {
    piece.styles.forEach((style) => styles.add(style));
  });

  return Array.from(styles).sort();
}
