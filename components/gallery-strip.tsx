"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionMarker } from "@/components/ui/section-marker";

const PHOTOS = [
  "/photos/photo-2.jpeg",
  "/photos/photo-11.jpeg",
  "/photos/photo-12.jpeg",
  "/photos/photo-6.jpeg",
  "/photos/photo-7.jpeg",
  "/photos/photo-8.jpeg",
];

export function GalleryStrip() {
  const t = useTranslations("Gallery");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-section-sm">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionMarker>{t("sectionMarker")}</SectionMarker>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl text-bone">
                {t("heading")}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-bone/60 font-sans">
              {t("description")}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3 sm:gap-4">
              {PHOTOS.map((src, i) => (
                <motion.div
                  key={src}
                  className="relative flex-shrink-0 overflow-hidden rounded-sm border border-slate/20 bg-navy-deep/40"
                  style={{ width: "clamp(220px, 28vw, 320px)", aspectRatio: "3 / 4" }}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 24, scale: 0.96 }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                >
                  <Image
                    src={src}
                    alt={t("photoAlt", { index: i + 1 })}
                    fill
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 35vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
