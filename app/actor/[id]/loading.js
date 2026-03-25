import SkeletonCard from "@/components/ui/skeletonCard"

export default function ActorLoading() {
  return (
    <div className="pb-20 px-4 py-16 space-y-10 animate-pulse">

 
      <div className="space-y-4 md:flex md:gap-6 md:space-y-0 items-end">

   
        <div className="flex ml-6 w-full gap-4 md:block md:w-1/4 shrink-0 justify-end items-center lg:justify-start">
          

          <div className="w-[40%] md:w-full">
            <div className="w-full aspect-square rounded-full md:rounded-xl bg-gray-700" />
          </div>

          <div className="flex flex-col space-y-2 md:hidden w-1/2">
            <div className="h-6 w-3/4 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
            <div className="h-4 w-1/2 bg-gray-700 rounded" />
          </div>

        </div>

    
        <div className="hidden md:flex md:flex-col md:justify-end md:space-y-3 flex-1">
          {/* Name */}
          <div className="h-8 w-56 bg-gray-700 rounded" />
          {/* Born and role */}
          <div className="flex gap-4">
            <div className="h-4 w-32 bg-gray-700 rounded" />
            <div className="h-4 w-32 bg-gray-700 rounded" />
          </div>
       
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-3/4 bg-gray-700 rounded" />
          </div>
        </div>

      </div>

      <div className="md:hidden space-y-2">
        <div className="h-3 w-full bg-gray-700 rounded" />
        <div className="h-3 w-full bg-gray-700 rounded" />
        <div className="h-3 w-3/4 bg-gray-700 rounded" />
      </div>


      <div className="space-y-4">
    
        <div className="h-8 w-24 bg-gray-700 rounded" />

       
        <div className="grid gap-2 md:gap-4 xl:gap-6
          grid-cols-[repeat(auto-fill,minmax(90px,1fr))]
          sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]
          md:grid-cols-[repeat(auto-fill,minmax(120px,1fr))]
          lg:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}