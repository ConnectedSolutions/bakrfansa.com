'use client'

import { useEffect, useState } from 'react'

type Props = {
  onClose: () => void
  tipo: 'contacto' | 'compra'
}

export default function PoemModal({ onClose, tipo }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Entrada suave con pequeño delay
    const t = setTimeout(() => setVisible(true), 80)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 400)
  }

  const gracias =
    tipo === 'compra'
      ? 'Gracias por llevar una obra de Bakr contigo.'
      : 'Gracias por escribir. Bakr te responderá pronto.'

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col items-center justify-center px-8 transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Línea decorativa superior */}
      <div
        className={`w-px bg-[#C8A882] transition-all duration-700 delay-300 ${
          visible ? 'h-16 opacity-100' : 'h-0 opacity-0'
        }`}
      />

      {/* Contenido */}
      <div
        className={`max-w-2xl w-full text-center py-12 transition-all duration-700 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-[#C8A882] mb-10">
          {gracias}
        </p>

        <blockquote>
          <p className="font-serif italic text-white text-2xl md:text-4xl leading-relaxed md:leading-relaxed">
            &ldquo;Derrama flores por donde quiera que vayas,
            porque no volverás a pasar por el mismo lugar.&rdquo;
          </p>
        </blockquote>
      </div>

      {/* Línea decorativa inferior */}
      <div
        className={`w-px bg-[#C8A882] transition-all duration-700 delay-500 ${
          visible ? 'h-16 opacity-100' : 'h-0 opacity-0'
        }`}
      />

      {/* Cerrar */}
      <button
        onClick={handleClose}
        className={`absolute bottom-10 text-white/30 hover:text-white/60 text-xs tracking-widest uppercase transition-all duration-700 delay-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Continuar →
      </button>
    </div>
  )
}
