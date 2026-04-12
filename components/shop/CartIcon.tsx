'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/lib/store/cart'

export default function CartIcon({ inverted = false }: { inverted?: boolean }) {
  const totalItems = useCartStore((s) => s.totalItems())
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const count = mounted ? totalItems : 0

  return (
    <Link
      href="/tienda/carrito"
      aria-label={`Carrito — ${count} ${count === 1 ? 'artículo' : 'artículos'}`}
      className="relative transition-colors duration-300"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-colors duration-300 ${inverted ? 'text-white/80 hover:text-white' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'}`}
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C8A882] text-white text-[10px] flex items-center justify-center font-medium">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}
