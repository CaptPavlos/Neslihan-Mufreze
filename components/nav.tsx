"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Nav() {
  const t = useTranslations("Nav");
  const tSwitcher = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const NAV_LINKS = [
    { label: t("herStory"), href: "/#her-story" as const },
    { label: t("instagram"), href: "/#instagram" as const },
    { label: t("consulting"), href: "/#consulting" as const },
    { label: t("books"), href: "/#books" as const },
    { label: t("contact"), href: "/#contact" as const },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function switchLocale() {
    const nextLocale = locale === "tr" ? "en" : "tr";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <>
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

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm font-sans text-bone/80 hover:text-gold transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={switchLocale}
                className="inline-flex min-h-11 items-center text-sm font-sans tracking-wide transition-colors cursor-pointer gap-1"
              >
                <span className={locale === "tr" ? "text-gold font-semibold" : "text-bone/50 hover:text-bone/80"}>
                  {tSwitcher("tr")}
                </span>
                <span className="text-bone/30">/</span>
                <span className={locale === "en" ? "text-gold font-semibold" : "text-bone/50 hover:text-bone/80"}>
                  {tSwitcher("en")}
                </span>
              </button>
            </li>
          </ul>

          <button
            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-bone transition-all duration-300 ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-bone transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-bone transition-all duration-300 ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-navy-deepest/98 md:hidden"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav>
              <ul className="flex flex-col items-center gap-8">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 20 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { delay: 0.1 + i * 0.08, duration: 0.35, ease: "easeOut" }
                    }
                  >
                    <Link
                      href={link.href}
                      className="font-serif text-3xl text-bone hover:text-gold transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: 0.1 + NAV_LINKS.length * 0.08, duration: 0.35, ease: "easeOut" }
                  }
                >
                  <button
                    onClick={() => {
                      switchLocale();
                      setMobileOpen(false);
                    }}
                    className="font-serif text-2xl text-bone hover:text-gold transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <span className={locale === "tr" ? "text-gold" : "text-bone/50"}>
                      {tSwitcher("tr")}
                    </span>
                    <span className="text-bone/30">/</span>
                    <span className={locale === "en" ? "text-gold" : "text-bone/50"}>
                      {tSwitcher("en")}
                    </span>
                  </button>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
