"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { InstagramPost } from "@/lib/instagram";
import { formatCompactNumber } from "@/lib/format";

interface InstagramFeedGridProps {
  posts: InstagramPost[];
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function FeedTile({
  post,
  index,
  isDesktop,
}: {
  post: InstagramPost;
  index: number;
  isDesktop: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isPriority = index < 4;
  const stagger = isDesktop ? index * 0.05 : Math.min(index, 3) * 0.04;

  return (
    <motion.a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={post.caption || "View Instagram post"}
      className="group relative block aspect-square overflow-hidden rounded-sm bg-navy-deep min-h-11"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: stagger, ease: "easeOut" }}
    >
      <Image
        src={post.imageUrl}
        alt={post.caption || "Instagram post"}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={isPriority}
        loading={isPriority ? "eager" : "lazy"}
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

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center gap-5 bg-navy-deepest/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:gap-6"
        aria-hidden
      >
        <span className="flex items-center gap-1.5 text-bone">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <span className="text-sm font-semibold sm:text-base">
            {formatCompactNumber(post.likeCount)}
          </span>
        </span>
        <span className="flex items-center gap-1.5 text-bone">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 sm:h-5 sm:w-5">
            <path d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223z" />
          </svg>
          <span className="text-sm font-semibold sm:text-base">
            {formatCompactNumber(post.commentsCount)}
          </span>
        </span>
      </div>
    </motion.a>
  );
}

export function InstagramFeedGrid({ posts }: InstagramFeedGridProps) {
  const isDesktop = useIsDesktop();
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
      {posts.map((post, i) => (
        <FeedTile key={post.id} post={post} index={i} isDesktop={isDesktop} />
      ))}
    </div>
  );
}
