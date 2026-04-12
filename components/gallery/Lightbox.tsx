'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

type LightboxImage = {
  src: string
  alt: string
  caption?: string
}

type Props = {
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: Props) {
  const current = images[currentIndex]

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0d0d0d]/96 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Imagen */}
      <div
        className="relative w-full h-full flex items-center justify-center p-6 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center">
          <Image
            src={current.src}
            alt={current.alt}
            width={1200}
            height={900}
            className="object-contain max-h-[80vh] w-auto"
            priority
          />
        </div>

        {/* Caption */}
        {current.caption && (
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-wide">
            {current.caption}
          </p>
        )}
      </div>

      {/* Cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-200"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Anterior */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label="Imagen anterior"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 p-2"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Siguiente */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label="Imagen siguiente"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200 p-2"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Contador */}
      {images.length > 1 && (
        <p className="absolute bottom-6 right-6 text-white/40 text-xs tracking-widest">
          {currentIndex + 1} / {images.length}
        </p>
      )}
    </div>
  )
}
