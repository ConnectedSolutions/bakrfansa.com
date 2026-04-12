import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Imagen',
    plural: 'Imágenes',
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Contenido',
  },
  access: {
    read: () => true,
  },
  upload: {
    // Las imágenes se almacenan en Cloudinary vía handler externo.
    // Aquí guardamos la referencia (URL pública) en la base de datos.
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 400,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'full',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Descripción de la imagen (para accesibilidad)',
      admin: {
        description: 'Describe brevemente qué muestra la imagen. Ejemplo: "Detalle de pinceladas en azul cobalto"',
      },
    },
    {
      name: 'cloudinaryId',
      type: 'text',
      label: 'ID en Cloudinary',
      admin: {
        readOnly: true,
        description: 'Se completa automáticamente al subir la imagen',
        position: 'sidebar',
      },
    },
    {
      name: 'cloudinaryUrl',
      type: 'text',
      label: 'URL en Cloudinary',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
