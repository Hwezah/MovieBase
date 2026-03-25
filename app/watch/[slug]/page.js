import Link from "next/link";
import RecommendationsRow from "@/components/recommendationsRow";
import { notFound } from "next/navigation";
import DownloadButton from "@/components/Buttons/downloadButton";
import AddToWatchlistBtn from "@/components/Buttons/addToWatchlistBtn";
import PlayButton from "@/components/Buttons/playButton";
import { fetchMediaDetails } from "@/lib/tmdb";
import Image from "next/image";
export default async function MoviePage({ params }) {
  const { slug } = await params;
  const [type, id] = slug.split("-");
  const movie = await fetchMediaDetails(type, id);
  if (!movie) notFound();
  const credits = movie.credits;
  const trailer = movie.videos?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const runtime = movie.runtime || movie.episode_run_time?.[0];

  return (
    <div className="overflow-x-hidden pb-20 text-center md:text-left flex flex-col min-h-screen">
      <div className="relative lg:h-140 h-96 bg-gray-700 rounded-b-sm overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent z-10 opacity-90"></div>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={title}
          fill
          className="object-cover object-center z-0"
        />
        <p className="absolute bottom-4 left-0 right-0 text-center text-yellow-500 text-lg z-20">
          {movie.genres?.map((genre) => genre.name).join(" • ")}
        </p>
      </div>

      <div className="px-4 py-2 lg:py-4 space-y-6">
        <h3 className="text-white font-bold text-xl mt-6">{title}</h3>

        <div className="flex items-start justify-around gap-4 text-yellow-500">
          <p>{releaseDate}</p>
          <p>{runtime} min</p>
          <p>{movie.vote_average.toFixed(1)} / 10</p>
        </div>

        <p className="text-gray-300">{movie.overview}</p>

        <div className="space-y-2 py-6">
          <h4 className="text-white font-bold mb-8 text-xl">Cast</h4>
          <div className="flex flex-wrap gap-6 items-center justify-around">
            {credits?.cast?.slice(0, 6).map((actor) => (
              <Link href={`/actor/${actor.id}`} key={actor.id}>
                <div className="flex flex-col items-center">
                  {actor.profile_path && (
                    <div className="w-24 h-24 shrink-0">
                      <Image
                        className="rounded-full object-cover w-full h-full"
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                        width={100}
                        height={100}
                      />
                    </div>
                  )}
                  <p className="text-gray-300">
                    {actor.name.split(" ").slice(0, 2).join(" ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-14">
        <RecommendationsRow movieId={movie.id} />
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full mt-auto px-4 pb-4">
        <PlayButton
          trailerKey={trailer?.key}
          movie={movie}
          className="flex-1"
        />
        <AddToWatchlistBtn movie={movie} />
        <DownloadButton movieId={movie.id} />
      </div>
    </div>
  );
}
