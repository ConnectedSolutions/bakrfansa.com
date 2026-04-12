import type { CollectionConfig } from 'payload'

export const Artworks: CollectionConfig = {
  slug: 'artworks',
  labels: {
    singular: 'Obra',
    plural: 'Obras',
  },
  admin: {
    useAsTitle: 'titulo',
    group: 'Galería',
    defaultColumns: ['titulo', 'album', 'año', 'destacada', 'tieneReproduccion', 'updatedAt'],
    description: 'El catálogo completo de obras de Bakr Fansa.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título de la obra',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL de la obra',
      required: true,
      unique: true,
      admin: {
        description: 'Identificador en la URL. Ejemplo: "campo-dorado-ii". Se genera automáticamente del título.',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.titulo) {
              return (data.titulo as string)
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .trim()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'album',
      type: 'relationship',
      label: 'Álbum',
      relationTo: 'albums',
      required: true,
      admin: {
        description: 'El álbum o serie al que pertenece esta obra.',
        position: 'sidebar',
      },
    },
    {
      name: 'imagenes',
      type: 'array',
      label: 'Imágenes de la obra',
      minRows: 1,
      admin: {
        description: 'Sube una o varias fotografías de la obra. La primera imagen es la principal.',
      },
      fields: [
        {
          name: 'imagen',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Pie de foto',
          admin: {
            description: 'Opcional. Ejemplo: "Detalle del ángulo superior"',
          },
        },
      ],
    },
    {
      name: 'tecnica',
      type: 'text',
      label: 'Técnica',
      admin: {
        description: 'Ejemplo: "Acrílico sobre óleo en tela", "Mixta sobre madera"',
      },
    },
    {
      name: 'dimensiones',
      type: 'text',
      label: 'Dimensiones',
      admin: {
        description: 'Ejemplo: "120 × 90 cm"',
      },
    },
    {
      name: 'año',
      type: 'number',
      label: 'Año de creación',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'descripcion',
      type: 'richText',
      label: 'Descripción de la obra',
      admin: {
        description: 'Texto que aparecerá en la página individual de la obra. Puede incluir formato.',
      },
    },
    {
      name: 'destacada',
      type: 'checkbox',
      label: 'Obra destacada',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Las obras destacadas pueden aparecer en la landing page y secciones especiales.',
      },
    },
    {
      name: 'tieneReproduccion',
      type: 'checkbox',
      label: 'Tiene reproducción disponible',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Activa esto si existe una reproducción de esta obra disponible para compra.',
      },
    },
    {
      name: 'producto',
      type: 'relationship',
      label: 'Producto de reproducción',
      relationTo: 'products',
      admin: {
        position: 'sidebar',
        description: 'Vincula el producto de tienda correspondiente (se configura en el Paso 6).',
        condition: (data) => Boolean(data?.tieneReproduccion),
      },
    },
  ],
  timestamps: true,
}
