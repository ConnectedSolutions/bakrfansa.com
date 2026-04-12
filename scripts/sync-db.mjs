import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env')
const envContent = readFileSync(envPath, 'utf-8')
const match = envContent.match(/^DATABASE_URL=(.+)$/m)
if (!match) throw new Error('DATABASE_URL no encontrada en .env')
const dbUrl = match[1].trim().replace(/^["']|["']$/g, '')

const client = new pg.Client({ connectionString: dbUrl })
await client.connect()

const alteraciones = [
  `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS sobre_mi_cita text`,
  `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS sobre_mi_cita_autor varchar`,
  `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS sobre_mi_bio jsonb`,
  `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS sobre_mi_poemas_texto jsonb`,
  `ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS sobre_mi_desierto_texto jsonb`,
]

for (const sql of alteraciones) {
  await client.query(sql)
  console.log(`✓ ${sql}`)
}

await client.end()
console.log('\n✓ Esquema actualizado correctamente')
