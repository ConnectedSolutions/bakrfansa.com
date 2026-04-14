'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import CartIcon from '@/components/shop/CartIcon'

const navLinks = [
  { href: '/galeria', label: 'Galería' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`
        w-full z-50 transition-all duration-300
        ${pathname === '/' ? 'absolute top-0 left-0' : 'relative border-b border-[#E8E4DC]'}
        ${pathname === '/'
          ? scrolled
            ? 'bg-white/90 backdrop-blur-sm shadow-sm'
            : 'bg-black/25 backdrop-blur-[3px]'
          : ''}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        {/* Logotipo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/firma-fansa.png"
            alt="Bakr Fansa"
            width={250}
            height={100}
            className={`h-14 w-auto transition-all duration-300 ${
              pathname === '/' && !scrolled
                ? 'brightness-0 invert'
                : 'brightness-0'
            }`}
          />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                text-sm tracking-widest uppercase transition-colors duration-300
                ${pathname === '/' && !scrolled
                  ? 'text-white/80 hover:text-white'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                }
                ${pathname.startsWith(link.href) ? 'text-[#C8A882]!' : ''}
              `}
            >
              {link.label}
            </Link>
          ))}
          <CartIcon inverted={pathname === '/' && !scrolled} />
        </nav>

        {/* Mobile: carrito + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <CartIcon inverted={pathname === '/' && !scrolled} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            className={`transition-colors duration-300 ${pathname === '/' && !scrolled ? 'text-white' : 'text-[#1A1A1A]'}`}
          >
            <span className="block w-6 h-px bg-current mb-1.5" />
            <span className="block w-6 h-px bg-current mb-1.5" />
            <span className="block w-4 h-px bg-current" />
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E4DC] px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
