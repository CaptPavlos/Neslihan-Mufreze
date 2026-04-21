# neslihanmufreze.com

Personal website for Neslihan Müfreze — Turkey's first female offshore Unlimited DPO. A premium personal brand site featuring two digital books, Stripe checkout, Cal.com consulting booking, and an Instagram feed.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-only `@theme` config)
- **Animation**: [Motion v12](https://motion.dev/) (`motion/react`)
- **Payments**: [Stripe](https://stripe.com/) Embedded Checkout
- **Booking**: [Cal.com](https://cal.com/) embed
- **Fonts**: Playfair Display + Outfit via `next/font/google`
- **Hosting**: [Vercel](https://vercel.com/)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PRICE_KAPTANLIGA=price_...
NEXT_PUBLIC_STRIPE_PRICE_OFFSHORE=price_...

# Cal.com (optional — defaults to placeholder links)
NEXT_PUBLIC_CAL_COM_LINK_30=neslihanmufreze/30min
NEXT_PUBLIC_CAL_COM_LINK_60=neslihanmufreze/60min
NEXT_PUBLIC_CAL_COM_LINK_PKG=neslihanmufreze/mentorship

# Instagram feed via Behold (https://behold.so)
NEXT_PUBLIC_BEHOLD_FEED_URL=https://feeds.behold.so/794Co8DTgnS2jsJLJ0jL
```

### Development

```bash
pnpm dev
```

Opens at [http://localhost:3000](http://localhost:3000) with Turbopack hot reloading.

### Build

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
app/
  layout.tsx                          # Root layout, metadata, fonts
  page.tsx                            # Homepage
  sitemap.ts                          # Auto-generated sitemap
  globals.css                         # Tailwind v4 theme tokens
  api/
    og/route.tsx                      # Dynamic OG image generation
    stripe/
      checkout/route.ts               # Stripe checkout session
      webhook/route.ts                # Stripe webhook handler
  books/
    kaptanliga-giden-yol/
      page.tsx                        # Book 1 landing page (Turkish)
      success/page.tsx                # Post-purchase thank you
    offshore-life/
      page.tsx                        # Book 2 landing page (Bilingual)
      success/page.tsx                # Post-purchase thank you
components/
  nav.tsx                             # Responsive navigation
  hero.tsx                            # Homepage hero with compass rose
  story.tsx                           # "Her Story" section
  instagram-feed.tsx                  # Instagram grid
  consulting.tsx                      # Consulting section with Cal.com
  testimonials.tsx                    # Testimonials carousel
  footer.tsx                          # Site footer
  book-nav.tsx                        # Book page navigation
  book-hero.tsx                       # Book hero section
  book-toc.tsx                        # Table of contents
  book-author.tsx                     # Author bio
  book-reviews.tsx                    # Book reviews
  book-faq.tsx                        # FAQ accordion
  book-cta.tsx                        # Call-to-action
  book-checkout.tsx                   # Stripe checkout embed
  stripe-checkout.tsx                 # Stripe provider
  ui/
    button.tsx                        # Button component
    section-marker.tsx                # Section label badge
    fade-in.tsx                       # Scroll-triggered fade-in
  book/
    book-hero.tsx                     # Offshore Life hero variant
    book-chapters.tsx                 # Chapter list
    book-reviews.tsx                  # Reviews (Offshore Life)
    book-faq.tsx                      # FAQ (Offshore Life)
lib/
  fonts.ts                            # Font configuration
  stripe.ts                           # Stripe server client
scripts/
  fetch-instagram.ts                  # Build-time Instagram scraper
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, story, Instagram feed, consulting, testimonials |
| `/books/kaptanliga-giden-yol` | Book 1 — Turkish maritime career guide |
| `/books/kaptanliga-giden-yol/success` | Book 1 purchase confirmation |
| `/books/offshore-life` | Book 2 — Bilingual offshore life guide |
| `/books/offshore-life/success` | Book 2 purchase confirmation |

## SEO

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **OG Images**: Dynamic generation at `/api/og?title=...&subtitle=...`
- **JSON-LD**: Person (home), Book (book pages), Service (consulting)
- **Canonical URLs**: Set on all pages
- **Hreflang**: Turkish + English alternates on all pages

## Instagram Feed

The Instagram feed is wired to a [Behold](https://behold.so) feed, which aggregates the Instagram
account server-side and serves a public JSON feed with pre-resized images.

1. Set `NEXT_PUBLIC_BEHOLD_FEED_URL` to the Behold feed URL (e.g. `https://feeds.behold.so/<feedId>`).
2. The site fetches the feed at request time with hourly ISR revalidation (`next: { revalidate: 3600 }`).
3. If the fetch fails or returns empty, the homepage falls back to the gradient placeholder grid.

For Vercel deployments, add `NEXT_PUBLIC_BEHOLD_FEED_URL` under Settings → Environment Variables for
Production, Preview, and Development. After setting, redeploy; images auto-refresh every hour.

## Stripe Setup

1. Create products and prices in the [Stripe Dashboard](https://dashboard.stripe.com/)
2. Set the price IDs in `.env.local`
3. Configure the webhook endpoint at `/api/stripe/webhook`
4. Set `STRIPE_WEBHOOK_SECRET` from the Stripe webhook signing secret

## Deployment

Deploy to Vercel:

1. Connect the repository to [Vercel](https://vercel.com/)
2. Set all environment variables in the Vercel dashboard
3. Deploy — the site builds and deploys automatically on push

### Stripe Webhook for Production

After deploying, register the production webhook URL in Stripe:

```
https://neslihanmufreze.com/api/stripe/webhook
```

Enable the `checkout.session.completed` event.

## Design System

- **Colors**: Dark navy background (`#070d1a`), gold accents (`#c9a84c`), bone text (`#f0f4f7`)
- **Typography**: Playfair Display (headings) + Outfit (body)
- **Spacing**: `6rem` section padding (desktop), `4rem` (mobile)
- **All theme tokens**: Defined in `app/globals.css` via Tailwind v4 `@theme`
