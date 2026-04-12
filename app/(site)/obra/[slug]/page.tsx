/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ArtworkViewer from '@/components/gallery/ArtworkViewer'
import AddToCartButton from '@/components/shop/AddToCartButton'
import { getPayloadClient } from '@/lib/payload'
import type { Product } from '@/lib/data/tienda'

export const revalidate = 60

type Props = {
  params: Promise<{ slug: string }>
}

// Extrae texto plano del JSON de Lexical (richText de Payload)
function lexicalToText(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  if (Array.isArray(node.children)) {
    return node.children.map(lexicalToText).join('')
  }
  return ''
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'artworks',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  const obra = result.docs[0]
  if (!obra) return {}

  const primeraImagen = obra.imagenes?.[0]?.imagen
  const imgUrl = typeof primeraImagen === 'object' && primeraImagen ? (primeraImagen as any).url : undefined
  const descripcionTexto = lexicalToText((obra.descripcion as any)?.root)

  return {
    title: `${obra.titulo} — Bakr Fansa`,
    description: `${obra.titulo}${obra.tecnica ? ` — ${obra.tecnica}` : ''}${obra.año ? `, ${obra.año}` : ''}. ${descripcionTexto.slice(0, 120)}`,
    openGraph: imgUrl ? { images: [{ url: imgUrl }] } : undefined,
  }
}

export default async function ObraPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'artworks',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  const obra = result.docs[0]
  if (!obra) notFound()

  // Mapear imágenes al formato que espera ArtworkViewer
  const imagenes = ((obra.imagenes ?? []) as any[])
    .map((item) => ({
      src: typeof item.imagen === 'object' && item.imagen ? (item.imagen as any).url ?? '' : '',
      alt: typeof item.imagen === 'object' && item.imagen ? (item.imagen as any).alt ?? obra.titulo : obra.titulo,
    }))
    .filter((img) => img.src)

  // Datos del álbum
  const album = typeof obra.album === 'object' && obra.album ? obra.album as any : null

  // Obras relacionadas del mismo álbum
  const relacionadasResult = album
    ? await payload.find({
        collection: 'artworks',
        where: {
          and: [
            { album: { equals: album.id } },
            { slug: { not_equals: slug } },
          ],
        },
        limit: 3,
        depth: 1,
      })
    : { docs: [] }

  const relacionadas = (relacionadasResult.docs as any[]).map((rel) => ({
    id: String(rel.id),
    slug: rel.slug,
    title: rel.titulo,
    year: rel.año,
    imagenes: ((rel.imagenes ?? []) as any[])
      .map((item: any) => ({
        src: typeof item.imagen === 'object' && item.imagen ? (item.imagen as any).url ?? '' : '',
        alt: typeof item.imagen === 'object' && item.imagen ? (item.imagen as any).alt ?? rel.titulo : rel.titulo,
      }))
      .filter((img: any) => img.src),
  }))

  // Producto vinculado para AddToCartButton
  const prod = obra.tieneReproduccion && typeof obra.producto === 'object' && obra.producto
    ? (obra.producto as any)
    : null

  const productForCart: Product | undefined = prod
    ? {
        id: String(prod.id),
        nombre: prod.nombre,
        artworkSlug: slug,
        artworkTitle: obra.titulo,
        precio: prod.precio,
        moneda: prod.moneda as 'MXN' | 'USD',
        stock: prod.stockDisponible ?? 0,
        materiales: prod.materialesImpresion ?? '',
        dimensiones: ((prod.dimensionesDisponibles ?? []) as any[]).map((d) => ({
          medida: d.medida,
          precioExtra: d.precioExtra ?? undefined,
        })),
        imageSrc:
          typeof prod.imagenPortada === 'object' && prod.imagenPortada?.url
            ? prod.imagenPortada.url
            : imagenes[0]?.src ?? '',
        imageAlt: `${obra.titulo} — reproducción`,
      }
    : undefined

  const descripcionTexto = lexicalToText((obra.descripcion as any)?.root)

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Breadcrumb */}
      <div className="pt-28 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] tracking-wide">
            <Link href="/galeria" className="hover:text-[#1A1A1A] transition-colors duration-200">
              Galería
            </Link>
            {album && (
              <>
                <span className="text-[#E8E4DC]">—</span>
                <Link
                  href={`/galeria/${album.slug}`}
                  className="hover:text-[#1A1A1A] transition-colors duration-200"
                >
                  {album.nombre}
                </Link>
              </>
            )}
            <span className="text-[#E8E4DC]">—</span>
            <span className="text-[#1A1A1A]">{obra.titulo}</span>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_360px] gap-10 md:gap-16 items-start">

          {/* Columna izquierda — imagen */}
          <div>
            {imagenes.length > 0 ? (
              <ArtworkViewer obra={{ imagenes }} />
            ) : (
              <div className="w-full aspect-[4/3] bg-[#F8F7F4]" />
            )}
          </div>

          {/* Columna derecha — ficha */}
          <div className="md:pt-4">
            {album && (
              <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-3">
                {album.nombre}
              </p>
            )}
            <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] leading-tight mb-6">
              {obra.titulo}
            </h1>

            {/* Ficha técnica */}
            <dl className="border-t border-[#E8E4DC] divide-y divide-[#E8E4DC] mb-8">
              {[
                { label: 'Técnica', value: obra.tecnica },
                { label: 'Dimensiones', value: obra.dimensiones },
                { label: 'Año', value: obra.año ? String(obra.año) : null },
              ]
                .filter((row) => row.value)
                .map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-3.5 text-sm">
                    <dt className="text-[#6B6B6B]">{label}</dt>
                    <dd className="text-[#1A1A1A] text-right">{value}</dd>
                  </div>
                ))}
            </dl>

            {/* Descripción */}
            {descripcionTexto && (
              <p className="text-[#6B6B6B] leading-relaxed text-sm mb-10">
                {descripcionTexto}
              </p>
            )}

            {/* Reproducción disponible */}
            {obra.tieneReproduccion && productForCart && (
              <div className="border border-[#E8E4DC] p-6">
                <p className="text-xs tracking-[0.2em] uppercase text-[#C8A882] mb-2">
                  Reproducción disponible
                </p>
                {productForCart.materiales && (
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">
                    {productForCart.materiales}
                  </p>
                )}
                <AddToCartButton product={productForCart} />
              </div>
            )}

            {/* Volver al álbum */}
            {album && (
              <div className="mt-8">
                <Link
                  href={`/galeria/${album.slug}`}
                  className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] tracking-wide border-b border-[#E8E4DC] hover:border-[#1A1A1A] pb-0.5 transition-all duration-300"
                >
                  ← Volver a {album.nombre}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Obras relacionadas */}
      {relacionadas.length > 0 && (
        <div className="bg-[#F8F7F4] py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            {album && (
              <p className="text-xs tracking-[0.25em] uppercase text-[#6B6B6B] mb-8">
                Más obras de {album.nombre}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {relacionadas.map((rel) => (
                <Link key={rel.id} href={`/obra/${rel.slug}`} className="group block">
                  <div className="relative overflow-hidden bg-[#E8E4DC] aspect-[4/3]">
                    {rel.imagenes[0] && (
                      <Image
                        src={rel.imagenes[0].src}
                        alt={rel.imagenes[0].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                    <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/20 transition-all duration-300" />
                  </div>
                  <div className="pt-3">
                    <p className="font-serif text-[#1A1A1A] group-hover:text-[#C8A882] transition-colors duration-300">
                      {rel.title}
                    </p>
                    {rel.year && (
                      <p className="text-xs text-[#6B6B6B] mt-0.5">{rel.year}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
