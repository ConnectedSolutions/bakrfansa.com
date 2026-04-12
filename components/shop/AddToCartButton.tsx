'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/data/tienda'
import type { Product } from '@/lib/data/tienda'

type Props = {
  product: Product
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [selectedDimension, setSelectedDimension] = useState(
    product.dimensiones[0]?.medida ?? ''
  )
  const [toastVisible, setToastVisible] = useState(false)

  const precioFinal =
    product.precio +
    (product.dimensiones.find((d) => d.medida === selectedDimension)?.precioExtra ?? 0)

  const handleAdd = () => {
    addItem({
      productId: `${product.id}-${selectedDimension}`,
      name: product.nombre,
      price: precioFinal,
      currency: product.moneda,
      quantity: 1,
      imageUrl: product.imageSrc,
      dimension: selectedDimension || undefined,
    })

    // Toast discreto — desaparece en 3s
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  if (product.stock === 0) {
    return (
      <p className="text-sm text-[#6B6B6B] italic">
        Esta reproducción está agotada por el momento.
      </p>
    )
  }

  return (
    <>
      {/* Selector de dimensión */}
      {product.dimensiones.length > 1 && (
        <div className="mb-5">
          <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">Medida</p>
          <div className="flex flex-wrap gap-2">
            {product.dimensiones.map((dim) => (
              <button
                key={dim.medida}
                onClick={() => setSelectedDimension(dim.medida)}
                className={`text-xs px-3 py-2 border transition-all duration-200 ${
                  selectedDimension === dim.medida
                    ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                    : 'border-[#E8E4DC] text-[#6B6B6B] hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {dim.medida}
                {dim.precioExtra ? ` +${formatPrice(dim.precioExtra, product.moneda)}` : ''}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Precio */}
      <p className="text-lg text-[#1A1A1A] mb-5">
        {formatPrice(precioFinal, product.moneda)}{' '}
        <span className="text-xs text-[#6B6B6B]">{product.moneda}</span>
      </p>

      {/* Botón */}
      <button
        onClick={handleAdd}
        className="w-full bg-[#1A1A1A] text-white text-xs tracking-widest uppercase py-4 hover:bg-[#C8A882] transition-all duration-300"
      >
        Agregar al carrito
      </button>

      {/* Toast discreto */}
      <div
        className={`fixed bottom-6 left-6 bg-[#1A1A1A] text-white text-sm px-5 py-3 transition-all duration-300 z-40 ${
          toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Agregado al carrito
      </div>
    </>
  )
}
