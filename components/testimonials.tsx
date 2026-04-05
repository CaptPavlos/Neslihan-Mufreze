"use client";

import { useTranslations } from "next-intl";
import { SectionMarker } from "@/components/ui/section-marker";
import { FadeIn } from "@/components/ui/fade-in";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <FadeIn delay={index * 0.12}>
      <div className="flex h-full flex-col rounded-sm border border-slate/20 bg-navy-deep/40 p-8">
        <span className="font-serif text-5xl leading-none text-gold-dim select-none">&ldquo;</span>
        <blockquote className="mt-2 flex-1 text-sm italic leading-relaxed text-bone/70">
          {testimonial.quote}
        </blockquote>
        <div className="mt-6 border-t border-slate/20 pt-4">
          <p className="text-sm font-semibold text-bone">{testimonial.author}</p>
          <p className="text-xs text-bone/50">{testimonial.role}</p>
        </div>
      </div>
    </FadeIn>
  );
}

export function Testimonials() {
  const t = useTranslations("Testimonials");

  const TESTIMONIALS: Testimonial[] = [
    { quote: t("quote1"), author: t("author1"), role: t("role1") },
    { quote: t("quote2"), author: t("author2"), role: t("role2") },
    { quote: t("quote3"), author: t("author3"), role: t("role3") },
  ];

  return (
    <section id="testimonials" className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionMarker>{t("sectionMarker")}</SectionMarker>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-bone">{t("heading")}</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
