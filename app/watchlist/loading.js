import SkeletonCard from "@/components/ui/skeletonCard"

export default function WatchlistLoading() {
  return (
    <div className="space-y-8 overflow-x-hidden py-8 px-4 text-center md:text-left">
      
      {/* Title skeleton */}
      <div className="h-8 w-48 bg-gray-700 rounded animate-pulse" />

      {/* Flex wrap of skeleton cards — matches real page */}
      <div className="relative flex gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

    </div>
  )
}