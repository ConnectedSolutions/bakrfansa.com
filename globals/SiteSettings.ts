import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Configuración del sitio',
  admin: {
    group: 'Administración',
    description: 'Imágenes y textos principales del portal público.',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Imágenes principales',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              label: 'Imagen principal (Hero)',
              relationTo: 'media',
              admin: {
                description: 'La imagen de fondo que aparece en pantalla completa al entrar al sitio.',
              },
            },
            {
              name: 'artistaFoto',
              type: 'upload',
              label: 'Foto del artista',
              relationTo: 'media',
              admin: {
                description: 'Foto de Bakr que aparece en la página "Sobre mí" y en el landing.',
              },
            },
          ],
        },
        {
          label: 'Página — Sobre mí',
          fields: [
            {
              name: 'sobreMiCita',
              type: 'textarea',
              label: 'Cita de inspiración',
              admin: {
                description: 'La frase en cursiva que aparece al inicio de la sección biográfica.',
                rows: 4,
              },
            },
            {
              name: 'sobreMiCitaAutor',
              type: 'text',
              label: 'Autor de la cita',
              admin: {
                description: 'Ejemplo: "George Frederic Watts, el artista que inspiró a Bakr"',
              },
            },
            {
              name: 'sobreMiBio',
              type: 'richText',
              label: 'Biografía del artista',
              admin: {
                description: 'Texto principal sobre quién es Bakr, su historia y su técnica. Puedes escribir varios párrafos.',
              },
            },
            {
              name: 'sobreMiPoemasTexto',
              type: 'richText',
              label: 'Texto — Serie "Poemas en color"',
              admin: {
                description: 'Descripción de la serie Poemas en color que aparece junto a las obras.',
              },
            },
            {
              name: 'sobreMiDesiertoTexto',
              type: 'richText',
              label: 'Texto — El desierto como memoria',
              admin: {
                description: 'El párrafo sobre las raíces sirias y la serie de jinetes.',
              },
            },
          ],
        },
      ],
    },
  ],
}
