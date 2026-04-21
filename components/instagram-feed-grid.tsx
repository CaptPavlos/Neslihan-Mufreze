"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { InstagramPost } from "@/lib/instagram";

interface InstagramFeedGridProps {
  posts: InstagramPost[];
}

function FeedTile({ post, index }: { post: InstagramPost; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const isAboveFold = index < 4;

  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={post.caption || "View Instagram post"}
      className="group relative block aspect-square overflow-hidden rounded-sm bg-navy-deep"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Image
        src={post.imageUrl}
        alt={post.caption || "Instagram post"}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        loading={isAboveFold ? "eager" : "lazy"}
      />

      {post.mediaType === "VIDEO" && (
        <div className="absolute right-2 top-2 rounded-full bg-navy-deepest/70 p-1.5 text-bone">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {post.mediaType === "CAROUSEL_ALBUM" && (
        <div className="absolute right-2 top-2 rounded-full bg-navy-deepest/70 p-1.5 text-bone">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
            <rect x="8" y="8" width="12" height="12" rx="2" />
            <path d="M4 16V6a2 2 0 0 1 2-2h10" />
          </svg>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-navy-deepest/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gold">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        {post.caption && (
          <p className="mt-2 line-clamp-3 px-4 text-center text-xs text-bone/80">
            {post.caption}
          </p>
        )}
      </div>
    </motion.a>
  );
}

export function InstagramFeedGrid({ posts }: InstagramFeedGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
      {posts.map((post, i) => (
        <FeedTile key={post.id} post={post} index={i} />
      ))}
    </div>
  );
}
