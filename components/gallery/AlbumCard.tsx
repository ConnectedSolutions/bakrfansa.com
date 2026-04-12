import Link from 'next/link'
import Image from 'next/image'

type Props = {
  nombre: string
  slug: string
  descripcion?: string
  año?: number
  coverSrc: string
  totalObras?: number
}

export default function AlbumCard({ nombre, slug, descripcion, año, coverSrc, totalObras }: Props) {
  return (
    <Link href={`/galeria/${slug}`} className="group block">
      <div className="relative overflow-hidden bg-[#F8F7F4] aspect-[3/2]">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={nombre}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#E8E4DC]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="font-serif text-white text-xl">{nombre}</p>
          <p className="text-white/60 text-xs tracking-wide mt-1">
            {año}{totalObras !== undefined ? ` · ${totalObras} obras` : ''}
          </p>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-sm text-[#6B6B6B] leading-relaxed">{descripcion}</p>
      </div>
    </Link>
  )
}
