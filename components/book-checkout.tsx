"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { StripeCheckout } from "@/components/stripe-checkout";
import { FadeIn } from "@/components/ui/fade-in";

interface BookCheckoutProps {
  priceId: string;
  successUrl: string;
  bookTitle: string;
}

export function BookCheckout({
  priceId,
  successUrl,
  bookTitle,
}: BookCheckoutProps) {
  const t = useTranslations("BookCheckout");
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <section id="buy" className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-bone">
              {t("heading")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-bone/60">
              {t("description", { bookTitle })}
            </p>
          </div>
        </FadeIn>

        <div className="mt-10">
          {showCheckout ? (
            <StripeCheckout
              priceId={priceId}
              mode="book"
              successUrl={successUrl}
            />
          ) : (
            <FadeIn>
              <div className="text-center">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="inline-flex items-center justify-center rounded-sm px-10 py-4 text-lg font-semibold tracking-wide bg-gold text-navy-deepest hover:bg-gold-light transition-colors duration-200 font-sans cursor-pointer"
                >
                  {t("proceedToCheckout")}
                </button>
                <p className="mt-4 text-xs text-bone/40">
                  {t("securePayment")}
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
