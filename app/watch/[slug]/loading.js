export default function MovieLoading() {
    return (
      <div className="overflow-x-hidden pb-20 text-center md:text-left animate-pulse">
        
 
        <div className="relative lg:h-140 h-96 bg-gray-700 rounded-b-sm overflow-hidden">
          <div className="w-full h-full bg-gray-700" />
     
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 h-4 w-48 bg-gray-600 rounded" />
        </div>
  
        <div className="px-4 py-2 lg:py-4 space-y-6">
          
     
          <div className="h-7 w-56 bg-gray-700 rounded mt-6" />
  
      
          <div className="flex items-start justify-around gap-4">
            <div className="h-4 w-16 bg-gray-700 rounded" />
            <div className="h-4 w-16 bg-gray-700 rounded" />
            <div className="h-4 w-16 bg-gray-700 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-full bg-gray-700 rounded" />
            <div className="h-3 w-3/4 bg-gray-700 rounded" />
          </div>
  
        
          <div className="space-y-2 py-6">
           
            <div className="h-7 w-16 bg-gray-700 rounded mb-8" />
            <div className="flex flex-wrap gap-6 items-center justify-around">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
               
                  <div className="w-24 h-24 rounded-full bg-gray-700" />
      
                  <div className="h-3 w-16 bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          </div>
  
         
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="h-10 flex-1 bg-gray-700 rounded" />
            <div className="h-10 w-28 bg-gray-700 rounded" />
            <div className="h-10 w-28 bg-gray-700 rounded" />
          </div>
  
        </div>
      </div>
    )
  }