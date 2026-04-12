/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sobre mí',
  description:
    'Bakr Fansa — artista visual sirio. Su historia, su proceso y la filosofía detrás de su obra.',
}

// Convierte el JSON de Lexical (richText de Payload) en párrafos React
function LexicalParagraphs({ data, className }: { data: any; className?: string }) {
  if (!data?.root?.children) return null
  const parrafos = (data.root.children as any[])
    .map((node, i) => {
      if (node.type !== 'paragraph') return null
      const texto = (node.children as any[] ?? [])
        .map((c: any) => c.text ?? '')
        .join('')
      if (!texto.trim()) return null
      return <p key={i}>{texto}</p>
    })
    .filter(Boolean)
  if (parrafos.length === 0) return null
  return <div className={className}>{parrafos}</div>
}

export default async function SobreMiPage() {
  const payload = await getPayloadClient()

  const [settings, albumResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 1 }),
    payload.find({
      collection: 'albums',
      where: { slug: { equals: 'poemas-en-color' } },
      limit: 1,
    }),
  ])

  const artistaFoto =
    typeof settings?.artistaFoto === 'object' && settings.artistaFoto
      ? (settings.artistaFoto as any)
      : null

  const s = settings as any

  const album = albumResult.docs[0]
  const obrasResult = album
    ? await payload.find({
        collection: 'artworks',
        where: { album: { equals: album.id } },
        limit: 4,
        depth: 1,
      })
    : { docs: [] }

  const obrasGrid = (obrasResult.docs as any[])
    .map((obra) => {
      const primeraImg = obra.imagenes?.[0]?.imagen
      const url = typeof primeraImg === 'object' && primeraImg ? primeraImg.url : null
      return url ? { src: url, alt: obra.titulo, slug: obra.slug } : null
    })
    .filter(Boolean) as { src: string; alt: string; slug: string }[]

  // Textos desde CMS con fallback al texto original
  const cita =
    s?.sobreMiCita ||
    'Mi intención no ha sido tanto pintar cuadros que agraden la vista, sino sugerir grandes pensamientos que apelen a la imaginación y al corazón, y enciendan lo mejor y más noble de la humanidad.'

  const citaAutor =
    s?.sobreMiCitaAutor || 'George Frederic Watts, el artista que inspiró a Bakr'

  const bioFallback = (
    <>
      <p>
        Nacido en Siria, Bakr Fansa encontró en la pintura el lenguaje que su imaginación
        siempre buscó. Desde joven quedó marcado por la obra de George Frederic Watts —
        un pintor victoriano que creía que el arte debía despertar el pensamiento, no solo
        complacer la vista. Esa filosofía se convirtió en el motor de todo lo que Bakr
        ha creado desde entonces.
      </p>
      <p>
        Su técnica combina el acrílico sobre óleo en tela — una mezcla que le permite
        construir capas de luz y textura con una profundidad difícil de lograr con un
        solo medio. El resultado son pinturas que parecen emanar su propia luz desde adentro.
      </p>
    </>
  )

  const poemasTextoFallback = (
    <>
      <p>
        La serie más personal de Bakr nació de una pregunta: ¿qué pasaría si la música
        pudiera verse? Inspirado por las grandes composiciones de Wagner, Beethoven, Mozart
        y otros maestros, Bakr comenzó a traducir lo que escuchaba al lenguaje del color
        y la forma.
      </p>
      <p>
        Cada obra de la serie es una partitura visual. Las Valkirias de Wagner se convierten
        en jinetes que galopan entre nubes al atardecer. El Adagio de Barber cobra forma
        en una figura femenina y una caja de luz. Poseidón emerge del mar al ritmo de
        una obertura.
      </p>
      <p>
        No son ilustraciones de la música — son su equivalente pictórico. Una conversación
        silenciosa entre el pincel y la orquesta.
      </p>
    </>
  )

  const desiertoTextoFallback = (
    <div className="grid md:grid-cols-2 gap-10">
      <p>
        Hay una línea que corre por debajo de toda la obra de Bakr y que conecta
        directamente con su origen: los jinetes. Figuras a caballo cruzando tormentas
        de arena, avanzando contra el fuego, desapareciendo en el horizonte del desierto.
      </p>
      <p>
        Es la memoria de Siria — no como nostalgia, sino como energía. El desierto que
        Bakr lleva adentro aparece en sus lienzos como fuerza, movimiento y color: los
        ocres, los dorados encendidos, el polvo que se convierte en luz.
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero */}
      <div className="pt-32 pb-0 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-3">
            El artista
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#1A1A1A] leading-tight max-w-2xl">
            Bakr Fansa
          </h1>
        </div>
      </div>

      {/* Imagen + texto introductorio */}
      <div className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F7F4]">
            {artistaFoto?.url ? (
              <Image
                src={artistaFoto.url}
                alt={artistaFoto.alt ?? 'Bakr Fansa'}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-[#E8E4DC]" />
            )}
          </div>

          <div className="md:pt-8">
            <div className="space-y-6 text-[#6B6B6B] leading-relaxed">
              <p className="font-serif italic text-[#1A1A1A] text-xl md:text-2xl leading-relaxed">
                &ldquo;{cita}&rdquo;
              </p>
              <p className="text-xs tracking-widest uppercase text-[#C8A882]">
                — {citaAutor}
              </p>

              <div className="pt-4 space-y-5">
                {s?.sobreMiBio
                  ? <LexicalParagraphs data={s.sobreMiBio} />
                  : bioFallback
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Poemas en color */}
      <div className="bg-[#F8F7F4] py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-4">
              Serie especial
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-6">
              Poemas en color
            </h2>
            <div className="space-y-5 text-[#6B6B6B] leading-relaxed">
              {s?.sobreMiPoemasTexto
                ? <LexicalParagraphs data={s.sobreMiPoemasTexto} />
                : poemasTextoFallback
              }
            </div>
            <Link
              href="/galeria/poemas-en-color"
              className="inline-block mt-8 text-sm text-[#1A1A1A] tracking-widest uppercase border-b border-[#1A1A1A] pb-0.5 hover:text-[#C8A882] hover:border-[#C8A882] transition-all duration-300"
            >
              Ver la serie →
            </Link>
          </div>

          {obrasGrid.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {obrasGrid.map((img) => (
                <Link key={img.slug} href={`/obra/${img.slug}`} className="group">
                  <div className="relative aspect-square overflow-hidden bg-[#E8E4DC]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 45vw, 22vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desierto e identidad */}
      <div className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-4">
            Raíces
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-8">
            El desierto como memoria
          </h2>
          <div className="text-[#6B6B6B] leading-relaxed">
            {s?.sobreMiDesiertoTexto
              ? <LexicalParagraphs data={s.sobreMiDesiertoTexto} className="grid md:grid-cols-2 gap-10" />
              : desiertoTextoFallback
            }
          </div>
        </div>
      </div>

      {/* CTA Contacto */}
      <div className="bg-[#1A1A1A] py-20 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-white mb-5">
            ¿Te interesa una obra o comisión?
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Bakr acepta encargos personalizados. Si tienes en mente una obra
            especial, escríbele directamente.
          </p>
          <Link
            href="/contacto"
            className="inline-block border border-white/30 text-white text-xs tracking-widest uppercase px-10 py-4 hover:border-[#C8A882] hover:text-[#C8A882] transition-all duration-300"
          >
            Contactar al artista
          </Link>
        </div>
      </div>
    </div>
  )
}
