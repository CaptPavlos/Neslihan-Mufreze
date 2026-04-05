"use client";

import { useTranslations } from "next-intl";
import { SectionMarker } from "@/components/ui/section-marker";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";

interface ConsultingTier {
  name: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  calLink: string;
}

const CAL_LINK_30 = process.env.NEXT_PUBLIC_CAL_COM_LINK_30 ?? "neslihanmufreze/30min";
const CAL_LINK_60 = process.env.NEXT_PUBLIC_CAL_COM_LINK_60 ?? "neslihanmufreze/60min";
const CAL_LINK_PKG = process.env.NEXT_PUBLIC_CAL_COM_LINK_PKG ?? "neslihanmufreze/mentorship";

function ConsultingCard({ tier, index, bookAndPayLabel }: { tier: ConsultingTier; index: number; bookAndPayLabel: string }) {
  return (
    <FadeIn delay={index * 0.1}>
      <div
        className={`relative flex h-full flex-col rounded-sm p-8 transition-colors ${
          tier.featured
            ? "border-2 border-gold bg-gold/5"
            : "border border-slate/30 bg-navy-deep/50 hover:border-slate/50"
        }`}
      >
        {tier.badge && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-navy-deepest">
            {tier.badge}
          </span>
        )}

        <div className="mb-6">
          <h3 className="font-serif text-xl text-bone">{tier.name}</h3>
          <p className="mt-1 text-sm text-bone/50">{tier.duration}</p>
        </div>

        <div className="mb-6">
          <span className="font-serif text-4xl text-gold">{tier.price}</span>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-bone/60">{tier.description}</p>

        <ul className="mb-8 flex-1 space-y-3">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-bone/70">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-4 w-4 shrink-0 text-gold-dim">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        <a href={`https://cal.com/${tier.calLink}`} target="_blank" rel="noopener noreferrer" className="block">
          <Button variant={tier.featured ? "primary" : "ghost"} size="lg" className="w-full">
            {bookAndPayLabel}
          </Button>
        </a>
      </div>
    </FadeIn>
  );
}

export function Consulting() {
  const t = useTranslations("Consulting");

  const TIERS: ConsultingTier[] = [
    {
      name: t("tier1Name"),
      duration: t("tier1Duration"),
      price: "€75",
      description: t("tier1Description"),
      features: [t("tier1Feature1"), t("tier1Feature2"), t("tier1Feature3")],
      calLink: CAL_LINK_30,
    },
    {
      name: t("tier2Name"),
      duration: t("tier2Duration"),
      price: "€130",
      description: t("tier2Description"),
      features: [t("tier2Feature1"), t("tier2Feature2"), t("tier2Feature3"), t("tier2Feature4")],
      featured: true,
      badge: t("tier2Badge"),
      calLink: CAL_LINK_60,
    },
    {
      name: t("tier3Name"),
      duration: t("tier3Duration"),
      price: "€340",
      description: t("tier3Description"),
      features: [t("tier3Feature1"), t("tier3Feature2"), t("tier3Feature3"), t("tier3Feature4"), t("tier3Feature5")],
      calLink: CAL_LINK_PKG,
    },
  ];

  return (
    <section id="consulting" className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <SectionMarker>{t("sectionMarker")}</SectionMarker>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-bone">{t("heading")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-bone/60">{t("description")}</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <ConsultingCard key={tier.name} tier={tier} index={i} bookAndPayLabel={t("bookAndPay")} />
          ))}
        </div>
      </div>
    </section>
  );
}
