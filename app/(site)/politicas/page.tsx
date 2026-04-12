import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Políticas de compra',
  description: 'Política de envíos, devoluciones y privacidad de Bakr Fansa.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="py-10 border-b border-[#E8E4DC] last:border-0">
    <h2 className="font-serif text-xl text-[#1A1A1A] mb-4">{title}</h2>
    <div className="text-[#6B6B6B] leading-relaxed space-y-3 text-sm">{children}</div>
  </div>
)

export default function PoliticasPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="pt-32 pb-16 px-6 md:px-12 border-b border-[#E8E4DC]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-[#C8A882] mb-3">Legal</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            Políticas de compra
          </h1>
          <p className="text-[#6B6B6B]">
            Última actualización: abril 2026
          </p>
        </div>
      </div>

      <div className="py-16 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">

          <Section title="Productos">
            <p>
              Todas las reproducciones disponibles en esta tienda son impresiones giclée
              de alta calidad sobre papel de algodón 300g, con tintas de pigmento de archivo.
              Cada pieza es firmada a mano por Bakr Fansa y viene acompañada de un
              certificado de autenticidad.
            </p>
            <p>
              Las reproducciones no son obras originales. Las pinturas originales
              de Bakr Fansa no están disponibles para venta en este portal.
            </p>
          </Section>

          <Section title="Pagos">
            <p>
              Los pagos se procesan de forma segura a través de Stripe, uno de los
              procesadores de pago más confiables del mundo. Bakr Fansa nunca tiene
              acceso a los datos de tu tarjeta — toda la información viaja encriptada
              directamente a Stripe.
            </p>
            <p>
              Aceptamos tarjetas de crédito y débito Visa, Mastercard y American Express.
            </p>
          </Section>

          <Section title="Envíos">
            <p>
              Realizamos envíos a toda la República Mexicana. Los pedidos se preparan
              y envían en un plazo de 3 a 5 días hábiles tras la confirmación del pago.
            </p>
            <p>
              El tiempo de entrega estimado es de 5 a 10 días hábiles adicionales,
              dependiendo del destino. Cada pedido incluye número de rastreo que se
              comunica al cliente por correo electrónico una vez realizado el envío.
            </p>
            <p>
              Las reproducciones se envían en tubo de cartón rígido o caja plana
              protegida, según el formato de la pieza.
            </p>
          </Section>

          <Section title="Devoluciones y reemplazos">
            <p>
              Si tu reproducción llega con daños visibles causados durante el envío,
              tienes <strong className="text-[#1A1A1A] font-medium">15 días naturales</strong> a
              partir de la fecha de entrega para solicitar una aclaración.
            </p>
            <p>
              En ese caso, la pieza dañada deberá ser devuelta en su empaque original
              y será reemplazada por una reproducción idéntica o, de no estar disponible,
              por una de igual o menor precio a elección del cliente.
            </p>
            <p>
              No se realizan reembolsos en efectivo o a la tarjeta, salvo en casos
              excepcionales a criterio del artista.
            </p>
            <p>
              Para iniciar una aclaración, escribe a través del{' '}
              <Link href="/contacto" className="text-[#1A1A1A] border-b border-[#E8E4DC] hover:border-[#1A1A1A] transition-colors duration-200">
                formulario de contacto
              </Link>{' '}
              indicando tu número de pedido y fotografías del daño.
            </p>
          </Section>

          <Section title="Privacidad">
            <p>
              Los datos personales que proporcionas al realizar una compra (nombre,
              correo, dirección y teléfono) se utilizan exclusivamente para procesar
              y enviar tu pedido. No se comparten con terceros ni se usan con fines
              comerciales adicionales.
            </p>
            <p>
              El procesamiento del pago lo realiza Stripe, sujeto a su propia
              política de privacidad disponible en stripe.com.
            </p>
          </Section>

          <Section title="Contacto">
            <p>
              Para cualquier duda sobre tu pedido, una reproducción o estas políticas,
              puedes escribirnos a través del{' '}
              <Link href="/contacto" className="text-[#1A1A1A] border-b border-[#E8E4DC] hover:border-[#1A1A1A] transition-colors duration-200">
                formulario de contacto
              </Link>.
              Bakr responde personalmente.
            </p>
          </Section>

        </div>
      </div>
    </div>
  )
}
