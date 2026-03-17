"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown } from "lucide-react"

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

  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedYear, setSelectedYear] = useState("")

  // Restore filters from localStorage on mount
  useEffect(() => {
    const savedGenre = localStorage.getItem("filter_genre") || ""
    const savedYear = localStorage.getItem("filter_year") || ""

    setSelectedGenre(savedGenre)
    setSelectedYear(savedYear)

    // Restore URL params too
    if (savedGenre || savedYear) {
      const params = new URLSearchParams()
      if (savedGenre) params.set("with_genres", savedGenre)
      if (savedYear) params.set("primary_release_year", savedYear)
      router.replace(`/?${params.toString()}`)
    }
  }, [])

  const handleFilter = (genre, year) => {
    // Save to localStorage
    localStorage.setItem("filter_genre", genre || "")
    localStorage.setItem("filter_year", year || "")

    // Update URL
    const params = new URLSearchParams()
    if (genre && genre !== "all") params.set("with_genres", genre)
    if (year && year !== "all") params.set("primary_release_year", year)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex gap-4">

      {/* Genre Dropdown */}
      <Select
        value={selectedGenre}
        onValueChange={(value) => {
          setSelectedGenre(value)
          handleFilter(value, selectedYear)
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

      {/* Year Dropdown */}
      <Select
        value={selectedYear}
        onValueChange={(value) => {
          setSelectedYear(value)
          handleFilter(selectedGenre, value)
        }}
      >
        <SelectTrigger className="w-36 bg-gray-800 text-white border-none focus:ring-0 focus:ring-offset-0">
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