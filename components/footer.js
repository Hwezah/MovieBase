import { Home, Search, Folder, Download, Settings } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="text-gray-400 py-6 text-center fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 backdrop-blur-sm z-10">
      <div className="flex items-center space-x-4 justify-around">
        <Link href="/">
          <Home />
        </Link>
        <Link href="/footerRow/search">
          <Search />
        </Link>
        <Link href="/footerRow/watchlist">
          <Folder />
        </Link>
        <Link href="/footerRow/download">
          <Download />
        </Link>
        <Link href="/footerRow/settings">
          <Settings />
        </Link>
      </div>
    </footer>
  );
}
