'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

type ViewerImage = { src: string; alt: string }
type ObraViewer = { imagenes: ViewerImage[] }

export default function ArtworkViewer({ obra }: { obra: ObraViewer }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const current = obra.imagenes[activeIndex]

  return (
    <>
      {/* Imagen principal */}
      <button
        onClick={() => setLightboxOpen(true)}
        className="w-full block cursor-zoom-in group"
        aria-label="Ver imagen a pantalla completa"
      >
        <div className="relative w-full bg-[#F8F7F4] overflow-hidden">
          <Image
            src={current.src}
            alt={current.alt}
            width={1200}
            height={900}
            priority
            className="w-full h-auto object-contain max-h-[75vh] transition-transform duration-500 group-hover:scale-[1.01]"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          {/* Hint zoom */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-[#1A1A1A]/70 text-white text-xs px-3 py-1.5 tracking-wide flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              Ampliar
            </div>
          </div>
        </div>
      </button>

      {/* Thumbnails si hay más de una imagen */}
      {obra.imagenes.length > 1 && (
        <div className="flex gap-2 mt-3">
          {obra.imagenes.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-16 h-16 overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex ? 'border-[#C8A882]' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={obra.imagenes}
          currentIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setActiveIndex((i) => (i === 0 ? obra.imagenes.length - 1 : i - 1))}
          onNext={() => setActiveIndex((i) => (i === obra.imagenes.length - 1 ? 0 : i + 1))}
        />
      )}
    </>
  )
}
