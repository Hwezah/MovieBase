"use client";
import { useRef, useEffect, useState } from "react";
import { useStateContext } from "@/components/contextProvider";
import { Button } from "@/components/ui/button";
import { Play, X, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { createPortal } from "react-dom";

if (typeof window === "undefined") return null;
// ─── Custom Modal ─────────────────────────────────────────────────────────────
function TrailerModal({movie, trailerKey, onClose }) {
  const modalRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Fade-in on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const embedSrc = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1${isMuted ? "&mute=1" : ""}`;

  return createPortal (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300 sm:p-0 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        ref={modalRef}
        className={`relative z-10 w-full max-w-4xl overflow-hidden rounded-sm border border-white/10 bg-neutral-950 shadow-2xl transition-transform duration-300 sm:rounded-none ${
          visible ? "translate-y-0 scale-100" : "translate-y-6 scale-95"
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900 px-4 py-2">
          <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
          ▶ Now Playing | {movie?.title || "Loading..."}
          </span>
          <div className="flex items-center gap-1">
            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted((m) => !m)}
              title={isMuted ? "Unmute" : "Mute"}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-transparent text-white/40 transition-colors hover:border-white/15 hover:bg-white/10 hover:text-white/90"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              title="Fullscreen"
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-transparent text-white/40 transition-colors hover:border-white/15 hover:bg-white/10 hover:text-white/90"
            >
              <Maximize2 size={15} />
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              title="Close"
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-transparent text-white/40 transition-colors hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-400"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* iframe */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            key={isMuted ? "muted" : "unmuted"}
            src={embedSrc}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-neutral-900 px-4 py-2 text-center">
          <span className="font-mono text-xs tracking-wider text-white/20">
            Press <kbd className="rounded-sm border border-white/15 bg-white/5 px-1 py-0.5 text-white/30">ESC</kbd> or click outside to close
          </span>
        </div>
      </div>
    </div>, document.body
  );
}

// ─── Play Button ──────────────────────────────────────────────────────────────
export default function PlayButton({movie, trailerKey, className = "" }) {
  const { isPlaying, setIsPlaying } = useStateContext();

  return (
    <>
      <Button
        onClick={() => setIsPlaying(true)}
        className={`flex items-center py-4 md:py-6 bg-white text-black rounded-sm hover:bg-black hover:text-white transition-colors text-center cursor-pointer ${className}`}
      >
        <Play className="w-6 h-6" />
        Play Trailer
      </Button>

      {isPlaying && (
        <TrailerModal
        movie={movie}
          trailerKey={trailerKey}
          onClose={() => setIsPlaying(false)}
        />
      )}
    </>
  );
}


