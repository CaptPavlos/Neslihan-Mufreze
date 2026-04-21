import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { BookNav } from "@/components/book-nav";
import { BookHero } from "@/components/book-hero";
import { BookToc } from "@/components/book-toc";
import { BookAuthor } from "@/components/book-author";
import { BookReviews } from "@/components/book-reviews";
import { BookFaq } from "@/components/book-faq";
import { BookCta } from "@/components/book-cta";
import { Footer } from "@/components/footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Book1" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "https://www.neslihanmufreze.com/books/kaptanliga-giden-yol",
      languages: {
        tr: "https://www.neslihanmufreze.com/books/kaptanliga-giden-yol",
        en: "https://www.neslihanmufreze.com/en/books/kaptanliga-giden-yol",
        "x-default": "https://www.neslihanmufreze.com/books/kaptanliga-giden-yol",
      },
    },
    openGraph: {
      title: `${t("title")} — Neslihan Müfreze`,
      description: t("metaDescription"),
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      url: "https://www.neslihanmufreze.com/books/kaptanliga-giden-yol",
      images: [
        {
          url: "/api/og?title=Kaptanl%C4%B1%C4%9Fa%20Giden%20Yol&subtitle=T%C3%BCrk%20Denizcilik%20Kariyer%20Rehberi",
          width: 1200,
          height: 630,
          alt: `${t("title")} — Neslihan Müfreze`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("title")} — Neslihan Müfreze`,
      description: t("metaDescription"),
      images: ["/api/og?title=Kaptanl%C4%B1%C4%9Fa%20Giden%20Yol&subtitle=T%C3%BCrk%20Denizcilik%20Kariyer%20Rehberi"],
    },
  };
}

const BUY_HREF = "#buy";

export default async function KaptanligaGidenYol({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Book1" });

  const CHAPTERS = [
    { number: 1, title: t("ch1") },
    { number: 2, title: t("ch2") },
    { number: 3, title: t("ch3") },
    { number: 4, title: t("ch4") },
    { number: 5, title: t("ch5") },
    { number: 6, title: t("ch6") },
    { number: 7, title: t("ch7") },
    { number: 8, title: t("ch8") },
    { number: 9, title: t("ch9") },
    { number: 10, title: t("ch10") },
  ];

  const REVIEWS = [
    { stars: 5, quote: t("review1Quote"), name: t("review1Name"), role: t("review1Role") },
    { stars: 5, quote: t("review2Quote"), name: t("review2Name"), role: t("review2Role") },
    { stars: 5, quote: t("review3Quote"), name: t("review3Name"), role: t("review3Role") },
    { stars: 4, quote: t("review4Quote"), name: t("review4Name"), role: t("review4Role") },
  ];

  const FAQ_ITEMS = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
    { question: t("faq4Q"), answer: t("faq4A") },
    { question: t("faq5Q"), answer: t("faq5A") },
  ];

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Kaptanlığa Giden Yol",
    author: {
      "@type": "Person",
      name: "Neslihan Müfreze",
      url: "https://www.neslihanmufreze.com",
    },
    description: t("tagline"),
    inLanguage: "tr",
    numberOfPages: 180,
    bookFormat: "https://schema.org/EBook",
    url: "https://www.neslihanmufreze.com/books/kaptanliga-giden-yol",
    offers: {
      "@type": "Offer",
      price: "29",
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      url: "https://www.neslihanmufreze.com/books/kaptanliga-giden-yol",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <BookNav ctaHref={BUY_HREF} ctaLabel={t("ctaLabel")} />

      <main className="flex-1">
        <BookHero
          title={t("title")}
          tagline={t("tagline")}
          format={t("format")}
          language={t("language")}
          pages={t("pages")}
          delivery={t("delivery")}
          price={t("price")}
          ctaLabel={t("heroCta")}
          ctaHref={BUY_HREF}
          coverGradientFrom="var(--color-navy)"
          coverGradientTo="var(--color-navy-deep)"
          comingSoon
          comingSoonLabel={t("comingSoon")}
        />

        <BookToc
          sectionMarker={t("tocSectionMarker")}
          intro={t("tocIntro")}
          introDescription={t("tocDescription")}
          chapters={CHAPTERS}
        />

        <BookAuthor
          name={t("authorName")}
          credentials={t("authorCredentials")}
          bio={t("authorBio")}
          sectionLabel={t("authorSectionLabel")}
        />

        <BookReviews
          reviews={REVIEWS}
          sectionMarker={t("reviewsSectionMarker")}
          heading={t("reviewsHeading")}
        />

        <BookFaq
          items={FAQ_ITEMS}
          sectionMarker={t("faqSectionMarker")}
          heading={t("faqHeading")}
        />

        <BookCta
          heading={t("ctaHeading")}
          subtitle={t("ctaSubtitle")}
          price={t("price")}
          ctaLabel={t("ctaButton")}
          ctaHref={BUY_HREF}
          comingSoon
          comingSoonLabel={t("comingSoon")}
        />
      </main>

      <Footer />
    </>
  );
}
