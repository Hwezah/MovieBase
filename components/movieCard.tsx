"use client"

import Link from "next/link";
import Image from "next/image";
import React from "react";

type MovieCardProps = {
  movie: {
    id: number
    poster_path: string | null
    title?: string
    name?: string
    genres?: { name: string }[]
    release_date?: string
    vote_average?: number
  }
  type: string
  key: number
}

export default function MovieCard({ movie, type }: MovieCardProps) {
 
  return (
     
    <Link key={movie.id} href={`/watch/${type ? type : "movie"}-${movie.id}`}>
        
            <div className="relative cursor-pointer text-center shrink-0 w-28 h-42 md:w-36 md:h-52 rounded-md snap-start hover:scale-105 transition-transform shadow-lg bg-gray-800">
            
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name || "Movie poster"}
                fill
                className="object-cover rounded-md"
              />
             
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-2">
                <h3 className="font-semibold text-white text-sm md:text-base leading-none">
                  {movie.title || movie.name}
                </h3>
                <p className="text-yellow-500 text-sm">
  {movie.genres?.map((genre) => genre.name).join(" • ")}
</p>
                <p className="text-gray-300 text-sm ">{movie.release_date}</p>
              </div>
              <p className=" text-sm md:text-base absolute top-2 right-2 bg-black bg-opacity-75 text-yellow-500 px-1 rounded">
                {Number.isFinite(movie.vote_average)
                  ? movie.vote_average.toFixed(1)
                  : "—"}
              </p>
            </div>
          </Link> 
  )
}