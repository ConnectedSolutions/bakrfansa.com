// Datos hardcodeados para el Paso 4.
// En el Paso conectado al CMS estos vendrán de Payload.

export type Artwork = {
  id: string
  title: string
  slug: string
  album: string
  albumSlug: string
  year: number
  tecnica: string
  dimensiones: string
  descripcion: string
  imagenes: { src: string; alt: string; caption?: string }[]
  destacada: boolean
  tieneReproduccion: boolean
}

export type Album = {
  id: string
  nombre: string
  slug: string
  descripcion: string
  año: number
  coverSrc: string
  obras: Artwork[]
}

export const albums: Album[] = [
  {
    id: '1',
    nombre: 'Poemas en color',
    slug: 'poemas-en-color',
    descripcion:
      'Obras inspiradas en grandes composiciones musicales. Wagner, Beethoven, Mozart y otros maestros traducidos al lenguaje del color y la forma.',
    año: 2024,
    coverSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    obras: [
      {
        id: '1',
        title: 'Poseidón',
        slug: 'poseidon',
        album: 'Poemas en color',
        albumSlug: 'poemas-en-color',
        year: 2020,
        tecnica: 'Acrílico sobre óleo en tela',
        dimensiones: '100 × 120 cm',
        descripcion:
          'Inspirada en la obertura de El holandés errante de Wagner. El mar como fuerza primordial, el dios emergiendo entre espuma y luz.',
        imagenes: [
          {
            src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=85',
            alt: 'Poseidón — Bakr Fansa',
          },
        ],
        destacada: true,
        tieneReproduccion: true,
      },
      {
        id: '2',
        title: 'Las Valkirias',
        slug: 'las-valkirias',
        album: 'Poemas en color',
        albumSlug: 'poemas-en-color',
        year: 1987,
        tecnica: 'Acrílico sobre óleo en tela',
        dimensiones: '90 × 120 cm',
        descripcion:
          'La cabalgata de las Valkirias de Wagner. Cuatro jinetes en el cielo al atardecer — entre nubes y luz morada, el preludio de la tormenta.',
        imagenes: [
          {
            src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85',
            alt: 'Las Valkirias — Bakr Fansa',
          },
        ],
        destacada: true,
        tieneReproduccion: false,
      },
      {
        id: '3',
        title: 'La Caja de Pandora',
        slug: 'la-caja-de-pandora',
        album: 'Poemas en color',
        albumSlug: 'poemas-en-color',
        year: 2018,
        tecnica: 'Acrílico sobre óleo en tela',
        dimensiones: '80 × 100 cm',
        descripcion:
          'Una figura de mujer descubre la luz dentro de la caja. El instante antes de que todo cambie. Inspirada en el Adagio de Barber.',
        imagenes: [
          {
            src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&q=85',
            alt: 'La Caja de Pandora — Bakr Fansa',
          },
        ],
        destacada: true,
        tieneReproduccion: true,
      },
    ],
  },
  {
    id: '2',
    nombre: 'Desierto',
    slug: 'desierto',
    descripcion:
      'Jinetes, arena y tormenta. La memoria del origen. Obras que capturan el movimiento, el polvo y la luz del desierto sirio.',
    año: 2023,
    coverSrc: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    obras: [
      {
        id: '4',
        title: 'Jinetes en la tormenta',
        slug: 'jinetes-en-la-tormenta',
        album: 'Desierto',
        albumSlug: 'desierto',
        year: 2003,
        tecnica: 'Acrílico sobre óleo en tela',
        dimensiones: '120 × 90 cm',
        descripcion:
          'Doce jinetes avanzan hacia una muralla de fuego y arena. El desierto como arena del destino — nadie retrocede.',
        imagenes: [
          {
            src: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=85',
            alt: 'Jinetes en la tormenta — Bakr Fansa',
          },
        ],
        destacada: true,
        tieneReproduccion: true,
      },
      {
        id: '5',
        title: 'Amanecer en el desierto',
        slug: 'amanecer-en-el-desierto',
        album: 'Desierto',
        albumSlug: 'desierto',
        year: 2021,
        tecnica: 'Acrílico sobre óleo en tela',
        dimensiones: '100 × 80 cm',
        descripcion:
          'La primera luz rompe el horizonte de arena. Un jinete solitario espera. La quietud antes del movimiento.',
        imagenes: [
          {
            src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=85',
            alt: 'Amanecer en el desierto — Bakr Fansa',
          },
        ],
        destacada: false,
        tieneReproduccion: false,
      },
      {
        id: '6',
        title: 'La caravana',
        slug: 'la-caravana',
        album: 'Desierto',
        albumSlug: 'desierto',
        year: 2019,
        tecnica: 'Acrílico sobre óleo en tela',
        dimensiones: '140 × 100 cm',
        descripcion:
          'Una caravana atraviesa el silencio. El calor distorsiona el horizonte. El movimiento eterno de quienes siempre han cruzado arenas.',
        imagenes: [
          {
            src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85',
            alt: 'La caravana — Bakr Fansa',
          },
        ],
        destacada: false,
        tieneReproduccion: true,
      },
    ],
  },
  {
    id: '3',
    nombre: 'Mitología',
    slug: 'mitologia',
    descripcion:
      'Dioses, héroes y figuras que trascienden el tiempo. La narrativa universal a través del color y la luz.',
    año: 2022,
    coverSrc: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
    obras: [
      {
        id: '7',
        title: 'Prometeo',
        slug: 'prometeo',
        album: 'Mitología',
        albumSlug: 'mitologia',
        year: 2022,
        tecnica: 'Acrílico sobre óleo en tela',
        dimensiones: '110 × 140 cm',
        descripcion:
          'El titán encadenado mira el fuego que robó para los hombres. La condena y el orgullo en una sola figura.',
        imagenes: [
          {
            src: 'https://images.unsplash.com/photo-1578926288207-32356338f4ca?w=1200&q=85',
            alt: 'Prometeo — Bakr Fansa',
          },
        ],
        destacada: false,
        tieneReproduccion: false,
      },
    ],
  },
]

export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug)
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  for (const album of albums) {
    const obra = album.obras.find((o) => o.slug === slug)
    if (obra) return obra
  }
  return undefined
}

export function getAllArtworks(): Artwork[] {
  return albums.flatMap((a) => a.obras)
}
