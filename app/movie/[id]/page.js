import { fetchCredits, fetchMediaDetails } from "@/lib/tmdb";
import Image from "next/image";

export default async function MoviePage({ params }) {
  const { id } = await params;
  const movie = await fetchMediaDetails(id);
  const credits = await fetchCredits(id);
  return (
    <div>
      <main className="space-y-6 py-6 ">
        {/* Hero Section */}
        <div className="relative h-140 bg-gray-700 rounded-lg overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover object-center rounded-md"
          />
        </div>
        <div className="px-4">
          <div className="space-y-2">
            <h3 className="text-white font-bold">{movie.title}</h3>
          </div>

          <div className="space-y-2 flex items-start gap-4">
            <p className="text-gray-300">Released: {movie.release_date}</p>
            <p className="text-gray-300">Runtime: {movie.runtime} min</p>
            <p className="text-gray-300">
              Score: {movie.vote_average.toFixed(1)} / 10
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-300">{movie.overview}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold">Cast</h4>
            <div className="flex flex-wrap gap-4 items-center">
              {credits.cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="flex flex-col items-center">
                  <div className="w-24 h-24 flex-shrink-0">
                    <Image
                      className="rounded-full object-cover w-full h-full"
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <p key={actor.id} className="text-gray-300">
                    {actor.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2"></div>

          <div className="space-y-2"></div>

          <div className="space-y-2"></div>
        </div>
      </main>
    </div>
  );
}
