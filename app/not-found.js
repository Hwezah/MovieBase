import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-4 text-center">
      <h1 className="text-yellow-500 font-bold text-6xl">404</h1>
      <h2 className="text-white font-bold text-2xl">Page Not Found</h2>
      <p className="text-gray-400 text-sm max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <button className="bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 transition">
          Go Home
        </button>
      </Link>
    </div>
  )
}