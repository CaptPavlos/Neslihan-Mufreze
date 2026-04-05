"use client";

import { useCallback, useState } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeCheckoutProps {
  priceId: string;
  mode?: "book" | "consulting";
  successUrl: string;
}

export function StripeCheckout({
  priceId,
  mode = "book",
  successUrl,
}: StripeCheckoutProps) {
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        mode,
        successUrl,
        cancelUrl: window.location.href,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error ?? "Failed to create checkout session");
    }

    const { clientSecret } = await res.json();
    return clientSecret;
  }, [priceId, mode, successUrl]);

  if (error) {
    return (
      <div className="rounded-sm border border-red-500/30 bg-red-500/10 p-6 text-center">
        <p className="text-sm text-red-400">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-3 text-sm text-gold underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div id="checkout" className="mx-auto max-w-lg">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret, onComplete: () => {} }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
