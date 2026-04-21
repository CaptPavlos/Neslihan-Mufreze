"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CALENDLY_URL } from "@/lib/links";

function CompassRose() {
  return (
    <svg
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.04] animate-[spin_20s_linear_infinite]"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="90" stroke="var(--color-gold)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="80" stroke="var(--color-gold)" strokeWidth="0.3" />
      <circle cx="100" cy="100" r="60" stroke="var(--color-gold)" strokeWidth="0.3" />
      <polygon points="100,10 104,90 96,90" fill="var(--color-gold)" opacity="0.3" />
      <polygon points="100,190 96,110 104,110" fill="var(--color-gold)" opacity="0.15" />
      <polygon points="190,100 110,96 110,104" fill="var(--color-gold)" opacity="0.15" />
      <polygon points="10,100 90,104 90,96" fill="var(--color-gold)" opacity="0.15" />
      <polygon points="164,36 108,92 92,108" fill="none" stroke="var(--color-gold)" strokeWidth="0.3" />
      <polygon points="164,164 108,108 92,92" fill="none" stroke="var(--color-gold)" strokeWidth="0.3" />
      <polygon points="36,164 92,108 108,92" fill="none" stroke="var(--color-gold)" strokeWidth="0.3" />
      <polygon points="36,36 92,92 108,108" fill="none" stroke="var(--color-gold)" strokeWidth="0.3" />
      <circle cx="100" cy="100" r="3" fill="var(--color-gold)" opacity="0.3" />
      <circle cx="100" cy="100" r="1.5" fill="var(--color-gold)" opacity="0.5" />
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = (i * 10 * Math.PI) / 180;
        const r1 = 88;
        const r2 = i % 9 === 0 ? 82 : 85;
        return (
          <line
            key={i}
            x1={100 + r1 * Math.sin(angle)}
            y1={100 - r1 * Math.cos(angle)}
            x2={100 + r2 * Math.sin(angle)}
            y2={100 - r2 * Math.cos(angle)}
            stroke="var(--color-gold)"
            strokeWidth={i % 9 === 0 ? "0.5" : "0.3"}
          />
        );
      })}
    </svg>
  );
}

function ScrollIndicator() {
  const t = useTranslations("Hero");

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-bone/40 font-sans">
        {t("scroll")}
      </span>
      <div className="w-12 h-px bg-gold/30 relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full bg-gold animate-[scrollLine_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("Hero");
  const prefersReducedMotion = useReducedMotion();

  const stagger = (delay: number) =>
    prefersReducedMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deepest via-navy-deep to-navy-deepest z-0" />
      <CompassRose />

      <motion.span
        className="absolute top-24 right-6 md:right-12 z-[2] font-sans text-[10px] tracking-[0.25em] text-bone/30 uppercase"
        {...stagger(0.2)}
      >
        {t("coordinates")}
      </motion.span>

      <div className="relative z-[2] mx-auto max-w-7xl px-6 py-32 md:py-0 flex flex-col items-start text-left">
        <motion.p
          className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold-dim mb-6"
          {...stagger(0.3)}
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight max-w-3xl"
          {...stagger(0.5)}
        >
          {t("headingStart")}
          <em className="text-gold italic">{t("headingHighlight")}</em>
          {t("headingEnd")}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-bone/70 font-sans"
          {...stagger(0.7)}
        >
          {t("description")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-start gap-4"
          {...stagger(0.9)}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm px-8 py-3.5 text-base font-semibold tracking-wide bg-gold text-navy-deepest hover:bg-gold-light transition-colors duration-200 font-sans"
          >
            {t("bookCall")}
          </a>
          <Link
            href="/#services-books"
            className="inline-flex items-center justify-center rounded-sm px-8 py-3.5 text-base font-medium tracking-wide border border-gold text-gold hover:bg-gold/10 transition-colors duration-200 font-sans"
          >
            {t("exploreResources")}
          </Link>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
