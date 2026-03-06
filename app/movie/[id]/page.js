import DownloadButton from "@/components/Buttons/downloadButton";
import PlayButton from "@/components/Buttons/playButton";
import { fetchCredits, fetchMediaDetails, fetchTrailer } from "@/lib/tmdb";
import Image from "next/image";
export default async function MoviePage({ params }) {
  const { id } = await params;
  const movie = await fetchMediaDetails(id);
  const credits = await fetchCredits(id);
  const trailer = await fetchTrailer(id);
  return (
    <div className="space-y-8 overflow-x-hidden pb-6 text-center md:text-left">
      {/* Hero Section */}
      <div className="relative lg:h-140 h-96 bg-gray-700 rounded-lg overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="px-4 py-2 lg:py-4 space-y-6">
        <div className="space-y-2">
          <h3 className="text-white font-bold">{movie.title}</h3>
        </div>

        <div className="space-y-2 flex items-start justify-around gap-4 text-yellow-500">
          <p>{movie.release_date}</p>
          <p>{movie.runtime} min</p>
          <p>{movie.vote_average.toFixed(1)} / 10</p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-300">{movie.overview}</p>
        </div>

        <div className="space-y-2 py-6">
          <h4 className="text-white font-bold mb-4">Cast</h4>
          <div className="flex flex-wrap gap-4 items-center justify-around">
            {credits.cast.slice(0, 6).map((actor) => (
              <div key={actor.id} className="flex flex-col items-center ">
                {actor.profile_path && (
                  <div className="w-24 h-24 flex-shrink-0">
                    <Image
                      className="rounded-full object-cover w-full h-full"
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      width={100}
                      height={100}
                    />
                  </div>
                )}
                <p key={actor.id} className="text-gray-300">
                  {actor.name.split(" ").slice(0, 2).join(" ")}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <PlayButton trailerKey={trailer.key} />
          <DownloadButton movieId={movie.id} />
        </div>

        <div className="space-y-2"></div>

        <div className="space-y-2"></div>
      </div>
    </div>
  );
}
