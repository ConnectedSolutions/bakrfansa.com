import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

// Next.js necesita el body en crudo para verificar la firma de Stripe
export const config = {
  api: {
    bodyParser: false,
  },
}

function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `BF-${year}${month}-${random}`
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Sin firma Stripe.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Error al verificar webhook de Stripe:', err)
    return NextResponse.json({ error: 'Firma inválida.' }, { status: 400 })
  }

  // Solo procesamos pagos completados
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const items = JSON.parse(session.metadata?.items || '[]')
      const sessionData = session as Stripe.Checkout.Session & { shipping_details?: { address?: { line1?: string; line2?: string; city?: string; state?: string; postal_code?: string; country?: string } } }
      const shipping = sessionData.shipping_details
      const customer = session.customer_details

      const orderNumber = generateOrderNumber()
      const total = (session.amount_total ?? 0) / 100
      const moneda = (session.currency?.toUpperCase() as 'MXN' | 'USD') ?? 'MXN'

      // Guardar pedido en Payload CMS
      const payloadUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

      await fetch(`${payloadUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          stripeSessionId: session.id,
          status: 'paid',
          cliente: {
            nombre: customer?.name ?? '',
            email: customer?.email ?? '',
            telefono: customer?.phone ?? '',
            direccion: {
              linea1: shipping?.address?.line1 ?? '',
              linea2: shipping?.address?.line2 ?? '',
              ciudad: shipping?.address?.city ?? '',
              estado: shipping?.address?.state ?? '',
              codigoPostal: shipping?.address?.postal_code ?? '',
              pais: shipping?.address?.country ?? 'MX',
            },
          },
          items: items.map((i: {
            name: string
            dimension?: string
            quantity: number
            price: number
          }) => ({
            nombreProducto: i.name,
            dimension: i.dimension ?? '',
            cantidad: i.quantity,
            precioUnitario: i.price,
          })),
          total,
          moneda,
        }),
      })

      console.log(`Pedido ${orderNumber} creado correctamente.`)
    } catch (err) {
      console.error('Error al guardar el pedido:', err)
      // Devolvemos 200 a Stripe de todas formas para que no reintente
    }
  }

  return NextResponse.json({ received: true })
}
