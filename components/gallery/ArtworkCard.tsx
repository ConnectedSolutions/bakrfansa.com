import Link from 'next/link'
import Image from 'next/image'

type Props = {
  title: string
  slug: string
  album: string
  year: number
  imageSrc: string
  imageAlt: string
}

export default function ArtworkCard({ title, slug, album, year, imageSrc, imageAlt }: Props) {
  return (
    <Link href={`/obra/${slug}`} className="group block">
      <div className="relative overflow-hidden bg-[#F8F7F4] aspect-[4/5]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
        />
        {/* Overlay en hover */}
        <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/30 transition-all duration-300" />
        {/* Título en hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-serif text-white text-lg">{title}</p>
          <p className="text-white/70 text-xs tracking-wide mt-1">{album} · {year}</p>
        </div>
      </div>
    </Link>
  )
}
