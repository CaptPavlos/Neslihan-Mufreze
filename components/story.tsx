"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionMarker } from "@/components/ui/section-marker";
import { RotatingPortrait } from "@/components/rotating-portrait";

export function Story() {
  const t = useTranslations("Story");

  const STATS = [
    { value: "142K+", label: t("statFollowers") },
    { value: "50M+", label: t("statReach") },
    { value: "9+", label: t("statYears") },
  ];

  const EXPERTISE = [
    t("expertise1"),
    t("expertise2"),
    t("expertise3"),
    t("expertise4"),
  ];

  return (
    <section id="her-story" className="py-section-sm md:py-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <FadeIn direction="left" delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <RotatingPortrait />
            </div>
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

            <FadeIn delay={0.35}>
              <p className="mt-4 inline-flex items-center rounded-sm border border-gold/40 bg-gold/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold font-sans">
                {t("statFirst")}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="mt-6 text-base leading-relaxed text-bone/80 font-sans">
                {t("paragraph1")}
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="mt-4 text-base leading-relaxed text-bone/70 font-sans">
                {t("paragraph2")}
              </p>
            </FadeIn>

            <FadeIn delay={0.55}>
              <p className="mt-4 text-base leading-relaxed text-bone/70 font-sans">
                {t("paragraph3")}
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="mt-6 border-l-2 border-gold/40 pl-5 text-base leading-relaxed text-bone/80 font-sans italic">
                <p>{t("paragraph4Line1")}</p>
                <p>{t("paragraph4Line2")}</p>
                <p>{t("paragraph4Line3")}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.65}>
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

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          <FadeIn delay={0.1}>
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-sans">
                {t("expertiseTitle")}
              </h3>
              <ul className="mt-5 space-y-3">
                {EXPERTISE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-bone/80 font-sans">
                    <span className="mt-2 block h-px w-3 flex-shrink-0 bg-gold/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-sans">
                {t("whatIOfferTitle")}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-bone/80 font-sans">
                {t("whatIOfferIntro")}
              </p>
              <div className="mt-4 text-sm leading-relaxed text-bone/70 font-sans">
                <p>{t("whatIOfferLine1")}</p>
                <p>{t("whatIOfferLine2")}</p>
                <p>{t("whatIOfferLine3")}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-bone/70 font-sans">
                {t("whatIOfferOutro")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-sans">
                {t("perspectiveTitle")}
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-bone/80 font-sans">
                {t("perspectiveLine1")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-bone/70 font-sans">
                {t("perspectiveLine2")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-bone/80 font-sans">
                {t("perspectiveLine3")}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
