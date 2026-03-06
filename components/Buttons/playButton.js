"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function PlayButton({ trailerKey }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <Button
        onClick={handlePlayClick}
        className="px-4 flex items-center py-6 bg-white text-black rounded-sm hover:bg-black hover:text-white transition-colors flex-1 text-center cursor-pointer"
      >
        <Play className="w-6 h-6" />
        Play
      </Button>

      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2 aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-md"
            />
          </div>
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
