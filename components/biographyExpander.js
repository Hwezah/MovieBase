"use client";
import { useState } from "react";

export default function BiographyExpander({ biography }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-1">
      <p
        className={`text-gray-300 text-sm leading-relaxed ${expanded ? "" : "line-clamp-10"}`}
      >
        {biography}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-yellow-500 text-sm font-semibold"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
