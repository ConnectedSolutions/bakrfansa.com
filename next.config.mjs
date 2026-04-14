import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        // Imágenes de Unsplash para el desarrollo con datos hardcodeados
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        // Vercel preview y producción
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        // Dominio personalizado (bakrfansa.com)
        protocol: 'https',
        hostname: 'bakrfansa.com',
      },
      {
        // Vercel Blob Storage
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
}

export default withPayload(nextConfig, {
  configPath: './payload.config.ts',
})
