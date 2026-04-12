import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/data/tienda'
import type { Product } from '@/lib/data/tienda'

export default function ProductCard({ product }: { product: Product }) {
  const sinStock = product.stock === 0

  return (
    <div className="group">
      <Link href={`/obra/${product.artworkSlug}`} className="block relative overflow-hidden bg-[#F8F7F4] aspect-[4/5]">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {sinStock && (
          <div className="absolute inset-0 bg-[#FFFFFF]/70 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-[#6B6B6B]">Agotado</span>
          </div>
        )}
      </Link>

      <div className="pt-4">
        <Link
          href={`/obra/${product.artworkSlug}`}
          className="font-serif text-[#1A1A1A] hover:text-[#C8A882] transition-colors duration-300 block leading-snug"
        >
          {product.artworkTitle}
        </Link>
        <p className="text-xs text-[#6B6B6B] mt-1 mb-3">Reproducción firmada</p>

        <div className="flex items-center justify-between">
          <p className="text-sm text-[#1A1A1A]">
            {formatPrice(product.precio, product.moneda)}
            <span className="text-[#6B6B6B] text-xs ml-1">{product.moneda}</span>
          </p>
          {product.dimensiones.length > 0 && (
            <p className="text-xs text-[#6B6B6B]">
              {product.dimensiones.length} {product.dimensiones.length === 1 ? 'medida' : 'medidas'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
