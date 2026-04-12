'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/data/tienda'
import CheckoutButton from './CheckoutButton'

export default function CartClient() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-serif text-2xl text-[#1A1A1A] mb-3">El carrito está vacío</p>
        <p className="text-[#6B6B6B] text-sm mb-8">Explora las reproducciones disponibles.</p>
        <Link
          href="/tienda"
          className="inline-block bg-[#1A1A1A] text-white text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-[#C8A882] transition-all duration-300"
        >
          Ver tienda
        </Link>
      </div>
    )
  }

  const total = totalPrice()
  const moneda = items[0]?.currency ?? 'MXN'

  return (
    <div className="grid md:grid-cols-[1fr_340px] gap-12 md:gap-16 items-start">
      {/* Lista de items */}
      <div className="divide-y divide-[#E8E4DC]">
        {items.map((item) => (
          <div key={item.productId} className="py-6 flex gap-5">
            {/* Imagen */}
            <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#F8F7F4]">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-serif text-[#1A1A1A] leading-snug">{item.name}</p>
              {item.dimension && (
                <p className="text-xs text-[#6B6B6B] mt-0.5">{item.dimension}</p>
              )}
              <p className="text-sm text-[#1A1A1A] mt-2">
                {formatPrice(item.price, item.currency)}
              </p>

              <div className="flex items-center gap-4 mt-3">
                {/* Cantidad */}
                <div className="flex items-center border border-[#E8E4DC]">
                  <button
                    onClick={() => {
                      if (item.quantity <= 1) removeItem(item.productId)
                      else updateQuantity(item.productId, item.quantity - 1)
                    }}
                    className="w-8 h-8 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors flex items-center justify-center"
                    aria-label="Reducir cantidad"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-8 h-8 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors flex items-center justify-center"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors tracking-wide underline underline-offset-2"
                >
                  Eliminar
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <p className="text-sm text-[#1A1A1A] shrink-0">
              {formatPrice(item.price * item.quantity, item.currency)}
            </p>
          </div>
        ))}
      </div>

      {/* Resumen del pedido */}
      <div className="bg-[#F8F7F4] p-8">
        <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-6">
          Resumen del pedido
        </p>

        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Subtotal</span>
            <span className="text-[#1A1A1A]">{formatPrice(total, moneda)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Envío</span>
            <span className="text-[#6B6B6B] italic text-xs">Se calcula al finalizar</span>
          </div>
        </div>

        <div className="border-t border-[#E8E4DC] pt-4 mb-8 flex justify-between">
          <span className="font-serif text-[#1A1A1A]">Total</span>
          <span className="font-serif text-[#1A1A1A]">{formatPrice(total, moneda)}</span>
        </div>

        <CheckoutButton />

        {/* Sellos de confianza */}
        <div className="mt-6 pt-6 border-t border-[#E8E4DC] space-y-3">
          {[
            { icon: '🔒', texto: 'Pago seguro con Stripe' },
            { icon: '📦', texto: 'Envío a toda la República Mexicana' },
            { icon: '↩', texto: 'Reemplazo en 15 días si llega dañado' },
          ].map(({ icon, texto }) => (
            <div key={texto} className="flex items-center gap-3">
              <span className="text-base">{icon}</span>
              <span className="text-xs text-[#6B6B6B]">{texto}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 text-center space-y-2">
          <Link
            href="/politicas"
            className="block text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors underline underline-offset-2"
          >
            Políticas de compra y devoluciones
          </Link>
          <Link
            href="/tienda"
            className="block text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            ← Seguir explorando
          </Link>
        </div>
      </div>
    </div>
  )
}
