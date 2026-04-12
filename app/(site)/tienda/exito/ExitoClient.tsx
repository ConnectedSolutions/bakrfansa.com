'use client'

import { useState, useEffect } from 'react'
import PoemModal from '@/components/ui/PoemModal'
import { useCartStore } from '@/lib/store/cart'

export default function ExitoClient() {
  const [showPoem, setShowPoem] = useState(false)
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    // Limpia el carrito al llegar a la página de éxito
    clearCart()
    // Muestra el poema después de que el cliente haya leído la confirmación
    const t = setTimeout(() => setShowPoem(true), 2200)
    return () => clearTimeout(t)
  }, [clearCart])

  if (!showPoem) return null

  return <PoemModal tipo="compra" onClose={() => setShowPoem(false)} />
}
