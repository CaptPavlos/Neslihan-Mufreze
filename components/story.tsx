"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionMarker } from "@/components/ui/section-marker";
import { RotatingPortrait } from "@/components/rotating-portrait";

export function Story() {
  const t = useTranslations("Story");

  const STATS = [
    { value: "127K+", label: t("statFollowers") },
    { value: "12+", label: t("statYears") },
    { value: "1st", label: t("statFirst") },
  ];

  return (
    <section id="her-story" className="py-section-sm md:py-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left" delay={0.1}>
            <RotatingPortrait />
          </FadeIn>

          <div>
            <FadeIn delay={0.2}>
              <SectionMarker>{t("sectionMarker")}</SectionMarker>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h2 className="mt-6 font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
                {t("headingStart")}
                <em className="text-gold italic">{t("headingHighlight1")}</em>
                {t("headingMid")}
                <em className="text-gold italic">{t("headingHighlight2")}</em>
              </h2>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="mt-6 text-base leading-relaxed text-bone/70 font-sans">
                {t("paragraph1")}
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="mt-4 text-base leading-relaxed text-bone/70 font-sans">
                {t("paragraph2")}
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-10 flex flex-wrap gap-8 md:gap-12">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <span className="block font-serif text-3xl md:text-4xl text-gold tracking-tight">
                      {stat.value}
                    </span>
                    <span className="block mt-1 text-xs uppercase tracking-[0.2em] text-bone/50 font-sans">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
