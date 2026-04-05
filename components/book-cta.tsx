"use client";

import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

interface BookCtaProps {
  heading: string;
  subtitle: string;
  price: string;
  ctaLabel: string;
  ctaHref: string;
}

export function BookCta({ heading, subtitle, price, ctaLabel, ctaHref }: BookCtaProps) {
  return (
    <section className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div
            className="rounded-sm px-8 py-16 text-center sm:px-16"
            style={{
              background: "linear-gradient(135deg, var(--color-navy-mid), var(--color-navy))",
            }}
          >
            <h3 className="font-serif text-3xl text-bone sm:text-4xl">{heading}</h3>
            <p className="mx-auto mt-4 max-w-xl text-base text-bone/60">{subtitle}</p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <span className="font-serif text-4xl text-gold">{price}</span>
              <Link href={ctaHref}>
                <Button variant="primary" size="lg">{ctaLabel}</Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
