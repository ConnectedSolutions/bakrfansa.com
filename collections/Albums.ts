import type { CollectionConfig } from 'payload'

export const Albums: CollectionConfig = {
  slug: 'albums',
  labels: {
    singular: 'Álbum',
    plural: 'Álbumes',
  },
  admin: {
    useAsTitle: 'nombre',
    group: 'Galería',
    defaultColumns: ['nombre', 'año', 'visible', 'updatedAt'],
    description: 'Grupos de obras. Cada álbum puede representar una serie, una exposición o un período de trabajo.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre del álbum',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL del álbum',
      required: true,
      unique: true,
      admin: {
        description: 'Identificador en la URL. Ejemplo: "serie-azul-2024". Solo letras minúsculas, números y guiones.',
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.nombre) {
              return (data.nombre as string)
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
      name: 'descripcion',
      type: 'textarea',
      label: 'Descripción',
      admin: {
        description: 'Texto breve que aparecerá en la página del álbum. Opcional.',
      },
    },
    {
      name: 'portada',
      type: 'upload',
      label: 'Imagen de portada',
      relationTo: 'media',
      admin: {
        description: 'La imagen que representa al álbum en el catálogo general.',
      },
    },
    {
      name: 'año',
      type: 'number',
      label: 'Año',
      admin: {
        position: 'sidebar',
        description: 'Año principal de las obras en este álbum.',
      },
    },
    {
      name: 'visible',
      type: 'checkbox',
      label: 'Visible en el portal',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Si está desactivado, el álbum no aparecerá en la galería pública.',
      },
    },
  ],
  timestamps: true,
}
