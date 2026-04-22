"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface BookHeroProps {
  title: string;
  tagline: string;
  format: string;
  language: string;
  pages: string;
  delivery: string;
  price: string;
  ctaLabel: string;
  ctaHref: string;
  coverGradientFrom?: string;
  coverGradientTo?: string;
  comingSoon?: boolean;
  comingSoonLabel?: string;
}

function BookMockup({
  title,
  from,
  to,
}: {
  title: string;
  from: string;
  to: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-center justify-center" style={{ perspective: "1200px" }}>
      <motion.div
        className="relative cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        initial={prefersReducedMotion ? {} : { rotateY: -25 }}
        animate={{ rotateY: -25 }}
        whileHover={prefersReducedMotion ? {} : { rotateY: -8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className="relative h-[400px] w-[280px] rounded-r-md shadow-2xl sm:h-[480px] sm:w-[340px]"
          style={{
            background: `linear-gradient(135deg, ${from}, ${to})`,
          }}
        >
          <div
            className="absolute left-0 top-0 h-full w-3 rounded-l-sm"
            style={{
              background: "linear-gradient(180deg, var(--color-gold), var(--color-gold-dim))",
            }}
          />
          <div className="flex h-full flex-col items-center justify-center px-8 text-center">
            <div className="mb-6 h-px w-16 bg-gold/40" />
            <h2 className="font-serif text-2xl leading-tight text-bone sm:text-3xl">
              {title}
            </h2>
            <div className="mt-6 h-px w-16 bg-gold/40" />
            <p className="mt-6 text-xs tracking-[0.3em] text-bone/50 uppercase">
              Neslihan Müfreze
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-2 rounded-b-sm bg-black/20" />
        </div>
        <div
          className="absolute right-[-8px] top-[4px] h-[calc(100%-8px)] w-2 rounded-r-[1px]"
          style={{
            background: "linear-gradient(90deg, #d4d0c8, #f0ece4, #d4d0c8)",
          }}
        />
      </motion.div>
    </div>
  );
}

export function BookHero({
  title,
  tagline,
  format,
  language,
  pages,
  delivery,
  price,
  ctaLabel,
  ctaHref,
  coverGradientFrom = "var(--color-navy)",
  coverGradientTo = "var(--color-navy-deep)",
  comingSoon = false,
  comingSoonLabel,
}: BookHeroProps) {
  const t = useTranslations("BookHero");
  const prefersReducedMotion = useReducedMotion();
  const metaValues = { format, language, pages, delivery };

  const META_ITEMS: { label: string; key: keyof typeof metaValues }[] = [
    { label: t("formatLabel"), key: "format" },
    { label: t("languageLabel"), key: "language" },
    { label: t("pagesLabel"), key: "pages" },
    { label: t("deliveryLabel"), key: "delivery" },
  ];

  const stagger = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        };

  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <BookMockup
              title={title}
              from={coverGradientFrom}
              to={coverGradientTo}
            />
          </div>

          <div className="order-1 lg:order-2">
            <motion.nav className="mb-6 text-sm text-bone/50" {...stagger(0)}>
              <Link href="/" className="hover:text-gold transition-colors">{t("home")}</Link>
              <span className="mx-2">/</span>
              <span className="text-bone/70">{t("books")}</span>
              <span className="mx-2">/</span>
              <span className="text-gold-dim">{title}</span>
            </motion.nav>

            <motion.h1 className="font-serif text-[clamp(2rem,5.5vw,3rem)] leading-tight text-bone" {...stagger(0.1)}>
              {title}
            </motion.h1>

            <motion.p className="mt-4 text-lg leading-relaxed text-bone/60" {...stagger(0.2)}>
              {tagline}
            </motion.p>

            <motion.div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4" {...stagger(0.3)}>
              {META_ITEMS.map(({ label, key }) => (
                <div key={key} className="text-center rounded-sm border border-slate/20 bg-navy-deep/40 px-3 py-3">
                  <p className="text-[0.65rem] uppercase tracking-widest text-bone/40">{label}</p>
                  <p className="mt-1 text-sm font-medium text-bone/80">{metaValues[key]}</p>
                </div>
              ))}
            </motion.div>

            <motion.div className="mt-8 flex flex-wrap items-center gap-6" {...stagger(0.4)}>
              {comingSoon ? (
                <span className="inline-flex items-center rounded-full border border-gold/50 bg-gold/10 px-4 py-2 font-serif text-lg tracking-wide text-gold">
                  {comingSoonLabel ?? ctaLabel}
                </span>
              ) : (
                <>
                  <span className="font-serif text-4xl text-gold">{price}</span>
                  <Link href={ctaHref}>
                    <Button variant="primary" size="lg">{ctaLabel}</Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
