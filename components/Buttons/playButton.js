"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { X } from "lucide-react";

export default function PlayButton({ trailerKey }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPlaying]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <>
      <Button
        onClick={handlePlayClick}
        className="px-4 flex items-center py-4 lg:py-6 bg-white text-black rounded-sm hover:bg-black hover:text-white transition-colors flex-1 text-center cursor-pointer"
      >
        <Play className="w-6 h-6" />
        Play
      </Button>

      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="relative w-11/12 md:w-3/4 lg:w-1/2 aspect-video"
          >
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
            className="absolute top-42 right-8 text-white text-2xl cursor-pointer"
          >
            <X />
          </button>
        </div>
      )}
    </>
  );
}
