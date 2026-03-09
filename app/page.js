export const dynamic = "force-dynamic";
import { Plus } from "lucide-react";
export const fetchCache = "force-no-store";
import Link from "next/link";
import TmdbProvider from "@/components/providerRows/tmdbProvider";
import PlayButton from "@/components/Buttons/playButton";
import { Info } from "lucide-react";
import { fetchMedia, fetchMediaDetails } from "@/lib/tmdb";
import Image from "next/image";
export default async function Home() {
  const trending = await fetchMedia("trending", "movie", { cache: "no-store" });
  const randomIndex = Math.floor(Math.random() * trending.length);
  const heroMovie = trending?.[randomIndex];
  const movieDetails = await fetchMediaDetails(heroMovie.id);
  const movie = movieDetails;
  return (
    <div>
      <main className="space-y-12 pb-6 overflow-x-hidden">
        {/* Hero Section */}
        <div className="relative w-full lg:h-140 h-96 bg-gray-700 rounded-b-lg overflow-hidden bg-gradient-to-t from-black to-transparent">
          {heroMovie && heroMovie.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
              alt={heroMovie.title}
              fill
              priority
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="absolute flex justify-center flex-col items-center left-1/2 transform -translate-x-1/2 bottom-10 text-center md:w-[60%] w-[90%] p-6">
            <h1 className="text-xl font-bold text-white mb-4">
              {heroMovie.title}
            </h1>
            <div className="space-y-2 flex items-start justify-around gap-4 text-yellow-500">
              <p>{movie.release_date}</p>
              <p>{movie.runtime} min</p>
              <p>{movie.vote_average.toFixed(1)} / 10</p>
            </div>
            <div className="flex items-center justify-center gap-10 mt-2 ">
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <button className="text-white cursor-pointer flex items-center gap-2 flex flex-col">
                  <Plus className="w-5 h-5" />
                  <p>Watchlist</p>
                </button>
              </Link>
              <PlayButton trailerKey={movieDetails?.key} className="px-6" />
              <Link href={`/movie/${movie.id}`} key={movie.id}>
                <button className="text-white cursor-pointer flex items-center gap-2 flex flex-col">
                  <Info className="w-5 h-5" />
                  <p>More Info</p>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trending Movies Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">Trending Movies</h2>
          <TmdbProvider category="trending" type="movie" />
        </div>

        {/* Popular TV Shows Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">Popular TV Shows</h2>
          <TmdbProvider category="popular" type="tv" />
        </div>

        {/* Airing Today TV Shows Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">
            Airing Today TV Shows
          </h2>
          <TmdbProvider category="airing_today" type="tv" />
        </div>

        {/* Top Rated Movies Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">Top Rated Movies</h2>
          <TmdbProvider category="top_rated" type="movie" />
        </div>

        {/* Top Rated TV Shows Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">
            Top Rated TV Shows
          </h2>
          <TmdbProvider category="top_rated" type="tv" />
        </div>

        {/* Upcoming Movies Row */}
        <div className="space-y-2 px-2 md:px-4 overflow-x-hidden">
          <h2 className="text-white text-xl font-semibold">Upcoming Movies</h2>
          <TmdbProvider category="upcoming" type="movie" />
        </div>
      </main>
    </div>
  );
}
