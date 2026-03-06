import Link from "next/link";
import Image from "next/image";
import { fetchMedia } from "@/lib/tmdb";

export default async function TmdbProvider({ category, type }) {
  const movies = await fetchMedia(category, type);
  return (
    <div className="flex space-x-4 py-2 px-2 snap-x snap-mandatory">
      {movies.map((movie) =>
        movie.poster_path ? (
          <Link href={`/movie/${movie.id}`} key={movie.id}>
            <div className="relative cursor-pointer flex-shrink-0 w-48 h-72 rounded-md snap-start hover:scale-105 transition-transform shadow-lg bg-gray-800">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                <p className="text-gray-300">{movie.release_date}</p>
              </div>
            </div>
          </Link>
        ) : null,
      )}
    </div>
  );
}
