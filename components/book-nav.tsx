"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

interface BookNavProps {
  ctaHref: string;
  ctaLabel?: string;
}

export function BookNav({ ctaHref, ctaLabel }: BookNavProps) {
  const t = useTranslations("BookHero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-navy-deep/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-xl tracking-wide text-bone hover:text-gold transition-colors"
        >
          Neslihan Müfreze
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-sans text-bone/70 hover:text-gold transition-colors hidden sm:inline-flex items-center gap-1.5"
          >
            <span>&larr;</span>
            <span>{t("home")}</span>
          </Link>
          <Link href={ctaHref}>
            <Button variant="primary" size="sm">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
