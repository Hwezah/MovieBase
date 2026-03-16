import Image from "next/image"
import { fetchActorDetails } from "@/lib/tmdb"
import MovieCard from "@/components/movieCard"

export default async function ActorsPage({ params }) {
  const { id } = await params
  const actorDetails = await fetchActorDetails(id)
  const { credits } = actorDetails
  const movies = credits.cast

  return (
    <div className="pb-20 px-4 py-8 space-y-10">
      
      {/* Actor Profile Section */}
      <div className="flex gap-6 ">
        
        {/* Image */}
        <div className="w-1/4 shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w200${actorDetails.profile_path}`}
            alt={actorDetails.name}
            width={150}
            height={150}
            className="rounded-xl object-cover w-full"
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-end space-y-3">
          <h1 className="text-yellow-500 font-bold text-2xl">{actorDetails.name}</h1>
          <div className="flex flex-wrap gap-4">
            <span className="text-yellow-500 text-sm">Born: {actorDetails.birthday}</span>
            <span className="text-yellow-500 text-sm">Role: {actorDetails.known_for_department}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{actorDetails.biography}</p>
        </div>

      </div>

      {/* Movies Section */}
      <div className="space-y-4">
  <h2 className="text-white font-bold text-2xl">Movies</h2>
  <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
    {movies.map((movie) => movie?.poster_path ? (
      <MovieCard movie={movie} type="movie" key={movie.id} />
    ) : null)}
  </div>
</div>

    </div>
  )
}