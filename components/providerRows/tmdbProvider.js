import { fetchMedia } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";

export default async function TmdbProvider({ category, type }) {
  const movies = await fetchMedia(category, type);
  return (
    <div className="flex space-x-4 py-2 px-2 snap-x snap-mandatory overflow-x-auto">
      {movies.map((movie) =>
        movie.poster_path ? (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="relative cursor-pointer flex-shrink-0 w-28 h-42 md:w-36 md:h-52 rounded-md snap-start hover:scale-105 transition-transform shadow-lg bg-gray-800">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <h3 className="text-lg font-semibold text-white text-sm md:text-base lg:text-lg xl:text-xl leading-tight">
                  {movie.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg xl:text-xl">
                  {movie.release_date}
                </p>
              </div>
              <p className="text-gray-300 text-sm md:text-base lg:text-lg xl:text-xl absolute top-2 right-2 bg-black bg-opacity-75 text-yellow-500 px-1 rounded">
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </Link>
        ) : null,
      )}
    </div>
  );
}
