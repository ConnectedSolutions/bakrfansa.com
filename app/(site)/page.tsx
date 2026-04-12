import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import ArtworkCard from '@/components/gallery/ArtworkCard'
import AlbumCard from '@/components/gallery/AlbumCard'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Bakr Fansa — Artista Visual',
  description:
    'Portal oficial de Bakr Fansa. Galería de obras, reproducciones y contacto con el artista.',
}

export const revalidate = 60

function getMediaUrl(media: unknown): string {
  if (!media || typeof media !== 'object') return ''
  const m = media as Record<string, unknown>
  return (m.cloudinaryUrl as string | undefined) ?? (m.url as string | undefined) ?? ''
}

export default async function LandingPage() {
  const payload = await getPayloadClient()

  // Datos del CMS en paralelo
  const [settings, featuredResult, albumsResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }).catch(() => null),
    payload.find({
      collection: 'artworks',
      where: { destacada: { equals: true } },
      limit: 4,
      depth: 2,
      sort: '-createdAt',
    }),
    payload.find({
      collection: 'albums',
      where: { visible: { equals: true } },
      limit: 3,
      sort: '-año',
      depth: 1,
    }),
  ])

  const heroImageUrl = settings ? getMediaUrl((settings as Record<string, unknown>).heroImage) : ''
  const artistaFotoUrl = settings ? getMediaUrl((settings as Record<string, unknown>).artistaFoto) : ''

  const featuredWorks = featuredResult.docs
  const albums = albumsResult.docs

  // Primera imagen de cada obra
  function getFirstImage(artwork: Record<string, unknown>): string {
    const imagenes = artwork.imagenes as Array<Record<string, unknown>> | undefined
    if (!imagenes?.length) return ''
    const img = imagenes[0].imagen
    return getMediaUrl(img)
  }

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex items-end bg-[#2a2a2a]">
        {heroImageUrl && (
          <Image
            src={heroImageUrl}
            alt="Obra de Bakr Fansa"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/50 via-transparent to-[#1A1A1A]/80" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
          <p className="text-[#C8A882] text-xs tracking-[0.25em] uppercase mb-4">
            Acrílico sobre tela
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-6">
            Bakr Fansa
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-md mb-10 leading-relaxed">
            Pinturas que convierten la música, la mitología y el desierto en color.
          </p>
          <Link
            href="/galeria"
            className="inline-block border border-white/60 text-white text-sm tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
          >
            Ver galería
          </Link>
        </div>
      </section>

      {/* ─── CITA ──────────────────────────────────────────────────────── */}
      <section className="bg-[#F8F7F4] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote>
            <p className="font-serif italic text-[#1A1A1A] text-2xl md:text-3xl leading-relaxed">
              &ldquo;Mi intención no ha sido tanto pintar cuadros que agraden la vista,
              sino sugerir grandes pensamientos que apelen a la imaginación y al corazón,
              y enciendan lo mejor y más noble de la humanidad.&rdquo;
            </p>
            <footer className="mt-6 text-sm text-[#6B6B6B] tracking-widest uppercase">
              George Frederic Watts
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ─── OBRAS DESTACADAS ──────────────────────────────────────────── */}
      {featuredWorks.length > 0 && (
        <section className="py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-2">Selección</p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">Obras recientes</h2>
              </div>
              <Link
                href="/galeria"
                className="hidden md:inline-block text-sm text-[#6B6B6B] hover:text-[#1A1A1A] tracking-wide border-b border-[#E8E4DC] hover:border-[#1A1A1A] pb-0.5 transition-all duration-300"
              >
                Ver todas →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featuredWorks.map((work) => {
                const albumObj = typeof work.album === 'object' && work.album ? work.album as Record<string, unknown> : null
                return (
                  <ArtworkCard
                    key={work.id}
                    title={work.titulo as string}
                    slug={work.slug as string}
                    album={albumObj ? (albumObj.nombre as string) : ''}
                    year={work.año as number ?? 0}
                    imageSrc={getFirstImage(work as Record<string, unknown>)}
                    imageAlt={work.titulo as string}
                  />
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── ÁLBUMES ───────────────────────────────────────────────────── */}
      {albums.length > 0 && (
        <section className="py-20 md:py-28 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-2">Colecciones</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">Álbumes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  nombre={album.nombre as string}
                  slug={album.slug as string}
                  descripcion={album.descripcion as string | undefined}
                  año={album.año as number | undefined}
                  coverSrc={getMediaUrl((album as Record<string, unknown>).portada)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── SOBRE EL ARTISTA ──────────────────────────────────────────── */}
      <section className="bg-[#F8F7F4] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E4DC]">
            {artistaFotoUrl && (
              <Image
                src={artistaFotoUrl}
                alt="Bakr Fansa en su estudio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-4">El artista</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-6">Bakr Fansa</h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                Nacido en Siria, Bakr Fansa encontró en la pintura el lenguaje
                que su imaginación siempre buscó. Inspirado por George Frederic
                Watts — quien creyó que el arte debe despertar el pensamiento,
                no solo complacer la vista — convirtió esa filosofía en el motor
                de toda su obra.
              </p>
              <p>
                Su serie <em className="font-serif text-[#1A1A1A]">Poemas en color</em> traduce
                grandes composiciones musicales al lienzo: Wagner, Mozart, Beethoven
                cobran forma en capas de acrílico sobre óleo. El resultado son
                obras que se sienten antes de comprenderse.
              </p>
            </div>
            <Link
              href="/sobre-mi"
              className="inline-block mt-8 text-sm text-[#1A1A1A] tracking-widest uppercase border-b border-[#1A1A1A] pb-0.5 hover:text-[#C8A882] hover:border-[#C8A882] transition-all duration-300"
            >
              Conocer más →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA REPRODUCCIONES ────────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 md:px-12 border-t border-[#E8E4DC]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-4">Tienda</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-5">
            Reproducciones disponibles
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed mb-10">
            Impresiones de alta calidad de obras seleccionadas. Cada reproducción
            llega firmada y certificada por el artista.
          </p>
          <Link
            href="/tienda"
            className="inline-block bg-[#1A1A1A] text-white text-sm tracking-widest uppercase px-10 py-4 hover:bg-[#C8A882] transition-all duration-300"
          >
            Ver reproducciones
          </Link>
        </div>
      </section>
    </>
  )
}
