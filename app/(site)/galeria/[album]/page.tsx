import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import AlbumGallery from '@/components/gallery/AlbumGallery'
import { getPayloadClient } from '@/lib/payload'

type Props = {
  params: Promise<{ album: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'albums',
    where: { visible: { equals: true } },
    limit: 100,
  })
  return docs.map((a) => ({ album: a.slug as string }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { album: slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'albums',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const album = docs[0]
  if (!album) return {}
  return {
    title: album.nombre as string,
    description: album.descripcion as string | undefined,
  }
}

export default async function AlbumPage({ params }: Props) {
  const { album: slug } = await params
  const payload = await getPayloadClient()

  const { docs: albumDocs } = await payload.find({
    collection: 'albums',
    where: { slug: { equals: slug }, visible: { equals: true } },
    limit: 1,
    depth: 1,
  })
  const album = albumDocs[0]
  if (!album) notFound()

  // Obtener obras de este álbum
  const { docs: artworks } = await payload.find({
    collection: 'artworks',
    where: { album: { equals: album.id } },
    sort: '-createdAt',
    depth: 2,
    limit: 100,
  })

  // Mapear obras al formato que espera AlbumGallery
  const obras = artworks.map((obra) => {
    const imagenes = Array.isArray(obra.imagenes)
      ? obra.imagenes.map((img: Record<string, unknown>) => {
          const mediaObj = typeof img.imagen === 'object' && img.imagen ? img.imagen as Record<string, unknown> : null
          return {
            src: (mediaObj?.cloudinaryUrl as string | undefined) ?? (mediaObj?.url as string | undefined) ?? '',
            alt: (mediaObj?.alt as string | undefined) ?? (obra.titulo as string) ?? '',
          }
        })
      : []
    return {
      id: String(obra.id),
      title: obra.titulo as string,
      slug: obra.slug as string,
      album: album.nombre as string,
      albumSlug: album.slug as string,
      year: obra.año as number ?? 0,
      tecnica: obra.tecnica as string ?? '',
      dimensiones: obra.dimensiones as string ?? '',
      descripcion: '',
      imagenes,
      destacada: Boolean(obra.destacada),
      tieneReproduccion: Boolean(obra.tieneReproduccion),
    }
  })

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Encabezado */}
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-6 tracking-wide">
            <Link href="/galeria" className="hover:text-[#1A1A1A] transition-colors duration-200">
              Galería
            </Link>
            <span className="text-[#E8E4DC]">—</span>
            <span className="text-[#1A1A1A]">{album.nombre as string}</span>
          </nav>

          <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-3">
            {album.año as number | undefined}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-5">
            {album.nombre as string}
          </h1>
          {album.descripcion && (
            <p className="text-[#6B6B6B] max-w-xl leading-relaxed">
              {album.descripcion as string}
            </p>
          )}
          <p className="mt-4 text-xs text-[#6B6B6B] tracking-wide">
            {obras.length} {obras.length === 1 ? 'obra' : 'obras'}
          </p>
        </div>
      </div>

      {/* Grid de obras */}
      <div className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {obras.length > 0 ? (
            <AlbumGallery obras={obras} />
          ) : (
            <p className="text-center text-[#6B6B6B] py-24">
              Este álbum no tiene obras todavía.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
