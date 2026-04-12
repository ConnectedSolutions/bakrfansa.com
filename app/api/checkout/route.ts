import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/lib/store/cart'

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CartItem[] } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío.' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: 'es',
      line_items: items.map((item) => ({
        price_data: {
          currency: item.currency.toLowerCase(),
          product_data: {
            name: item.name,
            description: item.dimension ? `Medida: ${item.dimension}` : undefined,
            images: item.imageUrl ? [item.imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe usa centavos
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ['MX', 'US'],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${siteUrl}/tienda/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/tienda/cancelado`,
      metadata: {
        items: JSON.stringify(
          items.map((i) => ({
            productId: i.productId,
            name: i.name,
            dimension: i.dimension,
            quantity: i.quantity,
            price: i.price,
          }))
        ),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error al crear sesión de Stripe:', error)
    return NextResponse.json(
      { error: 'No se pudo iniciar el proceso de pago.' },
      { status: 500 }
    )
  }
}
