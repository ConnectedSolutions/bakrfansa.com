import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Compra cancelada',
}

export default function CanceladoPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-6">
      <div className="max-w-lg text-center py-24">
        <p className="text-xs tracking-[0.25em] uppercase text-[#6B6B6B] mb-3">
          Pago cancelado
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-5">
          No se realizó ningún cargo
        </h1>
        <p className="text-[#6B6B6B] leading-relaxed mb-10">
          Cancelaste el proceso de pago. Tus artículos siguen en el carrito
          — puedes completar la compra cuando quieras.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tienda/carrito"
            className="inline-block bg-[#1A1A1A] text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-[#C8A882] transition-all duration-300"
          >
            Volver al carrito
          </Link>
          <Link
            href="/tienda"
            className="inline-block border border-[#E8E4DC] text-[#1A1A1A] text-xs tracking-widest uppercase px-8 py-3.5 hover:border-[#1A1A1A] transition-all duration-300"
          >
            Ver tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
