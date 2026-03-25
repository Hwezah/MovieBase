"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
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

export default function MovieFilter() {
  const router = useRouter()

  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [yearError, setYearError] = useState("")

  // Restore only genre from localStorage on mount
  // Year starts empty always
  useEffect(() => {
    const savedGenre = localStorage.getItem("filter_genre") || ""
    setSelectedGenre(savedGenre)
  }, [])

  const isValidYear = (year) => {
    const num = Number(year)
    // Must be a 4 digit number
    // Must be between 1888 (first ever film) and current year
    return (
      year.length === 4 &&
      !isNaN(num) &&
      num >= 1888 &&
      num <= currentYear
    )
  }

  const handleFilter = (genre, year) => {
    // Both must have values to trigger results
    if (!genre || genre === "all" || !year) return

    // Save genre to localStorage
    localStorage.setItem("filter_genre", genre)

    const params = new URLSearchParams()
    params.set("with_genres", genre)
    params.set("primary_release_year", year)
    router.push(`/?${params.toString()}`)
  }

  const handleYearKeyDown = (e) => {
    // Only trigger on Enter key
    if (e.key === "Enter") {
      if (!isValidYear(selectedYear)) {
        setYearError("Please enter a valid year e.g. 1999")
        return
      }
      setYearError("")
      handleFilter(selectedGenre, selectedYear)
    }
  }

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex gap-4 ">

      
        <Select
          value={selectedGenre}
          onValueChange={(value) => {
            setSelectedGenre(value)
          }}
        >
          <SelectTrigger className="w-40 bg-gray-800 text-white border-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-none">
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={String(genre.id)}>{genre.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

     
        <input
          type="number"
          placeholder="Year e.g. 1999"
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value)
            setYearError("") // clear error as user types
          }}
          onKeyDown={handleYearKeyDown}
          className="w-36 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg border-none outline-none placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

      </div>

  
      {yearError && (
        <p className="text-red-400 text-xs">{yearError}</p>
      )}

    </div>
  )
}