import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Checkout',
}

// Este componente se conectará a Stripe en el Paso 8.
// Por ahora muestra la estructura del formulario.
export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-serif text-4xl text-[#1A1A1A]">Finalizar compra</h1>
        </div>
      </div>

      <div className="py-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center py-16">
          <p className="font-serif text-2xl text-[#1A1A1A] mb-4">
            Pago en construcción
          </p>
          <p className="text-[#6B6B6B] leading-relaxed mb-8">
            La integración con Stripe se conecta en el Paso 8.
            Por ahora puedes explorar el carrito y la tienda.
          </p>
          <Link
            href="/tienda/carrito"
            className="inline-block border border-[#1A1A1A] text-[#1A1A1A] text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
          >
            ← Volver al carrito
          </Link>
        </div>
      </div>
    </div>
  )
}
