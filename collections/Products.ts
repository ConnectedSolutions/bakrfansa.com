import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Producto',
    plural: 'Productos',
  },
  admin: {
    useAsTitle: 'nombre',
    group: 'Tienda',
    defaultColumns: ['nombre', 'precio', 'moneda', 'stockDisponible', 'activo', 'updatedAt'],
    description: 'Reproducciones disponibles para compra. Cada producto está vinculado a una obra original.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del producto',
      required: true,
      admin: {
        description: 'Ejemplo: "Poseidón — Reproducción firmada"',
      },
    },
    {
      name: 'artwork',
      type: 'relationship',
      label: 'Obra original',
      relationTo: 'artworks',
      required: true,
      admin: {
        description: 'La pintura original de la que se hace esta reproducción.',
        position: 'sidebar',
      },
    },
    {
      name: 'precio',
      type: 'number',
      label: 'Precio',
      required: true,
      admin: {
        description: 'Precio en la moneda seleccionada abajo.',
        position: 'sidebar',
      },
    },
    {
      name: 'moneda',
      type: 'select',
      label: 'Moneda',
      required: true,
      defaultValue: 'MXN',
      options: [
        { label: 'Pesos mexicanos (MXN)', value: 'MXN' },
        { label: 'Dólares (USD)', value: 'USD' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'stockDisponible',
      type: 'number',
      label: 'Piezas disponibles',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Número de reproducciones disponibles para venta.',
      },
    },
    {
      name: 'materialesImpresion',
      type: 'textarea',
      label: 'Materiales y proceso de impresión',
      admin: {
        description: 'Ejemplo: "Impresión giclée en papel de algodón 300g, tintas de pigmento de archivo."',
      },
    },
    {
      name: 'dimensionesDisponibles',
      type: 'array',
      label: 'Dimensiones disponibles',
      admin: {
        description: 'Las medidas en que se ofrece esta reproducción.',
      },
      fields: [
        {
          name: 'medida',
          type: 'text',
          label: 'Medida',
          required: true,
          admin: {
            description: 'Ejemplo: "40 × 50 cm", "60 × 80 cm"',
          },
        },
        {
          name: 'precioExtra',
          type: 'number',
          label: 'Precio adicional (opcional)',
          admin: {
            description: 'Si esta medida tiene un precio diferente al base, agrégalo aquí.',
          },
        },
      ],
    },
    {
      name: 'imagenPortada',
      type: 'upload',
      label: 'Imagen del producto',
      relationTo: 'media',
      admin: {
        description: 'Imagen que se mostrará en la tienda. Si se deja vacía, se usará la imagen de la obra.',
      },
    },
    {
      name: 'activo',
      type: 'checkbox',
      label: 'Visible en la tienda',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Si está desactivado, el producto no aparece en la tienda pública.',
      },
    },
    {
      name: 'stripeProductId',
      type: 'text',
      label: 'ID de producto en Stripe',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Se completa automáticamente al conectar Stripe.',
      },
    },
  ],
  timestamps: true,
}
