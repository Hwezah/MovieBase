export default function SkeletonCard() {
    return (
      <div className="relative shrink-0 w-28 h-42 md:w-36 md:h-52 rounded-md snap-start shadow-lg bg-gray-800 animate-pulse">
        
    
        <div className="w-full h-full rounded-md bg-gray-700" />
  
       
        <div className="absolute bottom-0 left-0 right-0 p-2 space-y-1">
      
          <div className="h-3 bg-gray-600 rounded w-3/4" />

          <div className="h-2 bg-gray-600 rounded w-1/2" />
        
          <div className="h-2 bg-gray-600 rounded w-1/3" />
        </div>
  
        <div className="absolute top-2 right-2 w-8 h-4 bg-gray-600 rounded" />
  
      </div>
    )
  }