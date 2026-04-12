'use client'

import { useState } from 'react'
import PoemModal from '@/components/ui/PoemModal'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [showPoem, setShowPoem] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')

    // Por ahora simula el envío — en el deploy se conecta a un servicio de email
    await new Promise((r) => setTimeout(r, 1200))

    // En producción: fetch('/api/contacto', { method: 'POST', body: JSON.stringify(form) })
    setState('success')
    setTimeout(() => setShowPoem(true), 800)
  }

  if (state === 'success') {
    return (
      <>
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full bg-[#F8F7F4] flex items-center justify-center mx-auto mb-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A882" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="font-serif text-xl text-[#1A1A1A] mb-2">Mensaje enviado</p>
          <p className="text-sm text-[#6B6B6B]">
            Bakr te responderá en los próximos días.
          </p>
        </div>
        {showPoem && (
          <PoemModal tipo="contacto" onClose={() => setShowPoem(false)} />
        )}
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nombre" className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-[#E8E4DC] bg-transparent px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A882] transition-colors duration-200"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-[#E8E4DC] bg-transparent px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A882] transition-colors duration-200"
            placeholder="tu@correo.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="asunto" className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">
          Asunto
        </label>
        <select
          id="asunto"
          name="asunto"
          required
          value={form.asunto}
          onChange={handleChange}
          className="w-full border border-[#E8E4DC] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C8A882] transition-colors duration-200"
        >
          <option value="" disabled>Selecciona un asunto</option>
          <option value="comision">Solicitud de comisión</option>
          <option value="reproduccion">Consulta sobre reproducción</option>
          <option value="exposicion">Exposición o colaboración</option>
          <option value="prensa">Prensa o medios</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-xs tracking-widest uppercase text-[#6B6B6B] mb-2">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={6}
          value={form.mensaje}
          onChange={handleChange}
          className="w-full border border-[#E8E4DC] bg-transparent px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#C8A882] transition-colors duration-200 resize-none"
          placeholder="Cuéntanos en qué podemos ayudarte..."
        />
      </div>

      {state === 'error' && (
        <p className="text-xs text-red-600">
          Hubo un error al enviar el mensaje. Intenta de nuevo.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-[#1A1A1A] text-white text-xs tracking-widest uppercase py-4 hover:bg-[#C8A882] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
