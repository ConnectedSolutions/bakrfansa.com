import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#F8F7F4] border-t border-[#E8E4DC] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Nombre */}
        <div>
          <p className="font-serif text-xl text-[#1A1A1A] mb-3">Bakr Fansa</p>
          <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
            Artista visual. Acrílico sobre óleo.<br />
            Pinturas que hablan a la imaginación y al corazón.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-5">Explorar</p>
          <nav className="flex flex-col gap-3">
            {[
              { href: '/galeria', label: 'Galería' },
              { href: '/tienda', label: 'Reproducciones' },
              { href: '/sobre-mi', label: 'Sobre el artista' },
              { href: '/contacto', label: 'Contacto' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contacto */}
        <div>
          <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-5">Contacto</p>
          <a
            href="/contacto"
            className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-300"
          >
            Escribe al artista →
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-6 border-t border-[#E8E4DC] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#6B6B6B]">
          © {new Date().getFullYear()} Bakr Fansa. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-4">
          <p className="text-xs text-[#6B6B6B]">Obras protegidas por derechos de autor.</p>
          <Link
            href="/politicas"
            className="text-xs text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors duration-300 underline underline-offset-2"
          >
            Políticas de compra
          </Link>
        </div>
      </div>
    </footer>
  )
}
