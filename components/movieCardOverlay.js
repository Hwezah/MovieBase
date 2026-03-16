"use client";

import RemoveFromWatchlistBtn from "./removeFromWatchlist"; 
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function MovieCardOverlay({ movie, type }) {

  return (
    <Link href={`/watch/${type ? type : "movie"}-${movie.id}`}>
      <div className="relative cursor-pointer flex-shrink-0 w-28 h-[168px] md:w-36 md:h-[208px] rounded-md snap-start hover:scale-105 transition-transform text-center duration-200 shadow-lg bg-gray-800">

        <div className="relative group w-full h-full">

          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name || "Movie poster"}
            fill
            className="object-cover rounded-md"
          />

          {/* Hover Overlay */}
          <div className="absolute gap-0 flex-col inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-0 justify-center rounded-md">  
            <RemoveFromWatchlistBtn movie={movie}/>
          </div>

          {/* Bottom gradient title */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-2 rounded-b-md">
            <h3 className="font-semibold text-white text-sm md:text-base leading-tight line-clamp-1">
              {movie.title || movie.name}
            </h3>
            <p className="text-gray-300 text-xs md:text-sm">
              {movie.release_date}
            </p>
          </div>

          {/* Rating badge */}
          <p className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs md:text-sm px-2 py-0.5 rounded">
            {Number.isFinite(movie.vote_average)
              ? movie.vote_average.toFixed(1)
              : "—"}
          </p>

        </div>
      </div>
    </Link>
  );
}
