"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { InstagramImage } from "@/components/instagram-image";
import { SectionMarker } from "@/components/ui/section-marker";
import { FadeIn } from "@/components/ui/fade-in";

interface PostData {
  id: string;
  likes: number;
  caption: string;
}

const PLACEHOLDER_POSTS: PostData[] = [
  { id: "1", likes: 2847, caption: "Another sunrise from the bridge. Never gets old." },
  { id: "2", likes: 1923, caption: "DP station keeping — precision is everything." },
  { id: "3", likes: 3156, caption: "Golden hour hits different at sea." },
  { id: "4", likes: 1482, caption: "Morning briefing — safety first, always." },
  { id: "5", likes: 2291, caption: "Crew change day. See you in 28 days." },
  { id: "6", likes: 3574, caption: "My office view for the next rotation." },
  { id: "7", likes: 4102, caption: "Book launch day — dreams do come true." },
  { id: "8", likes: 2638, caption: "Peace on the open water." },
];

function FeedImage({ post, index }: { post: PostData; index: number }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer"
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <InstagramImage
        postIndex={index}
        size={0}
        className="aspect-square w-full h-full transition-transform duration-500 group-hover:scale-105"
        overlay={false}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-deepest/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-2 text-bone">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gold">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <span className="text-sm font-semibold">{post.likes.toLocaleString()}</span>
        </div>
        <p className="mt-2 px-4 text-center text-xs text-bone/70 line-clamp-2">{post.caption}</p>
      </div>
    </motion.div>
  );
}

export function InstagramFeed() {
  const t = useTranslations("Instagram");

  return (
    <section id="instagram" className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionMarker>{t("sectionMarker")}</SectionMarker>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-bone">{t("heading")}</h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://instagram.com/neslihanmufreze"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-gold px-5 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                {t("follow")}
              </a>
            </div>
            <p className="mt-4 text-sm text-bone/50 tracking-wide">{t("stats")}</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {PLACEHOLDER_POSTS.map((post, i) => (
            <FeedImage key={post.id} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
