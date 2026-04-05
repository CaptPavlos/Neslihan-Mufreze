"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface InstagramImageProps {
  postIndex: number;
  size?: number;
  className?: string;
  priority?: boolean;
  overlay?: boolean;
}

// Placeholder data — swap with real Instagram API data later
const PLACEHOLDER_PATTERNS = [
  "radial-gradient(ellipse at 30% 40%, var(--color-navy-mid) 0%, var(--color-navy-deep) 100%)",
  "radial-gradient(ellipse at 70% 60%, var(--color-navy-light) 0%, var(--color-navy) 100%)",
  "radial-gradient(ellipse at 50% 30%, var(--color-navy-mid) 0%, var(--color-navy-deepest) 100%)",
  "radial-gradient(ellipse at 20% 70%, var(--color-navy) 0%, var(--color-navy-deep) 100%)",
  "radial-gradient(ellipse at 80% 20%, var(--color-navy-light) 0%, var(--color-navy-mid) 100%)",
  "radial-gradient(ellipse at 40% 80%, var(--color-navy-mid) 0%, var(--color-navy) 100%)",
  "radial-gradient(ellipse at 60% 50%, var(--color-navy) 0%, var(--color-navy-deepest) 100%)",
  "radial-gradient(ellipse at 50% 50%, var(--color-navy-light) 0%, var(--color-navy-deep) 100%)",
];

export function InstagramImage({
  postIndex,
  size = 300,
  className = "",
  priority: _priority = false,
  overlay = false,
}: InstagramImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const patternIndex = postIndex % PLACEHOLDER_PATTERNS.length;

  // TODO: Replace with real Instagram API data
  const imageUrl: string | null = null;
  const postUrl: string | null = null;

  const fallback = (
    <div
      className="absolute inset-0"
      style={{ background: PLACEHOLDER_PATTERNS[patternIndex] }}
    >
      {/* Subtle compass pattern for visual interest */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="30" stroke="var(--color-gold)" strokeWidth="0.3" />
        <line x1="50" y1="15" x2="50" y2="85" stroke="var(--color-gold)" strokeWidth="0.2" />
        <line x1="15" y1="50" x2="85" y2="50" stroke="var(--color-gold)" strokeWidth="0.2" />
      </svg>
    </div>
  );

  const content = (
    <div
      className={`relative overflow-hidden bg-navy-deep ${className}`}
      style={{ width: size === 0 ? "100%" : size, height: size === 0 ? "100%" : size }}
    >
      {/* Image or placeholder */}
      {imageUrl && !error ? (
        <>
          {/* Blur-up placeholder behind real image */}
          {!loaded && fallback}
          <motion.img
            src={imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={loaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            loading={_priority ? "eager" : "lazy"}
          />
        </>
      ) : (
        fallback
      )}

      {/* Overlay on hover */}
      {overlay && (
        <div className="absolute inset-0 bg-navy-deepest/0 hover:bg-navy-deepest/60 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      )}
    </div>
  );

  if (postUrl) {
    return (
      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
