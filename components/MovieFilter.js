"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 99, name: "Documentary" },
  { id: 16, name: "Animation" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

export default function MovieFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedGenre, setSelectedGenre] = useState(searchParams.get("with_genres") || "")
  const [selectedYear, setSelectedYear] = useState(searchParams.get("primary_release_year") || "")

  const handleFilter = (genre, year) => {
    const params = new URLSearchParams()
    if (genre) params.set("with_genres", genre)
    if (year) params.set("primary_release_year", year)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex gap-4 px-4 py-2">

      {/* Genre Dropdown */}
      <Select
        value={selectedGenre}
        onValueChange={(value) => {
          setSelectedGenre(value)
          handleFilter(value, selectedYear)
        }}
      >
        <SelectTrigger
  className="w-40 bg-gray-800 text-white border-0 cursor-pointer 
             focus:outline-none focus:ring-0 focus:ring-offset-0
             focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
>
          <SelectValue placeholder="All Genres" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white border-none">
          <SelectItem value="all">All Genres</SelectItem>
          {genres.map((genre) => (
            <SelectItem key={genre.id} value={String(genre.id)}>{genre.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Dropdown */}
      <Select
        value={selectedYear}
        onValueChange={(value) => {
          setSelectedYear(value)
          handleFilter(selectedGenre, value)
        }}
      >
        <SelectTrigger
  className="w-40 bg-gray-800 text-white border-0 cursor-pointer 
             focus:outline-none focus:ring-0 focus:ring-offset-0
             focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
>
          <SelectValue placeholder="All Years" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 text-white border-none">
          <SelectItem value="all">All Years</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>{year}</SelectItem>
          ))}
        </SelectContent>
      </Select>

    </div>
  )
}