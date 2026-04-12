'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from './Lightbox'
import type { Artwork } from '@/lib/data/galeria'

export default function AlbumGallery({ obras }: { obras: Artwork[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeArtwork, setActiveArtwork] = useState<Artwork | null>(null)
  const [imageIndex, setImageIndex] = useState(0)

  const openLightbox = (obra: Artwork, imgIndex = 0) => {
    setActiveArtwork(obra)
    setImageIndex(imgIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setActiveArtwork(null)
    setImageIndex(0)
  }

  const prevImage = () => {
    if (!activeArtwork) return
    setImageIndex((i) =>
      i === 0 ? activeArtwork.imagenes.length - 1 : i - 1
    )
  }

  const nextImage = () => {
    if (!activeArtwork) return
    setImageIndex((i) =>
      i === activeArtwork.imagenes.length - 1 ? 0 : i + 1
    )
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {obras.map((obra) => {
          const img = obra.imagenes[0]
          return (
            <div key={obra.id} className="break-inside-avoid group relative">
              {/* Imagen — abre lightbox */}
              <button
                onClick={() => openLightbox(obra)}
                className="w-full block overflow-hidden bg-[#F8F7F4] cursor-zoom-in"
                aria-label={`Ver ${obra.title} en detalle`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/20 transition-all duration-300" />
              </button>

              {/* Info debajo */}
              <div className="pt-3 pb-2 flex items-start justify-between gap-4">
                <div>
                  <Link
                    href={`/obra/${obra.slug}`}
                    className="font-serif text-[#1A1A1A] hover:text-[#C8A882] transition-colors duration-300 text-base"
                  >
                    {obra.title}
                  </Link>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">
                    {obra.tecnica} · {obra.year}
                  </p>
                </div>
                {obra.tieneReproduccion && (
                  <span className="shrink-0 text-[10px] tracking-widest uppercase text-[#C8A882] border border-[#C8A882]/40 px-2 py-0.5 mt-0.5">
                    Reproducción
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {lightboxOpen && activeArtwork && (
        <Lightbox
          images={activeArtwork.imagenes}
          currentIndex={imageIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  )
}
