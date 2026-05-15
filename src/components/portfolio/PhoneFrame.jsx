// src/components/portfolio/PhoneFrame.jsx
import React from "react";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";

/**
 * Renders a long mobile mockup PNG inside a CSS iPhone-style frame.
 * The image is shown via `background-image` with a fixed screen aspect ratio,
 * and `position` (0–100) chooses which vertical slice of the source is visible:
 *   0   -> top of the image
 *   50  -> middle
 *   100 -> bottom
 *
 * Clicking opens the full long image in the parent modal.
 */
export default function PhoneFrame({
  src,
  alt,
  position = 0,
  onClick,
  className = "",
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`group relative block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brown-500 rounded-[2.4rem] ${className}`}
      aria-label={`Open ${alt}`}
    >
      {/* Phone body */}
      <div className="relative rounded-[2.4rem] bg-neutral-900 p-[6px] shadow-brown-xl ring-1 ring-black/40">
        {/* Screen */}
        <div
          className="relative overflow-hidden rounded-[2rem] bg-white"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {/* Image slice */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "100% auto",
              backgroundPosition: `center ${position}%`,
              backgroundRepeat: "no-repeat",
              backgroundColor: "#ffffff",
            }}
            role="img"
            aria-label={alt}
          />

          {/* Dynamic-island style pill */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1 z-10 h-4 w-1/4 -translate-x-1/2 rounded-full bg-neutral-900/90"
          />

          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-brown-800/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ZoomIn className="h-9 w-9 text-white" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
