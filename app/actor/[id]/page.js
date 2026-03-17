import Image from "next/image";
import { fetchActorDetails } from "@/lib/tmdb";
import MovieCard from "@/components/movieCard";
import BiographyExpander from "@/components/biographyExpander";
export default async function ActorsPage({ params }) {
  const { id } = await params;
  const actorDetails = await fetchActorDetails(id);
  const { credits } = actorDetails;
  const movies = credits.cast;

  return (
    <div className="pb-20 px-4 py-16 space-y-10 ">
      {/* Actor Profile Section */}
      <div className="space-y-4 md:flex md:gap-6 md:space-y-0 items-end">
        {/* Image + small-screen text */}
        <div className="flex w-full gap-4 md:block md:w-1/4 shrink-0 justify-end items-center lg:justify-start">
          {/* Image */}
          <div className="w-[40%] md:w-full">
            <Image
              src={`https://image.tmdb.org/t/p/w200${actorDetails.profile_path}`}
              alt={actorDetails.name}
              width={300}
              height={300}
              className="object-cover w-full rounded-full md:rounded-xl aspect-square md:aspect-auto"
            />
          </div>

          {/* Name + Meta (small screens only) */}
          <div className="flex flex-col  space-y-2 md:hidden w-1/2">
            <h1 className="text-yellow-500 font-bold text-xl">
              {actorDetails.name}
            </h1>

            <div className="flex flex-col gap-1">
              <span className="text-yellow-500 text-sm">
                Born: {actorDetails.birthday}
              </span>
              <span className="text-yellow-500 text-sm">
                Role: {actorDetails.known_for_department}
              </span>
            </div>
          </div>
        </div>

        {/* Right side (md and up only) */}
        <div className="hidden md:flex md:flex-col md:justify-end md:space-y-3 flex-1">
          <h1 className="text-yellow-500 font-bold text-2xl">
            {actorDetails.name}
          </h1>

          <div className="flex flex-wrap gap-4">
            <span className="text-yellow-500 text-sm">
              Born: {actorDetails.birthday}
            </span>
            <span className="text-yellow-500 text-sm">
              Role: {actorDetails.known_for_department}
            </span>
          </div>

          {/* Full biography (md+) */}
          <div className="hidden md:block">
            <BiographyExpander biography={actorDetails.biography} />
          </div>
        </div>
      </div>

      {/* BiographyExpander — small screens only (placed OUTSIDE hidden container) */}
      <div className="md:hidden">
        <BiographyExpander biography={actorDetails.biography} />
      </div>

      {/* Movies Section */}
      <div className="space-y-4">
        <h2 className="text-white font-bold text-2xl">Movies</h2>

        <div
          className="grid gap-2 md:gap-4 xl:gap-6
        grid-cols-[repeat(auto-fill,minmax(90px,1fr))] 
        sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] 
        md:grid-cols-[repeat(auto-fill,minmax(120px,1fr))] 
        lg:grid-cols-[repeat(auto-fill,minmax(140px,1fr))]"
        >
          {movies.map((movie) =>
            movie?.poster_path ? (
              <MovieCard movie={movie} type="movie" key={movie.id} />
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
