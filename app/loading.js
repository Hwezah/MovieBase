import SkeletonCard from "@/components/ui/skeletonCard"

function SkeletonRow({ title }) {
  return (
    <div className="space-y-2 px-2 md:px-4 overflow-x-hidden animate-pulse">
      <div className="h-6 w-48 bg-gray-700 rounded" />
      <div className="flex space-x-4 py-2 px-2 overflow-x-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}

export default function HomeLoading() {
  return (
    <main className="space-y-12 overflow-x-hidden pb-20 animate-pulse">

      <div className="relative w-full lg:h-140 h-96 bg-gray-700 rounded-b-lg overflow-hidden" />

      <div className="space-y-2 px-2 md:px-4 gap-4 flex flex-col items-end">
        <div className="h-4 w-32 bg-gray-700 rounded" />
        <div className="h-8 w-48 bg-gray-700 rounded" />
      </div>

      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />

    </main>
  )
}