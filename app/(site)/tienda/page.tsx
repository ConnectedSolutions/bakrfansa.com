/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import ProductCard from '@/components/shop/ProductCard'
import { getPayloadClient } from '@/lib/payload'
import type { Product } from '@/lib/data/tienda'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Tienda',
  description:
    'Reproducciones firmadas de obras originales de Bakr Fansa. Impresión giclée en papel de algodón, certificadas por el artista.',
}

export default async function TiendaPage() {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'products',
    where: { activo: { equals: true } },
    depth: 2,
    limit: 100,
  })

  const products: Product[] = (result.docs as any[]).map((prod) => {
    const artwork = typeof prod.artwork === 'object' && prod.artwork ? prod.artwork as any : null
    const artworkImagen = artwork?.imagenes?.[0]?.imagen
    const artworkImgUrl = typeof artworkImagen === 'object' && artworkImagen ? artworkImagen.url : ''

    const portada = typeof prod.imagenPortada === 'object' && prod.imagenPortada ? prod.imagenPortada as any : null

    return {
      id: String(prod.id),
      nombre: prod.nombre,
      artworkSlug: artwork?.slug ?? '',
      artworkTitle: artwork?.titulo ?? prod.nombre,
      precio: prod.precio,
      moneda: prod.moneda as 'MXN' | 'USD',
      stock: prod.stockDisponible ?? 0,
      materiales: prod.materialesImpresion ?? '',
      dimensiones: ((prod.dimensionesDisponibles ?? []) as any[]).map((d) => ({
        medida: d.medida,
        precioExtra: d.precioExtra ?? undefined,
      })),
      imageSrc: portada?.url ?? artworkImgUrl,
      imageAlt: portada?.alt ?? `${artwork?.titulo ?? prod.nombre} — reproducción`,
    }
  })

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Encabezado */}
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-3">
            Tienda
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            Reproducciones
          </h1>
          <p className="text-[#6B6B6B] max-w-xl leading-relaxed">
            Impresiones giclée de alta calidad en papel de algodón 300g.
            Cada reproducción está firmada a mano por Bakr Fansa y
            acompañada de un certificado de autenticidad.
          </p>
        </div>
      </div>

      {/* Nota informativa */}
      <div className="px-6 md:px-12 py-8 bg-[#F8F7F4] border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-8 sm:gap-16">
          {[
            { label: 'Envíos', texto: 'A todo México. Tiempo estimado 5–10 días hábiles.' },
            { label: 'Empaque', texto: 'Tubo de cartón rígido o caja plana protegida.' },
            { label: 'Pagos', texto: 'Tarjeta de crédito y débito a través de Stripe.' },
          ].map(({ label, texto }) => (
            <div key={label}>
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-1">{label}</p>
              <p className="text-sm text-[#1A1A1A]">{texto}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de productos */}
      <div className="py-20 px-6 md:px-12">
        {products.length === 0 ? (
          <div className="max-w-7xl mx-auto text-center py-20">
            <p className="text-[#6B6B6B] text-sm">
              Las reproducciones estarán disponibles próximamente.
            </p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
