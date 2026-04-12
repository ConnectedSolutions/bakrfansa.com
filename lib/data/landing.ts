// Datos hardcodeados para el Paso 3.
// En el Paso 4+ estos vendrán del CMS (Payload).

export const heroData = {
  title: 'Bakr Fansa',
  subtitle: 'Acrílico sobre óleo',
  description:
    'Pinturas que convierten la música, la mitología y el desierto en color.',
  cta: { label: 'Ver galería', href: '/galeria' },
  // Imagen placeholder — en producción vendrá de Cloudinary
  imageSrc: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1600&q=80',
  imageAlt: 'Obra de Bakr Fansa',
}

export const featuredWorks = [
  {
    id: '1',
    title: 'Poseidón',
    slug: 'poseidon',
    album: 'Poemas en color',
    year: 2020,
    imageSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    imageAlt: 'Poseidón — Bakr Fansa',
  },
  {
    id: '2',
    title: 'Las Valkirias',
    slug: 'las-valkirias',
    album: 'Poemas en color',
    year: 1987,
    imageSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    imageAlt: 'Las Valkirias — Bakr Fansa',
  },
  {
    id: '3',
    title: 'La Caja de Pandora',
    slug: 'la-caja-de-pandora',
    album: 'Poemas en color',
    year: 2018,
    imageSrc: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
    imageAlt: 'La Caja de Pandora — Bakr Fansa',
  },
  {
    id: '4',
    title: 'Jinetes en la tormenta',
    slug: 'jinetes-en-la-tormenta',
    album: 'Desierto',
    year: 2003,
    imageSrc: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    imageAlt: 'Jinetes en la tormenta — Bakr Fansa',
  },
]

export const albumsPreview = [
  {
    id: '1',
    nombre: 'Poemas en color',
    slug: 'poemas-en-color',
    descripcion: 'Música convertida en pintura. Wagner, Beethoven, Mozart.',
    año: 2024,
    coverSrc: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
  },
  {
    id: '2',
    nombre: 'Desierto',
    slug: 'desierto',
    descripcion: 'Jinetes, arena y luz. La memoria del origen.',
    año: 2023,
    coverSrc: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=600&q=80',
  },
  {
    id: '3',
    nombre: 'Mitología',
    slug: 'mitologia',
    descripcion: 'Dioses, héroes y figuras que trascienden el tiempo.',
    año: 2022,
    coverSrc: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80',
  },
]
