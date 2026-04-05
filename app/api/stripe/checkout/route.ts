import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { priceId, mode, successUrl, cancelUrl } = await request.json();

    if (!priceId || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: "Missing required fields: priceId, successUrl, cancelUrl" },
        { status: 400 }
      );
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      ui_mode: "embedded_page",
      return_url: successUrl,
      metadata: { checkout_mode: mode ?? "book" },
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
      sessionId: session.id,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
