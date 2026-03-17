import PlayButton from "@/components/Buttons/playButton";
import { Info } from "lucide-react";
import AddToWatchlistBtn from "@/components/Buttons/addToWatchlistBtn";
import Link from "next/link";
import { fetchMedia, fetchMediaDetails } from "@/lib/tmdb";
import Image from "next/image";
export default async function CommonHeader({ title }) {
  const trending = await fetchMedia("trending", "movie", { cache: "no-store" });
  const randomIndex = Math.floor(Math.random() * trending.length);
  const heroMovie = trending?.[randomIndex];
  const movieDetails = await fetchMediaDetails("movie", heroMovie.id);
  const trailer = movieDetails.videos?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  const movie = movieDetails;
  return (
    <div>
      <div className="relative w-full lg:h-140 h-96 bg-gray-700 rounded-b-lg overflow-hidden bg-linear-to-t from-black to-transparent ">
        {heroMovie && heroMovie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-90"></div>

        <div className="absolute flex justify-center flex-col items-center left-1/2 transform -translate-x-1/2 bottom-10 text-center md:w-[60%] w-[90%] p-6">
          <h1 className="text-xl font-bold text-white mb-4">
            {heroMovie.title}
          </h1>
          <p className="text-white text-sm">
            {movie.genres?.map((genre) => genre.name).join(" • ")}
          </p>
          <div className="space-y-2 flex items-start justify-around gap-4 text-yellow-500">
            <p>{movie.release_date}</p>
            <p>{movie.runtime} min</p>
            <p>{movie.vote_average.toFixed(1)} / 10</p>
          </div>
          <div className="flex items-center justify-center gap-6 md:gap-8 xl:gap-10 ">
            <AddToWatchlistBtn movie={movie} />
            <PlayButton
              trailerKey={trailer?.key}
              className="px-6"
              overlayClass="bg-transparent"
            />
            <Link href={`/watch/movie-${movie.id}`} key={movie.id}>
              <button className="text-white cursor-pointer flex items-center gap-2 flex-col">
                <Info className="w-5 h-5" />
                <p>More Info</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
