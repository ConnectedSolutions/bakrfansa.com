import type { Metadata } from 'next'
import AlbumCard from '@/components/gallery/AlbumCard'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Galería',
  description: 'Colecciones de obras de Bakr Fansa — Poemas en color, Desierto, Mitología y más.',
}

export const revalidate = 60

export default async function GaleriaPage() {
  const payload = await getPayloadClient()

  const { docs: albums } = await payload.find({
    collection: 'albums',
    where: { visible: { equals: true } },
    sort: '-año',
    depth: 1,
  })

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Encabezado */}
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-3">
            Colecciones
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A]">
            Galería
          </h1>
          <p className="mt-4 text-[#6B6B6B] max-w-xl leading-relaxed">
            Obra organizada por series y períodos. Cada álbum es un capítulo
            en la conversación entre Bakr Fansa y su tiempo.
          </p>
        </div>
      </div>

      {/* Álbumes */}
      <div className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
          {albums.map((album) => {
            const cover = typeof album.portada === 'object' && album.portada
              ? (album.portada.cloudinaryUrl as string | undefined) ?? (album.portada.url as string | undefined) ?? ''
              : ''
            return (
              <AlbumCard
                key={album.id}
                nombre={album.nombre as string}
                slug={album.slug as string}
                descripcion={album.descripcion as string | undefined}
                año={album.año as number | undefined}
                coverSrc={cover}
                totalObras={0}
              />
            )
          })}
        </div>
        {albums.length === 0 && (
          <p className="text-center text-[#6B6B6B] py-24">
            No hay álbumes publicados todavía.
          </p>
        )}
      </div>
    </div>
  )
}
