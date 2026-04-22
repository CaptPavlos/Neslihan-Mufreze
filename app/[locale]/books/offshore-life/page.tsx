import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { BookNav } from "@/components/book-nav";
import { BookAuthor } from "@/components/book-author";
import { BookCta } from "@/components/book-cta";
import { Footer } from "@/components/footer";
import { BookHero } from "@/components/book/book-hero";
import { BookChapters, type Chapter } from "@/components/book/book-chapters";
import { BookReviews, type Review } from "@/components/book/book-reviews";
import { BookFAQ, type FAQItem } from "@/components/book/book-faq";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Book2" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "https://www.neslihanmufreze.com/books/offshore-life",
      languages: {
        tr: "https://www.neslihanmufreze.com/books/offshore-life",
        en: "https://www.neslihanmufreze.com/en/books/offshore-life",
        "x-default": "https://www.neslihanmufreze.com/books/offshore-life",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      url: "https://www.neslihanmufreze.com/books/offshore-life",
      images: [
        {
          url: "/api/og?title=Offshore%20Life&subtitle=Bilingual%20Guide%20to%20Life%20at%20Sea",
          width: 1200,
          height: 630,
          alt: t("metaTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/api/og?title=Offshore%20Life&subtitle=Bilingual%20Guide%20to%20Life%20at%20Sea"],
    },
  };
}

const BUY_HREF = "#buy";

export default async function OffshoreLife({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Book2" });

  const CHAPTERS: Chapter[] = [
    { number: 1, title: t("ch1Title"), description: t("ch1Desc") },
    { number: 2, title: t("ch2Title"), description: t("ch2Desc") },
    { number: 3, title: t("ch3Title"), description: t("ch3Desc") },
    { number: 4, title: t("ch4Title"), description: t("ch4Desc") },
    { number: 5, title: t("ch5Title"), description: t("ch5Desc") },
    { number: 6, title: t("ch6Title"), description: t("ch6Desc") },
    { number: 7, title: t("ch7Title"), description: t("ch7Desc") },
    { number: 8, title: t("ch8Title"), description: t("ch8Desc") },
    { number: 9, title: t("ch9Title"), description: t("ch9Desc") },
    { number: 10, title: t("ch10Title"), description: t("ch10Desc") },
  ];

  const REVIEWS: Review[] = [
    { quote: t("review1Quote"), author: t("review1Author"), role: t("review1Role") },
    { quote: t("review2Quote"), author: t("review2Author"), role: t("review2Role") },
    { quote: t("review3Quote"), author: t("review3Author"), role: t("review3Role") },
    { quote: t("review4Quote"), author: t("review4Author"), role: t("review4Role") },
  ];

  const FAQ_ITEMS: FAQItem[] = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
    { question: t("faq4Q"), answer: t("faq4A") },
    { question: t("faq5Q"), answer: t("faq5A") },
  ];

  const siteUrl = "https://www.neslihanmufreze.com";
  const bookUrl = `${siteUrl}${locale === "tr" ? "" : "/en"}/books/offshore-life`;

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Offshore Life",
    alternateName: "Açık Deniz Hayatı",
    author: {
      "@type": "Person",
      name: "Neslihan Müfreze",
      url: siteUrl,
    },
    description: t("description"),
    inLanguage: ["en", "tr"],
    numberOfPages: 150,
    bookFormat: "https://schema.org/EBook",
    url: bookUrl,
    offers: {
      "@type": "Offer",
      price: "24",
      priceCurrency: "EUR",
      availability: "https://schema.org/PreOrder",
      url: bookUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "tr" ? "Ana Sayfa" : "Home",
        item: locale === "tr" ? siteUrl : `${siteUrl}/en`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "tr" ? "Kitaplar" : "Books",
        item: locale === "tr" ? siteUrl : `${siteUrl}/en`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Offshore Life",
        item: bookUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BookNav ctaHref={BUY_HREF} ctaLabel={t("ctaLabel")} />

      <main className="flex-1">
        <BookHero
          title={t("title")}
          subtitle={t("subtitle")}
          description={t("description")}
          price={t("price")}
          pages={t("pages")}
          language={t("language")}
          gradient="navy-slate"
          rotateDirection="ccw"
          buyNowLabel={t("buyNow")}
          comingSoon
          comingSoonLabel={t("comingSoon")}
        />

        <BookChapters chapters={CHAPTERS} sectionTitle={t("sectionTitle")} />

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

        <BookFAQ
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
