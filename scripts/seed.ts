/**
 * Script de seed para poblar la base de datos con datos de prueba.
 *
 * Uso (cuando la base de datos esté conectada):
 *   npx tsx scripts/seed.ts
 *
 * Requiere que DATABASE_URL esté configurada en .env
 */

import { faker } from '@faker-js/faker/locale/es'

// Técnicas reales de Bakr Fansa
const tecnicas = [
  'Acrílico sobre óleo en tela',
  'Mixta sobre tela',
  'Acrílico sobre madera',
  'Óleo sobre tela',
]

// Álbumes de ejemplo
const albumsData = [
  {
    nombre: 'Poemas en color',
    slug: 'poemas-en-color',
    descripcion: 'Obras inspiradas en grandes composiciones musicales. Wagner, Beethoven, Mozart.',
    año: 2024,
    visible: true,
  },
  {
    nombre: 'Desierto',
    slug: 'desierto',
    descripcion: 'Jinetes, arena y tormenta. La memoria del origen sirio.',
    año: 2023,
    visible: true,
  },
  {
    nombre: 'Mitología',
    slug: 'mitologia',
    descripcion: 'Dioses y héroes que trascienden el tiempo.',
    año: 2022,
    visible: true,
  },
]

// Genera obras de prueba para un álbum
function generarObras(albumNombre: string, albumSlug: string, cantidad: number) {
  return Array.from({ length: cantidad }).map((_, i) => {
    const titulo = faker.helpers.arrayElement([
      'El vuelo eterno',
      'Luz del alba',
      'Tormenta dorada',
      'El último jinete',
      'Silencio en el desierto',
      'Fuego y arena',
      'La promesa',
      'Entre nubes',
      'El horizonte',
      'Memoria antigua',
    ]) + (i > 0 ? ` ${faker.number.int({ min: 2, max: 10 })}` : '')

    const slug = titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')

    return {
      titulo,
      slug: `${slug}-${faker.string.nanoid(4)}`,
      album: albumNombre,
      albumSlug,
      tecnica: faker.helpers.arrayElement(tecnicas),
      dimensiones: `${faker.number.int({ min: 60, max: 150 })} × ${faker.number.int({ min: 50, max: 120 })} cm`,
      año: faker.number.int({ min: 2000, max: 2024 }),
      descripcion: faker.lorem.paragraph(2),
      destacada: faker.datatype.boolean({ probability: 0.2 }),
      tieneReproduccion: faker.datatype.boolean({ probability: 0.4 }),
    }
  })
}

async function seed() {
  console.log('🌱 Iniciando seed de la base de datos...\n')

  for (const album of albumsData) {
    console.log(`📁 Álbum: ${album.nombre}`)
    const obras = generarObras(album.nombre, album.slug, faker.number.int({ min: 4, max: 8 }))
    obras.forEach((obra) => console.log(`   → ${obra.titulo} (${obra.año})`))
    console.log()
  }

  console.log('✅ Seed completado.')
  console.log()
  console.log('NOTA: Este script genera los datos de ejemplo.')
  console.log('Para insertar en la base de datos real, conecta Payload CMS')
  console.log('y usa la API de Payload en lugar de console.log.')
}

seed().catch(console.error)
