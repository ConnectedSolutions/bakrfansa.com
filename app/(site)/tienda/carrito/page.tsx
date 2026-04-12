import type { Metadata } from 'next'
import CartClient from '@/components/shop/CartClient'

export const metadata: Metadata = {
  title: 'Carrito',
}

export default function CarritoPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl text-[#1A1A1A]">Carrito</h1>
        </div>
      </div>

      <div className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <CartClient />
        </div>
      </div>
    </div>
  )
}
