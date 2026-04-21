import { setRequestLocale, getTranslations } from "next-intl/server";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ServicesBooksPreview } from "@/components/services-books-preview";
import { Story } from "@/components/story";
import { GalleryStrip } from "@/components/gallery-strip";
import { InstagramFeed } from "@/components/instagram-feed";
import { Consulting } from "@/components/consulting";
import { Testimonials } from "@/components/testimonials";
import { BooksPreview } from "@/components/books-preview";
import { Footer } from "@/components/footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Neslihan Müfreze",
    url: "https://www.neslihanmufreze.com",
    jobTitle: "Unlimited Dynamic Positioning Operator",
    description: t("Metadata.description"),
    nationality: "Turkish",
    knowsLanguage: ["tr", "en"],
    workLocation: {
      "@type": "Place",
      name: "Offshore / Turkey",
    },
    sameAs: [
      "https://www.instagram.com/neslihanmufreze",
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "tr" ? "Denizcilik Danışmanlığı" : "Maritime Consulting",
    provider: {
      "@type": "Person",
      name: "Neslihan Müfreze",
    },
    description: t("Consulting.description"),
    url: "https://www.neslihanmufreze.com/#consulting",
    areaServed: [
      {
        "@type": "Country",
        name: "Turkey",
      },
      {
        "@type": "AdministrativeArea",
        name: "International / Offshore",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Nav />
      <main className="flex-1">
        <Hero />
        <ServicesBooksPreview />
        <Story />
        <GalleryStrip />
        <Consulting />
        <Testimonials />
        <BooksPreview comingSoon />
        <InstagramFeed />
      </main>
      <Footer />
    </>
  );
}
