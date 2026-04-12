'use client'

import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'

export default function CheckoutButton() {
  const items = useCartStore((s) => s.items)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Error al iniciar el pago.')
      }

      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="block w-full text-center bg-[#1A1A1A] text-white text-xs tracking-widest uppercase py-4 hover:bg-[#C8A882] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Redirigiendo...' : 'Finalizar compra'}
      </button>
      {error && (
        <p className="mt-3 text-xs text-red-600 text-center">{error}</p>
      )}
    </div>
  )
}
