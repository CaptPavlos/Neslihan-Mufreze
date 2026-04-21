"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { SectionMarker } from "@/components/ui/section-marker";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { CALENDLY_URL } from "@/lib/links";

export function Consulting() {
  const t = useTranslations("Consulting");
  const prefersReducedMotion = useReducedMotion();

  const INCLUDES = [
    t("include1"),
    t("include2"),
    t("include3"),
    t("include4"),
    t("include5"),
  ];

  return (
    <section id="consulting" className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionMarker>{t("sectionMarker")}</SectionMarker>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-bone">{t("heading")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-bone/60">{t("description")}</p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 md:grid-cols-[1fr_minmax(0,420px)] md:items-stretch md:gap-14">
          <FadeIn direction="left" delay={0.05} className="h-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-slate/20 bg-navy-deep/40 md:aspect-auto md:h-full">
              <Image
                src="/photos/photo-9.jpeg"
                alt={t("sessionTitle")}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="h-full">
            <div className="relative flex h-full flex-col rounded-sm border-2 border-gold bg-gold/5 p-8 sm:p-10">
              <h3 className="font-serif text-2xl text-bone sm:text-3xl">{t("sessionTitle")}</h3>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-bone/50 font-sans">
                {t("sessionDuration")}
              </p>
              <p className="mt-6 text-base leading-relaxed text-bone/70">
                {t("sessionDescription")}
              </p>

              <div className="mt-8">
                <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-sans">
                  {t("includesTitle")}
                </h4>
                <ul className="mt-5 space-y-3">
                  {INCLUDES.map((item, i) =>
                    prefersReducedMotion ? (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-bone/85 font-sans"
                      >
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                    ) : (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: "easeOut" }}
                        className="flex items-start gap-3 text-sm leading-relaxed text-bone/85 font-sans"
                      >
                        <CheckIcon />
                        <span>{item}</span>
                      </motion.li>
                    ),
                  )}
                </ul>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="font-serif text-5xl text-gold">{t("sessionPrice")}</span>
                <span className="text-sm uppercase tracking-[0.2em] text-bone/50 font-sans">
                  {t("sessionCurrency")}
                </span>
              </div>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block"
              >
                <Button variant="primary" size="lg" className="w-full">
                  {t("bookSession")}
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5L6.5 12L13 4.5" />
    </svg>
  );
}
