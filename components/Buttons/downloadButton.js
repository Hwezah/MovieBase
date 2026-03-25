"use client";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function DownloadButton({ movieId }) {
  return (
    <Button
      className="px-4 flex items-center py-6 bg-black text-white rounded-sm py-4 md:py-6 hover:bg-white hover:text-black transition-colors flex-1 text-center cursor-pointer"
    >
      <Download className="w-6 h-6" />
      Download
    </Button>
  );
}
