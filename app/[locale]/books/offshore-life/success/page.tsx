import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Book2Success" });

  return {
    title: t("metaTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function OffshoreLifeSuccess({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Book2Success" });

  return (
    <>
      <Nav />
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center px-6 max-w-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-8 w-8 text-gold"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-bone">{t("thankYou")}</h1>
          <p className="mt-2 font-serif text-lg text-gold italic">{t("thankYouSub")}</p>
          <p className="mt-6 text-base text-bone/70 leading-relaxed">{t("confirmation")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-sm px-6 py-2.5 text-sm font-semibold tracking-wide bg-gold text-navy-deepest hover:bg-gold-light transition-colors duration-200 font-sans"
            >
              {t("backToHome")}
            </Link>
            <Link
              href="/books/kaptanliga-giden-yol"
              className="inline-flex items-center justify-center rounded-sm px-6 py-2.5 text-sm font-medium tracking-wide border border-gold text-gold hover:bg-gold/10 transition-colors duration-200 font-sans"
            >
              {t("exploreOther")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
