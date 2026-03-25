"use client"
import { useEffect } from "react"
import Link from "next/link"

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-4 text-center">
      <h1 className="text-white font-bold text-3xl">Something went wrong!</h1>
      <p className="text-gray-400 text-sm max-w-md">
        We ran into an unexpected error. You can try again or go back to the home page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          Try Again
        </button>
        <Link href="/">
          <button className="bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-600 transition">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  )
}