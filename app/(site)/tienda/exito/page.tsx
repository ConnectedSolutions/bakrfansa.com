import type { Metadata } from 'next'
import Link from 'next/link'
import ExitoClient from './ExitoClient'

export const metadata: Metadata = {
  title: 'Pedido confirmado',
}

export default function ExitoPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center py-24">
        {/* Ícono */}
        <div className="w-16 h-16 rounded-full bg-[#F8F7F4] flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A882" strokeWidth="1.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-3">
          Pedido confirmado
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-5">
          Gracias por tu compra
        </h1>
        <p className="text-[#6B6B6B] leading-relaxed mb-10">
          Recibirás un correo de confirmación con los detalles de tu pedido.
          Bakr preparará tu reproducción con el cuidado que merece — en cuanto
          esté lista te enviaremos el número de rastreo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/galeria"
            className="inline-block border border-[#E8E4DC] text-[#1A1A1A] text-xs tracking-widest uppercase px-8 py-3.5 hover:border-[#1A1A1A] transition-all duration-300"
          >
            Seguir explorando
          </Link>
          <Link
            href="/"
            className="inline-block bg-[#1A1A1A] text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-[#C8A882] transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </div>

        {/* Poema de cierre — aparece con delay */}
        <ExitoClient />
      </div>
    </div>
  )
}
