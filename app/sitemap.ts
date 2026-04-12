import type { MetadataRoute } from 'next'
import { albums, getAllArtworks } from '@/lib/data/galeria'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakrfansa.com'

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/galeria`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/tienda`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/sobre-mi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const albumPages: MetadataRoute.Sitemap = albums.map((album) => ({
    url: `${siteUrl}/galeria/${album.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const artworkPages: MetadataRoute.Sitemap = getAllArtworks().map((obra) => ({
    url: `${siteUrl}/obra/${obra.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...albumPages, ...artworkPages]
}
