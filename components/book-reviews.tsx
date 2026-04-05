import { FadeIn } from "@/components/ui/fade-in";

interface Review {
  stars: number;
  quote: string;
  name: string;
  role: string;
}

interface BookReviewsProps {
  reviews: Review[];
  sectionMarker?: string;
  heading?: string;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={i < count ? "var(--color-gold)" : "var(--color-slate)"}
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <FadeIn delay={index * 0.1}>
      <div className="flex h-full flex-col rounded-sm border border-slate/20 bg-navy-deep/40 p-6">
        <StarRating count={review.stars} />
        <blockquote className="mt-4 flex-1 text-sm italic leading-relaxed text-bone/70">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <div className="mt-5 border-t border-slate/20 pt-4">
          <p className="text-sm font-semibold text-bone">{review.name}</p>
          <p className="text-xs text-bone/50">{review.role}</p>
        </div>
      </div>
    </FadeIn>
  );
}

export function BookReviews({ reviews, sectionMarker, heading }: BookReviewsProps) {
  return (
    <section className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-14 text-center">
            <span className="section-marker">{sectionMarker}</span>
            <h2 className="mt-4 font-serif text-3xl text-bone sm:text-4xl">{heading}</h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
