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
        // Imágenes subidas directamente a Payload (almacenadas en /public/media)
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

export default withPayload(nextConfig, {
  configPath: './payload.config.ts',
})
