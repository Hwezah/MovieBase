import { Home, Search, Folder, Download, Settings } from "lucide-react";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="text-gray-400 py-6 text-center">
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
