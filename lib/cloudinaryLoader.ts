/**
 * Loader de Cloudinary para next/image.
 * Genera URLs optimizadas automáticamente según el ancho solicitado.
 *
 * Uso en cualquier componente:
 *   import cloudinaryLoader from '@/lib/cloudinaryLoader'
 *   <Image loader={cloudinaryLoader} src="carpeta/nombre-imagen" ... />
 *
 * El `src` debe ser el public_id de Cloudinary (sin la URL base).
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    || process.env.CLOUDINARY_CLOUD_NAME
    || 'placeholder'

  const params = [
    'f_auto',       // formato automático (webp, avif según el navegador)
    'c_limit',      // no agranda imágenes pequeñas
    `w_${width}`,
    `q_${quality ?? 'auto'}`,
  ].join(',')

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params}/${src}`
}
