import { searchMedia } from "@/lib/tmdb";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default async function SearchResultsPage({ searchParams }) {
  const query = (await searchParams).q;
  console.log("Search query:", query);
  let results = [];
  if (query) {
    try {
      results = await searchMedia(query);
    } catch (error) {
      console.error("Error searching media:", error);
    }
  } else {
    console.log("No search query provided.");
  }
  return (
    <div className="space-y-8 overflow-x-hidden py-8 px-4 text-center md:text-left ">
      <h1 className="text-white font-bold text-2xl">Search</h1>
      <form method="GET">
        <div className="relative md:w-[90%] w-full flex items-center mx-auto">
          <Search
            size={24}
            strokeWidth={1}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            name="q"
            type="text"
            placeholder="Search for a show, movie, or genre"
            className="w-full border border-[#1E2939] py-3 lg:py-4 xl:py-5 pl-12 pr-4 rounded-full text-gray-400 mx-auto text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#1E2939] focus:border-transparent transition duration-300"
          />
        </div>
      </form>
      <div className="flex gap-4 px-2 md:px-4 overflow-x-auto snap-x h-64 py-4 snap-mandatory mb-12">
        {results.map((result) => {
          const mediaType =
            result.media_type || (result.first_air_date ? "tv" : "movie");
          const slug = `${mediaType}-${result.id}`;

          return (
            <Link href={`/watch/${slug}`} key={result.id} className="block">
              <div
                key={result.id}
                className="bg-[#1E2939] cursor-pointer  relative rounded-md overflow-hidden shadow-lg w-28 h-42 md:w-36 md:h-52 snap-start hover:scale-105 transition-transform flex-shrink-0"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  alt={result.name || result.title}
                  width={200}
                  height={300}
                  className="object-cover rounded-md w-full h-full"
                />
                <div className="absolute bottom-2 left-2 right-2 text-white text-sm  font-semibold ">
                  <h2 className="text-white font-semi-bold text-xs md:text-sm leading-none">
                    {result.name || result.title}
                  </h2>
                  <p className="text-gray-400 text-xs md:text-sm">
                    {result.release_date || result.first_air_date}
                  </p>
                </div>
                {result.vote_average && (
                  <p className="absolute top-2 right-2 bg-[#1E2939] text-white text-xs font-semibold py-1 px-2 rounded-md">
                    {result.vote_average.toFixed(1)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
