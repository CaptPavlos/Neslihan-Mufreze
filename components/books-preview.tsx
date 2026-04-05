"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionMarker } from "@/components/ui/section-marker";
import { FadeIn } from "@/components/ui/fade-in";

function MiniBookMockup({ title, from, to }: { title: string; from: string; to: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-center justify-center" style={{ perspective: "900px" }}>
      <motion.div
        className="relative"
        style={{ transformStyle: "preserve-3d" }}
        initial={prefersReducedMotion ? {} : { rotateY: -20 }}
        animate={{ rotateY: -20 }}
        whileHover={prefersReducedMotion ? {} : { rotateY: -6 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className="relative h-[220px] w-[155px] rounded-r-md shadow-xl sm:h-[260px] sm:w-[180px]"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          <div
            className="absolute left-0 top-0 h-full w-2 rounded-l-sm"
            style={{ background: "linear-gradient(180deg, var(--color-gold), var(--color-gold-dim))" }}
          />
          <div className="flex h-full flex-col items-center justify-center px-5 text-center">
            <div className="mb-3 h-px w-10 bg-gold/40" />
            <h3 className="font-serif text-base leading-tight text-bone sm:text-lg">{title}</h3>
            <div className="mt-3 h-px w-10 bg-gold/40" />
            <p className="mt-3 text-[9px] tracking-[0.25em] text-bone/50 uppercase">
              Neslihan Müfreze
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-b-sm bg-black/20" />
        </div>
        <div
          className="absolute right-[-6px] top-[3px] h-[calc(100%-6px)] w-1.5 rounded-r-[1px]"
          style={{ background: "linear-gradient(90deg, #d4d0c8, #f0ece4, #d4d0c8)" }}
        />
      </motion.div>
    </div>
  );
}

interface BookCardProps {
  title: string;
  tagline: string;
  price: string;
  href: string;
  learnMore: string;
  gradientFrom: string;
  gradientTo: string;
  index: number;
}

function BookCard({ title, tagline, price, href, learnMore, gradientFrom, gradientTo, index }: BookCardProps) {
  return (
    <FadeIn delay={index * 0.15}>
      <div className="flex flex-col items-center gap-6 rounded-sm border border-slate/20 bg-navy-deep/40 p-8 sm:flex-row sm:items-start sm:gap-10">
        <MiniBookMockup title={title} from={gradientFrom} to={gradientTo} />
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h3 className="font-serif text-2xl text-bone">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-bone/60">{tagline}</p>
          <span className="mt-3 font-serif text-2xl text-gold">{price}</span>
          <Link
            href={href}
            className="mt-4 inline-flex items-center text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            {learnMore}
          </Link>
        </div>
      </div>
    </FadeIn>
  );
}

export function BooksPreview() {
  const t = useTranslations("BooksPreview");

  return (
    <section id="books-preview" className="py-section-sm md:py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionMarker>{t("sectionMarker")}</SectionMarker>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <BookCard
            title={t("book1Title")}
            tagline={t("book1Tagline")}
            price={t("book1Price")}
            href="/books/kaptanliga-giden-yol"
            learnMore={t("learnMore")}
            gradientFrom="var(--color-navy)"
            gradientTo="var(--color-navy-deep)"
            index={0}
          />
          <BookCard
            title={t("book2Title")}
            tagline={t("book2Tagline")}
            price={t("book2Price")}
            href="/books/offshore-life"
            learnMore={t("learnMore")}
            gradientFrom="var(--color-navy-mid)"
            gradientTo="var(--color-navy-deepest)"
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
