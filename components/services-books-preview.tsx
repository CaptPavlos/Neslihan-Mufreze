"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";
import { CALENDLY_URL } from "@/lib/links";

interface CardProps {
  title: string;
  body: string;
  cta: string;
  href: string;
  icon: "compass" | "book";
  delay: number;
  external?: boolean;
}

function Icon({ kind }: { kind: "compass" | "book" }) {
  if (kind === "compass") {
    return (
      <svg
        className="h-6 w-6 text-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <polygon points="12,5 13.5,11.5 12,12 10.5,11.5" fill="currentColor" opacity="0.6" stroke="none" />
        <polygon points="12,19 10.5,12.5 12,12 13.5,12.5" fill="currentColor" opacity="0.3" stroke="none" />
      </svg>
    );
  }
  return (
    <svg
      className="h-6 w-6 text-gold"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      aria-hidden
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5a2.5 2.5 0 0 0-2.5 2.5V5.5Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5Z" />
    </svg>
  );
}

function PreviewCard({ title, body, cta, href, icon, delay, external }: CardProps) {
  const linkClass =
    "inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light";

  return (
    <FadeIn delay={delay}>
      <div className="group relative flex h-full flex-col rounded-sm border border-slate/20 bg-navy-deep/40 p-8 transition-colors hover:border-gold/40">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/30 bg-gold/5">
            <Icon kind={icon} />
          </span>
          <h3 className="font-serif text-2xl text-bone">{title}</h3>
        </div>
        <p className="mt-5 text-base leading-relaxed text-bone/70 font-sans">{body}</p>
        <div className="mt-auto pt-8">
          {external ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {cta}
              <span aria-hidden>→</span>
            </a>
          ) : (
            <Link href={href} className={linkClass}>
              {cta}
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

export function ServicesBooksPreview() {
  const t = useTranslations("ServicesBooksPreview");

  return (
    <section id="services-books" className="py-section-sm md:py-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <PreviewCard
            title={t("consultingTitle")}
            body={t("consultingBody")}
            cta={t("consultingCta")}
            href={CALENDLY_URL}
            icon="compass"
            delay={0}
            external
          />
          <PreviewCard
            title={t("booksTitle")}
            body={t("booksBody")}
            cta={t("booksCta")}
            href="/#books-preview"
            icon="book"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}
