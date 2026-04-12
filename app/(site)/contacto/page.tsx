import type { Metadata } from 'next'
import ContactForm from '@/components/layout/ContactForm'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Escríbele a Bakr Fansa para comisiones, consultas sobre reproducciones, exposiciones o cualquier otra consulta.',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Encabezado */}
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-[#E8E4DC]">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-3">
            Contacto
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            Escribe al artista
          </h1>
          <p className="text-[#6B6B6B] max-w-xl leading-relaxed">
            Para comisiones, consultas sobre obras o reproducciones, y cualquier
            otra consulta. Bakr responde personalmente.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_480px] gap-16 md:gap-24">

          {/* Info lateral */}
          <div className="order-2 md:order-1 space-y-12">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-4">
                Comisiones
              </p>
              <p className="text-[#1A1A1A] leading-relaxed">
                Se acepta encargos personalizados. Si tienes en mente una obra
                especial — una pieza musical que quieras ver en pintura, una escena
                del desierto, o cualquier otra idea — escríbele describiendo tu visión.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-4">
                Reproducciones
              </p>
              <p className="text-[#1A1A1A] leading-relaxed">
                Si tienes dudas sobre alguna reproducción disponible en la tienda —
                materiales, medidas, envío internacional — el formulario es el lugar
                indicado.
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#6B6B6B] mb-4">
                Exposiciones y prensa
              </p>
              <p className="text-[#1A1A1A] leading-relaxed">
                Para propuestas de exposición, colaboraciones institucionales
                o solicitudes de prensa y medios.
              </p>
            </div>

            {/* Cita */}
            <blockquote className="border-l-2 border-[#C8A882] pl-5 mt-8">
              <p className="font-serif italic text-[#1A1A1A] leading-relaxed">
                &ldquo;Mi intención no ha sido tanto pintar cuadros que agraden la vista,
                sino sugerir grandes pensamientos que apelen a la imaginación y al corazón,
                y enciendan lo mejor y más noble de la humanidad.&rdquo;
              </p>
              <footer className="mt-3 text-xs text-[#6B6B6B] tracking-wide">
                — George Frederic Watts
              </footer>
            </blockquote>
          </div>

          {/* Formulario */}
          <div className="order-1 md:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
