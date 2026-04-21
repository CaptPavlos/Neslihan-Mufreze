import { getTranslations } from "next-intl/server";
import { getInstagramPosts } from "@/lib/instagram";
import { InstagramFeedGrid } from "@/components/instagram-feed-grid";
import { InstagramImage } from "@/components/instagram-image";
import { SectionMarker } from "@/components/ui/section-marker";
import { FadeIn } from "@/components/ui/fade-in";

export async function InstagramFeed() {
  const [t, posts] = await Promise.all([
    getTranslations("Instagram"),
    getInstagramPosts(12),
  ]);

  return (
    <section id="instagram" className="py-(--spacing-section) sm:py-(--spacing-section-sm)">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="mb-12 text-center">
            <SectionMarker>{t("sectionMarker")}</SectionMarker>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-bone">{t("heading")}</h2>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://instagram.com/neslihanmufreze"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-gold px-5 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                {t("follow")}
              </a>
            </div>
            <p className="mt-4 text-sm text-bone/50 tracking-wide">{t("stats")}</p>
          </div>
        </FadeIn>

        {posts.length > 0 ? (
          <InstagramFeedGrid posts={posts} />
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <InstagramImage key={i} postIndex={i} size={0} className="aspect-square w-full h-full" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
