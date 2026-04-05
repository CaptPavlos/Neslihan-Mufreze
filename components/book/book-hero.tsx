"use client";

import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionMarker } from "@/components/ui/section-marker";

interface BookHeroProps {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  pages: string;
  language: string;
  gradient: "navy-gold" | "navy-slate";
  rotateDirection: "cw" | "ccw";
  buyNowLabel?: string;
}

function BookMockup({ rotateDirection }: { rotateDirection: "cw" | "ccw" }) {
  const prefersReducedMotion = useReducedMotion();
  const rotation = rotateDirection === "cw" ? [0, 8, 0, -8, 0] : [0, -8, 0, 8, 0];

  return (
    <motion.div
      className="relative w-56 sm:w-64 md:w-72 aspect-[3/4] mx-auto"
      style={{ perspective: 800 }}
      animate={
        prefersReducedMotion
          ? {}
          : { rotateY: rotation }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <div className="absolute -left-2 top-2 bottom-2 w-6 bg-navy-deepest/60 rounded-l-sm blur-sm" />
      <div className="relative h-full w-full rounded-sm border border-gold/30 bg-gradient-to-br from-navy-mid via-navy to-navy-deep shadow-2xl shadow-navy-deepest/80 overflow-hidden">
        <div className="absolute inset-4 border border-gold/20 rounded-sm" />
        <div className="absolute inset-6 border border-gold/10 rounded-sm" />
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 opacity-10"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="var(--color-gold)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" stroke="var(--color-gold)" strokeWidth="0.3" />
          <polygon points="50,5 52,45 48,45" fill="var(--color-gold)" opacity="0.4" />
          <polygon points="50,95 48,55 52,55" fill="var(--color-gold)" opacity="0.2" />
          <polygon points="95,50 55,48 55,52" fill="var(--color-gold)" opacity="0.2" />
          <polygon points="5,50 45,52 45,48" fill="var(--color-gold)" opacity="0.2" />
        </svg>
        <div className="absolute bottom-8 left-0 right-0 text-center px-4">
          <div className="h-1 w-8 mx-auto bg-gold/40 rounded mb-3" />
          <div className="h-2 w-24 mx-auto bg-gold/30 rounded mb-2" />
          <div className="h-1.5 w-16 mx-auto bg-gold/20 rounded" />
        </div>
      </div>
    </motion.div>
  );
}

export function BookHero({
  title,
  subtitle,
  description,
  price,
  pages,
  language,
  gradient,
  rotateDirection,
  buyNowLabel = "Buy Now",
}: BookHeroProps) {
  const gradientClass =
    gradient === "navy-gold"
      ? "from-navy-deepest via-navy-deep to-navy"
      : "from-navy-deepest via-navy to-slate/20";

  return (
    <section className={`relative min-h-screen flex items-center bg-gradient-to-b ${gradientClass} overflow-hidden`}>
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <FadeIn>
              <SectionMarker>Book</SectionMarker>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] tracking-tight text-bone">
                {title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-3 font-serif text-xl text-gold italic">{subtitle}</p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-bone/70 max-w-lg">
                {description}
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-bone/60">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gold-dim">
                    <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06V4.94a.75.75 0 00-.546-.722A8.962 8.962 0 0015 4a8.96 8.96 0 00-4.25 1.065v11.757zM9.25 4.065A8.96 8.96 0 005 4c-.85 0-1.673.118-2.454.34A.75.75 0 002 5.06v10.12a.75.75 0 00.954.722A7.462 7.462 0 015 15.5a7.46 7.46 0 014.25 1.318V4.065z" />
                  </svg>
                  {pages}
                </span>
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gold-dim">
                    <path d="M7.75 2.75a.75.75 0 00-1.5 0v1.258a32.987 32.987 0 00-3.599.278.75.75 0 10.198 1.487A31.545 31.545 0 018.7 5.545a19.381 19.381 0 017.004 2.51.75.75 0 00.796-1.272 20.88 20.88 0 00-5.232-2.19V2.75z" />
                    <path d="M4.505 6.21A31.52 31.52 0 0110 5.795c1.913 0 3.78.163 5.584.472a.75.75 0 01.62.733V15a.75.75 0 01-.858.743A30.09 30.09 0 0010 15.27a30.09 30.09 0 00-5.346.472.75.75 0 01-.858-.744V6.943a.75.75 0 01.709-.733z" />
                  </svg>
                  {language}
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="font-serif text-4xl text-gold">{price}</span>
                <button className="inline-flex items-center justify-center rounded-sm px-8 py-3.5 text-base font-semibold tracking-wide bg-gold text-navy-deepest hover:bg-gold-light transition-colors duration-200 font-sans">
                  {buyNowLabel}
                </button>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="right">
            <BookMockup rotateDirection={rotateDirection} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
