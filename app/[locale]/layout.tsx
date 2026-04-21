import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { playfair, outfit } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | Neslihan Müfreze`,
    },
    description: t("description"),
    metadataBase: new URL("https://www.neslihanmufreze.com"),
    alternates: {
      canonical:
        locale === "tr"
          ? "https://www.neslihanmufreze.com"
          : `https://www.neslihanmufreze.com/en`,
      languages: {
        tr: "https://www.neslihanmufreze.com",
        en: "https://www.neslihanmufreze.com/en",
        "x-default": "https://www.neslihanmufreze.com",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      alternateLocale: locale === "tr" ? ["en_US"] : ["tr_TR"],
      url:
        locale === "tr"
          ? "https://www.neslihanmufreze.com"
          : "https://www.neslihanmufreze.com/en",
      siteName: "Neslihan Müfreze",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/api/og?title=Neslihan%20M%C3%BCfreze&subtitle=Offshore%20DPO%20%26%20Author",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [
        "/api/og?title=Neslihan%20M%C3%BCfreze&subtitle=Offshore%20DPO%20%26%20Author",
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "geo.region": "TR",
      "geo.placename": "Turkey",
      "geo.position": "37.7749;29.0167",
      ICBM: "37.7749, 29.0167",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://calendly.com" />
        <link
          rel="preconnect"
          href="https://www.instagram.com"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
