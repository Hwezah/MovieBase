import DownloadButton from "@/components/Buttons/downloadButton";
import PlayButton from "@/components/Buttons/playButton";
import {fetchMediaDetails} from "@/lib/tmdb";
import Image from "next/image";
export default async function MoviePage({ params }) {
  const { slug } = await params;
  const [type, id] = slug.split("-");
  const movie = await fetchMediaDetails(type, id);
  const credits = movie.credits;
  const trailer = movie.videos?.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const runtime = movie.runtime || movie.episode_run_time?.[0];

  return (
    <div className="overflow-x-hidden pb-20 text-center md:text-left ">
      {/* Hero Section */}
      <div className="inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
      <div className="relative lg:h-140 h-96 bg-gray-700 rounded-b-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-90"></div>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          alt={title}
          fill
          className="object-cover object-center z-0 "
        />
      </div>
      {/* <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl">
        {movie.title}
      </h2> */}
      <div className="px-4 py-2 lg:py-4 space-y-6">
        <div className="">
          <h3 className="text-white font-bold text-xl mt-6">{title}</h3>
        </div>

        <div className="space-y-2 flex items-start justify-around gap-4 text-yellow-500">
          <p>{releaseDate}</p>
          <p>{runtime} min</p>
          <p>{movie.vote_average.toFixed(1)} / 10</p>
        </div>

        <div className="space-y-2">
          <p className="text-gray-300">{movie.overview}</p>
        </div>

        <div className="space-y-2 py-6">
          <h4 className="text-white font-bold mb-8 text-xl">Cast</h4>
          <div className="flex flex-wrap gap-6 items-center justify-around">
            {credits?.cast?.slice(0, 6).map((actor) => (
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
          <PlayButton trailerKey={trailer?.key} className="flex-1" />
          <DownloadButton movieId={movie.id} />
        </div>
      </div>
    </div>
  );
}
