"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/ui/fade-in";

export function Footer() {
  const t = useTranslations("Footer");

  const NAVIGATE_LINKS = [
    { label: t("herStory"), href: "/#her-story" as const },
    { label: t("instagram"), href: "/#instagram" as const },
    { label: t("consulting"), href: "/#consulting" as const },
    { label: t("contact"), href: "/#contact" as const },
  ];

  const BOOK_LINKS = [
    { label: "Kaptanlığa Giden Yol", href: "/books/kaptanliga-giden-yol" as const },
    { label: "Offshore Life", href: "/books/offshore-life" as const },
  ];

  const CONNECT_LINKS = [
    { label: "Instagram", href: "https://instagram.com/neslihanmufreze", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/neslihanmufreze", external: true },
    { label: t("email"), href: "mailto:hello@neslihanmufreze.com", external: false },
  ];

  return (
    <footer className="bg-navy-deep border-t border-slate/20">
      <FadeIn direction="none" duration={0.6}>
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-serif text-xl tracking-wide text-bone hover:text-gold transition-colors">
              Neslihan Müfreze
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-bone/60 max-w-xs">{t("description")}</p>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dim mb-4">{t("navigate")}</h4>
            <ul className="space-y-3">
              {NAVIGATE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-bone/60 hover:text-gold transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dim mb-4">{t("booksTitle")}</h4>
            <ul className="space-y-3">
              {BOOK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-bone/60 hover:text-gold transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gold-dim mb-4">{t("connect")}</h4>
            <ul className="space-y-3">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-bone/60 hover:text-gold transition-colors">{link.label}</a>
                  ) : (
                    <a href={link.href} className="text-sm text-bone/60 hover:text-gold transition-colors">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      </FadeIn>
      <div className="border-t border-slate/20">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-bone/40">&copy; {new Date().getFullYear()} {t("copyright")}</p>
          <p className="text-xs text-bone/40">{t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
