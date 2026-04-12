import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Pedido',
    plural: 'Pedidos',
  },
  admin: {
    useAsTitle: 'orderNumber',
    group: 'Tienda',
    defaultColumns: ['orderNumber', 'status', 'cliente', 'total', 'moneda', 'createdAt'],
    description: 'Pedidos recibidos. Aquí Bakr puede ver el estado de cada compra y registrar el número de guía cuando envíe.',
  },
  access: {
    read: () => true,
    create: () => true, // El webhook de Stripe crea pedidos
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      label: 'Número de pedido',
      required: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'stripeSessionId',
      type: 'text',
      label: 'ID de sesión Stripe',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado del pedido',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pendiente de pago', value: 'pending' },
        { label: 'Pagado', value: 'paid' },
        { label: 'Enviado', value: 'shipped' },
        { label: 'Entregado', value: 'delivered' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    // ─── Datos del cliente ───────────────────────────────────────────
    {
      name: 'cliente',
      type: 'group',
      label: 'Datos del cliente',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'nombre',
              type: 'text',
              label: 'Nombre',
              required: true,
            },
            {
              name: 'email',
              type: 'email',
              label: 'Correo electrónico',
              required: true,
            },
          ],
        },
        {
          name: 'telefono',
          type: 'text',
          label: 'Teléfono',
        },
        {
          name: 'direccion',
          type: 'group',
          label: 'Dirección de envío',
          fields: [
            {
              name: 'linea1',
              type: 'text',
              label: 'Calle y número',
            },
            {
              name: 'linea2',
              type: 'text',
              label: 'Colonia / Apartamento',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'ciudad',
                  type: 'text',
                  label: 'Ciudad',
                },
                {
                  name: 'estado',
                  type: 'text',
                  label: 'Estado',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'codigoPostal',
                  type: 'text',
                  label: 'Código postal',
                },
                {
                  name: 'pais',
                  type: 'text',
                  label: 'País',
                  defaultValue: 'México',
                },
              ],
            },
          ],
        },
      ],
    },
    // ─── Items del pedido ────────────────────────────────────────────
    {
      name: 'items',
      type: 'array',
      label: 'Artículos del pedido',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'nombreProducto',
          type: 'text',
          label: 'Producto',
          required: true,
        },
        {
          name: 'dimension',
          type: 'text',
          label: 'Medida',
        },
        {
          name: 'cantidad',
          type: 'number',
          label: 'Cantidad',
          required: true,
        },
        {
          name: 'precioUnitario',
          type: 'number',
          label: 'Precio unitario',
          required: true,
        },
      ],
    },
    // ─── Totales ─────────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'total',
          type: 'number',
          label: 'Total',
          admin: { readOnly: true },
        },
        {
          name: 'moneda',
          type: 'select',
          label: 'Moneda',
          defaultValue: 'MXN',
          options: [
            { label: 'MXN', value: 'MXN' },
            { label: 'USD', value: 'USD' },
          ],
          admin: { readOnly: true },
        },
      ],
    },
    // ─── Envío (Bakr llena esto manualmente) ─────────────────────────
    {
      name: 'envio',
      type: 'group',
      label: 'Información de envío',
      admin: {
        description: 'Bakr completa estos datos después de imprimir y empacar el pedido.',
      },
      fields: [
        {
          name: 'paqueteria',
          type: 'select',
          label: 'Paquetería',
          options: [
            { label: 'Estafeta', value: 'Estafeta' },
            { label: 'FedEx', value: 'Fedex' },
            { label: 'DHL', value: 'DHL' },
            { label: 'Redpack', value: 'Redpack' },
            { label: 'Correos de México', value: 'Correos México' },
            { label: 'Otra', value: 'Otra' },
          ],
        },
        {
          name: 'numeroGuia',
          type: 'text',
          label: 'Número de guía',
          admin: {
            description: 'El número de rastreo que proporciona la paquetería.',
          },
        },
      ],
    },
    {
      name: 'notas',
      type: 'textarea',
      label: 'Notas internas',
      admin: {
        description: 'Notas privadas sobre este pedido. No son visibles para el cliente.',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
