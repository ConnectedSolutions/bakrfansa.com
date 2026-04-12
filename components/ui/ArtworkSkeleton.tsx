export default function ArtworkSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-[#F8F7F4] aspect-[4/5] w-full" />
      <div className="pt-3 space-y-2">
        <div className="h-4 bg-[#F8F7F4] rounded w-3/4" />
        <div className="h-3 bg-[#F8F7F4] rounded w-1/2" />
      </div>
    </div>
  )
}

export function AlbumSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-[#F8F7F4] aspect-[3/2] w-full" />
      <div className="pt-4 space-y-2">
        <div className="h-4 bg-[#F8F7F4] rounded w-2/3" />
        <div className="h-3 bg-[#F8F7F4] rounded w-full" />
        <div className="h-3 bg-[#F8F7F4] rounded w-4/5" />
      </div>
    </div>
  )
}

export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="break-inside-avoid animate-pulse">
          <div
            className="bg-[#F8F7F4] w-full"
            style={{ height: `${200 + (i % 3) * 80}px` }}
          />
          <div className="pt-3 space-y-2">
            <div className="h-4 bg-[#F8F7F4] rounded w-3/4" />
            <div className="h-3 bg-[#F8F7F4] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}
