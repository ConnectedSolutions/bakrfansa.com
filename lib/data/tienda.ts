// Datos hardcodeados para el Paso 6.
// En producción vendrán de Payload CMS.

export type Dimension = {
  medida: string
  precioExtra?: number
}

export type Product = {
  id: string
  nombre: string
  artworkSlug: string
  artworkTitle: string
  precio: number
  moneda: 'MXN' | 'USD'
  stock: number
  materiales: string
  dimensiones: Dimension[]
  imageSrc: string
  imageAlt: string
  stripeProductId?: string
}

export const products: Product[] = [
  {
    id: 'prod_1',
    nombre: 'Poseidón — Reproducción firmada',
    artworkSlug: 'poseidon',
    artworkTitle: 'Poseidón',
    precio: 3200,
    moneda: 'MXN',
    stock: 5,
    materiales:
      'Impresión giclée en papel de algodón 300g, tintas de pigmento de archivo. Firmada a mano por el artista y acompañada de certificado de autenticidad.',
    dimensiones: [
      { medida: '40 × 50 cm' },
      { medida: '60 × 75 cm', precioExtra: 800 },
      { medida: '80 × 100 cm', precioExtra: 2000 },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    imageAlt: 'Poseidón — reproducción de Bakr Fansa',
  },
  {
    id: 'prod_2',
    nombre: 'La Caja de Pandora — Reproducción firmada',
    artworkSlug: 'la-caja-de-pandora',
    artworkTitle: 'La Caja de Pandora',
    precio: 2800,
    moneda: 'MXN',
    stock: 3,
    materiales:
      'Impresión giclée en papel de algodón 300g, tintas de pigmento de archivo. Firmada a mano por el artista.',
    dimensiones: [
      { medida: '40 × 50 cm' },
      { medida: '60 × 75 cm', precioExtra: 600 },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
    imageAlt: 'La Caja de Pandora — reproducción de Bakr Fansa',
  },
  {
    id: 'prod_3',
    nombre: 'Jinetes en la tormenta — Reproducción firmada',
    artworkSlug: 'jinetes-en-la-tormenta',
    artworkTitle: 'Jinetes en la tormenta',
    precio: 3500,
    moneda: 'MXN',
    stock: 8,
    materiales:
      'Impresión giclée en papel de algodón 300g. Firmada a mano y certificada.',
    dimensiones: [
      { medida: '50 × 40 cm' },
      { medida: '75 × 60 cm', precioExtra: 900 },
      { medida: '100 × 80 cm', precioExtra: 2200 },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    imageAlt: 'Jinetes en la tormenta — reproducción de Bakr Fansa',
  },
  {
    id: 'prod_4',
    nombre: 'La caravana — Reproducción firmada',
    artworkSlug: 'la-caravana',
    artworkTitle: 'La caravana',
    precio: 3800,
    moneda: 'MXN',
    stock: 2,
    materiales:
      'Impresión giclée en papel de algodón 300g, formato horizontal. Firmada y certificada.',
    dimensiones: [
      { medida: '60 × 45 cm' },
      { medida: '90 × 65 cm', precioExtra: 1200 },
    ],
    imageSrc: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    imageAlt: 'La caravana — reproducción de Bakr Fansa',
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function formatPrice(precio: number, moneda: 'MXN' | 'USD'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: moneda,
    minimumFractionDigits: 0,
  }).format(precio)
}
